"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ViewFormPage() {
    // Data
    const vehicleInfo = {
        basic: [
            { label: "Register Number", value: "BKL309" },
            { label: "Vehicle Type", value: "22 WHEELER" },
            { label: "Truck Brand", value: "WESTERN STAR" },
            { label: "Status", value: "Active" }
        ],
        specifications: [
            { label: "Length", value: "8.00 M" },
            { label: "Width", value: "3.00 M" },
            { label: "Height", value: "4.00 M" },
            { label: "Weight", value: "1300.00 Kg" },
            { label: "Volume", value: "5.00 CBM" }
        ],
        contact: [
            { label: "Contact Name", value: "ALBERT" },
            { label: "Contact Number", value: "8706586545" },
            { label: "Vehicle Owner", value: "ALBERT" }
        ],
        insurance: [
            { label: "Insured By", value: "ALBERT" },
            { label: "Insurance Start Date", value: "2024-11-28 00:05" },
            { label: "Insurance Exp. Date", value: "2030-11-15 00:15" },
            { label: "Description", value: "GOODS AND SERVICES" }
        ]
    }

    // Helper function
    const renderSection = (title, fields) => (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field, i) => (
                        <div key={i} className="space-y-2">
                            <div className="text-sm text-muted-foreground">{field.label}</div>
                            <div className="text-base font-medium">{field.value}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )

    // Main render
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Title and Info */}
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold">Vehicle Details</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Vehicle:</span>
                                    <span className="text-lg font-semibold text-primary">BKL309</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Status:</span>
                                    <Badge variant="secondary">Active</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Type:</span>
                                    <span className="text-base font-medium">22 WHEELER</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button variant="destructive">Cancel</Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSection("Basic Information", vehicleInfo.basic)}
                    {renderSection("Physical Specifications", vehicleInfo.specifications)}
                    {renderSection("Contact Information", vehicleInfo.contact)}
                    {renderSection("Insurance & Additional", vehicleInfo.insurance)}
                </div>
            </main>
        </div>
    )
}