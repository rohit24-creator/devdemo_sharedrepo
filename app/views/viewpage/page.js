"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Eye, Edit, Trash2, Download, Share2, Filter } from "lucide-react"

export default function ViewFormPage() {
    const [formData, setFormData] = useState(null)
    const [selectedRow, setSelectedRow] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/vehicle12.json")
                const data = await res.json()
                setFormData(data)
            } catch (err) {
                console.error("Failed to fetch form data:", err)
            }
        }
        fetchData()
    }, [])

    const getStatusColor = (status) => {
        const statusLower = status?.toLowerCase()
        switch (statusLower) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'inactive':
                return 'bg-red-100 text-red-800 border-red-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const renderField = (header, value) => {
        const isStatus = header.accessorKey === 'status'
        
        return (
            <div key={header.accessorKey} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {header.header}
                    </label>
                    {isStatus && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                    {isStatus ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(value)}`}>
                            {value || "-"}
                        </span>
                    ) : (
                        value || "-"
                    )}
                </div>
            </div>
        )
    }

    if (!formData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading data...</p>
                </div>
            </div>
        )
    }

    const currentRow = formData.rows[selectedRow] || formData.rows[0]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header Section */}
       
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Row Selector */}
                {formData.rows.length > 1 && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Record</label>
                        <select 
                            value={selectedRow}
                            onChange={(e) => setSelectedRow(parseInt(e.target.value))}
                            className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            {formData.rows.map((row, index) => (
                                <option key={index} value={index}>
                                    {row.notificationId} - {row.customer}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Data Display Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {formData.headers.map(header => 
                        renderField(header, currentRow[header.accessorKey])
                    )}
                </div>

                {/* Action Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">Record ID: {currentRow.notificationId}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">Last updated: Today</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <Eye className="h-4 w-4 mr-2" />
                                View History
                            </button>
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </button>
                            <button className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}