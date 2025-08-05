'use client'

import { useState, useEffect } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'

export default function GeofenceListPage() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/geofenceData.json')
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

  const filterFields = [
    { name: "fenceName", label: "Fence Name" },
  ]

  const handleSearch = (searchData) => {
    console.log("Search:", searchData)
  }

  return (
    <div className="p-4">
      <ReportsList
        title="Geofence List"
        columns={columns}
        rows={rows}
        filterFields={filterFields}
        onSearch={handleSearch}
        showActions={true}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={false}
      />
    </div>
  )
} 