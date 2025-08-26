'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Trash2, Save, Tag, MapPin, Layers, Settings } from 'lucide-react'

export default function GeofencePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <Card className="border-0 shadow-none rounded-none">
                <CardHeader className="px-4 py-0 bg-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Layers className="w-7 h-7 text-white" />
                            </div>
                            <CardTitle className="text-3xl text-blue-800">
                                Create GeoFence
                            </CardTitle>
                        </div>
                        <Button variant="destructive" size="default">
                            Cancel
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            {/* Main Content */}
            <main className="p-4">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                    {/* Map Section */}
                    <div className="xl:col-span-9">
                        <Card className="w-full h-[calc(100vh-40px)] border-slate-200 overflow-hidden shadow-xl">
                            <CardContent className="p-0">
                                <div className="w-full h-[calc(100vh-40px)] overflow-hidden">
                                    <iframe
                                        title="Geofence Map"
                                        className="w-full h-full"
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12637737.50804753!2d-95.712891!3d37.09024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1694086193046!5m2!1sen!2sin"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Form Section */}
                    <div className="xl:col-span-3">
                        <Card className="w-full h-[calc(100vh-40px)] border-slate-200 overflow-hidden shadow-xl">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                                        <Settings className="w-4 h-4 text-white" />
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-slate-900">
                                        Geofence Details
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="px-6 pt-0 pb-6">
                                <form className="flex flex-col h-full">
                                    {/* Form Fields */}
                                    <div className="space-y-6 flex-1 mb-32">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="geofenceName"
                                                className="text-sm font-semibold text-slate-900 flex items-center"
                                            >
                                                <Tag className="w-4 h-4 mr-2 text-emerald-500" />
                                                Geo Fence Name
                                            </Label>
                                            <Input
                                                id="geofenceName"
                                                type="text"
                                                placeholder="Enter Geo Fence Name"
                                                className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="location"
                                                className="text-sm font-semibold text-slate-900 flex items-center"
                                            >
                                                <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                                                Location
                                            </Label>
                                            <Input
                                                id="location"
                                                type="text"
                                                placeholder="Enter Your Location"
                                                className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3 mt-auto">
                                        <Button
                                            type="button"
                                            className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                        >
                                            <Search className="w-4 h-4 mr-2" />
                                            Search Location
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full h-11 text-slate-900 border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-800 transition-all duration-200"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Clear Path
                                        </Button>
                                        <Button
                                            type="button"
                                            className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-bold shadow-md hover:shadow-lg transition-all duration-200"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Save GeoFence
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}