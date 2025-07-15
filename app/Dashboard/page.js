"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
    MapPin,
    Users,
    TrendingUp,
    DollarSign,
    FileText,
    Clock,
    Package,
    Truck,
    CheckCircle,
    Bell
} from "lucide-react"

export default function DashboardPage() {
    const chatRows = [
        { status: "Online", name: "Jacob", phone: "4844760243", type: "Customer" },
        { status: "Offline", name: "Tampa", phone: "9876543210", type: "Carrier" },
        { status: "Online", name: "Tucson", phone: "7911123456", type: "Customer" },
        { status: "Offline", name: "Chicago", phone: "19876543211", type: "Carrier" },
        { status: "Online", name: "Dallas", phone: "12345678", type: "Customer" },
        { status: "Offline", name: "Miami", phone: "9876543212", type: "Carrier" },
        { status: "Online", name: "Seattle", phone: "123456789", type: "Customer" },
        { status: "Offline", name: "Boston", phone: "9876543213", type: "Carrier" },
        { status: "Online", name: "Atlanta", phone: "123456789", type: "Customer" },
        { status: "Offline", name: "Phoenix", phone: "19876543214", type: "Carrier" },
    ];

    const forecastRows = [
        { date: "07-Mar-2025", pickup: 1, deliveries: 8 },
        { date: "15-Jun-2025", pickup: 5, deliveries: 1 },
        { date: "22-Mar-2025", pickup: 9, deliveries: 0 },
        { date: "05-Feb-2025", pickup: 0, deliveries: 6 },
        { date: "12-Apr-2025", pickup: 2, deliveries: 9 },
        { date: "19-Jul-2025", pickup: 4, deliveries: 2 },
        { date: "26-Apr-2025", pickup: 1, deliveries: 9 },
        { date: "03-May-2025", pickup: 6, deliveries: 3 },
        { date: "10-Oct-2025", pickup: 0, deliveries: 7 },
        { date: "17-May-2025", pickup: 8, deliveries: 5 },
        { date: "24-May-2025", pickup: 0, deliveries: 4 },
        { date: "31-May-2025", pickup: 9, deliveries: 8 },
        { date: "07-Jun-2025", pickup: 1, deliveries: 0 },
    ];

    const stats = [
        {
            label: "Pending Bookings",
            value: 30,
            icon: Package,
            bg: "bg-gradient-to-r from-orange-400 to-red-500"
        },
        {
            label: "Active Bookings",
            value: 89,
            icon: Truck,
            bg: "bg-gradient-to-r from-blue-500 to-indigo-600"
        },
        {
            label: "Completed Bookings",
            value: 17,
            icon: CheckCircle,
            bg: "bg-gradient-to-r from-green-500 to-emerald-600"
        },
        {
            label: "Alerts",
            value: 3,
            icon: Bell,
            bg: "bg-gradient-to-r from-pink-500 to-rose-500"
        }
    ];

    const spotRates = [
        { invoice: "10212122151152", client: "TMS SX", status: "Active" },
        { invoice: "10212122151153", client: "TMS SX", status: "Pending" },
        { invoice: "10212122151154", client: "TMS SX", status: "Active" },
        { invoice: "10212122151155", client: "TMS SX", status: "Completed" },
        { invoice: "10212122151156", client: "TMS SX", status: "Active" },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* Logo and Title */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                                    Logistics Dashboard
                                </h1>
                                <p className="text-slate-500 text-xs sm:text-sm font-medium">
                                    Real-time tracking & analytics
                                </p>
                            </div>
                        </div>

                        {/* Branch Selector */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <label className="text-sm sm:text-lg font-semibold text-slate-800">
                                Select Branch
                            </label>
                            <Select defaultValue="thbkk">
                                <SelectTrigger className="w-full sm:w-48 lg:w-64 bg-white border-slate-200">
                                    <SelectValue placeholder="Select Branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">ALL</SelectItem>
                                    <SelectItem value="thbkk">THBKK</SelectItem>
                                    <SelectItem value="thpna">THPNA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
                {/* Stats Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className={`rounded-xl shadow-md text-white p-5 flex items-center gap-4 ${stat.bg}`}>
                                <div className="bg-white/20 p-3 rounded-full">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-sm font-medium">{stat.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Map Section */}
                <section>
                    <Card className="bg-white border shadow-sm">
                        <CardContent className="p-0">
                            <div className="w-full h-[350px] rounded-lg overflow-hidden">
                                <iframe
                                    title="map"
                                    src="https://maps.google.com/maps?q=usa&t=k&z=4&ie=UTF8&iwloc=&output=embed"
                                    className="w-full h-full"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Chat and Forecast Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Chat Table */}
                    <Card className="pt-3 bg-white border shadow-sm">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-2 px-4 pb-2 border-b">
                                <Users className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                    Chat With Customer/Carrier
                                </h2>
                            </div>
                            <ScrollArea className="h-72 w-full">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead className="text-sm sm:text-lg font-bold text-slate-800">Status</TableHead>
                                            <TableHead className="text-sm sm:text-lg font-bold text-slate-800">User Name</TableHead>
                                            <TableHead className="text-sm sm:text-lg font-bold text-slate-800">Phone Number</TableHead>
                                            <TableHead className="text-sm sm:text-lg font-bold text-slate-800">Type</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {chatRows.map((row, i) => (
                                            <TableRow key={i} className="hover:bg-slate-50 transition-colors">
                                                <TableCell className="text-xs sm:text-base text-slate-700">
                                                    <Badge className={`text-center flex items-center gap-1 ${row.status === "Online"
                                                        ? "bg-green-100 text-green-800 border-green-200"
                                                        : "bg-red-100 text-red-800 border-red-200"
                                                        }`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${row.status === "Online" ? "bg-green-600" : "bg-red-600"
                                                            }`} />
                                                        {row.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs sm:text-base text-slate-700">{row.name}</TableCell>
                                                <TableCell className="text-xs sm:text-base text-slate-700">{row.phone}</TableCell>
                                                <TableCell className="text-xs sm:text-base text-slate-700">{row.type}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Forecast Table */}
                    <Card className="pt-3 bg-white border shadow-sm">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-2 px-4 pb-2 border-b">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Forecast</h2>
                            </div>
                            <ScrollArea className="h-72 w-full">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead className="text-lg font-bold text-slate-800">Created Date</TableHead>
                                            <TableHead className="text-lg font-bold text-slate-800">Pickup Orders</TableHead>
                                            <TableHead className="text-lg font-bold text-slate-800">Deliveries</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {forecastRows.map((row, i) => (
                                            <TableRow key={i} className="hover:bg-slate-50 transition-colors">
                                                <TableCell className="text-base text-slate-700 font-medium">{row.date}</TableCell>
                                                <TableCell className="text-base text-slate-700">{row.pickup}</TableCell>
                                                <TableCell className="text-base text-slate-700">{row.deliveries}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>

                {/* Bottom Cards Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Spot Rates Card */}
                    <Card className="pt-3 bg-white border shadow-sm">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-2 px-4 pb-2 border-b">
                                <DollarSign className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Spot Rates</h2>
                            </div>
                            <ScrollArea className="h-60 w-full">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead className="text-lg font-bold text-slate-800">Invoice</TableHead>
                                            <TableHead className="text-lg font-bold text-slate-800">Client</TableHead>
                                            <TableHead className="text-lg font-bold text-slate-800">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {spotRates.map((row, i) => (
                                            <TableRow key={i} className="hover:bg-slate-50 transition-colors">
                                                <TableCell className="text-base text-slate-700">{row.invoice}</TableCell>
                                                <TableCell className="text-base text-slate-700">{row.client}</TableCell>
                                                <TableCell className="text-base text-slate-700">
                                                    <Badge className={`text-center ${row.status === "Active"
                                                        ? "bg-green-100 text-green-800 border-green-200"
                                                        : row.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                            : "bg-blue-100 text-blue-800 border-blue-200"
                                                        }`}>
                                                        {row.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Detained Card */}
                    <Card className="pt-3 bg-white border shadow-sm">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-2 px-4 pb-2 border-b">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Detained / Demurrage</h2>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col items-center justify-start h-48 text-center">
                                    <Clock className="w-12 h-12 text-slate-400 mb-4" />
                                    <p className="text-lg font-semibold text-slate-600 mb-2">No detained shipments</p>
                                    <p className="text-sm text-slate-500">All shipments are on schedule</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Invoices Card */}
                    <Card className="pt-3 bg-white border shadow-sm">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-2 px-4 pb-2 border-b">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Invoices</h2>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col items-center justify-start h-48 text-center">
                                    <FileText className="w-12 h-12 text-slate-400 mb-4" />
                                    <p className="text-lg font-semibold text-slate-600 mb-2">No invoices</p>
                                    <p className="text-sm text-slate-500">All invoices are up to date</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-sm text-slate-600">
                            Copyright © 2025{" "}
                            <a href="#" className="hover:text-blue-500 transition-colors font-semibold">
                                ShipmentX
                            </a>
                            . All rights reserved.
                        </span>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-sm text-slate-600 hover:text-blue-500 transition-colors">
                                Terms & Conditions
                            </a>
                            <a href="#" className="text-sm text-slate-600 hover:text-blue-500 transition-colors">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
