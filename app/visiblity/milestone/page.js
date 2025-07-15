"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Truck, Search, RefreshCw, Plus, MoreVertical, CheckCircle, Clock, MapPin, Package, Calendar, User, Building, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination'

export default function ShipmentVisibility() {
  const [shipments, setShipments] = useState([])
  const [expandedRows, setExpandedRows] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Fetch data from JSON file (simulating API call)
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch('/shipmentVisibility.json')
        const data = await response.json()
        setShipments(data.shipments)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching shipments:', error)
        setLoading(false)
      }
    }

    fetchShipments()
  }, [])

  // Toggle row expansion
  const toggleRow = (shipmentId) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(shipmentId)) {
      newExpanded.delete(shipmentId)
    } else {
      newExpanded.add(shipmentId)
    }
    setExpandedRows(newExpanded)
  }

  // Filter shipments based on search term
  const filteredShipments = shipments.filter(shipment =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalItems = filteredShipments.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentShipments = filteredShipments.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500'
      case 'In-Transit':
      case 'Picked up':
        return 'bg-blue-500'
      case 'NOT STARTED':
      case 'New':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  // Get status text color
  const getStatusTextColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600'
      case 'In-Transit':
      case 'Picked up':
        return 'text-blue-600'
      case 'NOT STARTED':
      case 'New':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  // Route visualization component
  const RouteVisualizer = ({ route }) => {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4 overflow-x-auto">
          {route.segments.map((segment, index) => (
            <div key={segment.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getStatusColor(segment.status)}`}>
                  #{segment.id}
                </div>
                <div className="text-xs text-gray-600 mt-1">{segment.label}</div>
              </div>
              
              {index < route.segments.length - 1 && (
                <div className="flex items-center mx-2">
                  <div className="h-0.5 w-16 bg-gray-300"></div>
                  <div className="text-xs text-gray-500 mx-2">
                    {route.segments[index].distance}
                    <br />
                    {route.segments[index].duration}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Order details table component
  const OrderDetailsTable = ({ orders, type = 'mixed' }) => {
    const headers = type === 'mixed' 
      ? ['Actions', 'S.No', 'Order ID', 'Request ID / Job ID', 'Location', 'Address', 'Type', 'Start DT', 'End DT', 'Weight', 'Volume', 'Status', 'Total Units', 'Updated Units']
      : ['Actions', 'S.No', 'Order ID', 'Material', 'Type', 'Source', 'Destination', 'Start Dt.', 'End Dt.', 'Weight', 'Volume']

    return (
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-600 text-white hover:bg-blue-600">
              {headers.map((header, index) => (
                <TableHead key={index} className="text-white font-medium">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
                                <TableRow key={index} className="hover:bg-transparent">
                <TableCell>
                  <Button variant="outline" size="sm" className="text-xs">
                    Status History
                  </Button>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                {type === 'mixed' ? (
                  <>
                    <TableCell>{order.requestId}</TableCell>
                    <TableCell>{order.location}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>
                      <Badge variant={order.type === 'P' ? 'default' : 'secondary'}>
                        {order.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.startDT}</TableCell>
                    <TableCell>{order.endDT}</TableCell>
                    <TableCell>{order.weight}</TableCell>
                    <TableCell>{order.volume}</TableCell>
                    <TableCell>
                      <Badge className={getStatusTextColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.totalUnits}</TableCell>
                    <TableCell>{order.updatedUnits}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{order.material}</TableCell>
                    <TableCell>
                      <Badge variant={order.type === 'P' ? 'default' : 'secondary'}>
                        {order.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.source}</TableCell>
                    <TableCell>{order.destination}</TableCell>
                    <TableCell>{order.startDT}</TableCell>
                    <TableCell>{order.endDT}</TableCell>
                    <TableCell>{order.weight}</TableCell>
                    <TableCell>{order.volume}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // Route optimization component
  const RouteOptimization = ({ shipment }) => {
    return (
      <Card className="mt-6 border-0 shadow-sm">
        <CardHeader className="bg-blue-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Route Optimization</CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Route Progress */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              {shipment.route.segments.map((segment, index) => (
                <div key={segment.id} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {segment.id}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {segment.location} - {segment.type === 'pickup' ? 'P' : 'D'};
                  </span>
                  {index < shipment.route.segments.length - 1 && (
                    <div className="h-0.5 w-8 bg-gray-300 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Current Route</h3>
              <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p>Map View - Current Route</p>
                  <p className="text-sm">1501.91 Kilometers (1501912 Meters)</p>
                  <p className="text-sm">14 Hr 47 Mins 41 Sec (49601 Sec)</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Optimized Route</h3>
              <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p>Map View - Optimized Route</p>
                  <p className="text-sm">Use ctrl + scroll to zoom the map</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shipment Visibility</h1>
          <p className="text-gray-600">Track and manage your shipments in real-time</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Toggle Columns
          </Button>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search shipments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Shipment
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 text-white hover:bg-blue-600">
                <TableHead className="text-white">Actions</TableHead>
                <TableHead className="text-white">Id</TableHead>
                <TableHead className="text-white">Source</TableHead>
                <TableHead className="text-white">Destination</TableHead>
                <TableHead className="text-white">Start DT</TableHead>
                <TableHead className="text-white">End DT</TableHead>
                <TableHead className="text-white">Customer</TableHead>
                <TableHead className="text-white">Carrier</TableHead>
                <TableHead className="text-white">SCAC</TableHead>
                <TableHead className="text-white">Driver</TableHead>
                <TableHead className="text-white">Vehicle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentShipments.map((shipment) => (
                <React.Fragment key={shipment.id}>
                  <TableRow className="hover:bg-transparent">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRow(shipment.id)}
                        >
                          {expandedRows.has(shipment.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{shipment.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>{shipment.source}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>{shipment.startDT}</TableCell>
                    <TableCell>{shipment.endDT}</TableCell>
                    <TableCell>{shipment.customer}</TableCell>
                    <TableCell>{shipment.carrier}</TableCell>
                    <TableCell>{shipment.scac}</TableCell>
                    <TableCell>{shipment.driver}</TableCell>
                    <TableCell>{shipment.vehicle}</TableCell>
                  </TableRow>

                  {/* Route Status Row */}
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={11} className="p-0">
                      <div className="p-4 bg-gray-50">
                        <RouteVisualizer route={shipment.route} />
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Details */}
                  {expandedRows.has(shipment.id) && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={11} className="p-0">
                        <div className="p-6 bg-white border-t">
                          <Tabs defaultValue="orders" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="orders">Order Details</TabsTrigger>
                              <TabsTrigger value="optimization">Route Optimization</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="orders" className="space-y-4">
                              {/* Mixed Orders Table */}
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                                <OrderDetailsTable 
                                  orders={shipment.orders.filter(order => order.type === 'P')} 
                                  type="mixed" 
                                />
                              </div>

                              {/* Individual Orders Table */}
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Individual Order Details</h3>
                                <OrderDetailsTable 
                                  orders={shipment.orders.filter(order => !order.orderId.includes(','))} 
                                  type="individual" 
                                />
                              </div>

                              {/* Drop Orders Table */}
                              {shipment.orders.some(order => order.type === 'D') && (
                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Drop Details</h3>
                                  <OrderDetailsTable 
                                    orders={shipment.orders.filter(order => order.type === 'D')} 
                                    type="mixed" 
                                  />
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="optimization">
                              <RouteOptimization shipment={shipment} />
                            </TabsContent>
                          </Tabs>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(Math.max(1, currentPage - 1))
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page)
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
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
