"use client"

import React from "react"

export default function ReusableViewAccordion({ sections = [] }) {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            {/* Page Header */}
            {/* <div className="max-w-6xl mx-auto mb-10">
                <div className="bg-gradient-to-r from-blue-800 to-cyan-600 rounded-xl px-6 py-6 shadow-lg">
                    <h1 className="text-4xl font-bold text-white">Driver Details</h1>
                </div>
            </div> */}

            {/* Sections */}
            <div className="max-w-6xl mx-auto space-y-12">
                {[0, 1].map((index) => {
                    const section = sections[index];
                    if (!section) return null;

                    const fields = section.fields || [];

                    // Extract special fields
                    const fromCountry = fields.find(f => f.label.toLowerCase() === "from country");
                    const toCountry = fields.find(f => f.label.toLowerCase() === "to country");
                    const statusField = fields.find(f => f.label.toLowerCase() === "status");

                    // Filter out the ones already used
                    const remainingFields = fields.filter(
                        f =>
                            f.label.toLowerCase() !== "from country" &&
                            f.label.toLowerCase() !== "to country" &&
                            f.label.toLowerCase() !== "status"
                    );

                    return (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            {/* Section Title + Status badge */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100  bg-[#006397] rounded-t-2xl">
                                <h2 className="text-xl text-gray-800 font-semibold text-white">
                                    {section.title || `Section ${index + 1}`}
                                </h2>
                                {statusField?.value && (
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full font-medium ${
                                            statusField.value.toLowerCase() === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {statusField.value}
                                    </span>
                                )}
                            </div>

                            {/* Section Body */}
                            <div className="px-6 py-6 space-y-6">
                                {/* Country Route */}
                                {fromCountry && toCountry && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between rounded-md p-4">
                                        <span className="text-sm text-gray-600 mb-2 sm:mb-0 font-medium">
                                            
                                        </span>
                                        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                            <span>{fromCountry.value}</span>
                                            <span className="text-xl text-blue-500">→</span>
                                            <span>{toCountry.value}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Remaining Fields Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                                    {remainingFields.length > 0 ? (
                                        remainingFields.map((field, idx) => (
                                            <div key={idx} className="space-y-1">
                                                <div className="text-sm text-gray-800 font-semibold font-medium">
                                                    {field.label}
                                                </div>
                                                <div className="text-base text-gray-500 font-normal">
                                                    {field.value || (
                                                        <span className="text-gray-300 italic">N/A</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-400 italic py-10 col-span-full">
                                            No other data available
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
