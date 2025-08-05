"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Activity, CheckCircle, Clock, Calendar, Package, Route, Car, Plus } from "lucide-react"

export default function ShipmentXWorkbench() {
    const data = {
        headerButtons: [
            { id: 1, label: "New Booking", icon: "Plus" },
            { id: 2, label: "Schedule", icon: "Calendar" },
            { id: 3, label: "Reports", icon: "Activity" }
        ],
        dashboardData: {
            alerts: 25,
            notifications: 58,
            approvals: 43
        },
        activeBookings: {
            count: 45,
            ids: ["125270004", "125270002", "125270003", "125270001", "125210013"]
        },
        pendingBookings: {
            count: 64,
            ids: ["125270005", "125270006", "125270007", "125270008", "125270002"]
        },
        completedBookings: {
            count: 26,
            ids: ["125270009", "125270010", "125270011", "125270012", "125270013", "125270014"]
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Truck className="text-blue-500 w-8 h-8" />
                        <h1 className="text-4xl font-medium text-blue-900">Welcome to ShipmentX</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {data.headerButtons.map((button) => (
                            <Button
                                key={button.id}
                                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center space-x-2"
                            >
                                {button.icon === "Plus" && <Plus className="w-4 h-4" />}
                                {button.icon === "Calendar" && <Calendar className="w-4 h-4" />}
                                {button.icon === "Activity" && <Activity className="w-4 h-4" />}
                                <span>{button.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Alerts Row - Top Section */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-white shadow-sm border border-gray-200 h-[90px] hover:shadow-md transition-shadow">
                            <CardContent className="p-6 h-full flex items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center">
                                        <Package className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-medium text-gray-600">Alerts</span>
                                        <span className="text-2xl font-medium text-gray-900">{data.dashboardData.alerts}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white shadow-sm border border-gray-200 h-[90px] hover:shadow-md transition-shadow">
                            <CardContent className="p-6 h-full flex items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <Route className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-medium text-gray-600">Notifications</span>
                                        <span className="text-2xl font-medium text-gray-900">{data.dashboardData.notifications}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white shadow-sm border border-gray-200 h-[90px] hover:shadow-md transition-shadow">
                            <CardContent className="p-6 h-full flex items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                                        <Car className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-medium text-gray-600">Approvals</span>
                                        <span className="text-2xl font-medium text-gray-900">{data.dashboardData.approvals}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Booking Cards Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-medium text-gray-800">Booking Management</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Active Bookings */}
                        <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-medium flex items-center justify-between text-gray-800">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span>Active Bookings</span>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-lg px-3 py-1">
                                        {data.activeBookings.count}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {data.activeBookings.ids.map((id, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full px-6 py-2 text-slate-600 border-slate-300 hover:bg-slate-100 min-w-[120px] font-normal"
                                        >
                                            {id}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pending Bookings */}
                        <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-medium flex items-center justify-between text-gray-800">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                            <Clock className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <span>Pending Bookings</span>
                                    </div>
                                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-lg px-3 py-1">
                                        {data.pendingBookings.count}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {data.pendingBookings.ids.map((id, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full px-6 py-2 text-slate-600 border-slate-300 hover:bg-slate-100 min-w-[120px] font-normal"
                                        >
                                            {id}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Completed Bookings */}
                        <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-medium flex items-center justify-between text-gray-800">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span>Completed Bookings</span>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 text-lg px-3 py-1">
                                        {data.completedBookings.count}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {data.completedBookings.ids.map((id, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full px-6 py-2 text-slate-600 border-slate-300 hover:bg-slate-100 min-w-[120px] font-normal"
                                        >
                                            {id}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}