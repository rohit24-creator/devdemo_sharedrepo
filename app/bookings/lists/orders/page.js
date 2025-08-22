"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/bookingList";
import { Edit, Eye, Trash2 } from "lucide-react";
import { formatRowsWithId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BOOKING_ROUTES } from "@/lib/bookingRoutes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";

export default function OrderPage() {
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tripCreateDialogOpen, setTripCreateDialogOpen] = useState(false);
  const [tripFormData, setTripFormData] = useState({
    allocationRulePriority: "",
    templateId: "",
    carrierName: "",
    vehicleType: "",
    vehicleNo: "",
    driverName: "",
    carrierInstructions: "",
    volumeCapacity: "",
    temperatureRegime: "",
    carrierId: "",
    vehicleTypeName: "",
    vehicleId: "",
    driverId: "",
    weightCapacity: "",
    additionalConditions: "",
    loadingTimePenalty: "",
  });

  // Dynamic form configuration with rows
  const formRows = [
    // Row 1: Allocation Rule and Template ID
    [
      { name: "allocationRulePriority", label: "Allocation Rule Priority", type: "select", options: [ { value: "high", label: "High" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" } ] },
      { name: "templateId", label: "Template ID", type: "select", options: [ { value: "template1", label: "Template 1" }, { value: "template2", label: "Template 2" }, { value: "template3", label: "Template 3" } ] },
      { name: "", label: "", type: "empty" }
    ],
    // Row 2: Carrier Name and Carrier ID
    [
      { name: "carrierName", label: "Carrier Name *", type: "select", required: true, options: [ { value: "carrier1", label: "Carrier 1" }, { value: "carrier2", label: "Carrier 2" }, { value: "carrier3", label: "Carrier 3" } ] },
      { name: "carrierId", label: "Carrier ID", type: "input", readOnly: true, className: "bg-gray-100" },
      { name: "", label: "", type: "empty" }
    ],
    // Row 3: Vehicle Type and Vehicle Type Name
    [
      { name: "vehicleType", label: "Vehicle Type", type: "select", options: [ { value: "truck", label: "Truck" }, { value: "trailer", label: "Trailer" }, { value: "container", label: "Container" } ] },
      { name: "vehicleTypeName", label: "Vehicle Type Name", type: "input", readOnly: true, className: "bg-gray-100" },
      { name: "", label: "", type: "empty" }
    ],
    // Row 4: Vehicle No and Vehicle ID
    [
      { name: "vehicleNo", label: "Vehicle No", type: "select", options: [ { value: "vehicle1", label: "Vehicle 1" }, { value: "vehicle2", label: "Vehicle 2" }, { value: "vehicle3", label: "Vehicle 3" } ] },
      { name: "vehicleId", label: "Vehicle ID", type: "input", readOnly: true, className: "bg-gray-100" },
      { name: "", label: "", type: "empty" }
    ],
    // Row 5: Driver Name and Driver ID
    [
      { name: "driverName", label: "Driver Name", type: "select", options: [ { value: "driver1", label: "Driver 1" }, { value: "driver2", label: "Driver 2" }, { value: "driver3", label: "Driver 3" } ] },
      { name: "driverId", label: "Driver ID", type: "input", readOnly: true, className: "bg-gray-100" },
      { name: "", label: "", type: "empty" }
    ],
    // Row 6: Volume Capacity, Weight Capacity, Temperature Regime
    [
      { name: "volumeCapacity", label: "Volume Capacity", type: "textarea", rows: 2 },
      { name: "weightCapacity", label: "Weight Capacity", type: "textarea", rows: 2 },
      { name: "temperatureRegime", label: "Temperature Regime", type: "textarea", rows: 2 }
    ],
    // Row 7: Remaining fields
    [
      { name: "carrierInstructions", label: "Carrier Instructions", type: "textarea", rows: 2 },
      { name: "additionalConditions", label: "Additional Conditions", type: "textarea", rows: 2 },
      { name: "loadingTimePenalty", label: "Time for loading and penalty rate", type: "textarea", rows: 2 }
    ]
  ];



  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  // Auto-fill mapping
  const autoFillMapping = {
    carrierName: { field: "carrierId", value: "AUTO-CARRIER-001" },
    vehicleType: { field: "vehicleTypeName", value: "Mini Truck" },
    vehicleNo: { field: "vehicleId", value: "VH-2024" },
    driverName: { field: "driverId", value: "DRV-999" }
  };

  // Handle trip form input changes with auto-fill
  const handleTripFormChange = (field, value) => {
    setTripFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-fill logic
    if (autoFillMapping[field]) {
      const { field: targetField, value: autoFillValue } = autoFillMapping[field];
      setTripFormData(prev => ({
        ...prev,
        [targetField]: autoFillValue
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/bookings/order.json");
        
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || []);
        
        setColumns(formattedColumns);
        setRows(formattedRows);
        
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterFields = [
    { name: "bookingId", label: "Booking ID" },
    { name: "customerName", label: "Customer Name" },
    { name: "status", label: "Status" },
  ];

  // Central action handler
  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    } else {
      console.log("Unknown action", action, row);
    }
  };

  // Handle grid icon click for trip creation
  const handleGridIconClick = () => {
    if (selectedRows.length <= 1) {
      setTripCreateDialogOpen(true);
    } else {
      alert("Please select at least 1 order to create a trip.");
    }
  };

  // Handle trip form submission
  const handleTripSubmit = () => {
    console.log("Creating trip with selected orders:", selectedRows);
    console.log("Trip form data:", tripFormData);
    
    // Here you would typically make an API call to create the trip
    // For now, we'll just close the dialog and show a success message
    setTripCreateDialogOpen(false);
    setTripFormData({
      allocationRulePriority: "",
      templateId: "",
      carrierName: "",
      vehicleType: "",
      vehicleNo: "",
      driverName: "",
      carrierInstructions: "",
      volumeCapacity: "",
      temperatureRegime: "",
      carrierId: "",
      vehicleTypeName: "",
      vehicleId: "",
      driverId: "",
      weightCapacity: "",
      additionalConditions: "",
      loadingTimePenalty: "",
    });
    toast.success("Trip created successfully!", {
      description: "Your trip has been created and is ready for processing.",
      duration: 4000,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  // Update renderField to handle smaller input sizes
  const renderField = (field) => {
    const { name, label, type, options, readOnly, className, rows, required } = field;
    
    // Handle empty fields
    if (type === 'empty') {
      return <div key={`empty-${Math.random()}`}></div>;
    }
    
    switch (type) {
      case 'select':
        return (
          <div key={name}>
            <Label className="text-sm mb-1 block">{label}</Label>
            <Select
              value={tripFormData[name]}
              onValueChange={(value) => handleTripFormChange(name, value)}
            >
              <SelectTrigger className="w-full h-9 text-sm">
                <SelectValue placeholder="--Select--" />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'input':
        return (
          <div key={name}>
            <Label className="text-sm mb-1 block">{label}</Label>
            <Input
              value={tripFormData[name]}
              onChange={(e) => handleTripFormChange(name, e.target.value)}
              readOnly={readOnly}
              className={`w-full h-9 text-sm ${className || ''}`}
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div key={name}>
            <Label className="text-sm mb-1 block">{label}</Label>
            <textarea
              value={tripFormData[name]}
              onChange={(e) => handleTripFormChange(name, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md resize-none text-sm"
              rows={rows || 3}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <ReusableTable
        title="Orders"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        showFourthIcon={true}
        enabledActions={["edit", "view", "delete", "copyOrder", "reverseOrder", "generateTWB", "printLabel"]}
        onActionClick={handleActionClick}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        secondIconMenu={[
          { label: "+ Add New", onClick: () => router.push(BOOKING_ROUTES.orders) },
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") },
          { label: "Trip Create", onClick: handleGridIconClick },
        ]}
        thirdIconMenu={[
          { label: "Money View", onClick: () => console.log("Money View") },
        ]}
        fourthIconMenu={[
          { label: "Document View", onClick: () => console.log("Document View") },
        ]}
      />

      {/* Trip Management Dialog */}
      <Dialog open={tripCreateDialogOpen} onOpenChange={setTripCreateDialogOpen}>
        <DialogContent className="lg:max-w-[50rem] h-[35rem] p-0">
          {/* Title */}
          <div className="bg-[#006397] text-white px-6 py-4 flex justify-between items-center rounded-md">
            <DialogTitle className="text-lg font-semibold">Trip Management</DialogTitle>
          </div>

          {/* Form Content */}
          <div className="px-6 py-4 max-h-[500px] overflow-auto">
            {/* 3-Column Row-based Layout */}
            <div className="space-y-8">
              {formRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-3 gap-12">
                  {row.map((field) => renderField(field))}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-gray-200 mt-4 px-6 pb-6">
            <Button 
              variant="outline" 
              onClick={() => setTripCreateDialogOpen(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleTripSubmit}
              className="bg-[#006397] hover:from-[#02abf5] hover:to-[#02abf5] text-white shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Submit Trip
          </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Container */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
