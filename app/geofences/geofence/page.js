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
                    <div>
                        <h2 className="text-4xl font-semibold text-[#006397]">Create GeoFence</h2>
                    </div>

                    {/* Input Fields */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label>Geo Fence Name</Label>
                            <Input placeholder="Enter Geo Fence Name" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label>Location</Label>
                            <Input placeholder="Enter Your Location" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto flex flex-wrap gap-3">
                        <Button className="bg-[#006397] hover:bg-[#02abf5] text-white flex-1 h-10 rounded-md">
                            Search
                        </Button>
                        <Button className="bg-[#006397] hover:bg-[#02abf5] text-white flex-1 h-10 rounded-md">
                            Clear Path
                        </Button>
                        <Button className="bg-[#006397] hover:bg-[#02abf5] text-white flex-1 h-10 rounded-md">
                            Save
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white flex-1 h-10 rounded-md">
                            Cancel
                        </Button>
                    </div>
                </div>

                {/* Right Side Map */}
                <div className="flex-1 rounded border overflow-hidden">
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
