"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function TrackReportPage() {
  const [trackData, setTrackData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns based on the track report structure
  const columns = [
    {
      accessorKey: "bookingId",
      header: "Booking ID",
      sortable: true,
    },
    {
      accessorKey: "deliveryNote",
      header: "Delivery Note",
      sortable: true,
    },
    {
      accessorKey: "pickupDate",
      header: "Pickup Date",
      sortable: true,
    },
    {
      accessorKey: "pickupCity",
      header: "PickUp City",
      sortable: true,
    },
    {
      accessorKey: "pickupAddress",
      header: "Pickup Address",
      sortable: true,
    },
    {
      accessorKey: "deliveryCity",
      header: "Delivery City",
      sortable: true,
    },
    {
      accessorKey: "deliveryAddress",
      header: "Delivery Address",
      sortable: true,
    },
    {
      accessorKey: "vehicleNumber",
      header: "Vehicle Number",
      sortable: true,
    },
    {
      accessorKey: "vehicleType",
      header: "Vehicle Type",
      sortable: true,
    },
    {
      accessorKey: "total",
      header: "Total",
      sortable: true,
    },
    {
      accessorKey: "travelledKm",
      header: "Travelled KM",
      sortable: true,
    },
    {
      accessorKey: "pendingKms",
      header: "Pending KMs",
      sortable: true,
    },
    {
      accessorKey: "etaApprox",
      header: "ETA Approx.",
      sortable: true,
    },
    {
      accessorKey: "createdDate",
      header: "Created Date",
      sortable: true,
    },
  ];

  // Define filter fields based on the image
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
  ];

  // Load data on component mount
  useEffect(() => {
    const loadTrackData = async () => {
      try {
        const response = await fetch("/reports/trackReport.json");
        const data = await response.json();
        setTrackData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading track data:", error);
        setLoading(false);
      }
    };

    loadTrackData();
  }, []);

  // Handle search functionality
  const handleSearch = (formValues) => {
    let filtered = [...trackData];

    // Filter by booking ID
    if (formValues.bookingId) {
      filtered = filtered.filter(item => 
        item.bookingId.toLowerCase().includes(formValues.bookingId.toLowerCase())
      );
    }

    // Filter by date range
    if (formValues.startDate || formValues.endDate) {
      if (formValues.startDate) {
        const startDate = new Date(formValues.startDate);
        filtered = filtered.filter(item => {
          const pickupDate = new Date(item.pickupDate);
          return pickupDate >= startDate;
        });
      }
      if (formValues.endDate) {
        const endDate = new Date(formValues.endDate);
        filtered = filtered.filter(item => {
          const pickupDate = new Date(item.pickupDate);
          return pickupDate <= endDate;
        });
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
    a.download = 'track_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing report for:", row);
    // You can implement detailed view logic here
    alert(`Viewing detailed track report for ${row.bookingId} - ${row.pickupCity} to ${row.deliveryCity}`);
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
    { label: "Clear Filters", onClick: () => setFilteredData(trackData) },
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
        <div className="text-lg">Loading track report...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="Track Report"
        columns={columns}
        rows={filteredData}
        filterFields={filterFields}
        onSearch={handleSearch}
        onExport={handleExport}
        onViewReport={handleViewReport}
        showFirstIcon={false}
        showSecondIcon={false}
        showThirdIcon={true}
        filterIconMenu={filterIconMenu}
        exportIconMenu={exportIconMenu}
        viewIconMenu={viewIconMenu}
        enabledActions={["view", "export", "filter"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
