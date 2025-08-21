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
                    Create GeoFence
                </h1>
                <Button 
                    variant="destructive" 
                    size="sm"
                    className="h-9 px-4 hover:bg-red-700 transition-colors duration-200"
                >
                    Cancel
                </Button>
            </header>

            {/* Main Content Section */}
            <main className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    
                    {/* Map Display Section - Left Side */}
                    <div className="lg:col-span-3">
                        <div className="w-full h-[80vh] overflow-hidden rounded-md shadow-sm border border-gray-200">
                            <iframe
                                title="Geofence Map"
                                className="w-full h-full"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12637737.50804753!2d-95.712891!3d37.09024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1694086193046!5m2!1sen!2sin"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    {/* Form Input Section - Right Side */}
                    <div className="lg:col-span-1">
                        <Card className="w-full h-[80vh] shadow-sm border border-gray-200 rounded-md">
                            <CardContent className="px-4 py-0 h-full flex flex-col">
                                
                                {/* Form Fields Container */}
                                <div className="space-y-4 flex-1">
                                    
                                    {/* Geo Fence Name Field */}
                                    <div className="space-y-2">
                                        <Label 
                                            htmlFor="geofence-name" 
                                            className="text-base font-medium text-gray-700"
                                        >
                                            Geo Fence Name
                                        </Label>
                                        <Input 
                                            id="geofence-name" 
                                            placeholder="Enter Geo Fence Name"
                                            className="h-10 border-gray-300 focus:border-[#006397] focus:ring-1 focus:ring-[#006397]"
                                            aria-describedby="geofence-name-help"
                                        />
                                    </div>

                                    {/* Location Field */}
                                    <div className="space-y-2">
                                        <Label 
                                            htmlFor="location" 
                                            className="text-base font-medium text-gray-700"
                                        >
                                            Location
                                        </Label>
                                        <Input 
                                            id="location" 
                                            placeholder="Enter Your Location"
                                            className="h-10 border-gray-300 focus:border-[#006397] focus:ring-1 focus:ring-[#006397]"
                                            aria-describedby="location-help"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons Container */}
                                <div className="flex gap-2 pt-6 mt-auto">
                                    <Button 
                                        type="button"
                                        className="flex-1 h-9 bg-[#006397] hover:bg-[#0284c7] text-white text-sm"
                                    >
                                        Search
                                    </Button>
                                    <Button 
                                        type="button"
                                        className="flex-1 h-9 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 text-sm"
                                    >
                                        Clear Path
                                    </Button>
                                    <Button 
                                        type="submit"
                                        className="flex-1 h-9 bg-green-600 hover:bg-green-700 text-white text-sm"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}