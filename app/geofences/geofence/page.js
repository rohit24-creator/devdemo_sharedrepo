'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'


export default function GeofencePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <header className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-[#006397]">
                    Create New GeoFence
                </h1>
                <div className="flex gap-3">
                    <Button 
                        variant="outline"
                        size="sm"
                        className="h-9 px-4 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Save
                    </Button>
                    <Button 
                        variant="destructive" 
                        size="sm"
                        className="h-9 px-4 hover:bg-red-700 transition-colors duration-200"
                    >
                        Cancel
                    </Button>
                </div>
            </header>

            {/* Main Content Section */}
            <main className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    
                    {/* Form Input Section - Left Side */}
                    <div className="lg:col-span-1">
                        <Card className="w-full h-[80vh] shadow-sm border border-gray-200 rounded-md">
                            <CardContent className="p-6 h-full flex flex-col">
                                
                                {/* Form Header */}
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    GeoFence Details
                                </h2>
                                
                                {/* Form Fields Container */}
                                <div className="space-y-6 flex-1">
                                    
                                    {/* Geo Fence Name Field */}
                                    <div className="space-y-2">
                                        <Label 
                                            htmlFor="geofence-name" 
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Geo Fence Name *
                                        </Label>
                                        <Input 
                                            id="geofence-name" 
                                            placeholder="Enter geofence name"
                                            className="h-10 border-gray-300 focus:border-[#006397] focus:ring-1 focus:ring-[#006397]"
                                        />
                                    </div>

                                    {/* Location Address Field */}
                                    <div className="space-y-2">
                                        <Label 
                                            htmlFor="location-address" 
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Location Address *
                                        </Label>
                                        <Input 
                                            id="location-address" 
                                            placeholder="Enter location"
                                            className="h-10 border-gray-300 focus:border-[#006397] focus:ring-1 focus:ring-[#006397]"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons Container */}
                                <div className="flex gap-3 pt-6 mt-auto">
                                    <Button 
                                        type="button"
                                        className="flex-1 h-10 bg-[#006397] hover:bg-[#0284c7] text-white"
                                    >
                                        Search
                                    </Button>
                                    <Button 
                                        type="button"
                                        className="flex-1 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                                    >
                                        Clear Path
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Map Display Section - Right Side */}
                    <div className="lg:col-span-3">
                        <div className="w-full h-[80vh] overflow-hidden rounded-md shadow-sm border border-gray-200">
                            <iframe
                                title="Location Map"
                                className="w-full h-full"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12637737.50804753!2d-95.712891!3d37.09024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1694086193046!5m2!1sen!2sin"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
