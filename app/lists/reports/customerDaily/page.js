"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function CustomerDailyStatusPage() {
  const [customerData, setCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns based on the customer daily status report structure
  const columns = [
    {
      accessorKey: "bookingId",
      header: "Booking ID",
      sortable: true,
    },
    {
      accessorKey: "product",
      header: "Product",
      sortable: true,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      sortable: true,
    },
    {
      accessorKey: "estimatedEarlyPickup",
      header: "Estimated Early Pickup",
      sortable: true,
    },
    {
      accessorKey: "estimatedLatePickup",
      header: "Estimated Late Pickup",
      sortable: true,
    },
    {
      accessorKey: "estimatedEarlyDelivery",
      header: "Estimated Early Delivery",
      sortable: true,
    },
    {
      accessorKey: "estimatedLateDelivery",
      header: "Estimated Late Delivery",
      sortable: true,
    },
    {
      accessorKey: "pickupAddress",
      header: "PickUp Address",
      sortable: true,
    },
    {
      accessorKey: "deliveryAddress",
      header: "Delivery Address",
      sortable: true,
    },
    {
      accessorKey: "truckNumber",
      header: "Truck Number",
      sortable: true,
    },
    {
      accessorKey: "vehicleType",
      header: "Vehicle Type",
      sortable: true,
    },
    {
      accessorKey: "driverName",
      header: "Driver Name",
      sortable: true,
    },
    {
      accessorKey: "deliveryNote",
      header: "Delivery Note",
      sortable: true,
    },
    {
      accessorKey: "tripId",
      header: "Trip ID",
      sortable: true,
    },
    {
      accessorKey: "shipperName",
      header: "Shipper Name",
      sortable: true,
    },
    {
      accessorKey: "consigneeName",
      header: "Consignee Name",
      sortable: true,
    },
    {
      accessorKey: "podStatus",
      header: "POD Status",
      sortable: true,
    },
    {
      accessorKey: "lastStatus",
      header: "Last Status",
      sortable: true,
    },
    {
      accessorKey: "lastStatusCreatedDate",
      header: "Last Status Created Date",
      sortable: true,
    },
  ];

  // Define filter fields based on the images
  const filterFields = [
    {
      name: "startDate",
      label: "From Date",
      type: "date",
    },
    {
      name: "endDate",
      label: "To Date",
      type: "date",
    },
    {
      name: "bookingId",
      label: "Booking ID",
      type: "text",
    },
    {
      name: "customerId",
      label: "Customer ID",
      type: "text",
    },
  ];

  // Load data on component mount
  useEffect(() => {
    const loadCustomerData = async () => {
      try {
        const response = await fetch("/reports/customerDailyStatus.json");
        const data = await response.json();
        setCustomerData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading customer data:", error);
        setLoading(false);
      }
    };

    loadCustomerData();
  }, []);

  // Handle search functionality
  const handleSearch = (formValues) => {
    let filtered = [...customerData];

    // Filter by booking ID
    if (formValues.bookingId) {
      filtered = filtered.filter(item => 
        item.bookingId.toLowerCase().includes(formValues.bookingId.toLowerCase())
      );
    }

    // Filter by customer ID (using customer name as proxy)
    if (formValues.customerId) {
      filtered = filtered.filter(item => 
        item.customer.toLowerCase().includes(formValues.customerId.toLowerCase())
      );
    }

    // Filter by date range (simplified - you can add date fields to your data)
    if (formValues.startDate || formValues.endDate) {
      // For demo purposes, we'll use the ID as a date proxy
      if (formValues.startDate) {
        const startId = parseInt(formValues.startDate.split('-')[2]) || 1;
        filtered = filtered.filter(item => item.id >= startId);
      }
      if (formValues.endDate) {
        const endId = parseInt(formValues.endDate.split('-')[2]) || 10;
        filtered = filtered.filter(item => item.id <= endId);
      }
    }

    setFilteredData(filtered);
  };

  // Handle export functionality
  const handleExport = () => {
    const csvContent = [
      // CSV header
      columns.map(col => col.header).join(','),
      // CSV data
      ...filteredData.map(row => 
        columns.map(col => `"${row[col.accessorKey] || ''}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_daily_status_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing report for:", row);
    // You can implement detailed view logic here
    alert(`Viewing detailed report for ${row.customer} - ${row.bookingId}`);
  };

  // Handle action clicks
  const handleActionClick = (action, row) => {
    switch (action) {
      case "view":
        handleViewReport(row);
        break;
      case "export":
        handleExport();
        break;
      case "filter":
        console.log("Filter action clicked for:", row);
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  // Handle advanced search functionality
  const handleAdvancedSearch = () => {
    console.log("Opening advanced search dialog");
    // You can implement a modal or dialog for advanced search here
    alert("Advanced Search - This would open a detailed search form with more options");
  };

  // Define menu items for icons
  const filterIconMenu = [
    { label: "Advanced Search", onClick: handleAdvancedSearch },
    { label: "Clear Filters", onClick: () => setFilteredData(customerData) },
  ];

  // Handle different export formats
  const handleExportToExcel = () => {
    console.log("Exporting to Excel");
    alert("Export to Excel - This would generate an Excel file");
  };

  const handleExportToPDF = () => {
    console.log("Exporting to PDF");
    alert("Export to PDF - This would generate a PDF report");
  };

  const exportIconMenu = [
    { label: "Export to CSV", onClick: handleExport },
    { label: "Export to Excel", onClick: handleExportToExcel },
    { label: "Export to PDF", onClick: handleExportToPDF },
  ];

  const viewIconMenu = [
    { label: "View Details", onClick: () => console.log("View details") },
    { label: "Print Report", onClick: () => console.log("Print report") },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading customer daily status reports...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="Customer Daily Status Report"
        columns={columns}
        rows={filteredData}
        filterFields={filterFields}
        onSearch={handleSearch}
        onExport={handleExport}
        onViewReport={handleViewReport}
        showFilterIcon={true}
        showExportIcon={true}
        showViewIcon={true}
        filterIconMenu={filterIconMenu}
        exportIconMenu={exportIconMenu}
        viewIconMenu={viewIconMenu}
        enabledActions={["view", "export", "filter"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
