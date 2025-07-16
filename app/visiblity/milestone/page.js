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
  const [selectedStates, setSelectedStates] = useState({}) // Track selected state for each shipment

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

  // Get current state for a shipment (default to first pickup if not selected)
  const getCurrentState = (shipmentId) => {
    return selectedStates[shipmentId] || 'pickup'
  }

  // Handle state switching
  const switchState = (shipmentId, newState) => {
    setSelectedStates(prev => ({
      ...prev,
      [shipmentId]: newState
    }))
  }

  // Get orders filtered by current state
  const getFilteredOrders = (shipment, state) => {
    if (state === 'pickup') {
      return shipment.orders.filter(order => order.type === 'P')
    } else if (state === 'drop') {
      return shipment.orders.filter(order => order.type === 'D')
    }
    return shipment.orders
  }

  // Get individual orders filtered by current state
  const getFilteredIndividualOrders = (shipment, state) => {
    const filteredOrders = getFilteredOrders(shipment, state)
    return filteredOrders.filter(order => !order.orderId.includes(','))
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500'
      case 'In-Transit':
      case 'Picked up':
      case 'Started':
        return 'bg-blue-500'
      case 'NOT STARTED':
      case 'New':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  // Get dynamic status based on current state and order status
  const getDynamicStatus = (order, currentState) => {
    // Normalize status for easier comparison
    const status = (order.status || '').toUpperCase();
    // For pickup orders
    if (currentState === 'pickup' && order.type === 'P') {
      if (status === 'PICKED UP' || status === 'COMPLETED') {
        return 'Picked up';
      } else if (status === 'IN-TRANSIT' || status === 'STARTED') {
        return 'In-Transit';
      } else if (status === 'NOT STARTED' || status === 'NEW') {
        return 'NOT STARTED';
      } else {
        return order.status;
      }
    }
    // For drop orders
    if (currentState === 'drop' && order.type === 'D') {
      if (status === 'DELIVERED' || status === 'COMPLETED') {
        return 'Delivered';
      } else if (status === 'IN-TRANSIT' || status === 'STARTED') {
        return 'In-Transit';
      } else if (status === 'NOT STARTED' || status === 'NEW') {
        return 'NOT STARTED';
      } else {
        return order.status;
      }
    }
    return order.status;
  }

  // Get status text color
  const getStatusTextColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'In-Transit':
      case 'Picked up':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'NOT STARTED':
      case 'New':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Route visualization component
  const RouteVisualizer = ({ route, shipmentId, onStateClick, currentState }) => {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4 overflow-x-auto">
          {route.segments.map((segment, index) => {
            // Use the actual segment status from JSON data
            let dynamicStatus = segment.status

            return (
              <div key={segment.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => onStateClick(shipmentId, segment.type)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getStatusColor(dynamicStatus)} hover:scale-110 transition-transform cursor-pointer`}
                    title={`Click to view ${segment.type} details`}
                  >
                    #{segment.id}
                  </button>
                  <div className="text-xs text-gray-600 mt-1">{segment.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{dynamicStatus}</div>
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
            )
          })}
        </div>
      </div>
    )
  }

    // Order details table component
  const OrderDetailsTable = ({ orders, type = 'mixed', currentState = null }) => {
    const headers = type === 'mixed' 
      ? ['Actions', 'S.No', 'Order ID', 'Request ID / Job ID', 'Location', 'Address', 'Type', 'Start DT', 'End DT', 'Weight', 'Volume', 'Status', 'Total Units', 'Updated Units']
      : ['Actions', 'S.No', 'Order ID', 'Material', 'Type', 'Source', 'Destination', 'Start Dt.', 'End Dt.', 'Weight', 'Volume']

    return (
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#02abf5] text-white hover:bg-[#02abf5]">
              {headers.map((header, index) => (
                <TableHead key={index} className="text-white font-medium">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} className="hover:bg-gray-50 border-b border-gray-100">
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
                      <Badge className={order.type === 'P' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
                        {order.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.startDT}</TableCell>
                    <TableCell>{order.endDT}</TableCell>
                    <TableCell>{order.weight}</TableCell>
                    <TableCell>{order.volume}</TableCell>
                    <TableCell>
                      <Badge className={getStatusTextColor(currentState ? getDynamicStatus(order, currentState) : order.status)}>
                        {currentState ? getDynamicStatus(order, currentState) : order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.totalUnits}</TableCell>
                    <TableCell>{order.updatedUnits}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{order.material}</TableCell>
                    <TableCell>
                      <Badge className={order.type === 'P' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
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

  // State switcher component
  const StateSwitcher = ({ shipment }) => {
    const currentState = getCurrentState(shipment.id)
    const hasPickup = shipment.orders.some(order => order.type === 'P')
    const hasDrop = shipment.orders.some(order => order.type === 'D')

    return (
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm font-medium text-gray-700">Current State:</span>
        {hasPickup && (
          <Button
            variant={currentState === 'pickup' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchState(shipment.id, 'pickup')}
            className={currentState === 'pickup' ? 'bg-[#006397] hover:bg-[#006397]' : ''}
          >
            Pickup
          </Button>
        )}
        {hasDrop && (
          <Button
            variant={currentState === 'drop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchState(shipment.id, 'drop')}
            className={currentState === 'drop' ? 'bg-[#006397] hover:bg-[#006397]' : ''}
          >
            Drop
          </Button>
        )}
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
                  <p className="text-sm">
                    {shipment.route.segments.reduce((total, segment) => {
                      const distance = parseFloat(segment.distance.replace(/[^\d.]/g, '')) || 0
                      return total + distance
                    }, 0).toFixed(1)} mi total distance
                  </p>
                  <p className="text-sm">
                    {shipment.route.segments.reduce((total, segment) => {
                      const duration = segment.duration || '0 mins'
                      const hours = duration.match(/(\d+)\s*hours?/)?.[1] || 0
                      const mins = duration.match(/(\d+)\s*mins?/)?.[1] || 0
                      return total + parseInt(hours) * 60 + parseInt(mins)
                    }, 0)} mins total duration
                  </p>
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
              <TableRow className="bg-[#006397] text-white hover:bg-[#006397]">
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
                  <TableRow className="hover:bg-gray-50 border-b border-gray-200">
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
                  <TableRow className="hover:bg-transparent border-b border-gray-200">
                    <TableCell colSpan={11} className="p-0">
                      <div className="p-4 bg-gray-50 border-l-4 border-blue-500">
                        <RouteVisualizer 
                          route={shipment.route} 
                          shipmentId={shipment.id}
                          currentState={getCurrentState(shipment.id)}
                          onStateClick={(shipmentId, stateType) => {
                            const newState = stateType === 'pickup' ? 'pickup' : 'drop'
                            switchState(shipmentId, newState)
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Details */}
                  {expandedRows.has(shipment.id) && (
                    <TableRow className="hover:bg-transparent border-b-2 border-gray-300">
                      <TableCell colSpan={11} className="p-0">
                                                <div className="p-6 bg-gray-50 border-l-4 border-[#006397]">
                          <div className="mb-4 pb-3 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-[#006397]">Shipment: {shipment.id}</h2>
                            <p className="text-sm text-gray-600">{shipment.source} → {shipment.destination}</p>
                          </div>
                          
                          {/* State Switcher */}
                          <StateSwitcher shipment={shipment} />
                          
                          <Tabs defaultValue="orders" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="orders">Order Details</TabsTrigger>
                              <TabsTrigger value="optimization">Route Optimization</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="orders" className="space-y-6">
                              {/* Order Summary Table - Always shows pickup data */}
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-lg font-semibold mb-3 text-[#006397]">Order Summary</h3>
                                <OrderDetailsTable 
                                  orders={shipment.orders.filter(order => order.type === 'P' && (order.orderId.includes(',') || !shipment.orders.some(o => o.type === 'P' && o.orderId.includes(','))))} 
                                  type="mixed" 
                                  currentState={getCurrentState(shipment.id)}
                                />
                              </div>

                              {/* Individual Orders Table - Shows data based on current state */}
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-lg font-semibold mb-3 text-[#006397]">
                                  Individual {getCurrentState(shipment.id) === 'pickup' ? 'Pickup' : 'Drop'} Details
                                </h3>
                                <OrderDetailsTable 
                                  orders={getFilteredIndividualOrders(shipment, getCurrentState(shipment.id))} 
                                  type="individual" 
                                  currentState={getCurrentState(shipment.id)}
                                />
                              </div>

                              {/* Drop Details Table - Always shows drop data */}
                              {shipment.orders.some(order => order.type === 'D') && (
                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                  <h3 className="text-lg font-semibold mb-3 text-[#006397]">Drop Details</h3>
                                  <OrderDetailsTable 
                                    orders={shipment.orders.filter(order => order.type === 'D')} 
                                    type="mixed" 
                                    currentState={getCurrentState(shipment.id)}
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
