"use client";

import { useState, useEffect } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function DeliveryOrdersPage() {
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tripCreateDialogOpen, setTripCreateDialogOpen] = useState(false);
  const [tripFormData, setTripFormData] = useState({
    tripName: "",
    tripType: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/deliveryOrders.json');
        const data = await response.json();
        setDeliveryOrders(data);
      } catch (error) {
        console.error('Error fetching delivery orders:', error);
        setDeliveryOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Column definitions based on the image
  const columns = [
    {
      accessorKey: "adviceNumber",
      header: "Advice Number",
      sortable: true,
    },
    {
      accessorKey: "shipperName",
      header: "Shipper Name",
      sortable: true,
    },
    {
      accessorKey: "shipperContact",
      header: "Shipper Contact",
      sortable: true,
    },
    {
      accessorKey: "consigneeName",
      header: "Consignee Name",
      sortable: true,
    },
    {
      accessorKey: "consigneeContact",
      header: "Consignee Contact",
      sortable: true,
    },
    {
      accessorKey: "carrierName",
      header: "Carrier Name",
      sortable: true,
    },
    {
      accessorKey: "vesselName",
      header: "Vessel Name",
      sortable: true,
    },
    {
      accessorKey: "voyageNo",
      header: "Voyage No",
      sortable: true,
    },
  ];

  // Filter fields based on the image
  const filterFields = [
    {
      name: "adviceNumber",
      label: "Advice Number",
      type: "text",
    },
    {
      name: "fromDate",
      label: "From Date",
      type: "date",
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
    },
  ];

  // Action handlers
  const handleActionClick = (action, row) => {
    console.log(`${action} action clicked for:`, row);
    // Handle different actions here
    switch (action) {
      case "edit":
        // Handle edit
        break;
      case "view":
        // Handle view
        break;
      case "delete":
        // Handle delete
        break;
      case "tripHistory":
        // Handle trip history
        break;
      default:
        break;
    }
  };

  // Search handler
  const handleSearch = (formValues) => {
    console.log("Search with values:", formValues);
    // Implement search logic here
  };

  // Handle grid icon click for trip creation
  const handleGridIconClick = () => {
    if (selectedRows.length >= 2) {
      setTripCreateDialogOpen(true);
    } else {
      alert("Please select at least 2 delivery orders to create a trip.");
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
      tripName: "",
      tripType: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    alert("Trip created successfully!");
  };

  // Handle trip form input changes
  const handleTripFormChange = (field, value) => {
    setTripFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Menu items for the icons
  const secondIconMenu = [
    { 
      label: "Create Trip", 
      onClick: handleGridIconClick 
    },
    { label: "Export to Excel", onClick: () => console.log("Export to Excel") },
    { label: "Export to PDF", onClick: () => console.log("Export to PDF") },
    { label: "Print", onClick: () => console.log("Print") },
  ];

  const thirdIconMenu = [
    { label: "Download Report", onClick: () => console.log("Download Report") },
    { label: "Email Report", onClick: () => console.log("Email Report") },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading delivery orders...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
   
      <ReusableTable
        title="Delivery Orders"
        columns={columns}
        rows={deliveryOrders}
        filterFields={filterFields}
        onSearch={handleSearch}
        onActionClick={handleActionClick}
        enabledActions={["edit", "view", "delete", "tripHistory"]}
        showActions={true}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
      />

      {/* Trip Creation Dialog */}
      <Dialog open={tripCreateDialogOpen} onOpenChange={setTripCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Trip from Selected Orders</DialogTitle>
            <DialogDescription>
              Create a new trip with {selectedRows.length} selected delivery orders.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tripName" className="text-right">
                Trip Name
              </Label>
              <Input
                id="tripName"
                value={tripFormData.tripName}
                onChange={(e) => handleTripFormChange("tripName", e.target.value)}
                className="col-span-3"
                placeholder="Enter trip name"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tripType" className="text-right">
                Trip Type
              </Label>
              <Select
                value={tripFormData.tripType}
                onValueChange={(value) => handleTripFormChange("tripType", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select trip type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={tripFormData.startDate}
                onChange={(e) => handleTripFormChange("startDate", e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={tripFormData.endDate}
                onChange={(e) => handleTripFormChange("endDate", e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                value={tripFormData.description}
                onChange={(e) => handleTripFormChange("description", e.target.value)}
                className="col-span-3 p-2 border border-gray-300 rounded-md resize-none"
                rows={3}
                placeholder="Enter trip description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setTripCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleTripSubmit}
              className="bg-[#006397] hover:bg-[#02abf5] text-white"
            >
              Create Trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 