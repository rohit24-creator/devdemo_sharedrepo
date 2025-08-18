'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function GeofencePage() {
    return (
        <div className="min-h-screen p-0">
            {/* Header Section with Title and Cancel Button */}
            <div className="px-6 py-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold text-[#006397]">
                        Create GeoFence
                    </h1>
                    <Button 
                        variant="destructive" 
                        className="h-10 px-6 rounded-full bg-red-600 hover:bg-red-700"
                    >
                        Cancel
                    </Button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="p-4">
                <Card className="w-[100%] h-[85vh] p-2 shadow-sm border">
                    <div className="flex h-full gap-4">

                        {/* Left Side Panel - Form */}
                        <div className="w-[320px] flex flex-col gap-6 border-r border-gray-200 pr-4">

                            {/* Input Fields */}
                            <div className="flex flex-col gap-4 p-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="geofence-name" className="text-lg font-medium text-gray-700">
                                        Geo Fence Name
                                    </Label>
                                    <Input 
                                        id="geofence-name" 
                                        placeholder="Enter Geo Fence Name"
                                        className="h-10 border-gray-300 focus:border-[#006397] focus:ring-1 focus:ring-[#006397]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="location" className="text-lg font-medium text-gray-700">
                                        Location
                                    </Label>
                                    <Input 
                                        id="location" 
                                        placeholder="Enter Your Location"
                                        className="h-10 border-gray-300 focus:border-[#006397] focus:ring-1 focus:ring-[#006397]"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-auto flex flex-row gap-3">
                                <Button className="flex-1 h-10 bg-[#006397] hover:bg-[#02abf5] text-white rounded-lg transition-colors">
                                    Search
                                </Button>
                                <Button className="flex-1 h-10 bg-[#006397] hover:bg-[#02abf5] text-white rounded-lg transition-colors">
                                    Clear Path
                                </Button>
                                <Button className="flex-1 h-10 bg-[#006397] hover:bg-[#02abf5] text-white rounded-lg transition-colors">
                                    Save
                                </Button>
                            </div>
                        </div>

                        {/* Right Side - Map */}
                        <div className="flex-1 relative">
                            <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                <iframe
                                    title="Geofence Map"
                                    className="w-full h-full"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12637737.50804753!2d-95.712891!3d37.09024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1694086193046!5m2!1sen!2sin"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
