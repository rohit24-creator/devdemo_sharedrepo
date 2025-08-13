'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function GeofencePage() {
    return (
        <Card className="w-full h-[85vh] p-6 shadow-sm border">
            <div className="flex h-full gap-4">

                {/* Left Side Panel */}
                <div className="w-[320px] flex flex-col gap-6 border-r pr-4">

                    {/* Title */}
                    <h2 className="text-4xl font-semibold text-[#006397]">Create GeoFence</h2>

                    {/* Input Fields */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="geofence-name">Geo Fence Name</Label>
                            <Input id="geofence-name" placeholder="Enter Geo Fence Name" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="Enter Your Location" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto flex flex-wrap gap-3">
                        <Button className="flex-1 h-10 bg-[#006397] hover:bg-[#02abf5] text-white rounded-full">
                            Search
                        </Button>
                        <Button className="flex-1 h-10 bg-[#006397] hover:bg-[#02abf5] text-white rounded-full">
                            Clear Path
                        </Button>
                        <Button className="flex-1 h-10 bg-[#006397] hover:bg-[#02abf5] text-white rounded-full">
                            Save
                        </Button>
                        <Button variant="destructive" className="flex-1 h-10 rounded-full">
                            Cancel
                        </Button>
                    </div>
                </div>

                {/* Right Side Map */}
                <div className="flex-1 relative rounded-xl overflow-hidden shadow-lg border border-gray-200">



                    {/* Map Iframe */}
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
        </Card>
    )
}
