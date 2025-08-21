"use client"

import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function ReusableViewAccordion({ sections = [], config = {} }) {
    // Default configuration
    const defaultConfig = {
        // Field type configurations
        fieldTypes: {
            status: {
                field: 'status',
                colors: {
                    active: 'bg-green-100 text-green-800 border-green-200',
                    inactive: 'bg-red-100 text-red-800 border-red-200',
                    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    default: 'bg-gray-100 text-gray-800 border-gray-200'
                }
            }
        },
        // Layout configuration
        layout: {
            gridCols: 'md:grid-cols-1',
            cardSpacing: 'gap-6',
            fieldGridCols: 'grid-cols-4'
        },
        // Theme configuration
        theme: {
            background: 'bg-[#f5f7fc]',
            headerBg: 'bg-white shadow-sm border-b border-gray-200',
            cardBg: 'bg-white border shadow-sm'
        }
    }

    // Merge with provided config
    const finalConfig = { ...defaultConfig, ...config }

    const getStatusColor = (status, statusConfig) => {
        const colors = statusConfig?.colors || finalConfig.fieldTypes.status.colors
        const statusLower = status?.toLowerCase()
        return colors[statusLower] || colors.default
    }

    const renderField = (fieldConfig, data) => {
        const { name, label, type, options } = fieldConfig
        const value = data[name] || ""

        return (
            <div key={name} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                    {label}
                </label>
                <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">
                    {type === "select" && options ? (
                        options.find(opt => opt.value === value)?.label || value || "-"
                    ) : type === "textarea" ? (
                        <div className="whitespace-pre-wrap">{value || "-"}</div>
                    ) : (
                        value || "-"
                    )}
                </div>
            </div>
        )
    }

    if (!sections || sections.length === 0) {
        return (
            <div className={`min-h-screen ${finalConfig.theme.background} flex items-center justify-center p-6`}>
                <div className="text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h2>
                    <p className="text-gray-600">There are no records to display at the moment.</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${finalConfig.theme.background} p-6`}>
            <Accordion type="multiple">
                {sections.map((section, index) => {
                    const accordionValue = section.title?.toLowerCase().replace(/\s+/g, "-") || `section-${index}`
                    
                    return (
                        <AccordionItem key={index} value={accordionValue}>
                            <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
                                {section.title}
                            </AccordionTrigger>
                            <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                                <div className="pt-6">
                                    {/* Form Fields Display */}
                                    {section.type === "form" && section.fields && (
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            {section.fields.map((fieldConfig) =>
                                                renderField(fieldConfig, section.data || {})
                                            )}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <div className="flex gap-3">
                                            <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
                                                Cancel
                                            </button>
                                            <button className="bg-[#006397] hover:bg-[#005285] text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}