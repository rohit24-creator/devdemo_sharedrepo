import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Eye, List, MapPin, FileText, Download, CheckCircle, Truck, Clock, File, FileCheck2, FileDown, FileBarChart2, FileCheck, FileText as FileTextIcon, FileDown as FileDownIcon, FileCheck as FileCheckIcon, FileBarChart2 as FileBarChart2Icon, FolderOpen, Search, LayoutGrid, ArrowRight, ChevronDown, Loader2, MoreVertical } from "lucide-react";
import TripDetailsModal from "./TripDetailsModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

// --- Status helpers  ---
const statusColorMap = {
  Delivered: "bg-green-500",
  "In Transit": "bg-blue-500",
  Pending: "bg-yellow-400",
  default: "bg-gray-300"
};
const statusIconMap = {
  Delivered: <CheckCircle className="w-4 h-4 mr-1" />,
  "In Transit": <Truck className="w-4 h-4 mr-1" />,
  Pending: <Truck className="w-4 h-4 mr-1" />,
  default: <Truck className="w-4 h-4 mr-1" />,
};
const statusLabels = ["Pending", "In Transit", "Delivered"];
const statusColors = ["bg-yellow-400", "bg-blue-500", "bg-green-500"];
function getStatusStep(order) {
  if (order.status === "Delivered") return 2;
  if (order.status === "In Transit") return 1;
  return 0;
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// Custom dropdown component for Booking ID and Reference
function ComboboxBookingId({ value, onChange, options, placeholder = "Select Booking ID" }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);


  const filteredOptions = useMemo(() => {
    if (!debouncedSearch) return options;
    return options.filter(option =>
      String(option).toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [options, debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option === value) || value
            : placeholder}
          <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            className="h-9"
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>No options found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function FilterTab({ filterFields, formValues, setFormValues, onSearch, orders = [] }) {
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [error, setError] = useState(null);

  // Extract unique values for dropdowns with error handling and loading state
  const bookingIds = useMemo(() => {
    try {
      setIsLoadingOptions(true);
      setError(null);
      
      const ids = [...new Set(orders.map(order => order.bookingId).filter(Boolean))];
      const sortedIds = ids.sort();
      
      return sortedIds;
    } catch (err) {
      console.error('Error processing booking IDs:', err);
      setError('Failed to load booking IDs');
      return [];
    } finally {
      setIsLoadingOptions(false);
    }
  }, [orders]);

  const referenceIds = useMemo(() => {
    try {
      setIsLoadingOptions(true);
      setError(null);
      
      const refs = [...new Set(orders.map(order => order.shipmentId).filter(Boolean))];
      const sortedRefs = refs.sort();
      
      return sortedRefs;
    } catch (err) {
      console.error('Error processing reference IDs:', err);
      setError('Failed to load reference IDs');
      return [];
    } finally {
      setIsLoadingOptions(false);
    }
  }, [orders]);

  const renderField = (field) => {
    const { name, label, type = "text", options = [] } = field;
    
    // Determine if this is a dropdown field
    const isBookingIdDropdown = name === "bookingId";
    const isReferenceDropdown = name === "referenceNo";
    
    return (
      <div key={name} className="flex flex-col gap-1 w-56">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === "date" ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300",
                  !formValues[name] && "text-muted-foreground"
                )}
              >
                {formValues[name]
                  ? format(new Date(formValues[name]), "yyyy-MM-dd")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formValues[name] ? new Date(formValues[name]) : undefined}
                onSelect={(date) =>
                  setFormValues((prev) => ({ ...prev, [name]: date ? format(date, "yyyy-MM-dd") : "" }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : type === "select" ? (
          <Select
            value={formValues[name]}
            onValueChange={(value) => setFormValues((prev) => ({ ...prev, [name]: value }))}
          >
            <SelectTrigger className="w-full border border-gray-300">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) =>
                typeof option === "string" ? (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ) : (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        ) : isBookingIdDropdown ? (
          <ComboboxBookingId
            value={formValues[name] || ""}
            onChange={(value) => setFormValues((prev) => ({ ...prev, [name]: value }))}
            options={bookingIds}
            placeholder={label}
          />
        ) : isReferenceDropdown ? (
          <ComboboxBookingId
            value={formValues[name] || ""}
            onChange={(value) => setFormValues((prev) => ({ ...prev, [name]: value }))}
            options={referenceIds}
            placeholder={label}
          />
        ) : (
          <Input
            type={type}
            id={name}
            value={formValues[name] || ""}
            onChange={(e) => setFormValues((prev) => ({ ...prev, [name]: e.target.value }))}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        )}
      </div>
    );
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4 flex justify-between flex-wrap gap-4">
        <div className="flex flex-wrap items-end gap-3">
          {filterFields.map(renderField)}
          <Button
            className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 rounded-full"
            onClick={() => onSearch(formValues)}
          >
            Search
          </Button>
        </div>
        <div className="flex items-end gap-6 pr-2">
          <Search size={18} className="cursor-pointer text-gray-600 mb-1" />
          <LayoutGrid size={18} className="cursor-pointer text-gray-600 mb-1" />
          <FileText size={18} className="cursor-pointer text-gray-600 mb-1" />
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Reusable Order List Component ---
export default function OrderListWithActions({
  orders = [],
  filterFields = [],
  actionsConfig = {},
  onSearch = () => {},
  onDownload = () => {},
  onDownloadLR = () => {},
  onDownloadEPOD = () => {},

  orderType = 'active'
}) {
  const [formValues, setFormValues] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // --- Modal open helpers ---
  const openModal = (order, type) => {
    setSelectedOrder(order);
    setModalType(type);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
    setModalType(null);
  };

  const ORDERS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE);


  const allSelected = paginatedOrders.length > 0 && paginatedOrders.every(order => selectedOrders.includes(order.id || order.bookingId));

  // Handler: toggle all
  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(order => order.id || order.bookingId));
    }
  };

  // Handler: toggle one
  const handleToggleOne = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Handler: download selected
  const handleDownloadSelected = () => {
    const selected = paginatedOrders.filter(order => selectedOrders.includes(order.id || order.bookingId));
    onDownload(selected);
  };

  // --- Render order card/row ---
  const renderOrderCard = (order, idx) => {
    const statusStep = getStatusStep(order);
    const statusColor = statusColorMap[order.status] || statusColorMap.default;
    const statusIcon = statusIconMap[order.status] || statusIconMap.default;

    // Info blocks config
    const infoBlocks = [
      {
        key: 'from',
        value: order.from,
        label: order.fromDate,
        icon: <MapPin className="w-4 h-4 text-[#006397]" />,
      },
      {
        key: 'to',
        value: order.to,
        label: order.toDate,
        icon: <MapPin className="w-4 h-4 text-[#006397]" />,
      },
      {
        key: 'date',
        value: orderType === 'pending' || orderType === 'done' ? order.deliveryDate : order.eta,
        label: orderType === 'pending' || orderType === 'done' ? 'Delivery Date' : 'ETA',
        icon: null,
      },
      {
        key: 'custRef',
        value: order.shipmentId,
        label: 'Cust Ref',
        icon: null,
      },
      {
        key: 'customer',
        value: order.customerName || "not found",
        label: 'Customer',
        icon: null,
      },
    ];

    // Action buttons config
    const actionButtons = [
      { key: 'view', icon: Eye, handler: () => openModal(order, 'view'), show: actionsConfig.view, title: 'View' },
      { key: 'status', icon: FileText, handler: () => openModal(order, 'status'), show: actionsConfig.status, title: 'Status View' },
      { key: 'liveTrack', icon: MapPin, handler: () => openModal(order, 'liveTrack'), show: actionsConfig.liveTrack, title: 'Live Track' },
      { key: 'manageDocs', icon: FileText, handler: () => openModal(order, 'manageDocs'), show: actionsConfig.manageDocs, title: 'Manage Documents' },
      { key: 'download', icon: Download, handler: () => onDownload(order), show: actionsConfig.download, title: 'Download ePOD' },
      { key: 'lrReport', icon: FileText, handler: () => onDownloadLR(order), show: actionsConfig.lrReport, title: 'Download LR Report' },
    ];

    return (
      <div
        key={order.id}
        className={"relative flex bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all mb-4 overflow-hidden"}
      >
        {/* Left colored status bar */}
        <div className={["w-2 md:w-3", statusColor, "flex-shrink-0"].join(" ")} />
        {/* Main content */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between px-8 py-10"> 
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            {/* Top Row: Booking ID, Status */}
            <div className="flex flex-wrap items-center gap-6 mb-1">
              <div className="flex items-center gap-2 min-w-[180px]">
                <FolderOpen className="w-6 h-6 text-[#006397]" />
                <span className="text-lg font-bold text-[#006397] cursor-pointer hover:underline">Booking ID : #{order.bookingId}</span>
              </div>
              <span className={["flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white", statusColor].join(" ")}>{statusIcon}{order.status}</span>
            </div>
            <div className="flex flex-row items-start gap-12 mt-1">
              <div className="flex flex-row items-start min-w-[320px] gap-4">
                {/* From, Arrow, To */}
                {infoBlocks.slice(0, 2).map((block, idx) => (
                  <React.Fragment key={block.key}>
                    <div className="flex flex-col min-w-[120px]">
                      <span className="text-base font-semibold text-gray-700 flex items-center gap-1">{block.icon}{block.value}</span>
                      <span className="text-xs text-gray-400 pt-1">{block.label}</span>
                    </div>
                    {idx === 0 && (
                      <span className="flex items-center pt-0.5"><ArrowRight className="w-7 h-7 text-[#006397]" /></span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* Date and Cust Ref */}
              {infoBlocks.slice(2).map((block) => (
                <div key={block.key} className="flex flex-col min-w-[120px]">
                  <span className="text-lg font-bold text-[#006397] flex items-center gap-1">{block.icon}{block.value}</span>
                  <span className="text-xs text-gray-500 pt-1">{block.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center justify-end mt-4 flex-wrap">
            {actionsConfig.checkbox && (
              <div className="flex items-center mr-3">
                <Checkbox
                  checked={selectedOrders.includes(order.id || order.bookingId)}
                  onCheckedChange={() => handleToggleOne(order.id || order.bookingId)}
                  className="rounded-full size-6 shadow-md border-2 border-[#006397] data-[state=checked]:bg-[#006397] data-[state=checked]:text-white flex items-center justify-center"
                />
              </div>
            )}
            
            {/* Primary Action Buttons */}
            {actionButtons.filter(btn => btn.show && ['view', 'status', 'liveTrack'].includes(btn.key)).map(btn => (
              <button
                key={btn.key}
                onClick={btn.handler}
                title={btn.title}
                className="bg-[#006397] hover:bg-[#02abf5] text-white px-3 py-2 rounded-full transition-colors font-semibold flex items-center gap-1"
                style={{ fontSize: 12 }}
              >
                <btn.icon className="w-4 h-4" />
                <span className="font-medium">{btn.title}</span>
              </button>
            ))}
            
            {/* Dropdown for Secondary Actions */}
            {actionButtons.filter(btn => btn.show && !['view', 'status', 'liveTrack'].includes(btn.key)).length > 0 && (
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="bg-[#006397] hover:bg-[#02abf5] text-white p-2 rounded-full transition-colors font-semibold"
                      style={{ fontSize: 12 }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2" align="end">
                    <div className="flex flex-col gap-1">
                      {actionButtons.filter(btn => btn.show && !['view', 'status', 'liveTrack'].includes(btn.key)).map(btn => (
                        <button
                          key={btn.key}
                          onClick={btn.handler}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <btn.icon className="w-4 h-4" />
                          <span>{btn.title}</span>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderModalContent = () => {
    if (!selectedOrder) return null;
    if (modalType === 'view') {
      return (
        <OrderViewModal open={true} onClose={closeModal} order={selectedOrder} />
      );
    }
    if (modalType === 'status') {
      return (
        <OrderStatusModal open={true} onClose={closeModal} order={selectedOrder} />
      );
    }
    if (modalType === 'manageDocs') {
      return (
        <OrderDocumentsModal open={true} onClose={closeModal} order={selectedOrder} />
      );
    }
    if (modalType === 'liveTrack') {
      return (
        <TripDetailsModal open={true} onClose={closeModal} shipment={selectedOrder} />
      );
    }
    return null;
  };
  

  return (
    <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white">
      {/* Filter Tab as Card Header */}
      <div className="bg-gray-50 px-8 py-4 rounded-t-2xl flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full">
          <FilterTab filterFields={filterFields} formValues={formValues} setFormValues={setFormValues} onSearch={onSearch} orders={orders} />
        </div>
      </div>
      {/* Subtle divider (shadow) */}
      <div className="h-2 bg-gradient-to-b from-gray-100 to-transparent w-full" />
      {/* Order List and Pagination as Card Content */}
      <CardContent className="bg-white pt-2 pb-6 px-8 rounded-b-2xl">
        {actionsConfig.checkbox && (
          <div className="flex items-center justify-end gap-4 mb-4">
            <Checkbox
              checked={allSelected}
              onCheckedChange={handleToggleAll}
              className="rounded-full size-7 shadow-md border-2 border-[#006397] data-[state=checked]:bg-[#006397] data-[state=checked]:text-white flex items-center justify-center"
            />
            <Button
              onClick={handleDownloadSelected}
              className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 rounded-full"
              disabled={selectedOrders.length === 0}
            >
              Download
            </Button>
          </div>
        )}
        <div>
          {paginatedOrders.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No orders found.</div>
          ) : (
            paginatedOrders.map(renderOrderCard)
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * ORDERS_PER_PAGE + 1} to {Math.min(currentPage * ORDERS_PER_PAGE, orders.length)} of {orders.length} results
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setCurrentPage(p => Math.max(1, p - 1));
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        {/* Modals */}
        {modalOpen && renderModalContent()}
      </CardContent>
    </div>
  );
} 

// --- Modal Components ---
function renderKeyValueGrid(fields, columns = 4) {
  if (!fields) return <div className="text-gray-400">No data</div>;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
      {Object.entries(fields).map(([label, value]) => (
        <div key={label} className="md:col-span-1">
          <div className="text-sm font-semibold text-[#162d56] mb-1">{label}</div>
          <div className="text-base text-gray-500">{value}</div>
        </div>
      ))}
    </div>
  );
}


function FilteredTable({ data, title }) {
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const rows = Array.isArray(data) ? data : [data];
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  
  // Filter rows based on search term
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    return rows.filter(row => 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [rows, searchTerm]);
  
  // Pagination
  const totalPages = Math.ceil(filteredRows.length / displayCount);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * displayCount,
    currentPage * displayCount
  );
  
  return (
    <Card className="bg-white rounded-xl shadow border p-6">
      <CardHeader className="p-0 border-b pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-[#0088d2]">{title}</CardTitle>
          
          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="pl-10 w-48 border border-gray-300 rounded-md h-8 text-sm"
                />
              </div>
            </div>
            
            {/* Display Count */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Display</label>
              <Select
                value={displayCount.toString()}
                onValueChange={(value) => {
                  setDisplayCount(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">records</span>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="h-8 w-8 p-0"
              >
                {"<"}
              </Button>
              <span className="text-sm text-gray-600">
                {currentPage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="h-8 w-8 p-0"
              >
                {">"}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, idx) => (
                <TableHead key={header} className={`text-[#006397] text-left text-sm font-semibold px-6 py-3 ${idx !== 0 ? 'border-l border-gray-300' : ''}`}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  {headers.map((header, idx) => (
                    <TableCell key={idx} className="px-6 py-3">
                      {row[header] ?? ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center py-6 text-gray-500">
                  {searchTerm ? "No results found for your search." : "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function renderTable(data) {
  return <FilteredTable data={data} />;
}

function renderAccordionSection({ section, fields, order }) {
  if (section === "Routing Details") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(fields).map(([cardTitle, cardFields]) => (
          <Card key={cardTitle} className="bg-white rounded-xl shadow border p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold mb-4 border-b pb-2 text-[#0088d2]">{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {renderKeyValueGrid(cardFields, 2)}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  

  return renderKeyValueGrid(fields, 4);
}

function OrderViewModal({ open, onClose, order }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[70rem] p-0 max-h-[90vh] flex flex-col">
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">Order Details</DialogTitle>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <Accordion type="single" className="mb-6" defaultValue="Booking Info">
            <AccordionItem value="Booking Info">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Booking Info</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderKeyValueGrid(order.bookingInfo, 4)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Reference Details">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Reference Details</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderTable(order.referenceDetails, "Reference Details")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Routing Details">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Routing Details</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderAccordionSection({ section: "Routing Details", fields: order.routingDetails, order })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Cargo Details">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Cargo Details</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderTable(order.cargoDetails, "Cargo Details")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Involved Parties">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Involved Parties</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderTable(order.involvedParties, "Involved Parties")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatusTimeline({ statusHistory }) {
  if (!statusHistory || statusHistory.length === 0) {
    return <div className="text-gray-400 text-center py-8">No status history available.</div>;
  }
  return (
    <ol className="relative border-l-2 border-blue-200 ml-4">
      {statusHistory.map((event, idx) => (
        <li key={idx} className="mb-8 ml-6 flex flex-col gap-1">
          <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-8 ring-white">
            <Clock className="w-5 h-5 text-blue-600" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-blue-800 text-lg">{event.status || event.Status}</span>
            <span className="text-sm text-gray-500 font-medium">{event.time || event.Time}</span>
            <span className="text-base text-gray-400 font-medium">{event.location || event.Location}</span>
            {event.stopId || event.StopID ? (
              <span className="text-base text-gray-700 font-semibold">Stop ID: <span className="font-mono">{event.stopId || event.StopID}</span>{event.stopType || event.StopType ? `  (Type: ${event.stopType || event.StopType})` : ""}</span>
            ) : null}
            {event.comments || event.Comments ? (
              <span className="text-base text-gray-700 italic font-semibold">{event.comments || event.Comments}</span>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

function OrderStatusModal({ open, onClose, order }) {
  const [search, setSearch] = React.useState("");
  const statusHistory = order.statusHistory || [];
  const filteredHistory = search
    ? statusHistory.filter(event =>
        Object.values(event).some(val =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
    : statusHistory;
  const distance = order.distance || "0 miles";
  const duration = order.duration || "Not Found!";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">Status View{order?.bookingId ? ` : ${order.bookingId}` : ""}</DialogTitle>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {/* Est. Distance & Duration */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <div className="text-base font-semibold text-gray-700">
              <span className="text-gray-500">Est. Distance:</span> {distance}
            </div>
            <div className="text-base font-semibold text-gray-700">
              <span className="text-gray-500">Est. Duration:</span> {duration}
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 rounded-full px-4 py-1 w-64 text-sm h-8 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
          <StatusTimeline statusHistory={filteredHistory} />
        </div>
        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 rounded-b-lg">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OrderDocumentsModal({ open, onClose, order }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[70rem] p-0 max-h-[90vh]">

        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">Manage Documents</DialogTitle>
        </div>

        <div className="p-6 overflow-auto">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FileTextIcon className="w-5 h-5 text-blue-700" /> Attached Documents
          </div>


          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#02abf5] text-white hover:bg-[#02abf5]">
                    <TableHead className="p-3 text-left text-white">S.No</TableHead>
                    <TableHead className="p-3 text-left text-white">Location</TableHead>
                    <TableHead className="p-3 text-left text-white">Doc Type</TableHead>
                    <TableHead className="p-3 text-left text-white">Document</TableHead>
                    <TableHead className="p-3 text-left text-white">Stop ID</TableHead>
                    <TableHead className="p-3 text-left text-white">Stop Type</TableHead>
                    <TableHead className="p-3 text-left text-white">Created By</TableHead>
                    <TableHead className="p-3 text-left text-white">Time</TableHead>
                    <TableHead className="p-3 text-left text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(order.documents || []).map((doc, idx) => (
                    <TableRow key={idx} className="hover:bg-gray-50 border-b border-gray-100">
                      <TableCell className="p-3">{idx + 1}</TableCell>
                      <TableCell className="p-3">{doc.location}</TableCell>
                      <TableCell className="p-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                          {doc.docType}
                        </span>
                      </TableCell>
                      <TableCell className="p-3">
                        <Button variant="link" className="text-blue-700 px-0 py-0 h-auto min-w-0">
                          View
                        </Button>
                      </TableCell>
                      <TableCell className="p-3">{doc.stopId}</TableCell>
                      <TableCell className="p-3">
                        <span className={doc.stopType === 'P' ? 'bg-green-100 text-green-800 px-2 py-1 text-xs rounded' : 'bg-red-100 text-red-800 px-2 py-1 text-xs rounded'}>
                          {doc.stopType}
                        </span>
                      </TableCell>
                      <TableCell className="p-3">{doc.createdBy}</TableCell>
                      <TableCell className="p-3">{doc.time}</TableCell>
                      <TableCell className="p-3">
                        <Button variant="ghost" className="p-1">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>


            <div className="p-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-block bg-white border border-gray-300 rounded px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Choose Document
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => console.log(e.target.files)}
                />
                <Button className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 rounded-full">
                  Upload New Document
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 rounded-b-lg">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
 