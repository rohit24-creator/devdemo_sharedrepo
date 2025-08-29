'use client'

import { useState } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'
import AdvancedSearch from '@/components/ui/reusableComponent/advancedSearch'

const filterFields = [
  { name: 'bookingFromDate', label: 'Booking From Date', type: 'date' },
  { name: 'carrier', label: 'Select Carrier', type: 'select', options: ['Carrier 1', 'Carrier 2', 'Carrier 3'] },
]

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'bookingId', header: 'Booking ID' },
  { accessorKey: 'carrier', header: 'Carrier' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'date', header: 'Date' },
]

const sampleRows = [
  { id: 1, bookingId: 'BK001', carrier: 'Carrier 1', status: 'Active', date: '2024-01-15' },
  { id: 2, bookingId: 'BK002', carrier: 'Carrier 2', status: 'Pending', date: '2024-01-16' },
  { id: 3, bookingId: 'BK003', carrier: 'Carrier 3', status: 'Completed', date: '2024-01-17' },
]

// Advanced Search configuration for Reports
const advancedSearchConfig = {
  pageTitle: "Reports",
  searchFields: [
    {
      name: "reportType",
      label: "Report Type",
      type: "select",
      options: ["KPI Report", "Order Report", "Financial Report", "Performance Report", "Customer Report", "Carrier Report", "Route Report", "Cost Analysis"]
    },
    {
      name: "dateFrom",
      label: "From Date",
      type: "date"
    },
    {
      name: "dateTo",
      label: "To Date",
      type: "date"
    },
    {
      name: "customerName",
      label: "Customer Name",
      type: "text",
      placeholder: "Enter customer name"
    }
    
  ],
  searchButtonText: "Search",
  resetButtonText: "Reset"
}

export default function ExampleAdvPage() {
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false)

  const handleSearch = (searchValues) => {
    console.log('Search values:', searchValues)
  }

  const handleActionClick = (action, row) => {
    console.log('Action clicked:', action, row)
  }

  // Advanced Search handlers
  const handleAdvancedSearch = (searchValues) => {
    console.log('Advanced search values:', searchValues)
    // Implement your advanced search logic here
    // Example: generate reports based on searchValues
  }

  const handleAdvancedReset = () => {
    console.log('Reset advanced search')
    // Implement your reset logic here
  }

  const handleAdvancedClose = () => {
    setIsAdvancedSearchOpen(false)
  }

  // This function will be called when search icon is clicked in ReportsList
  const handleSearchIconClick = () => {
    setIsAdvancedSearchOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Example Advanced Reports</h1>
        
        {/* Reports List Component */}
        <ReportsList
          title="Example Reports"
          columns={columns}
          rows={sampleRows}
          filterFields={filterFields}
          onSearch={handleSearch}
          onActionClick={handleActionClick}
          showActions={true}
          enabledActions={['edit', 'view', 'delete']}
          showFirstIcon={true}
          showSecondIcon={true}
          showThirdIcon={true}
          onFirstIconClick={handleSearchIconClick}
        />

        {/* Advanced Search Component */}
        <AdvancedSearch
          {...advancedSearchConfig}
          isOpen={isAdvancedSearchOpen}
          onClose={handleAdvancedClose}
          onSearch={handleAdvancedSearch}
          onReset={handleAdvancedReset}
        />
      </div>
    </div>
  )
}



  