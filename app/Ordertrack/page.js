'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Package,
  Calendar,
  Truck,
  Building,
  MapPin,
  CheckCircle,
  Check,
  Info,
  BarChart3,
  Weight,
  Settings,
  Target,
} from 'lucide-react'

export default function TrackingOrder() {
  const [trackingNumber, setTrackingNumber] = useState('')

  const trackingData = {
    trackingReference: '6625250002',
    eta: '23 Jun 2025',
    orderType: 'Normal',
    bookedDate: '23 Jun 2025',
    pickupAddress: 'Main Street, New Jersey, Cranford, United States of America, 07016',
    deliveryAddress: 'Cincinnati, US, 45069',
    pickupDate: '17 Jul 2025 01:00 PM',
    deliveryDate: '18 Jul 2025 12:16 PM',
    packages: 1,
    volume: '11.000(cbm)',
    weight: '11.000 Kg',
    vehicleType: '10W Cabinet (Temperature Control)',
    vehicleLocation: 'D-43, Side-B, Lajpat Nagar II, Block D, Lajpat Nagar, New Delhi, Delhi 110024, India',
    vehicleDeliveryLocation: 'No. 1 Rajaji Salai, Chennai, Tamil Nadu 600001, Tamil Nadu, India, 600001',
    routeMileage: 2335,
    totalPackages: 1,
    assignedPickup: 1,
    assignedDelivery: 1,
    status: 'Completed',
  }

  const transitEvents = [
    {
      id: 1,
      status: 'Accepted By Driver',
      date: '23 Jun 2025 06:00 PM',
      type: 'General',
      items: '1 X item-1',
      weight: '11.000 Kg',
      completed: true
    },
    {
      id: 2,
      status: 'Pickup Gate In',
      date: '23 Jun 2025 06:00 PM',
      type: 'Pickup',
      items: '1 X item-1',
      weight: '11.000 Kg',
      completed: true
    },
    {
      id: 3,
      status: 'Booked By Supplier',
      date: '23 Jun 2025 07:29 PM',
      type: 'Booking',
      items: '1 X item-1',
      weight: '11.000 Kg',
      completed: true
    }
  ]
  const statusOptions = [
    { name: 'Accepted', icon: CheckCircle },
    { name: 'In Transit', icon: Truck },
    { name: 'Delivered', icon: Package },
    { name: 'Completed', icon: Check },
  ]

  const activeStatusIndex = statusOptions.findIndex(
    (status) => status.name === trackingData.status
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">ShipmentX</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter Order ID"
              className="w-full sm:w-64 h-10"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 h-10 w-full sm:w-auto">
              Track
            </Button>
          </div>
        </div>
      </header>

      {/* Tracking Information Bar */}
      <section className="bg-gradient-to-r from-slate-300 to-gray-100 px-4 sm:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-600">Tracking Reference</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800">{trackingData.trackingReference}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-600">ETA</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800">{trackingData.eta}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-600">Order Type</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800">{trackingData.orderType}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
              <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-600">Booked By Supplier</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800">{trackingData.bookedDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="p-3 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Routing & Transit */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 h-[600px] sm:h-[700px] lg:h-[840px]">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center space-x-3 text-base sm:text-lg font-bold text-gray-800">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-800 font-bold tracking-wide text-base sm:text-lg">ROUTING INFORMATION</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-base font-medium text-gray-700">
                      Approximate Route Mileage {trackingData.routeMileage.toLocaleString()} km
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                    <span className="text-base text-gray-600 leading-relaxed">
                      Total Of {trackingData.totalPackages} Package{trackingData.totalPackages !== 1 ? 's' : ''} With {trackingData.assignedPickup} Of {trackingData.totalPackages} Assigned In Pickup And {trackingData.assignedDelivery} Of {trackingData.totalPackages} Assigned In Delivery
                    </span>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8">
                  <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold tracking-wide text-base sm:text-lg">TRANSIT STATUS</span>
                  </div>

                  {transitEvents.length === 0 ? (
                    <div className="text-center py-6 sm:py-8">
                      <p className="text-gray-500 text-sm font-medium">No Transit Events</p>
                    </div>
                  ) : (
                    <div className="relative max-h-60 sm:max-h-80 overflow-y-auto pr-2">
                      {transitEvents.map((event, index) => (
                        <div key={event.id} className="relative">
                          <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg ${event.completed ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'
                                }`}>
                                {event.completed && (
                                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                )}
                              </div>
                              {index < transitEvents.length - 1 && (
                                <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-blue-500 to-blue-600 mt-2"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4 sm:pb-6">
                              <p className="font-semibold text-sm text-gray-800">{event.status}</p>
                              <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mt-2">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs w-fit">
                                  {event.type}
                                </Badge>
                                <span className="text-sm text-gray-600">{event.items}</span>
                                <span className="text-sm text-gray-600">{event.weight}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Map */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="space-y-3">
              {/* Map Card */}
              <Card className="p-0">
                <CardContent className="p-0">
                  <div className="w-full h-[700px]">
                    <iframe
                      title="map"
                      src="https://maps.google.com/maps?q=india&t=k&z=5&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full rounded-md"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Status Card */}
              <Card className="p-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
                    {statusOptions.map(({ name, icon: Icon }, index) => (
                      <div key={name} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${index <= activeStatusIndex && activeStatusIndex !== -1
                            ? 'bg-green-600'
                            : 'bg-gray-300'
                            }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${index <= activeStatusIndex && activeStatusIndex !== -1
                              ? 'text-white'
                              : 'text-gray-600'
                              }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium mt-2 ${index <= activeStatusIndex && activeStatusIndex !== -1
                            ? 'text-green-800'
                            : 'text-gray-600'
                            }`}
                        >
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Shipment Details */}
          <div className="lg:col-span-3 order-3 lg:order-3">
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle className="flex items-center space-x-3 text-base sm:text-lg font-bold text-gray-800">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold tracking-wide text-base sm:text-lg">SHIPMENT OVERVIEW</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base text-gray-800 mb-1">Pickup Address</p>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {trackingData.pickupAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base text-gray-800 mb-1">Delivery Address</p>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {trackingData.deliveryAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base text-gray-800 mb-1">Pickup And Delivery</p>
                      <div className="text-base text-gray-600 space-y-1">
                        <p>Pickup: {trackingData.pickupDate}</p>
                        <p>Delivery: {trackingData.deliveryDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-0">
                  <CardTitle className="flex items-center space-x-3 text-base sm:text-lg font-bold text-gray-800">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold tracking-wide text-base sm:text-lg">PACKAGE DETAILS</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <span className="text-base font-medium text-gray-700">Number Of Packages</span>
                    </div>
                    <span className="font-bold text-base text-gray-800">{trackingData.packages}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                      </div>
                      <span className="text-base font-medium text-gray-700">Volume</span>
                    </div>
                    <span className="font-bold text-base text-gray-800">{trackingData.volume}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Weight className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
                      </div>
                      <span className="text-base font-medium text-gray-700">Weight</span>
                    </div>
                    <span className="font-bold text-base text-gray-800">{trackingData.weight}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-0">
                  <CardTitle className="flex items-center space-x-3 text-base sm:text-lg font-bold text-gray-800">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-md">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold tracking-wide text-base sm:text-lg">ADDITIONAL INFO</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-700">Bill Of Lading</span>
                    <span className="font-bold text-base text-gray-400">N/A</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-700">Invoice No</span>
                    <span className="font-bold text-base text-gray-400">N/A</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Vehicle Information */}
      <footer className="bg-white border-t border-gray-200">
        <div className="px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-gray-800 font-bold tracking-wide text-base sm:text-lg">VEHICLE INFORMATION</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base text-gray-800 mb-1">Vehicle Type</p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {trackingData.vehicleType}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="flex-shrink-0">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base text-gray-800 mb-1">Vehicle Location</p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {trackingData.vehicleLocation}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 sm:col-span-2 lg:col-span-1">
              <div className="flex-shrink-0">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base text-gray-800 mb-1">Vehicle Delivery Location</p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {trackingData.vehicleDeliveryLocation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
///