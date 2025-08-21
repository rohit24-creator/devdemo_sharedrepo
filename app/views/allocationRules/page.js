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
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil, Trash2, Search,  Plus, ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react"

function OrdersTable({ orders, onDragStart, sortConfig, onSort }) {
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

    return (
        <div className={`${orders.length > 6 ? 'h-[300px] overflow-y-auto' : ''}`}>
            <Table>
                <TableHeader className="sticky top-0 bg-muted">
                    <TableRow>
                        <TableHead className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            Actions
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('id')}
                        >
                            <div className="flex items-center gap-1">
                                Order ID
                                {getSortIcon('id')}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('source')}
                        >
                            <div className="flex items-center gap-1">
                                Source
                                {getSortIcon('source')}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('destination')}
                        >
                            <div className="flex items-center gap-1">
                                Destination
                                {getSortIcon('destination')}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('pickup')}
                        >
                            <div className="flex items-center gap-1">
                                Pickup Time
                                {getSortIcon('pickup')}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('weight')}
                        >
                            <div className="flex items-center gap-1">
                                Weight
                                {getSortIcon('weight')}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('volume')}
                        >
                            <div className="flex items-center gap-1">
                                Volume
                                {getSortIcon('volume')}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('quantity')}
                        >
                            <div className="flex items-center gap-1">
                                Quantity
                                {getSortIcon('quantity')}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('mode')}
                        >
                            <div className="flex items-center gap-1">
                                Mode
                                {getSortIcon('mode')}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleSort('status')}
                        >
                            <div className="flex items-center gap-1">
                                Status
                                {getSortIcon('status')}
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order.id}
                            className="hover:bg-muted/50 cursor-grab active:cursor-grabbing transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, order)}
                            onDragEnd={(e) => e.target.classList.remove('opacity-50')}
                        >
                            <TableCell className="text-sm text-gray-600">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            <TableCell className="font-medium flex items-center gap-2 text-sm text-gray-600">
                                {order.id}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{order.source}</TableCell>
                            <TableCell className="text-sm text-gray-600">{order.destination}</TableCell>
                            <TableCell className="text-sm text-gray-600">{order.pickup}</TableCell>
                            <TableCell className="text-sm text-gray-600">{order.weight}</TableCell>
                            <TableCell className="text-sm text-gray-600">{order.volume}</TableCell>
                            <TableCell className="text-sm text-gray-600">{order.quantity}</TableCell>
                            <TableCell className="text-sm text-gray-600">{order.mode}</TableCell>
                            <TableCell className="text-sm text-gray-600">{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function TripsTable({ trips, onDragOver, onDragLeave, onDrop, onDoubleClick, tripAssignments }) {
    return (
        <div className="h-[200px] overflow-y-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 bg-muted">
                    <TableRow>
                        <TableHead className="w-[100px] text-sm font-semibold text-gray-700">Trip ID</TableHead>
                        <TableHead className="w-[90px] text-sm font-semibold text-gray-700">Start Date</TableHead>
                        <TableHead className="w-[90px] text-sm font-semibold text-gray-700">End Date</TableHead>
                        <TableHead className="w-[100px] text-sm font-semibold text-gray-700">Source</TableHead>
                        <TableHead className="w-[100px] text-sm font-semibold text-gray-700">Destination</TableHead>
                        <TableHead className="w-[70px] text-sm font-semibold text-gray-700">Vehicle</TableHead>
                        <TableHead className="w-[90px] text-sm font-semibold text-gray-700">Driver</TableHead>
                        <TableHead className="w-[110px] text-sm font-semibold text-gray-700">Vehicle Type</TableHead>
                        <TableHead className="w-[60px] text-sm font-semibold text-gray-700">Mode</TableHead>
                        <TableHead className="w-[80px] text-sm font-semibold text-gray-700">Weight</TableHead>
                        <TableHead className="w-[80px] text-sm font-semibold text-gray-700">Volume</TableHead>
                        <TableHead className="w-[50px] text-sm font-semibold text-gray-700">Unit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trips.map((trip) => (
                        <TableRow
                            key={trip.id}
                            className="hover:bg-muted/50 cursor-pointer border-2 border-transparent transition-colors"
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={(e) => onDrop(e, trip)}
                            onDoubleClick={() => onDoubleClick(trip)}
                        >
                            <TableCell className="font-medium flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                {trip.id}
                                {tripAssignments[trip.id] && tripAssignments[trip.id].length > 0 && (
                                    <Badge variant="secondary" className="ml-2 text-sm text-gray-600">
                                        {tripAssignments[trip.id].length}
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.startDate}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.endDate}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.source}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.destination}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.vehicle}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.driver}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.vehicleType}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.mode}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.weight}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.volume}</TableCell>
                            <TableCell className="text-sm text-gray-600">{trip.unit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function PlannedOrdersTable({ selectedTrip, assignedOrders }) {
    return (
        <div className="h-[200px] overflow-y-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 bg-muted">
                    <TableRow>
                        <TableHead className="w-[120px] text-sm font-semibold text-gray-700">Order ID</TableHead>
                        <TableHead className="w-[100px] text-sm font-semibold text-gray-700">Source</TableHead>
                        <TableHead className="w-[100px] text-sm font-semibold text-gray-700">Destination</TableHead>
                        <TableHead className="w-[140px] text-sm font-semibold text-gray-700">Pickup Time</TableHead>
                        <TableHead className="w-[80px] text-sm font-semibold text-gray-700">Weight</TableHead>
                        <TableHead className="w-[80px] text-sm font-semibold text-gray-700">Volume</TableHead>
                        <TableHead className="w-[70px] text-sm font-semibold text-gray-700">Quantity</TableHead>
                        <TableHead className="w-[60px] text-sm font-semibold text-gray-700">Mode</TableHead>
                        <TableHead className="w-[80px] text-sm font-semibold text-gray-700">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedTrip && assignedOrders.length > 0 ? (
                        assignedOrders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-muted/50">
                                <TableCell className="font-medium text-sm text-gray-600">{order.id}</TableCell>
                                <TableCell className="text-sm text-gray-600">{order.source}</TableCell>
                                <TableCell className="text-sm text-gray-600">{order.destination}</TableCell>
                                <TableCell className="text-sm text-gray-600">{order.pickup}</TableCell>
                                <TableCell className="text-sm text-gray-600">{order.weight}</TableCell>
                                <TableCell className="text-sm text-gray-600">{order.volume}</TableCell>
                                <TableCell className="text-sm text-gray-600">{order.quantity}</TableCell>
                                <TableCell className="text-sm text-gray-600">{order.mode}</TableCell>
                                <TableCell className="text-sm text-gray-600">{order.status}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center py-16">
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

    const handleDragStart = (e, order) => {
        e.dataTransfer.setData('application/json', JSON.stringify(order))
        e.target.classList.add('opacity-50')
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.currentTarget.classList.add('bg-blue-50', 'border-blue-300')
    }

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('bg-blue-50', 'border-blue-300')
    }

    const handleDrop = (e, trip) => {
        e.preventDefault()
        e.currentTarget.classList.remove('bg-blue-50', 'border-blue-300')
        try {
            const order = JSON.parse(e.dataTransfer.getData('application/json'))
            assignOrderToTrip(order, trip)
        } catch (error) {
            console.error('Error parsing dropped data:', error)
        }
    }

    const assignOrderToTrip = (order, trip) => {
        setTripAssignments(prev => ({
            ...prev,
            [trip.id]: [...(prev[trip.id] || []), order]
        }))
    }

    const handleTripDoubleClick = (trip) => {
        setSelectedTrip(trip)
    }

    // if (loading) {
    //     return (
    //         <div className="min-h-screen bg-background p-6 flex items-center justify-center">
    //             <div className="text-center">
    //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
    //                 <p className="text-muted-foreground font-medium">Loading shipment data...</p>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="min-h-screen bg-[#f5f7fc] p-6">
            <div className="w-full space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Shipment Planning</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="w-full bg-white lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-semibold">Orders Management</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 py-2">
                            <Tabs defaultValue="total">
                                <TabsList className=" w-full justify-start">
                                    <TabsTrigger value="total" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">TOTAL ORDERS</TabsTrigger>
                                    <TabsTrigger value="customer" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">BY CUSTOMER ORDERS</TabsTrigger>
                                    <TabsTrigger value="range" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">BY RANGE ORDERS</TabsTrigger>
                                </TabsList>

                                <TabsContent value="total">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="relative w-64">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 "/>
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
                                    <OrdersTable orders={filteredOrders} onDragStart={handleDragStart} sortConfig={sortConfig} onSort={handleSort} />
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
                                    <OrdersTable orders={getCustomerOrders()} onDragStart={handleDragStart} sortConfig={sortConfig} onSort={handleSort} />
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
                                    <OrdersTable orders={filteredOrders} onDragStart={handleDragStart} sortConfig={sortConfig} onSort={handleSort} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card className="w-full bg-white border">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-semibold">Shipment Route Map</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 py-2">
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
                        </CardContent>
                    </Card>
                </div>

                <Card className="w-full bg-white border">
                    <CardHeader className="">
                        <CardTitle className="text-2xl font-semibold">Trips Management</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 px-4 py-2">
                        <Tabs defaultValue="total-trips">
                            <TabsList className="mb-6 w-full justify-start">
                                <TabsTrigger value="total-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">TOTAL TRIPS</TabsTrigger>
                                <TabsTrigger value="customer-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">BY CUSTOMER TRIPS</TabsTrigger>
                                <TabsTrigger value="carrier-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">BY CARRIER TRIPS</TabsTrigger>
                                <TabsTrigger value="range-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">BY RANGE TRIPS</TabsTrigger>
                                <TabsTrigger value="in-transit-trips" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">TOTAL IN-TRANSIT TRIPS</TabsTrigger>
                                <TabsTrigger value="customer-in-transit" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">BY CUSTOMER IN-TRANSIT TRIPS</TabsTrigger>
                                <TabsTrigger value="range-in-transit" className="data-[state=active]:bg-[#006397] data-[state=active]:text-white data-[state=active]:border-[#006397] border border-gray-200">BY RANGE IN-TRANSIT TRIPS</TabsTrigger>
                            </TabsList>

                            <TabsContent value="total-trips">
                                <div className="flex items-center gap-3 mb-6">
                                    <Input
                                        placeholder="Search Trip ID..."
                                        className="w-64 text-sm"
                                    />
                                    <Button className="text-sm font-medium">
                                        <Search className="w-4 h-4 mr-2" />
                                        Search
                                    </Button>
                                    <Button variant="outline" size="icon" className="ml-auto">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <TripsTable
                                    trips={data.trips}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="customer-trips">
                                <div className="flex items-center gap-2 mb-4">
                                    <Button variant="outline" size="icon">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
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
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="carrier-trips">
                                <div className="flex items-center gap-2 mb-4">
                                    <Button variant="outline" size="icon">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
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
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="range-trips">
                                <div className="flex items-center gap-2 mb-4">
                                    <Button variant="outline" size="icon">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
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
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="in-transit-trips">
                                <div className="flex items-center gap-2 mb-4">
                                    <Button variant="outline" size="icon">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <TripsTable
                                    trips={getTripsForTab('in-transit-trips')}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="customer-in-transit">
                                <div className="flex items-center gap-2 mb-4">
                                    <Button variant="outline" size="icon">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
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
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onDoubleClick={handleTripDoubleClick}
                                    tripAssignments={tripAssignments}
                                />
                            </TabsContent>

                            <TabsContent value="range-in-transit">
                                <div className="flex items-center gap-2 mb-4">
                                    <Button variant="outline" size="icon">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
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
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
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
                            <Button variant="outline" size="sm">
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit Order
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-4 py-2">
                        <PlannedOrdersTable
                            selectedTrip={selectedTrip}
                            assignedOrders={selectedTrip ? getAssignedOrdersForTrip(selectedTrip.id) : []}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}