'use client'

import { useState, useEffect } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'

const filterFields = [
   { name: 'fromDate', label: 'From Date', type: 'date' },
  { name: 'toDate', label: 'To Date', type: 'date' },
  { name: 'customerName', label: 'Customer Name', type: 'text' }
]

export default function OrdersReport() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/reports/ordersreport.json')
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
        <h1 className="text-2xl font-medium text-gray-900 mb-4">OrdersReport</h1>
        <ReportsList
          title="OrdersReport"
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



  