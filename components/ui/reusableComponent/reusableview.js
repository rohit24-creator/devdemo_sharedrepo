"use client"

import React from "react"

export default function ReusableViewAccordion({ sections = [] }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10">
                <div className="bg-gradient-to-r from-cyan-700 to-blue-500 rounded-xl px-4 py-4 shadow">
                    <h1 className="text-3xl text-white mb-2">Driver Details</h1>
                    {/* <p className="text-blue-100 text-lg">Complete vehicle information and specifications</p> */}
                </div>
            </div>

            {/* Main Content: 1 Section, 3 Columns */}
            <div className="max-w-6xl mx-auto">
                {sections[0] && (
                    <div className="bg-white/80 rounded-2xl shadow p-8">
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            {/* <span className="text-xl text-gray-800">{sections[0].title}</span> */}
                        </div>
                        {sections[0].fields && sections[0].fields.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {sections[0].fields.map((field, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-lg p-4 flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase mb-1">
                                            {field.label}
                                        </span>
                                        <span className="text-lg text-gray-900">
                                            {field.value || <span className="text-gray-400 italic">N/A</span>}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 italic py-8">
                                No data available
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
