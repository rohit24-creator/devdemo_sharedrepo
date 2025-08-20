'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Package,
  Calendar,
  Truck,
  Building,
  CheckCircle,
  Check,
  Settings,
  ArrowUpRight,
  ArrowDownLeft,
  CalendarCheck,
  Info,
  Clock,
  MapPin,
  Target,
} from 'lucide-react'

export default function TrackingOrder() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const [transitEvents, setTransitEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // Fetch tracking data from JSON file
  const fetchTrackingData = async (orderId) => {
    if (!orderId.trim()) {
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const response = await fetch('/orderTrackingData.json')
      if (!response.ok) {
        throw new Error('Failed to fetch tracking data')
      }
      
      const data = await response.json()
      
      // Search for the specific order by tracking reference
      const foundOrder = data.orders.find(order => 
        order.trackingReference.toLowerCase() === orderId.toLowerCase()
      )
      
      if (foundOrder) {
        setTrackingData(foundOrder)
        setTransitEvents(foundOrder.transitEvents || [])
      } else {
        setTrackingData(null)
        setTransitEvents([])
      }
    } catch (err) {
      console.error('Error fetching tracking data:', err)
      setTrackingData(null)
      setTransitEvents([])
    } finally {
      setLoading(false)
    }
  }

  const handleTrack = () => {
    fetchTrackingData(trackingNumber)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTrack()
    }
  }

  // Status stepper steps
  const steps = [
    { name: 'Order Booked', icon: CheckCircle },
    { name: 'In Transit', icon: Truck },
    { name: 'Delivered', icon: Package },
    { name: 'Closed', icon: Check },
  ]
  
  // Determine active step based on transit events
  const getActiveStepIndex = () => {
    if (transitEvents.length === 0) return -1
    
    // Filter out events with empty status
    const validEvents = transitEvents.filter(event => event.status && event.status.trim() !== '')
    if (validEvents.length === 0) return -1
    
    // Check if shipment is closed/completed
    const isClosed = validEvents.some(event => event.status === 'Closed')
    if (isClosed) return 3 // Closed step
    
    // Check if delivered
    const isDelivered = validEvents.some(event => event.status === 'Delivered')
    if (isDelivered) return 2 // Delivered step
    
    // Check if in transit
    const isInTransit = validEvents.some(event => event.status === 'In Transit')
    if (isInTransit) return 1 // In Transit step
    
    // Check if order booked
    const isOrderBooked = validEvents.some(event => event.status === 'Order Booked')
    if (isOrderBooked) return 0 // Order Booked step
    
    return -1
  }
  
  const activeIdx = getActiveStepIndex()

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading tracking data...</p>
        </div>
      </div>
    )
  }

  // Show initial state (no search yet)
  if (!searched) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md py-4 px-4 sm:px-6 z-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <h1 className="text-4xl font-medium text-blue-900">ShipmentX</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Input
                id="tracking-input"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Order ID"
                className="w-full sm:w-64"
              />
              <Button 
                onClick={handleTrack}
                className="bg-blue-900 hover:bg-blue-500 text-white font-medium"
              >
                Track
              </Button>
            </div>
          </div>
        </header>

        {/* Welcome Message */}
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ShipmentX</h1>
            <p className="text-xl text-gray-600 mb-8">Enter an Order ID above to track your shipment in real-time</p>
          </div>
        </main>
      </div>
    )
  }

  // Show tracking data when available
  if (!trackingData) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md py-4 px-4 sm:px-6 z-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <h1 className="text-4xl font-medium text-blue-900">ShipmentX</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Input
                id="tracking-input"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Order ID"
                className="w-full sm:w-64"
              />
              <Button 
                onClick={handleTrack}
                className="bg-blue-900 hover:bg-blue-500 text-white font-medium"
              >
                Track
              </Button>
            </div>
          </div>
        </header>

        {/* No Data Message */}
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">No Tracking Data Found</h1>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <h1 className="text-4xl font-medium text-blue-900">ShipmentX</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Input
              id="tracking-input"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Order ID"
              className="w-full sm:w-64"
            />
            <Button 
              onClick={handleTrack}
              className="bg-blue-900 hover:bg-blue-500 text-white font-medium"
            >
              Track
            </Button>
          </div>
        </div>
      </header>

      {/* Info Bar */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-8 mt-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white rounded-lg shadow border border-blue-100 p-4">
          <div className="flex items-center gap-2 text-gray-800 text-lg font-medium">
            <Package className="w-6 h-6 text-blue-500" />
            Tracking reference: <span className="font-normal text-gray-900 ml-1">{trackingData.trackingReference || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800 text-lg font-medium">
            <Calendar className="w-6 h-6 text-blue-500" />
            ETA: <span className="font-normal text-gray-900 ml-1">{trackingData.eta || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800 text-lg font-medium">
            <Truck className="w-6 h-6 text-blue-500" />
            Order type: <span className="font-normal text-gray-900 ml-1">{trackingData.orderType || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800 text-lg font-medium">
            <Building className="w-6 h-6 text-blue-500" />
            Booked by supplier: <span className="font-normal text-gray-900 ml-1">{trackingData.bookedDate || 'N/A'}</span>
          </div>
        </div>
      </section>

      {/* Dashboard Grid Layout */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Map Card */}
        <Card className="rounded-lg border bg-white p-0 col-span-1 lg:col-span-3 flex flex-col">
          <CardContent className="p-0">
            <div className="w-full h-[390px]">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=india&t=k&z=5&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* Status Stepper */}
            <div className="relative w-full max-w-5xl mx-auto px-4 pt-6 pb-10">
              <div className="flex items-center justify-between relative">
                {steps.map((step, idx, arr) => {
                  const isActive = idx <= activeIdx && activeIdx !== -1
                  const Icon = step.icon
                  return (
                    <div key={step.name} className="flex flex-col items-center relative flex-1">
                      {/* Horizontal line (except last step) */}
                      {idx < arr.length - 1 && (
                        <div className="absolute top-5 left-1/2 w-full h-2 z-0">
                          <div
                            className={`w-full h-full ${idx < activeIdx ? 'bg-green-500' : 'bg-gray-300'}`}
                          ></div>
                        </div>
                      )}
                      {/* Icon */}
                      <div
                        className={`z-10 w-11 h-11 rounded-full flex items-center justify-center ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {/* Label */}
                      <span className="mt-2 text-sm font-medium text-center text-gray-800">
                        {step.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column: INFORMATION and Transit Timeline stacked */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          {/* Routing Information */}
          <Card className="pt-3 bg-white border shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 px-4 pb-2 border-b">
                <Info className="w-6 h-6 text-blue-500" />
                <h2 className="text-lg sm:text-xl font-medium text-slate-900">Routing Information</h2>
              </div>
              <div className="px-4 pt-2 pb-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Approximate Mileage</p>
                  </div>
                  <p className="font-normal">{trackingData.routeMileage ? `${trackingData.routeMileage.toLocaleString()} km` : 'N/A'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Total Packages</p>
                  </div>
                  <p className="font-normal">{trackingData.packages || 'N/A'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Assigned Pickup</p>
                  </div>
                  <p className="font-normal">{trackingData.assignedPickup || 'N/A'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Assigned Delivery</p>
                  </div>
                  <p className="font-normal">{trackingData.assignedDelivery || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transit Timeline Card */}
          <Card className="pt-3 bg-white border shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 px-4 pb-2 border-b">
                <Clock className="w-6 h-6 text-blue-500" />
                <h2 className="text-lg sm:text-xl font-medium text-slate-900">Transit Status</h2>
              </div>
              <div className="px-4 pt-3 pb-0 space-y-3 max-h-60 overflow-y-auto">
                <div className="h-60 flex flex-col justify-start">
                  {transitEvents.length === 0 || transitEvents.every(event => !event.status || event.status.trim() === '') ? (
                    <div className="flex flex-1 items-center justify-center text-gray-400 text-base font-normal">No transit events yet.</div>
                  ) : (
                     (() => {
                       // Filter valid events first
                       const validEvents = transitEvents.filter(event => event.status && event.status.trim() !== '')
                       
                       if (validEvents.length === 0) {
                         return null
                       }
                       
                       return validEvents.map((event, index) => {
                         const isCancelled = event.status === 'Cancelled'
                         const isClosed = event.status === 'Closed'
                         const isUpdate = !isCancelled && !isClosed // All other statuses are updates
                         
                         return (
                           <div key={event.id} className="flex items-start gap-4">
                             <div className="flex flex-col items-center">
                               {/* Status Icon */}
                               {(() => {
                                 if (isCancelled) {
                                   return (
                                     <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-red-500 bg-white">
                                       <Check className="w-4 h-4 text-red-500" />
                                     </div>
                                   )
                                 }
                                 if (isClosed) {
                                   return (
                                     <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-green-500 bg-white">
                                       <Check className="w-4 h-4 text-green-500" />
                                     </div>
                                   )
                                 }
                                 // All other statuses (updates) show in blue
                                 return (
                                   <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-blue-500 bg-white">
                                     <Check className="w-4 h-4 text-blue-500" />
                                   </div>
                                 )
                               })()}
                               
                               {/* Connecting Line */}
                               {index < validEvents.length - 1 && (
                                 <div className={`w-0.5 h-8 mt-1 ${isCancelled ? 'bg-red-100' : isClosed ? 'bg-green-100' : 'bg-blue-100'}`}></div>
                               )}
                             </div>
                             
                             {/* Status Details */}
                             <div className="flex flex-col items-start">
                               <p className={`text-base font-medium ${
                                 isCancelled ? 'text-red-600' : 
                                 isClosed ? 'text-green-600' : 
                                 'text-blue-600' // All updates in blue
                               }`}>
                                 {event.status}
                               </p>
                               <p className="text-sm font-normal text-gray-500">{event.date || 'N/A'}</p>
                               <div className="flex gap-2 mt-1">
                                 <Badge className={`text-sm font-medium ${
                                   isCancelled ? 'bg-red-100 text-red-700' : 
                                   isClosed ? 'bg-green-100 text-green-700' : 
                                   'bg-blue-100 text-blue-700' // All updates in blue
                                 }`}>
                                   {event.type || 'N/A'}
                                 </Badge>
                                 <span className="text-base font-normal text-gray-800">{event.items || 'N/A'}</span>
                                 <span className="text-base font-normal text-gray-800">{event.weight || 'N/A'}</span>
                               </div>
                             </div>
                           </div>
                         )
                       })
                     })()
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Three cards in a row with equal width and height */}
        <div className="col-span-1 md:grid-cols-2 lg:col-span-5 mb-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* Shipment Overview Card */}
            <Card className="pt-3 bg-white border shadow-sm h-full flex flex-col py-2.5">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 px-4 pb-2 border-b">
                  <Settings className="w-6 h-6 text-blue-500" />
                  <h2 className="text-lg sm:text-xl font-medium text-slate-900">Shipment Overview</h2>
                </div>
                <div className="px-4 pt-3 pb-0 space-y-4">
                  {/* Pickup Address */}
                  <div className="flex items-start gap-4">
                    <ArrowUpRight className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-base font-medium text-gray-900 leading-snug">Pickup Address</p>
                      <p className="text-base font-normal text-gray-700 leading-snug">{trackingData.pickupAddress || 'N/A'}</p>
                    </div>
                  </div>
                  {/* Delivery Address */}
                  <div className="flex items-start gap-4">
                    <ArrowDownLeft className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-base font-medium text-gray-900 leading-snug">Delivery Address</p>
                      <p className="text-base font-normal text-gray-700 leading-snug">{trackingData.deliveryAddress || 'N/A'}</p>
                    </div>
                  </div>
                  {/* Pickup & Delivery */}
                  <div className="flex items-start gap-4">
                    <CalendarCheck className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-base font-medium text-gray-900 leading-snug">Pickup & Delivery</p>
                      <p className="text-base font-normal text-gray-700 leading-snug">Pickup: {trackingData.pickupDate || 'N/A'}</p>
                      <p className="text-base font-normal text-gray-700 leading-snug">Delivery: {trackingData.deliveryDate || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Details Card */}
            <Card className="pt-3 bg-white border shadow-sm h-full flex flex-col py-2.5">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 px-4 pb-2 border-b">
                  <Package className="w-6 h-6 text-blue-500" />
                  <h2 className="text-lg sm:text-xl font-medium text-slate-900">
                    Package Details & Additional Info
                  </h2>
                </div>
                <div className="px-4 pt-3 pb-4 space-y-4">
                  <div>
                    <p className="text-base font-medium text-gray-900 leading-snug">Volume</p>
                    <p className="text-base font-normal text-gray-700 leading-snug">{trackingData.volume || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900 leading-snug">Weight</p>
                    <p className="text-base font-normal text-gray-700 leading-snug">{trackingData.weight || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900 leading-snug">Bill Of Lading</p>
                    <p className="text-base font-normal text-gray-700 leading-snug">N/A</p>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900 leading-snug">Invoice No</p>
                    <p className="text-base font-normal text-gray-700 leading-snug">N/A</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Info Card */}
            <Card className="pt-3 bg-white border shadow-sm h-full flex flex-col py-2.5">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 px-4 pb-2 border-b">
                  <Truck className="w-6 h-6 text-blue-500" />
                  <h2 className="text-lg sm:text-xl font-medium text-slate-900">
                    Vehicle Information
                  </h2>
                </div>
                <div className="px-4 pt-3 pb-0 space-y-4">
                  {/* Vehicle type */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-base font-medium text-gray-900 leading-snug">Vehicle type</p>
                      <p className="text-base font-normal text-gray-700 leading-snug">{trackingData.vehicleType || 'N/A'}</p>
                    </div>
                  </div>
                  {/* Vehicle location */}
                  <div className="flex items-start gap-4">
                    <Settings className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-base font-medium text-gray-900 leading-snug">Vehicle location</p>
                      <p className="text-base font-normal text-gray-700 leading-snug">{trackingData.vehicleLocation || 'N/A'}</p>
                    </div>
                  </div>
                  {/* Vehicle delivery location */}
                  <div className="flex items-start gap-4">
                    <Target className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-base font-medium text-gray-900 leading-snug">Vehicle delivery location</p>
                      <p className="text-base font-normal text-gray-700 leading-snug">{trackingData.vehicleDeliveryLocation || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
