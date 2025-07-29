'use client'

import { useState, useEffect } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'

const filterFields = [
  { name: 'pickupFromDate', label: 'Pickup From Date', type: 'date' },
  { name: 'pickupToDate', label: 'Pickup To Date', type: 'date' },
  { name: 'bookingId', label: 'Booking ID', type: 'text' },
  { name: 'tripId', label: 'Trip ID', type: 'text' },
  { name: 'selectType', label: 'Select', type: 'select', options: ['Option 1', 'Option 2'] },
]

export default function TatKPI() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/reports/TatKPI.json')
      .then(res => res.json())
      .then(data => {
        setColumns(data.headers || [])
        setRows(data.rows || [])
      })
      .catch(() => {
        setColumns([])
        setRows([])
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-150 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Tat KPI Report</h1>
        <ReportsList
          title="Tat KPI Report"
          columns={columns}
          rows={rows}
          filterFields={filterFields}
          onSearch={() => {}}
          showActions={false}
          showFirstIcon={false}
          showSecondIcon={false}
          showThirdIcon={false}
          showCheckboxes={true}
        />
      </div>
    </div>
  )
}



  