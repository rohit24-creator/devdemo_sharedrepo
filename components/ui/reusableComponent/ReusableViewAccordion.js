"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReusableViewLayout({
    title,
    sections = [],
    onCancel,
}) {
    const dynamicTitle = title || (sections[0]?.title ?? "View Details")

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
            {/* Top Title Card */}
            <Card className="w-full shadow-sm border border-muted bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-[#006397] text-lg">
                        {dynamicTitle}
                    </CardTitle>
                    <Button
                        onClick={onCancel}
                        className="bg-red-700 hover:bg-red-800 text-white rounded-full px-6"
                    >
                        Cancel
                    </Button>
                </CardHeader>
            </Card>

            {/* Data Cards */}
            {sections.map((section, index) => (
                <Card
                    key={index}
                    className="w-full shadow-sm border border-muted bg-white"
                >
                    <CardContent className="pt-4 pb-4 px-4">
                        {Array.from({ length: Math.ceil(section.fields.length / 4) }).map(
                            (_, rowIndex) => {
                                const start = rowIndex * 4
                                const rowFields = section.fields.slice(start, start + 4)

                                return (
                                    <div
                                        key={rowIndex}
                                        className={`grid grid-cols-4 gap-4 p-4 rounded-md ${rowIndex % 2 === 0 ? "bg-muted" : "bg-white"
                                            }`}
                                    >
                                        {rowFields.map((field, i) => (
                                            <div key={i} className="space-y-1">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    {field.label}
                                                </p>
                                                <p className="text-base text-foreground">
                                                    {field.value || "-"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
