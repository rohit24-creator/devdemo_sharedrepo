"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ViewFormPage() {
    const dynamicTitle = "View Vehicles"

    const fields = [
        // Vehicle Identification
        { label: "Register Number", value: "BKL309" },
        { label: "Vehicle Type", value: "22 WHEELER" },
        { label: "Truck Brand", value: "WESTERN STAR" },
        { label: "Status", value: "Active" },
        
        // Physical Specifications
        { label: "Length", value: "8.00 (M)" },
        { label: "Width", value: "3.00 (M)" },
        { label: "Height", value: "4.00 (M)" },
        { label: "Weight", value: "1300.00 (Kg)" },
        { label: "Volume", value: "5.00 (cbm)" },
        
        // Contact Information
        { label: "Contact Name", value: "ALBERT" },
        { label: "Contact Number", value: "8706586545" },
        { label: "Vehicle Owner", value: "ALBERT" },
        
        // Insurance Details
        { label: "Insured By", value: "ALBERT" },
        { label: "Insurance Start Date", value: "2024-11-28 00:05" },
        { label: "Insurance Exp. Date", value: "2030-11-15 00:15" },
        
        // Additional Info
        { label: "Description", value: "GOODS AND SERVICES" }
    ]

    return (
        <div className="w-full mx-auto p-4 space-y-4">
            <Card>
                <CardContent className="flex items-center justify-between border-b px-4 py-2">
                    <h1 className="text-2xl font-semibold text-blue-800">{dynamicTitle}</h1>
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
                    >
                        Cancel
                    </Button>
                </CardContent>

                {/* Details Grid */}
                <CardContent className="p-6 bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                        {fields.map((field, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-base font-medium text-gray-900">
                                    {field.label}
                                </span>
                                <span className="text-base font-base text-gray-700 ">
                                    {field.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
//