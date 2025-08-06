'use client'

import { useState, useEffect } from 'react'
import ReportsList from '@/components/ui/reusableComponent/reportsList'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function GeofenceListPage() {
  // State Management
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [tripModalOpen, setTripModalOpen] = useState(false)
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false)
  const [selectedGeofence, setSelectedGeofence] = useState(null)
  const [tripData, setTripData] = useState([])
  const [vehicleData, setVehicleData] = useState([])
  const [showStatusMessage, setShowStatusMessage] = useState(false)
  const [jsonData, setJsonData] = useState(null)

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
    
    // Show status message temporarily
    setShowStatusMessage(true)
    setTimeout(() => {
      setShowStatusMessage(false)
    }, 4000) // Hide after 4 seconds
  }

  const handleVehicleStatusChange = (imei, newStatus) => {
    setVehicleData(prev => 
      prev.map(vehicle => 
        vehicle.imei === imei 
          ? { ...vehicle, status: newStatus }
          : vehicle
      )
    )
    
    // Show status message temporarily
    setShowStatusMessage(true)
    setTimeout(() => {
      setShowStatusMessage(false)
    }, 4000) // Hide after 4 seconds
  }

  // Render
  return (
    <div className="p-4">
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
        <DialogContent className="!w-[60vw] !max-w-[60vw] h-screen max-h-[90vh] mx-auto">
          <DialogHeader className="bg-blue-600 text-white p-4 -m-6 mb-2 rounded-t-lg">
            <DialogTitle className="text-white">
              Assign Trips to {selectedGeofence?.fenceName || 'My Zone'}
            </DialogTitle>
          </DialogHeader>

         {showStatusMessage && (
  <p className="text-green-600 text-xl font-semibold mb-0">
    Geo Fence Assigned
  </p>
)}

          
          <div className="overflow-y-auto max-h-[75vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold w-2/5 px-4">Trip Id</TableHead>
                  <TableHead className="font-semibold w-2/5 px-4">Vehicle</TableHead>
                  <TableHead className="font-semibold w-1/5 px-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tripData.map((trip) => (
                  <TableRow key={trip.tripId}>
                    <TableCell className="w-2/5 px-4">{trip.tripId}</TableCell>
                    <TableCell className="w-2/5 px-4">{trip.vehicle}</TableCell>
                    <TableCell className="w-1/5 px-4">
                      <Select
                        value={trip.status}
                        onValueChange={(value) => handleStatusChange(trip.tripId, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-40">
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
        <DialogContent className="!w-[60vw] !max-w-[60vw] h-screen max-h-[90vh] mx-auto">
          <DialogHeader className="bg-blue-600 text-white p-4 -m-6 mb-2 rounded-t-lg">
            <DialogTitle className="text-white">
              Assign Vehicles to {selectedGeofence?.fenceName || 'My Zone'}
            </DialogTitle>
          </DialogHeader>

          {showStatusMessage && (
            <p className="text-green-600 text-xl font-semibold -mt-5">
              Geo Fence Assigned
            </p>
          )}
          
          <div className="overflow-y-auto max-h-[75vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold w-2/5 px-4">IMEI</TableHead>
                  <TableHead className="font-semibold w-2/5 px-4">Register Number</TableHead>
                  <TableHead className="font-semibold w-1/5 px-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleData.map((vehicle) => (
                  <TableRow key={vehicle.imei}>
                    <TableCell className="w-2/5 px-4">{vehicle.imei}</TableCell>
                    <TableCell className="w-2/5 px-4">{vehicle.registerNumber}</TableCell>
                    <TableCell className="w-1/5 px-4">
                      <Select
                        value={vehicle.status}
                        onValueChange={(value) => handleVehicleStatusChange(vehicle.imei, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-40">
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