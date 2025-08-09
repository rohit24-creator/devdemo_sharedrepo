'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MoveLeft } from "lucide-react"
import { useRouter } from 'next/navigation'


export default function GeofencePage() {
    const router = useRouter()
    return (
        <Card className="w-full h-full p-4 shadow-sm border">
            {/* Google Map Section */}
            <div className="flex flex-wrap items-center gap-3 w-full">
                <h1 className="text-2xl font-medium text-blue-900">View GeoFence</h1>
                <Button className="ml-auto flex items-center gap-2 bg-[#006397] hover:bg-[#02abf5] text-white" onClick={() => router.push('/geofences/geofencelist')}>
                    <MoveLeft className="w-5 h-5" />
                    View Geofence
                </Button>
            </div>

            <div className="w-full h-[75vh] rounded border overflow-hidden">
                <iframe
                    title="Geofence Map"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12637737.50804753!2d-95.712891!3d37.09024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1694086193046!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </Card>
    )
}
