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
import { Pencil, Trash2, Search, Package, Plus } from "lucide-react"

function OrdersTable({ orders, onDragStart }) {
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
                    {orders.map((order) => (
                        <TableRow
                            key={order.id}
                            className="hover:bg-muted/50 cursor-grab active:cursor-grabbing transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, order)}
                            onDragEnd={(e) => e.target.classList.remove('opacity-50')}
                        >
                            <TableCell className="font-medium flex items-center gap-2 text-sm text-gray-600">
                                <Package className="w-3 h-3 text-blue-500" />
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/shipmentData.json')
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

    const filteredOrders = data.orders.filter((order) =>
        order.id.includes(searchTerm)
    )

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

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground font-medium">Loading shipment data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f5f7fc] p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Shipment Planning</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="w-full bg-white border shadow-sm lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-semibold">Orders Management</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 py-4">
                            <Tabs defaultValue="total">
                                <TabsList className="mb-6 w-full justify-start">
                                    <TabsTrigger value="total">TOTAL ORDERS</TabsTrigger>
                                    <TabsTrigger value="customer">BY CUSTOMER ORDERS</TabsTrigger>
                                    <TabsTrigger value="range">BY RANGE ORDERS</TabsTrigger>
                                </TabsList>

                                <TabsContent value="total">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Input
                                            placeholder="Search Order ID..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                    </div>
                                    <OrdersTable orders={filteredOrders} onDragStart={handleDragStart} />
                                </TabsContent>

                                <TabsContent value="customer">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Button variant="outline" size="icon">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                                            <SelectTrigger className="w-48 text-sm">
                                                <SelectValue placeholder="Select Customer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="customer1">Customer 1</SelectItem>
                                                <SelectItem value="customer2">Customer 2</SelectItem>
                                                <SelectItem value="customer3">Customer 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <OrdersTable orders={getCustomerOrders()} onDragStart={handleDragStart} />
                                </TabsContent>

                                <TabsContent value="range">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Button variant="outline" size="icon">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        <Select onValueChange={setRangeValue} defaultValue="10">
                                            <SelectTrigger className="w-32 text-sm">
                                                <SelectValue placeholder="Select Range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="50">50</SelectItem>
                                                <SelectItem value="100">100</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <OrdersTable orders={filteredOrders} onDragStart={handleDragStart} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card className="w-full bg-white border shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-semibold">Shipment Route Map</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 py-4">
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

                <Card className="w-full bg-white border shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-semibold">Trips Management</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 px-6 py-4">
                        <Tabs defaultValue="total-trips">
                            <TabsList className="mb-6 w-full justify-start">
                                <TabsTrigger value="total-trips">TOTAL TRIPS</TabsTrigger>
                                <TabsTrigger value="customer-trips">BY CUSTOMER TRIPS</TabsTrigger>
                                <TabsTrigger value="carrier-trips">BY CARRIER TRIPS</TabsTrigger>
                                <TabsTrigger value="range-trips">BY RANGE TRIPS</TabsTrigger>
                                <TabsTrigger value="in-transit-trips">TOTAL IN-TRANSIT TRIPS</TabsTrigger>
                                <TabsTrigger value="customer-in-transit">BY CUSTOMER IN-TRANSIT TRIPS</TabsTrigger>
                                <TabsTrigger value="range-in-transit">BY RANGE IN-TRANSIT TRIPS</TabsTrigger>
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
                                            <SelectItem value="customer1">Customer 1</SelectItem>
                                            <SelectItem value="customer2">Customer 2</SelectItem>
                                            <SelectItem value="customer3">Customer 3</SelectItem>
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
                                            <SelectItem value="carrier1">Carrier 1</SelectItem>
                                            <SelectItem value="carrier2">Carrier 2</SelectItem>
                                            <SelectItem value="carrier3">Carrier 3</SelectItem>
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
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                            <SelectItem value="150">150</SelectItem>
                                            <SelectItem value="200">200</SelectItem>
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
                                            <SelectItem value="customer1">Customer 1</SelectItem>
                                            <SelectItem value="customer2">Customer 2</SelectItem>
                                            <SelectItem value="customer3">Customer 3</SelectItem>
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
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                            <SelectItem value="150">150</SelectItem>
                                            <SelectItem value="200">200</SelectItem>
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

                <Card className="w-full bg-white border shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-semibold">Planned Orders</CardTitle>
                            <Button variant="outline" size="sm">
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit Order
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-6 py-4">
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
