"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Bell, CheckCircle, Clock, Settings } from "lucide-react"
import Image from "next/image"

export default function ShipmentXDashboard() {
  const data = {
    stats: {
      activeBookings: 5,
      pendingBookings: 4,
      completedBookings: 6
    },
    bookings: {
      active: [
        { id: "125270004" },
        { id: "125270002" },
        { id: "125270003" },
        { id: "125270001" },
        { id: "125210013" }
      ],
      pending: [
        { id: "125270005" },
        { id: "125270006" },
        { id: "125270007" },
        { id: "125270008" }
      ],
      completed: [
        { id: "125270009" },
        { id: "125270010" },
        { id: "125270011" },
        { id: "125270012" },
        { id: "125270013" },
        { id: "125270014" }
      ]
    },
    notifications: {
      alerts: 2,
      notifications: 8,
      approvals: 3
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-150 p-8 gap-8">
      {/* Left Panel */}
      <div className="w-1/3 flex flex-col items-center justify-center text-center rounded-2xl shadow-md bg-gradient-to-br from-blue-100 via-blue-50 to-white p-10 border border-blue-200">
        <h2 className="text-3xl font-medium text-blue-700 mb-2">Welcome to</h2>
        <h1 className="text-5xl font-bold text-blue-600 tracking-tight mb-6">ShipmentX</h1>
        <Image
          src="/your-illustration.svg"
          alt="ShipmentX Illustration"
          width={360}
          height={360}
          className="rounded-lg"
        />
      </div>

      {/* Right Panel */}
      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Booking Buttons */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex gap-2 items-center text-blue-700">
              <Settings className="text-blue-600 w-6 h-6" />
              Booking Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {["Schedule a Booking", "Your Bookings", "Quick Book"].map((label, idx) => (
              <Button key={idx} variant="outline" className="text-slate-700 border-slate-300 hover:bg-blue-50 font-normal">
                {label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Active Bookings */}
        <Card className="relative">
          <div className="absolute top-4 right-4">
            <Badge className="bg-slate-700 text-white text-base px-4 py-2 rounded-full font-semibold">
              {data.stats.activeBookings}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex gap-2 items-center text-slate-700">
              <Truck className="text-blue-600 w-6 h-6" /> Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {data.bookings.active.length > 0 ? (
              data.bookings.active.map((booking, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="rounded-full px-6 py-2 text-slate-600 border-slate-300 hover:bg-slate-100 min-w-[120px] font-normal"
                >
                  {booking.id}
                </Button>
              ))
            ) : (
              <p className="text-slate-500 text-sm italic">No bookings</p>
            )}
          </CardContent>
        </Card>

        {/* Pending Bookings */}
        <Card className="relative">
          <div className="absolute top-4 right-4">
            <Badge className="bg-slate-700 text-white text-base px-4 py-2 rounded-full font-semibold">
              {data.stats.pendingBookings}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex gap-2 items-center text-slate-700">
              <Clock className="text-amber-600 w-6 h-6" /> Pending Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {data.bookings.pending.length > 0 ? (
              data.bookings.pending.map((booking, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="rounded-full px-6 py-2 text-slate-600 border-slate-300 hover:bg-slate-100 min-w-[120px] font-normal"
                >
                  {booking.id}
                </Button>
              ))
            ) : (
              <p className="text-slate-500 text-sm italic">No bookings</p>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex gap-2 items-center text-blue-700">
              <Bell className="text-blue-600 w-6 h-6" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-around items-center text-center">
            <div>
              <p className="text-3xl font-bold text-red-600">{data.notifications.alerts}</p>
              <p className="text-base font-medium text-slate-600">Alerts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">{data.notifications.notifications}</p>
              <p className="text-base font-medium text-slate-600">Notifications</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{data.notifications.approvals}</p>
              <p className="text-base font-medium text-slate-600">Approvals</p>
            </div>
          </CardContent>
        </Card>

        {/* Completed Bookings */}
        <Card className="relative">
          <div className="absolute top-4 right-4">
            <Badge className="bg-slate-700 text-white text-base px-4 py-2 rounded-full font-semibold">
              {data.stats.completedBookings}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex gap-2 items-center text-slate-700">
              <CheckCircle className="text-green-600 w-6 h-6" /> Completed Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {data.bookings.completed.length > 0 ? (
              data.bookings.completed.map((booking, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="rounded-full px-6 py-2 text-slate-600 border-slate-300 hover:bg-slate-100 min-w-[120px] font-normal"
                >
                  {booking.id}
                </Button>
              ))
            ) : (
              <p className="text-slate-500 text-sm italic">No bookings</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
