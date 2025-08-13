'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ReportsList from '@/components/ui/reusableComponent/reportsList'

export default function GeofenceListPage() {
  const router = useRouter()
  
  // State Management
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [tripModalOpen, setTripModalOpen] = useState(false)
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false)
  const [selectedGeofence, setSelectedGeofence] = useState(null)
  const [tripData, setTripData] = useState([])
  const [vehicleData, setVehicleData] = useState([])
  const [jsonData, setJsonData] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  // Configuration
  const filterFields = [
    { name: "fenceName", label: "Fence Name" },
  ]

  // Data Fetching
  useEffect(() => {
    fetch('/geofenceData.json')
      .then(res => res.json())
      .then(data => {
        setJsonData(data)
        setColumns(data.headers || [])
        setRows(data.rows || [])
      })
      .catch(() => {
        setColumns([])
        setRows([])
        setJsonData(null)
      })
  }, [])

  // Event Handlers
  const handleSearch = (searchData) => {
    console.log("Search:", searchData)
  }

  const handleActionClick = (action, row) => {
    if (action === 'trip') {
      setSelectedGeofence(row)
      const tripDataFromJson = jsonData?.tripData || []
      setTripData(tripDataFromJson)
      setTripModalOpen(true)
    } else if (action === 'vehicle') {
      setSelectedGeofence(row)
      const vehicleDataFromJson = jsonData?.vehicleData || []
      setVehicleData(vehicleDataFromJson)
      setVehicleModalOpen(true)
    } else if (action === 'map') {
      router.push('/geofences/viewGeoFence')
    }
  }

  const handleStatusChange = (tripId, newStatus) => {
    setTripData(prev =>
      prev.map(trip =>
        trip.tripId === tripId
          ? { ...trip, status: newStatus }
          : trip
      )
    )
    setStatusMessage('Geo Fence Assigned')
    setTimeout(() => setStatusMessage(''), 3000)
  }

  const handleVehicleStatusChange = (imei, newStatus) => {
    setVehicleData(prev =>
      prev.map(vehicle =>
        vehicle.imei === imei
          ? { ...vehicle, status: newStatus }
          : vehicle
      )
    )
    setStatusMessage('Geo Fence Assigned')
    setTimeout(() => setStatusMessage(''), 3000)
  }

  return (
    <div className="p-6">
      {/* Main Geofence List */}
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
        enabledActions={["map", "trip", "vehicle", "delete"]}
        onActionClick={handleActionClick}
      />

      {/* Trip Modal */}
      <Dialog open={tripModalOpen} onOpenChange={setTripModalOpen}>
        <DialogContent className="lg:max-w-[60rem] p-0">
          {/* Title */}
          <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-lg">
            <DialogTitle className="text-xl font-semibold">
              View Trips for {selectedGeofence?.fenceName || 'My Zone'}
            </DialogTitle>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="text-green-600 px-6 py-0 text-left font-semibold text-lg -mt-2 -mb-2">
              {statusMessage}
            </div>
          )}

          {/* Table */}
          <div className="max-h-[500px] overflow-auto -mt-3">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                   <TableHead className="w-1/3 px-6 py-2 text-sm font-medium text-left text-gray-900">
                     Trip Id
                   </TableHead>
                   <TableHead className="w-1/3 px-6 py-2 text-sm font-medium text-left text-gray-900">
                     Vehicle
                   </TableHead>
                   <TableHead className="w-1/3 px-6 py-2 text-sm font-medium text-left text-gray-900">
                     Status
                   </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tripData.map((trip) => (
                  <TableRow key={trip.tripId} className="border-b hover:bg-gray-50">
                    <TableCell className="w-1/3 px-6 py-2 text-sm text-left text-gray-700">
                      {trip.tripId}
                    </TableCell>
                    <TableCell className="w-1/3 px-6 py-2 text-sm text-left text-gray-700">
                      {trip.vehicle}
                    </TableCell>
                    <TableCell className="w-1/3 px-6 py-2 text-sm text-left text-gray-700">
                      <Select
                        value={trip.status}
                        onValueChange={(value) => handleStatusChange(trip.tripId, value)}
                      >
                        <SelectTrigger className="w-32 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-32">
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vehicle Modal */}
      <Dialog open={vehicleModalOpen} onOpenChange={setVehicleModalOpen}>
        <DialogContent className="lg:max-w-[60rem] p-0">
          {/* Title */}
          <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-lg">
            <DialogTitle className="text-xl font-semibold">
              View Vehicles for {selectedGeofence?.fenceName || 'My Zone'}
            </DialogTitle>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="text-green-600 px-6 py-0 text-left font-semibold text-lg -mt-2 -mb-2">
              {statusMessage}
            </div>
          )}

          {/* Table */}
          <div className="max-h-[500px] overflow-auto -mt-3">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-1/3 px-6 py-2 text-sm font-medium text-left text-gray-900">
                    IMEI
                  </TableHead>
                  <TableHead className="w-1/3 px-6 py-2 text-sm font-medium text-left text-gray-900">
                    Register Number
                  </TableHead>
                  <TableHead className="w-1/3 px-6 py-2 text-sm font-medium text-left text-gray-900">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleData.map((vehicle) => (
                  <TableRow key={vehicle.imei} className="border-b hover:bg-gray-50">
                    <TableCell className="w-1/3 px-6 py-2 text-sm text-left text-gray-700">
                      {vehicle.imei}
                    </TableCell>
                    <TableCell className="w-1/3 px-6 py-2 text-sm text-left text-gray-700">
                      {vehicle.registerNumber}
                    </TableCell>
                    <TableCell className="w-1/3 px-6 py-2 text-sm text-left text-gray-700">
                      <Select
                        value={vehicle.status}
                        onValueChange={(value) => handleVehicleStatusChange(vehicle.imei, value)}
                      >
                        <SelectTrigger className="w-32 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-32">
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 