'use client'

import { useState, useEffect } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'

const filterFields = [
  { name: 'bookingFromDate', label: 'Booking From Date', type: 'date' },
  { name: 'bookingToDate', label: 'Booking To Date', type: 'date' },
  { name: 'carrier', label: 'Select Carrier', type: 'select', options: ['Carrier 1', 'Carrier 2', 'Carrier 3'] },
]

export default function CarrierLiveKPI() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/reports/carrierlivekpi.json')
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
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Carrier Live KPI</h1>
        <ReportsList
          title="Carrier Live KPI"
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



  