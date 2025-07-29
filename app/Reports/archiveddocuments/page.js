'use client'

import { useState, useEffect } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'

const filterFields = [
  { name: 'selectType', label: 'Select', type: 'select', options: ['Booking ID', 'Delivery Note / Purchase'] },
  { name: 'bookingId', label: 'Booking ID', type: 'text' },
  { name: 'deliveryNote', label: 'Delivery Note / Purchase', type: 'select', options: ['SX1739794654', 'SX1735902038', 'SX1735623980', 'SX173569735', 'SX173569229', 'SX173565010'] },
]

export default function ArchivedDocuments() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/reports/archiveddocuments.json')
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
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Archived Documents</h1>
        <ReportsList
          title="Archived Documents"
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



  