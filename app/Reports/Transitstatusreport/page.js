'use client'

import { useEffect, useState } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'

const filterFields = [
  { name: 'fromDate', label: 'Booking From Date', type: 'date' },
  { name: 'toDate', label: 'Booking To Date', type: 'date' },
  { name: 'carrier', label: 'Carrier', type: 'select', options: ['Shipmentx Team', 'Other Carrier'] },
  { name: 'customer', label: 'Customer', type: 'select', options: ['CEREAL PARTNERS (MALAYSIA) SDN. BHD.', 'CUEL LIMITED'] },
  { name: 'customerId', label: 'Customer ID', type: 'text' }
]

export default function TransitStatusReports() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/reports/transitstatusreport.json')
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
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Transit Status Reports</h1>
        <ReportsList
          title="Transit Status Reports"
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
