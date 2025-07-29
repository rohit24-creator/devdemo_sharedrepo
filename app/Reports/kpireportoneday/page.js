'use client'

import { useEffect, useState } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'

const filterFields = [
  { name: 'bookingFromDate', label: 'Booking From Date', type: 'date' },
  { name: 'bookingToDate', label: 'Booking To Date', type: 'date' },
  { name: 'shipmentFromDate', label: 'Shipment From Date', type: 'date' },
  { name: 'shipmentToDate', label: 'Shipment To Date', type: 'date' },
  { name: 'carrier', label: 'Select Carrier', type: 'select', options: ['Suresh', 'John'] },
  { name: 'customerId', label: 'Customer ID', type: 'text' }
]

export default function KPIReportOneDay() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/reports/kpireportoneday.json')
      .then(res => res.json())
      .then(data => {
        setColumns(data.headers)
        setRows(data.rows)
      })
      .catch(() => {
        setColumns([])
        setRows([])
      })
  }, [])


return (
    <div className="min-h-screen bg-slate-150 p-6">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-medium text-gray-900 mb-4">KPI Report One Day</h1>
        <ReportsList
         title="KPI Report One Day"
          columns={columns}
          rows={rows}
          filterFields={filterFields}
          onSearch={() => {}}
          showActions={false}
          showFirstIcon={false}
          showSecondIcon={false}
          showThirdIcon={false}
          showCheckboxes={false}
        />
      </div>
    </div>
  )
}
