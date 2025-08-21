// =====================
// Imports
// =====================
"use client"

import { useState, useEffect } from "react"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil, Trash2, Search,  Plus, ChevronUp, ChevronDown, MoreHorizontal, ChevronsUpDown, Check, CheckCircle} from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import React from "react"; // Added missing import for React
import { format } from "date-fns";

// =====================
// Generic FormModal Component (for Orders & Trips)
// =====================
function FormModal({ open, onClose, fields, initialValues, onSubmit, title, submitLabel, columns = 3, dialogClassName, inputClassName }) {
  const [form, setForm] = useState(initialValues || Object.fromEntries(fields.map(f => [f.name, ""])));

  useEffect(() => {
    setForm(initialValues || Object.fromEntries(fields.map(f => [f.name, ""])));
  }, [initialValues, open, fields]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSelectChange = (name, value) => setForm({ ...form, [name]: value });
  const handleDateChange = (name, value) => setForm({ ...form, [name]: value });
  const handleSubmit = () => { onSubmit(form); onClose(); };
  const gridColsClass = columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-3" : "grid-cols-1";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={dialogClassName || `max-w-5xl p-0`}>
                <div className="bg-blue-600 text-white  px-6 py-4 flex justify-between items-center rounded-md">
        <DialogTitle className="text-lg font-semibold">{title}</DialogTitle></div>
        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className={`bg-white px-8 py-6 grid ${gridColsClass} gap-x-6 gap-y-4`}>
          {fields.map(field => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="font-medium text-sm mb-1">{field.label}</label>
              {field.type === "select" ? (
                <Select value={form[field.name]} onValueChange={val => handleSelectChange(field.name, val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options && field.options.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "calendar" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Input
                      readOnly
                      value={form[field.name] ? format(new Date(form[field.name]), 'yyyy-MM-dd HH:mm') : ''}
                      placeholder={field.label}
                      className="w-full px-4 py-2 text-base cursor-pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <Calendar
                      mode="single"
                      selected={form[field.name] ? new Date(form[field.name]) : undefined}
                      onSelect={date => handleDateChange(field.name, date ? date.toISOString() : "")}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={inputClassName || "w-full px-4 py-2 text-base"}
                />
              )}
            </div>
          ))}
          {Array.from({length: (columns - (fields.length % columns)) % columns}).map((_, i) => <div key={"empty-"+i}></div>)}
        </form>
        <div className="w-full flex justify-end pt-6 bg-[#eaf3fc] px-8 py-4 rounded-b-md">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full" onClick={handleSubmit}>
            {submitLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// =====================
// Form Field Definitions (Dynamic Arrays)
// =====================
// Define fields arrays for each form
const orderFormFields = [
  { name: "customer", label: "Customer *", type: "select", options: [], placeholder: "Select Customer" },
  { name: "pickupDatetime", label: "Pickup DateTime *", type: "calendar" },
  { name: "pickupCompany", label: "Pickup Company", type: "text" },
  { name: "pickupCountry", label: "Pickup Country *", type: "text" },
  { name: "pickupLocation", label: "Pickup Location *", type: "text" },
  { name: "pickupPincode", label: "Pickup Pincode", type: "text" },
  { name: "pickupAddress", label: "Pickup Address", type: "text" },
  { name: "weight", label: "Weight", type: "number" },
  { name: "quantity", label: "Quantity *", type: "number" },
  { name: "shipmentOption", label: "Shipment Option *", type: "select", options: [], placeholder: "Select Shipment Option" },
  { name: "deliveryDatetime", label: "Delivery DateTime *", type: "calendar" },
  { name: "deliveryCompany", label: "Delivery Company", type: "text" },
  { name: "deliveryCountry", label: "Delivery Country *", type: "text" },
  { name: "deliveryLocation", label: "Delivery Location *", type: "text" },
  { name: "deliveryPincode", label: "Delivery Pincode", type: "text" },
  { name: "deliveryAddress", label: "Delivery Address", type: "text" },
  { name: "volume", label: "Volume", type: "number" },
];
const tripFormFields = [
  { name: "startDate", label: "Start Time *", type: "calendar" },
  { name: "endDate", label: "End Time *", type: "calendar" },
  { name: "carrier", label: "Carrier *", type: "select", options: [], placeholder: "Select Carrier" },
  { name: "mode", label: "Mode Of Transport *", type: "select", options: [], placeholder: "Select Mode" },
  { name: "vehicleType", label: "Vehicle Type *", type: "text" },
  { name: "vehicle", label: "Vehicle *", type: "text" },
  { name: "driver", label: "Driver", type: "text" },
  { name: "rateCategory", label: "Rate Category", type: "text" },
  { name: "rate", label: "Rate", type: "text" },
  { name: "carrierInstructions", label: "Carrier Instructions", type: "text" },
  { name: "weightCapacity", label: "Weight Capacity", type: "text" },
  { name: "volumeCapacity", label: "Volume Capacity", type: "text" },
  { name: "additionalConditions", label: "Additional Conditions", type: "text" },
  { name: "temperatureRegime", label: "Temperature Regime", type: "text" },
  { name: "penaltyRate", label: "Time for loading and penalty rate", type: "text" },
];

// =====================
// Table Column Definitions (Dynamic Arrays)
// =====================
function OrdersTable({ orders, sortConfig, onSort, selectedOrders, onOrderSelection, onSelectAll, setSelectedTrip, handleDeleteOrderFromAll, onEditOrder }) {
    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <ChevronUp className="w-4 h-4 text-gray-400" />
        }
        return sortConfig.direction === 'asc' 
            ? <ChevronUp className="w-4 h-4 text-[#006397]" />
            : <ChevronDown className="w-4 h-4 text-[#006397]" />
    }

    const handleSort = (columnKey) => {
        const direction = sortConfig.key === columnKey && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        onSort(columnKey, direction)
    }

    // Example columns for OrdersTable
    const orderColumns = [
        { key: "id", label: "Order ID", sortable: true },
        { key: "source", label: "Source", sortable: true },
        { key: "destination", label: "Destination", sortable: true },
        { key: "pickup", label: "Pickup Time", sortable: true },
        { key: "weight", label: "Weight", sortable: true },
        { key: "volume", label: "Volume", sortable: true },
        { key: "quantity", label: "Quantity", sortable: true },
        { key: "mode", label: "Mode", sortable: true },
        { key: "status", label: "Status", sortable: true },
    ]

    return (
        <div className={`${orders.length > 6 ? 'h-[300px] overflow-y-auto' : ''}`}>
            <Table>
                <TableHeader className="sticky top-0 bg-muted">
                    <TableRow>
                        <TableHead>
                            <input
                                type="checkbox"
                                checked={selectedOrders.length === orders.length && orders.length > 0}
                                onChange={(e) => onSelectAll(e.target.checked)}
                                className="w-4 h-4 text-[#006397] bg-gray-100 border-gray-300 rounded focus:ring-[#006397] focus:ring-2"
                            />
                        </TableHead>
                        <TableHead>Actions</TableHead>
                        {orderColumns.map(col => (
                            <TableHead
                                key={col.key}
                                className={`text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors`}
                                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                            >
                                <div className="flex items-center gap-1">
                                    {col.label}
                                    {col.sortable && getSortIcon(col.key)}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedOrders.includes(order.id)}
                                    onChange={(e) => onOrderSelection(order.id, e.target.checked)}
                                    className="w-4 h-4 text-[#006397] bg-gray-100 border-gray-300 rounded focus:ring-[#006397] focus:ring-2"
                                />
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" >
                                        <DropdownMenuItem onClick={() => onEditOrder(order)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteOrderFromAll(order.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            {orderColumns.map(col => (
                                <TableCell key={col.key} className="text-sm text-gray-600">
                                    {col.key === "tripId" ? (
                                        <span
                                            className="cursor-pointer text-blue-700 underline hover:text-blue-900"
                                            onClick={() => {
                                                if (typeof setSelectedTrip === 'function') {
                                                    setSelectedTrip((data.trips || []).find(trip => trip.id === order.tripId));
                                                }
                                            }}
                                        >
                                            {order.tripId ? (
                                                <>
                                                    <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 transition">
                                                        {order.tripId}
                                                    </Badge>
                                                </>
                                            ) : (
                                                <Badge variant="outline" className="bg-gray-200 text-gray-600">
                                                    Unassigned
                                                </Badge>
                                            )}
                                        </span>
                                    ) : (
                                        order[col.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function TripsTable({ trips, onDoubleClick, tripAssignments, sortConfig, onSort, data, handleDeleteTrip, onEditTrip }) {
    const [expandedTripIds, setExpandedTripIds] = useState([]);
    const tripColumns = [
        { key: "id", label: "Trip ID", sortable: true },
        { key: "startDate", label: "Start Date", sortable: true },
        { key: "endDate", label: "End Date", sortable: true },
        { key: "source", label: "Source", sortable: true },
        { key: "destination", label: "Destination", sortable: true },
        { key: "vehicle", label: "Vehicle", sortable: true },
        { key: "driver", label: "Driver", sortable: true },
        { key: "vehicleType", label: "Vehicle Type", sortable: true },
        { key: "mode", label: "Mode", sortable: true },
        { key: "weight", label: "Weight", sortable: true },
        { key: "volume", label: "Volume", sortable: true },
        { key: "unit", label: "Unit", sortable: true },
    ];
    const getSortIcon = (columnKey) => {
        if (!sortConfig || sortConfig.key !== columnKey) {
            return <ChevronUp className="w-4 h-4 text-gray-400" />
        }
        return sortConfig.direction === 'asc'
            ? <ChevronUp className="w-4 h-4 text-[#006397]" />
            : <ChevronDown className="w-4 h-4 text-[#006397]" />
    }
    const toggleTripExpand = (tripId) => {
        setExpandedTripIds(prev =>
            prev.includes(tripId) ? prev.filter(id => id !== tripId) : [...prev, tripId]
        );
    };
    return (
        <div className="h-[200px] overflow-y-auto">
            <Table>
                <TableHeader className="sticky top-0 bg-muted">
                    <TableRow>
                        <TableHead>Actions</TableHead>
                        <TableHead></TableHead>
                        {tripColumns.map(col => (
                            <TableHead
                                key={col.key}
                                className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={col.sortable ? () => onSort(col.key, sortConfig && sortConfig.key === col.key && sortConfig.direction === 'asc' ? 'desc' : 'asc') : undefined}
                            >
                                <div className="flex items-center gap-1">
                                    {col.label}
                                    {col.sortable && getSortIcon(col.key)}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trips.map((trip) => (
                        <React.Fragment key={trip.id}>
                        <TableRow
                            className="hover:bg-muted/50 cursor-pointer border-2 border-transparent transition-colors"
                            onDoubleClick={() => onDoubleClick(trip)}
                        >
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => onEditTrip(trip)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTrip(trip.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); toggleTripExpand(trip.id); }}>
                                        {expandedTripIds.includes(trip.id) ? '-' : '+'}
                                    </Button>
                                </TableCell>
                            {tripColumns.map(col => (
                                <TableCell key={col.key} className="text-sm text-gray-600">
                                    {col.key === "id" ? (
                                        <span className="font-medium flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            {trip[col.key]}
                                            {tripAssignments[trip.id] && tripAssignments[trip.id].length > 0 && (
                                                <Badge variant="secondary" className="ml-2 text-sm text-gray-600">
                                                    {tripAssignments[trip.id].length}
                                                </Badge>
                                            )}
                                        </span>
                                    ) : (
                                        trip[col.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                            {expandedTripIds.includes(trip.id) && (
                                <TableRow>
                                    <TableCell colSpan={tripColumns.length + 1} className="bg-gray-50 p-0">
                                        <Table className="w-full text-xs">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Order ID</TableHead>
                                                    <TableHead>Assigned Units</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {(tripAssignments[trip.id] || []).map(assignment => {
                                                    const order = (data.orders || []).find(o => o.id === assignment.orderId);
                                                    return (
                                                        <TableRow key={assignment.orderId}>
                                                            <TableCell className="font-semibold">{order?.id}</TableCell>
                                                            <TableCell>
                                                                {(order?.shipmentUnits || [])
                                                                    .filter(u => assignment.unitIds.includes(u.id))
                                                                    .map(u => (
                                                                        <span key={u.id} className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 mr-1 mb-1">
                                                                            {u.id} - {u.type} - {u.weight}kg - {u.volume}m³
                                                                        </span>
                                                                    ))}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function PlannedOrdersTable({ selectedTrip, assignedOrders, sortConfig, onSort, tripAssignments, handleDeleteOrder, onDeallocateOrder }) {
    const [expandedOrderIds, setExpandedOrderIds] = useState([])
    const plannedOrderColumns = [
        { key: "id", label: "Order ID", sortable: true, width: "w-[120px]" },
        { key: "source", label: "Source", sortable: true, width: "w-[100px]" },
        { key: "destination", label: "Destination", sortable: true, width: "w-[100px]" },
        { key: "pickup", label: "Pickup Time", sortable: true, width: "w-[140px]" },
        { key: "weight", label: "Weight", sortable: true, width: "w-[80px]" },
        { key: "volume", label: "Volume", sortable: true, width: "w-[80px]" },
        { key: "quantity", label: "Quantity", sortable: true, width: "w-[70px]" },
        { key: "mode", label: "Mode", sortable: true, width: "w-[60px]" },
        { key: "status", label: "Status", sortable: true, width: "w-[80px]" },
    ]
    const getAssignedUnitIdsForOrder = (orderId) => {
        if (!selectedTrip || !tripAssignments) return []
        const assignment = tripAssignments[selectedTrip.id]?.find(a => a.orderId === orderId)
        return assignment ? assignment.unitIds : []
    }
    const toggleExpand = (orderId) => {
        setExpandedOrderIds(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        )
    }
    // Sort assignedOrders based on sortConfig
    const sortedOrders = (() => {
        if (!sortConfig || !sortConfig.key) return assignedOrders
        return [...assignedOrders].sort((a, b) => {
            let aValue = a[sortConfig.key]
            let bValue = b[sortConfig.key]
            // Handle numeric values
            if (["weight", "volume", "quantity"].includes(sortConfig.key)) {
                aValue = parseFloat(aValue.replace(/[^\d.]/g, ''))
                bValue = parseFloat(bValue.replace(/[^\d.]/g, ''))
            }
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
            return 0
        })
    })()
    return (
        <div className="h-[200px] overflow-y-auto ">
            <Table>
                <TableHeader className="sticky top-0 bg-muted">
                    <TableRow>
                        <TableHead className="w-12">Actions</TableHead>
                        <TableHead className="w-8"></TableHead> {/* For expand/collapse button */}
                        {plannedOrderColumns.map(col => (
                            <TableHead
                                key={col.key}
                                className={`${col.width} text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors`}
                                onClick={col.sortable ? () => onSort(col.key, sortConfig && sortConfig.key === col.key && sortConfig.direction === 'asc' ? 'desc' : 'asc') : undefined}
                            >
                                <div className="flex items-center gap-1">
                                    {col.label}
                                    {col.sortable && col.key !== 'actions' && (sortConfig && sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-[#006397]" /> : <ChevronDown className="w-4 h-4 text-[#006397]" />) : <ChevronUp className="w-4 h-4 text-gray-400" />)}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedTrip && sortedOrders.length > 0 ? (
                        sortedOrders.map((order) => {
                            const assignedUnitIds = getAssignedUnitIdsForOrder(order.id);
                            return (
                                <React.Fragment key={order.id}>
                                    <TableRow className="hover:bg-muted/50">
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => onDeallocateOrder(order)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Deallocate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteOrder(order.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); toggleExpand(order.id); }}>
                                                {expandedOrderIds.includes(order.id) ? '-' : '+'}
                                            </Button>
                                        </TableCell>
                                {plannedOrderColumns.map(col => (
                                    <TableCell key={col.key} className="text-sm text-gray-600">
                                        {col.key === "units"
                                          ? (order.shipmentUnits && order.shipmentUnits.length > 0
                                              ? order.shipmentUnits.map(u => (
                                                  <div key={u.id} className="mb-1 p-1 bg-blue-50 rounded text-xs">
                                                    <span className="font-semibold">{u.id}</span> - {u.type} x{u.quantity} ({u.weight}kg, {u.volume}m³)
                                                  </div>
                                                ))
                                              : <span className="text-gray-400">No units</span>)
                                          : order[col.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                                    {expandedOrderIds.includes(order.id) && (
                                        <TableRow>
                                            <TableCell colSpan={plannedOrderColumns.length + 2} className="bg-gray-50 p-0">
                                                <div className="p-4">
                                                    <div className="mb-2 text-xs font-semibold text-gray-700">Order ID: <span className="font-bold">{order.id}</span></div>
                                                    <div className="mb-1 text-xs font-semibold text-gray-700">Assigned Units:</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(order.shipmentUnits || []).length > 0 ? (
                                                            order.shipmentUnits.map(u => (
                                                                <span key={u.id} className="inline-block bg-blue-100 text-blue-800 rounded px-3 py-1 text-xs font-medium">
                                                                    {u.id} - {u.type} - {u.weight}kg - {u.volume}m³
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-gray-400">No units</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={plannedOrderColumns.length + 1} className="text-center py-16">
                                <div className="text-muted-foreground">
                                    <p className="text-sm font-medium">No data available</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

// =====================
// Main Component State
// =====================
export default function ShipmentPlanningPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCustomer, setSelectedCustomer] = useState("")
    const [rangeValue, setRangeValue] = useState("10")
    const [data, setData] = useState({
        orders: [],
        trips: [],
        customerData: {}
    })
    const [loading, setLoading] = useState(true)
    const [tripAssignments, setTripAssignments] = useState({})
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
    const [selectedOrders, setSelectedOrders] = useState([])
    const [targetTripId, setTargetTripId] = useState("")
    const [tripDropdownOpen, setTripDropdownOpen] = useState(false)
    const [tripSearchValue, setTripSearchValue] = useState("")
    const [isTripModalOpen, setIsTripModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTrip, setEditingTrip] = useState(null);
    const [isOrderEditModalOpen, setIsOrderEditModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    // const { toast } = useToast() // Removed useToast import

    // Add state for unit selection modal
    const [showUnitSelectModal, setShowUnitSelectModal] = useState(false);
    const [unitSelection, setUnitSelection] = useState({}); // { orderId: [unitId, ...] }
    const [ordersNeedingUnitSelection, setOrdersNeedingUnitSelection] = useState([]);
    const [pendingTripId, setPendingTripId] = useState(null);

    // 1. Add state for deallocation modal and selected order
    const [deallocateOrder, setDeallocateOrder] = useState(null);
    const [isDeallocateModalOpen, setIsDeallocateModalOpen] = useState(false);

    // Add state for success message dialog
    const [showAssignSuccess, setShowAssignSuccess] = useState(false);

    const handleOpenDeallocateModal = (order) => {
      setDeallocateOrder(order);
      setIsDeallocateModalOpen(true);
    };

    const handleConfirmDeallocate = () => {
      // Remove from tripAssignments
      setTripAssignments(prev => {
        const prevAssignments = prev[selectedTrip.id] || [];
        return {
          ...prev,
          [selectedTrip.id]: prevAssignments.filter(a => a.orderId !== deallocateOrder.id)
        };
      });
      // Add back to main orders if not present
      setData(prev => ({
        ...prev,
        orders: prev.orders.some(o => o.id === deallocateOrder.id)
          ? prev.orders
          : [...prev.orders, deallocateOrder]
      }));
      setIsDeallocateModalOpen(false);
      setDeallocateOrder(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/shipments.json')
                const jsonData = await response.json()
                setData(jsonData)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Generate dynamic options from data
    const customers = Object.keys(data.customerData || {})
    const carriers = [...new Set(data.trips.map(trip => trip.carrier).filter(Boolean))]
    const rangeOptions = ["10", "50", "100", "150", "200"]

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction })
    }

    const sortOrders = (orders) => {
        if (!sortConfig.key) return orders

        return [...orders].sort((a, b) => {
            let aValue = a[sortConfig.key]
            let bValue = b[sortConfig.key]

            // Handle numeric values
            if (sortConfig.key === 'weight' || sortConfig.key === 'volume' || sortConfig.key === 'quantity') {
                aValue = parseFloat(aValue.replace(/[^\d.]/g, ''))
                bValue = parseFloat(bValue.replace(/[^\d.]/g, ''))
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
            return 0
        })
    }

    const filteredOrders = sortOrders(data.orders.filter((order) =>
        order.id.includes(searchTerm)
    ))

    // Compute assigned order IDs
    const assignedOrderIds = Object.values(tripAssignments)
      .flat()
      .map(a => a.orderId);

    // Only show orders NOT assigned to any trip
    const unassignedOrders = data.orders.filter(order => !assignedOrderIds.includes(order.id));

    const getCustomerOrders = () => {
        return data.customerData[selectedCustomer] || []
    }

    const getAssignedOrdersForTrip = (tripId) => {
        return tripAssignments[tripId] || []
    }

    const getTripsForTab = (tabName) => {
        switch (tabName) {
            case 'total-trips':
                return data.trips
            case 'customer-trips':
                return data.trips.filter(trip => trip.customer === selectedCustomer)
            case 'carrier-trips':
                return data.trips.filter(trip => trip.carrier)
            case 'range-trips':
                return data.trips.slice(0, parseInt(rangeValue))
            case 'in-transit-trips':
                return data.trips.filter(trip => trip.status === 'in-transit')
            case 'customer-in-transit':
                return data.trips.filter(trip => trip.customer === selectedCustomer && trip.status === 'in-transit')
            case 'range-in-transit':
                return data.trips.filter(trip => trip.status === 'in-transit').slice(0, parseInt(rangeValue))
            default:
                return data.trips
        }
    }

    const handleOrderSelection = (orderId, checked) => {
        if (checked) {
            setSelectedOrders(prev => [...prev, orderId])
        } else {
            setSelectedOrders(prev => prev.filter(id => id !== orderId))
        }
    }

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedOrders(filteredOrders.map(order => order.id))
        } else {
            setSelectedOrders([])
        }
    }

    // Update handleAssignToTrip
    const handleAssignToTrip = () => {
        if (!targetTripId || selectedOrders.length === 0) return;

        const ordersToAssign = filteredOrders.filter(order => selectedOrders.includes(order.id));
        const needingSelection = ordersToAssign.filter(order => order.shipmentUnits && order.shipmentUnits.length > 1);

        if (needingSelection.length > 0) {
            setOrdersNeedingUnitSelection(needingSelection);
            setPendingTripId(targetTripId);
            setShowUnitSelectModal(true);
            setUnitSelection(
                Object.fromEntries(
                    needingSelection.map(order => [order.id, order.shipmentUnits.map(u => u.id)])
                )
            );
            return;
        }

        // If all orders have only one unit, assign directly
        assignOrdersToTrip(ordersToAssign, targetTripId);
    };

    // Assignment logic
    function assignOrdersToTrip(assignments, tripId, isUnitLevel = false) {
        setTripAssignments(prev => {
            const prevAssignments = prev[tripId] || [];
            let newAssignments;
            if (isUnitLevel) {
                // assignments: [{orderId, unitIds}]
                newAssignments = [
                    ...prevAssignments,
                    ...assignments.filter(a => a.unitIds.length > 0)
                ];
            } else {
                // assignments: [order, ...] (all units)
                newAssignments = [
                    ...prevAssignments,
                    ...assignments.map(order => ({
                        orderId: order.id,
                        unitIds: order.shipmentUnits ? order.shipmentUnits.map(u => u.id) : []
                    }))
                ];
            }
            return {
                ...prev,
                [tripId]: newAssignments
            };
        });
        setSelectedOrders([]);
        setTargetTripId("");
        setTripSearchValue("");
        setShowAssignSuccess(true); // Show success dialog
        setTimeout(() => setShowAssignSuccess(false), 2000); // Auto-close after 2s
    }

    const handleTripDoubleClick = (trip) => {
        setSelectedTrip(trip)
    }

    function handleDeleteTrip(tripId) {
        setData(prev => ({
            ...prev,
            trips: prev.trips.filter(trip => trip.id !== tripId)
        }));
        setTripAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[tripId];
            return newAssignments;
        });
        toast.success('Trip deleted successfully', { position: 'top-center', duration: 3000 });
    }

    function handleDeleteOrder(orderId) {
        if (!selectedTrip) return;
        setTripAssignments(prev => {
            const prevAssignments = prev[selectedTrip.id] || [];
            return {
                ...prev,
                [selectedTrip.id]: prevAssignments.filter(a => a.orderId !== orderId)
            };
        });
        toast.success('Order removed from trip', { position: 'top-center', duration: 3000 });
    }

    function handleDeleteOrderFromAll(orderId) {
        setData(prev => ({
            ...prev,
            orders: prev.orders.filter(order => order.id !== orderId)
        }));
        setTripAssignments(prev => {
            const newAssignments = {};
            for (const tripId in prev) {
                newAssignments[tripId] = prev[tripId].filter(a => a.orderId !== orderId);
            }
            return newAssignments;
        });
        toast.success('Order deleted successfully', { position: 'top-center', duration: 3000 });
    }

    // 3. Handler to open edit modal
    const handleEditTrip = (trip) => {
      setEditingTrip(trip);
      setIsEditModalOpen(true);
    };
    // 4. Handler to update trip in state
    const handleUpdateTrip = (updatedTrip) => {
      setData(prev => ({
        ...prev,
        trips: prev.trips.map(t => t.id === updatedTrip.id ? { ...t, ...updatedTrip } : t)
      }));
      setIsEditModalOpen(false);
      setEditingTrip(null);
    };

    // Handler to open order edit modal
    const handleEditOrder = (order) => {
      setEditingOrder(order);
      setIsOrderEditModalOpen(true);
    };
    // Handler to update order in state
    const handleUpdateOrder = (updatedOrder) => {
      setData(prev => ({
        ...prev,
        orders: prev.orders.map(o => o.id === updatedOrder.id ? { ...o, ...updatedOrder } : o)
      }));
      setIsOrderEditModalOpen(false);
      setEditingOrder(null);
    };

    // =====================
    // Main Render (JSX)
    // =====================
    return (
        <div className="min-h-screen bg-[#f5f7fc] p-6">
            <div className="w-full space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Shipment Planning</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <Card className="w-full bg-white border lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-semibold">Orders Management</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 py-2">
                            <Tabs defaultValue="total">
                                <TabsList className="w-full justify-start bg-transparent">
                                    <TabsTrigger value="total" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] ">TOTAL ORDERS</TabsTrigger>
                                    <TabsTrigger value="customer" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] ">BY CUSTOMER ORDERS</TabsTrigger>
                                    <TabsTrigger value="range" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397]">BY RANGE ORDERS</TabsTrigger>
                                </TabsList>

                                <TabsContent value="total">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="relative w-64">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                placeholder="Search Order ID..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        // Search functionality is already active through filteredOrders
                                                    }
                                                }}
                                                className="w-full text-sm pl-10 pr-4"
                                            />
                                        </div>
                                    </div>
                                    
                                    {selectedOrders.length > 0 && (
                                        <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                            <div className="text-sm text-blue-700">
                                                {selectedOrders.length} order(s) selected
                                            </div>
                                            
                                          <Select value={targetTripId} onValueChange={setTargetTripId}>
                                                <SelectTrigger className="w-48 text-sm">
                                                    <SelectValue placeholder="Select Trip ID" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {data.trips.map(trip => (
                                                        <SelectItem key={trip.id} value={trip.id}>
                                                            {trip.id} - {trip.source} to {trip.destination}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            
                                            <Button 
                                                onClick={handleAssignToTrip}
                                                disabled={!targetTripId}
                                                className="bg-[#006397] hover:bg-[#005285] text-white"
                                            >
                                                Assign to Trip
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setSelectedOrders([])
                                                    setTargetTripId("")
                                                    setTripSearchValue("")
                                                }}
                                                className="text-sm"
                                            >
                                                Clear Selection
                                            </Button>
                                        </div>
                                    )}
                                    
                                    <OrdersTable
                                        orders={unassignedOrders}
                                        sortConfig={sortConfig}
                                        onSort={handleSort}
                                        selectedOrders={selectedOrders}
                                        onOrderSelection={handleOrderSelection}
                                        onSelectAll={handleSelectAll}
                                        setSelectedTrip={setSelectedTrip}
                                        handleDeleteOrderFromAll={handleDeleteOrderFromAll}
                                        onEditOrder={handleEditOrder}
                                    />
                                </TabsContent>

                                <TabsContent value="customer">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                                            <SelectTrigger className="w-48 text-sm">
                                                <SelectValue placeholder="Select Customer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {customers.map(customer => (
                                                    <SelectItem key={customer} value={customer}>
                                                        {customer.charAt(0).toUpperCase() + customer.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <OrdersTable
                                        orders={getCustomerOrders()}
                                        sortConfig={sortConfig}
                                        onSort={handleSort}
                                        selectedOrders={selectedOrders}
                                        onOrderSelection={handleOrderSelection}
                                        onSelectAll={handleSelectAll}
                                        setSelectedTrip={setSelectedTrip}
                                        handleDeleteOrderFromAll={handleDeleteOrderFromAll}
                                        onEditOrder={handleEditOrder}
                                    />
                                </TabsContent>

                                <TabsContent value="range">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Select onValueChange={setRangeValue} defaultValue="10">
                                            <SelectTrigger className="w-32 text-sm">
                                                <SelectValue placeholder="Select Range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {rangeOptions.map(option => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <OrdersTable
                                        orders={filteredOrders}
                                        sortConfig={sortConfig}
                                        onSort={handleSort}
                                        selectedOrders={selectedOrders}
                                        onOrderSelection={handleOrderSelection}
                                        onSelectAll={handleSelectAll}
                                        setSelectedTrip={setSelectedTrip}
                                        handleDeleteOrderFromAll={handleDeleteOrderFromAll}
                                        onEditOrder={handleEditOrder}
                                    />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card className="w-full bg-white border">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-semibold">Shipment Route Map</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 py-2">
                            <Tabs defaultValue="freight-packer">
                                <TabsList className="mb-2 w-full justify-start bg-transparent">
                                    <TabsTrigger value="shipment-route" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] ">SHIPMENT ROUTE</TabsTrigger>
                                    <TabsTrigger value="freight-packer" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397]">FREIGHT PACKER</TabsTrigger>
                                </TabsList>
                                <TabsContent value="shipment-route">
                                    <div className="rounded-lg h-[400px] overflow-hidden border">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986532929688!3d40.69714941978941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Shipment Map"
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="freight-packer">
                                    <div className="rounded-lg h-[400px] overflow-hidden border">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986532929688!3d40.69714941978941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Freight Packer Map"
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <Card className="w-full bg-white border">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-semibold">Trips Management</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-4 py-2">
                        <Tabs defaultValue="total-trips">
                            <TabsList className="mb-6 w-full justify-start bg-transparent">
                                <TabsTrigger value="total-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] ">TOTAL TRIPS</TabsTrigger>
                                <TabsTrigger value="customer-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397]">BY CUSTOMER TRIPS</TabsTrigger>
                                <TabsTrigger value="carrier-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397]">BY CARRIER TRIPS</TabsTrigger>
                                <TabsTrigger value="range-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397]">BY RANGE TRIPS</TabsTrigger>
                                <TabsTrigger value="in-transit-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] ">TOTAL IN-TRANSIT TRIPS</TabsTrigger>
                                <TabsTrigger value="customer-in-transit" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] ">BY CUSTOMER IN-TRANSIT TRIPS</TabsTrigger>
                                <TabsTrigger value="range-in-transit" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] ">BY RANGE IN-TRANSIT TRIPS</TabsTrigger>
                            </TabsList>
                            <TabsContent value="total-trips">
                                <div className="flex items-center gap-3 mb-6">
                                    {/* Search Trip ID input */}
                                      <Button variant="outline" size="icon" onClick={() => setIsTripModalOpen(true)}>
                                        <Plus className="w-4 h-4" />
                                        </Button>
                                    <div className="relative w-64">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search Trip ID..."
                                            value={tripSearchValue}
                                            onChange={e => setTripSearchValue(e.target.value)}
                                            className="w-full text-sm pl-10 pr-4"
                                        />
                                    </div>

                                    {/* Searchable Trip Dropdown */}
                                  

                     
                                </div>
                                <TripsTable
                                    trips={data.trips}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                    data={data}
                                    handleDeleteTrip={handleDeleteTrip}
                                    onEditTrip={handleEditTrip}
                                />
                            </TabsContent>

                            <TabsContent value="customer-trips">
                                <div className="flex items-center gap-2 mb-4">
                                      <Button variant="outline" size="icon" onClick={() => setIsTripModalOpen(true)}>
                                       <Plus className="w-4 h-4" />
                                        </Button>
                                    <Select>
                                        <SelectTrigger className="w-40 text-sm">
                                            <SelectValue placeholder="Select Customer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map(customer => (
                                                <SelectItem key={customer} value={customer}>
                                                    {customer.charAt(0).toUpperCase() + customer.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <TripsTable
                                    trips={getTripsForTab('customer-trips')}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="carrier-trips">
                                <div className="flex items-center gap-2 mb-4">
                                      <Button variant="outline" size="icon" onClick={() => setIsTripModalOpen(true)}>
                                        <Plus className="w-4 h-4" />
                                     </Button>
                                    <Select>
                                        <SelectTrigger className="w-40 text-sm">
                                            <SelectValue placeholder="Select Carrier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {carriers.map(carrier => (
                                                <SelectItem key={carrier} value={carrier}>
                                                    {carrier.charAt(0).toUpperCase() + carrier.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <TripsTable
                                    trips={getTripsForTab('carrier-trips')}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="range-trips">
                                <div className="flex items-center gap-2 mb-4">
                                      <Button variant="outline" size="icon" onClick={() => setIsTripModalOpen(true)}>
                                        <Plus className="w-4 h-4" />
                                       </Button>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-20 text-sm">
                                            <SelectValue placeholder="All" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            {rangeOptions.map(option => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <TripsTable
                                    trips={getTripsForTab('range-trips')}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="in-transit-trips">
                                <div className="flex items-center gap-2 mb-4">
                                      <Button variant="outline" size="icon" onClick={() => setIsTripModalOpen(true)}>
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                </div>
                                <TripsTable
                                    trips={getTripsForTab('in-transit-trips')}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="customer-in-transit">
                                <div className="flex items-center gap-2 mb-4">
                                      <Button variant="outline" size="icon" onClick={() => setIsTripModalOpen(true)}>
                                         <Plus className="w-4 h-4" />
                                       </Button>
                                    <Select>
                                        <SelectTrigger className="w-40 text-sm">
                                            <SelectValue placeholder="Select Customer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map(customer => (
                                                <SelectItem key={customer} value={customer}>
                                                    {customer.charAt(0).toUpperCase() + customer.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <TripsTable
                                    trips={getTripsForTab('customer-in-transit')}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="range-in-transit">
                                <div className="flex items-center gap-2 mb-4">
                                      <Button variant="outline" size="icon" onClick={() => setIsTripModalOpen(true)}>
                                        <Plus className="w-4 h-4" />
                                       </Button>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-20 text-sm">
                                            <SelectValue placeholder="All" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            {rangeOptions.map(option => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <TripsTable
                                    trips={getTripsForTab('range-in-transit')}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card className="w-full bg-white border">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-semibold">Planned Orders</CardTitle>
                           
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-4 py-2">
                        <PlannedOrdersTable
                            selectedTrip={selectedTrip}
                            assignedOrders={
                                selectedTrip && tripAssignments[selectedTrip.id]
                                    ? tripAssignments[selectedTrip.id].map(a => data.orders.find(o => o.id === a.orderId)).filter(Boolean)
                                    : []
                            }
                            sortConfig={sortConfig}
                            onSort={handleSort}
                            tripAssignments={tripAssignments}
                            handleDeleteOrder={handleDeleteOrder}
                            onDeallocateOrder={handleOpenDeallocateModal}
                        />
                    </CardContent>
                </Card>

                {/* NewTripModal using shadcn Dialog with DialogTitle (no blue header div) */}
                <FormModal
                    open={isTripModalOpen}
                    onClose={() => setIsTripModalOpen(false)}
                    fields={tripFormFields}
                    onSubmit={(newTrip) => {
                        setData(prev => ({
                            ...prev,
                            trips: [
                                ...prev.trips,
                                {
                                    ...newTrip,
                                    id: "TRIP" + (prev.trips.length + 1), // or generate your own ID logic
                                    status: "planned"
                                }
                            ]
                        }))
                        setIsTripModalOpen(false)
                    }}
                    title="New Shipment"
                    submitLabel="Create"
                    columns={3}
                />
                <FormModal
                    open={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    fields={tripFormFields}
                    initialValues={editingTrip}
                    onSubmit={handleUpdateTrip}
                    title="Edit Shipment"
                    submitLabel="Update"
                    columns={3}
                />
                <FormModal
                    open={isOrderEditModalOpen}
                    onClose={() => setIsOrderEditModalOpen(false)}
                    fields={orderFormFields}
                    initialValues={editingOrder}
                    onSubmit={handleUpdateOrder}
                    title={editingOrder ? `Edit Order::${editingOrder.id}` : "Edit Order"}
                    submitLabel="Update"
                    columns={3}
                />
            </div>
            {showUnitSelectModal && (
  <Dialog open={showUnitSelectModal} onOpenChange={setShowUnitSelectModal}>
    <DialogContent className="p-0 lg:max-w-[60rem]">
      {/* Blue Header Bar */}
      <div className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 rounded-t-md">
        <span className="text-lg font-semibold">Assign lines to Shipment</span>
        <button
          className="text-white text-2xl font-bold focus:outline-none"
          onClick={() => setShowUnitSelectModal(false)}
        >
          
        </button>
      </div>
      <div className="bg-white px-8 py-6">
        {/* Add spacing between header and table */}
        <div className="mb-6"></div>
        {/* Dynamic Table with shadcn components */}
        {ordersNeedingUnitSelection.length > 0 && (
          <Table className="w-full text-sm border rounded mb-2">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="px-4 py-2"></TableHead>
                <TableHead className="px-4 py-2">ID #</TableHead>
                <TableHead className="px-4 py-2">Handling unit</TableHead>
                <TableHead className="px-4 py-2">Quantity</TableHead>
                <TableHead className="px-4 py-2">Width</TableHead>
                <TableHead className="px-4 py-2">Height</TableHead>
                <TableHead className="px-4 py-2">Length</TableHead>
                <TableHead className="px-4 py-2">Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersNeedingUnitSelection.map(order => (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell colSpan={8} className="bg-blue-50 font-semibold text-blue-900 px-4 py-2">
                      Order ID: {order.id}
                    </TableCell>
                  </TableRow>
                  {order.shipmentUnits.map(unit => (
                    <TableRow key={unit.id} className="align-middle h-12">
                      <TableCell className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={unitSelection[order.id]?.includes(unit.id) || false}
                      onChange={e => {
                        setUnitSelection(prev => {
                          const prevUnits = prev[order.id] || [];
                          return {
                            ...prev,
                            [order.id]: e.target.checked
                              ? [...prevUnits, unit.id]
                              : prevUnits.filter(id => id !== unit.id)
                          };
                        });
                      }}
                    />
                      </TableCell>
                      <TableCell className="px-4 py-2">{unit.id}</TableCell>
                      <TableCell className="px-4 py-2">{unit.type}</TableCell>
                      <TableCell className="px-4 py-2">{unit.quantity}</TableCell>
                      <TableCell className="px-4 py-2">{unit.width} M</TableCell>
                      <TableCell className="px-4 py-2">{unit.height} M</TableCell>
                      <TableCell className="px-4 py-2">{unit.length} M</TableCell>
                      <TableCell className="px-4 py-2">{unit.weight} Kg</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
        {/* Red Warning */}
        <div className="text-red-600 text-center my-4">
          The Shipment capacity exceeded with vehicle capacity. Do you want to split into 2 vehicles?
        </div>
        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 mt-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              const selectedAssignments = ordersNeedingUnitSelection.map(order => ({
                orderId: order.id,
                unitIds: unitSelection[order.id] || []
              }));
              assignOrdersToTrip(selectedAssignments, pendingTripId, true);
              setShowUnitSelectModal(false);
              setOrdersNeedingUnitSelection([]);
              setUnitSelection({});
              setPendingTripId(null);
            }}
          >
            Add Lines to Shipments
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowUnitSelectModal(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)}
        {/* 4. Add the confirmation dialog in main component JSX */}
        <Dialog open={isDeallocateModalOpen} onOpenChange={setIsDeallocateModalOpen}>
          <DialogContent className="max-w-lg p-0">
            <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-md">
              <DialogTitle className="text-lg font-semibold">Deallocate Order</DialogTitle>
            </div>
            <div className="bg-white px-8 py-8">
              <p className="text-lg font-semibold mb-8">Do you want to deallocate this order?</p>
              <div className="flex justify-end gap-4">
                <Button onClick={handleConfirmDeallocate} className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full">Yes</Button>
                <Button onClick={() => setIsDeallocateModalOpen(false)} className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-full">No</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Add the success message dialog in main component JSX */}
        <Dialog open={showAssignSuccess} onOpenChange={setShowAssignSuccess}>
          <DialogContent className="max-w-md p-0">
            <DialogTitle className="text-lg font-semibold text-green-700"></DialogTitle>
            <div className="bg-white px-8 py-8 flex flex-col items-center">
              <CheckCircle className="w-12 h-12 mb-4 text-green-600" />
              <p className="text-lg font-semibold mb-2 text-green-700">Order assigned successfully!</p>
            </div>
          </DialogContent>
        </Dialog>
        </div>
    )
}