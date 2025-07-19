"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { ChevronDown, ChevronUp, Truck, Ship, Search, RefreshCw, Plus, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination'

// Constants for better maintainability
const CONSTANTS = {
  DEFAULT_ITEMS_PER_PAGE: 10,
  DEFAULT_STATE: 'pickup',
  DEFAULT_ROUTE: 0,
  STATUS_COLORS: {
    COMPLETED: 'bg-green-500',
    'In-Progress': 'bg-orange-500',
    'In-Transit': 'bg-blue-500',
    'Picked up': 'bg-blue-500',
    'Started': 'bg-blue-500',
    'NOT STARTED': 'bg-gray-500',
    'New': 'bg-gray-500',
    DEFAULT: 'bg-gray-500'
  },
  STATUS_TEXT_COLORS: {
    COMPLETED: 'bg-green-100 text-green-800 border-green-200',
    'Delivered': 'bg-green-100 text-green-800 border-green-200',
    'In-Progress': 'bg-orange-100 text-orange-800 border-orange-200',
    'In-Transit': 'bg-blue-100 text-blue-800 border-blue-200',
    'Picked up': 'bg-blue-100 text-blue-800 border-blue-200',
    'NOT STARTED': 'bg-gray-100 text-gray-800 border-gray-200',
    'New': 'bg-gray-100 text-gray-800 border-gray-200',
    DEFAULT: 'bg-gray-100 text-gray-800 border-gray-200'
  },
  VEHICLE_ICONS: {
    ship: Ship,
    truck: Truck,
    DEFAULT: Truck
  },
  SEARCH_FIELDS: ['id', 'source', 'destination', 'customer', 'driver']
}

// Custom hooks for better separation of concerns
const useShipments = () => {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch('/shipmentVisibility.json')
        const data = await response.json()
        setShipments(data.shipments)
      } catch (error) {
        console.error('Error fetching shipments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShipments()
  }, [])

  return { shipments, loading }
}

const usePagination = (filteredItems, itemsPerPage = CONSTANTS.DEFAULT_ITEMS_PER_PAGE) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalItems = filteredItems.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems,
    totalItems,
    goToPage,
    resetToFirstPage
  }
}

const useSearch = (items, searchFields = CONSTANTS.SEARCH_FIELDS) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items

    const lowerSearchTerm = searchTerm.toLowerCase()
    return items.filter(item =>
      searchFields.some(field => 
        item[field]?.toLowerCase().includes(lowerSearchTerm)
      )
    )
  }, [items, searchTerm, searchFields])

  return { searchTerm, setSearchTerm, filteredItems }
}

const useShipmentState = () => {
  const [selectedStates, setSelectedStates] = useState({})
  const [selectedRoutes, setSelectedRoutes] = useState({})

  const getCurrentState = useCallback((shipmentId) => {
    return selectedStates[shipmentId] || CONSTANTS.DEFAULT_STATE
  }, [selectedStates])

  const getCurrentRoute = useCallback((shipmentId) => {
    return selectedRoutes[shipmentId] || CONSTANTS.DEFAULT_ROUTE
  }, [selectedRoutes])

  const switchState = useCallback((shipmentId, newState) => {
    setSelectedStates(prev => ({ ...prev, [shipmentId]: newState }))
  }, [])

  const switchRoute = useCallback((shipmentId, routeIndex) => {
    setSelectedRoutes(prev => ({ ...prev, [shipmentId]: routeIndex }))
  }, [])

  return {
    getCurrentState,
    getCurrentRoute,
    switchState,
    switchRoute
  }
}

// Utility functions
const getStatusColor = (status) => {
  return CONSTANTS.STATUS_COLORS[status] || CONSTANTS.STATUS_COLORS.DEFAULT
}

const getStatusTextColor = (status) => {
  return CONSTANTS.STATUS_TEXT_COLORS[status] || CONSTANTS.STATUS_TEXT_COLORS.DEFAULT
}

const getVehicleIcon = (vehicleType) => {
  const IconComponent = CONSTANTS.VEHICLE_ICONS[vehicleType?.toLowerCase()] || CONSTANTS.VEHICLE_ICONS.DEFAULT
  return <IconComponent className="w-4 h-4 text-blue-600" />
}

// Route status calculation with memoization
const useRouteStatusCalculation = () => {
  const calculateRouteStatus = useCallback((shipment, segmentType, segmentLocation = null, segmentIndex = null) => {
    let segmentOrders = shipment.orders.filter(order => {
      if (segmentType === 'pickup') return order.type === 'P'
      if (segmentType === 'drop') return order.type === 'D'
      return false
    })

    if (segmentLocation) {
      segmentOrders = segmentOrders.filter(order => order.location === segmentLocation)
    }

    if (segmentOrders.length === 0) return 'NOT STARTED'

    // Flow safety checks
    if (segmentType === 'drop') {
      const pickupCompleted = checkPickupCompletion(shipment, segmentLocation)
      if (!pickupCompleted) return 'NOT STARTED'
    }

    if (segmentIndex !== null && segmentIndex > 0) {
      const previousRouteCompleted = checkPreviousRouteCompletion(shipment, segmentIndex)
      if (!previousRouteCompleted) return 'NOT STARTED'
    }

    const uniqueOrderIds = [...new Set(segmentOrders.map(order => order.orderId.split(',')[0]))]
    const orderStatuses = uniqueOrderIds.map(orderId => {
      const order = segmentOrders.find(o => o.orderId.startsWith(orderId))
      return order ? order.status : 'NOT STARTED'
    })

    const hasNotStarted = orderStatuses.some(status => 
      status === 'NOT STARTED' || status === 'New'
    )
    const hasInTransit = orderStatuses.some(status => 
      status === 'In-Transit' || status === 'Started'
    )
    const allCompleted = orderStatuses.every(status => {
      if (segmentType === 'pickup') {
        return status === 'Picked up' || status === 'COMPLETED'
      } else if (segmentType === 'drop') {
        return status === 'Delivered' || status === 'COMPLETED'
      }
      return false
    })

    if (allCompleted) return 'COMPLETED'
    if (hasInTransit) return 'In-Progress'
    if (hasNotStarted) return 'NOT STARTED'
    return 'In-Progress'
  }, [])

  const checkPickupCompletion = useCallback((shipment, dropLocation) => {
    const routeSegments = shipment.route.segments
    const dropSegment = routeSegments.find(segment => 
      segment.type === 'drop' && segment.location === dropLocation
    )
    
    if (!dropSegment) return true
    
    const pickupSegment = routeSegments.find(segment => 
      segment.type === 'pickup' && segment.id === dropSegment.id - 1
    )
    
    if (!pickupSegment) return true
    
    const pickupOrders = shipment.orders.filter(order => 
      order.type === 'P' && order.location === pickupSegment.location
    )
    
    if (pickupOrders.length === 0) return true
    
    const pickupStatuses = pickupOrders.map(order => order.status)
    return pickupStatuses.every(status => 
      status === 'Picked up' || status === 'COMPLETED'
    )
  }, [])

  const checkPreviousRouteCompletion = useCallback((shipment, currentSegmentIndex) => {
    const routeSegments = shipment.route.segments
    
    for (let routeIndex = 0; routeIndex < Math.floor(currentSegmentIndex / 2); routeIndex++) {
      const pickupSegmentIndex = routeIndex * 2
      const dropSegmentIndex = pickupSegmentIndex + 1
      
      const pickupStatus = calculateRouteStatus(shipment, 'pickup', routeSegments[pickupSegmentIndex].location, pickupSegmentIndex)
      const dropStatus = calculateRouteStatus(shipment, 'drop', routeSegments[dropSegmentIndex].location, dropSegmentIndex)
      
      if (pickupStatus !== 'COMPLETED' || dropStatus !== 'COMPLETED') {
        return false
      }
    }
    
    return true
  }, [calculateRouteStatus])

  return { calculateRouteStatus, checkPickupCompletion, checkPreviousRouteCompletion }
}

// Memoized components for better performance
const RouteVisualizer = React.memo(({ route, shipmentId, onStateClick, calculateRouteStatus }) => {
  const shipment = useMemo(() => 
    // This would come from context or props in a real app
    window.shipmentsData?.find(s => s.id === shipmentId), 
    [shipmentId]
  )

  if (!shipment) return null

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4 overflow-x-auto">
        {route.segments.map((segment, index) => {
          const calculatedStatus = calculateRouteStatus(shipment, segment.type, segment.location, index)
          
          const segmentOrders = shipment.orders.filter(order => 
            order.type === (segment.type === 'pickup' ? 'P' : 'D') && 
            order.location === segment.location
          )
          const orderCount = segmentOrders.length
          const dynamicLabel = segment.type === 'pickup' ? `P${orderCount}` : `D${orderCount}`

          return (
            <div key={segment.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onStateClick(shipmentId, segment.type)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getStatusColor(calculatedStatus)} hover:scale-110 transition-transform cursor-pointer`}
                  title={`Click to view ${segment.type} details`}
                >
                  #{segment.id}
                </button>
                <div className="text-xs text-gray-600 mt-1">{dynamicLabel}</div>
                <div className="text-xs text-gray-500 mt-1">{segment.location}</div>
                <div className="text-xs text-gray-400 mt-1">{calculatedStatus}</div>
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
})

const OrderDetailsTable = React.memo(({ orders, type = 'mixed' }) => {
  const headers = useMemo(() => 
    type === 'mixed' 
      ? ['Actions', 'S.No', 'Order ID', 'Request ID / Job ID', 'Location', 'Address', 'Type', 'Start DT', 'End DT', 'Weight', 'Volume', 'Status', 'Total Units', 'Updated Units']
      : ['Actions', 'S.No', 'Order ID', 'Material', 'Type', 'Source', 'Destination', 'Start Dt.', 'End Dt.', 'Weight', 'Volume'],
    [type]
  )

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
})

// Main component with optimized structure
export default function ShipmentVisibilityOptimized() {
  const { shipments, loading } = useShipments()
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(shipments)
  const { 
    currentPage, 
    totalPages, 
    startIndex, 
    endIndex, 
    currentItems, 
    totalItems, 
    goToPage, 
    resetToFirstPage 
  } = usePagination(filteredItems)
  const { getCurrentState, getCurrentRoute, switchState, switchRoute } = useShipmentState()
  const { calculateRouteStatus } = useRouteStatusCalculation()

  const [expandedRow, setExpandedRow] = useState(null)

  // Reset pagination when search changes
  useEffect(() => {
    resetToFirstPage()
  }, [searchTerm, resetToFirstPage])

  // Memoized handlers
  const toggleRow = useCallback((shipmentId) => {
    setExpandedRow(prev => prev === shipmentId ? null : shipmentId)
  }, [])

  const handleStateClick = useCallback((shipmentId, stateType) => {
    const newState = stateType === 'pickup' ? 'pickup' : 'drop'
    switchState(shipmentId, newState)
  }, [switchState])

  // Memoized filtered orders function
  const getFilteredOrders = useCallback((shipment, state) => {
    const currentRoute = getCurrentRoute(shipment.id)
    const routeSegments = shipment.route.segments
    
    if (routeSegments.length > 2) {
      const routeStart = currentRoute * 2
      const routeEnd = routeStart + 2
      const currentRouteSegments = routeSegments.slice(routeStart, routeEnd)
      const routeLocations = currentRouteSegments.map(segment => segment.location)
      
      return shipment.orders.filter(order => {
        if (state === 'pickup') {
          return order.type === 'P' && routeLocations.includes(order.location)
        } else if (state === 'drop') {
          return order.type === 'D' && routeLocations.includes(order.location)
        }
        return routeLocations.includes(order.location)
      })
    } else {
      if (state === 'pickup') {
        return shipment.orders.filter(order => order.type === 'P')
      } else if (state === 'drop') {
        return shipment.orders.filter(order => order.type === 'D')
      }
      return shipment.orders
    }
  }, [getCurrentRoute])

  const getFilteredIndividualOrders = useCallback((shipment, state) => {
    const filteredOrders = getFilteredOrders(shipment, state)
    return filteredOrders.filter(order => !order.orderId.includes(','))
  }, [getFilteredOrders])

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
              {currentItems.map((shipment) => (
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
                          {expandedRow === shipment.id ? (
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
                        {getVehicleIcon(shipment.vehicleType)}
                        <span className="font-medium">{shipment.id}</span>
                        <span className="text-xs text-gray-500 capitalize">({shipment.vehicleType || 'truck'})</span>
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
                          onStateClick={handleStateClick}
                          calculateRouteStatus={calculateRouteStatus}
                        />
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Details */}
                  {expandedRow === shipment.id && (
                    <TableRow className="hover:bg-transparent border-b-2 border-gray-300">
                      <TableCell colSpan={11} className="p-0">
                        <div className="p-6 bg-gray-50 border-l-4 border-[#006397]">
                          <div className="mb-4 pb-3 border-b border-gray-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <h2 className="text-xl font-bold text-[#006397]">Shipment: {shipment.id}</h2>
                              <span className="text-xl font-bold text-[#006397]">/</span>
                              <span className="text-lg font-bold text-[#006397]">Vehicle Type: <span className="capitalize">{shipment.vehicleType || 'truck'}</span></span>
                            </div>
                            <p className="text-sm text-gray-600">{shipment.source} → {shipment.destination}</p>
                          </div>
                          
                          <Tabs defaultValue="orders" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="orders">Order Details</TabsTrigger>
                              <TabsTrigger value="optimization">Route Optimization</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="orders" className="space-y-6">
                              {/* Individual Orders Table */}
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-lg font-semibold mb-3 text-[#006397]">
                                  Individual {getCurrentState(shipment.id) === 'pickup' ? 'Pickup' : 'Drop'} Details
                                </h3>
                                <OrderDetailsTable 
                                  orders={getFilteredIndividualOrders(shipment, getCurrentState(shipment.id))} 
                                  type="individual" 
                                />
                              </div>
                            </TabsContent>

                            <TabsContent value="optimization">
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-lg font-semibold mb-3 text-[#006397]">Route Optimization</h3>
                                <p className="text-gray-600">Route optimization features coming soon...</p>
                              </div>
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
                    goToPage(currentPage - 1)
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
                      goToPage(page)
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
                    goToPage(currentPage + 1)
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