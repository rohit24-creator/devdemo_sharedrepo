"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function AllRoundBigReportPage() {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns based on the all round big report structure
  const columns = [
    {
      accessorKey: "orderId",
      header: "Order ID",
      sortable: true,
    },
    {
      accessorKey: "deliveryOrderNo",
      header: "Delivery Order No.",
      sortable: true,
    },
    {
      accessorKey: "purchaseOrderNo",
      header: "Purchase Order No.",
      sortable: true,
    },
    {
      accessorKey: "orderCreatedDate",
      header: "Order Created Date",
      sortable: true,
    },
    {
      accessorKey: "orderPickupDate",
      header: "Order Pick-up Date and Time",
      sortable: true,
    },
    {
      accessorKey: "orderDeliveryDate",
      header: "Order Delivery Date and Time",
      sortable: true,
    },
    {
      accessorKey: "shipperId",
      header: "Shipper ID",
      sortable: true,
    },
    {
      accessorKey: "shipperCid",
      header: "Shipper CID",
      sortable: true,
    },
    {
      accessorKey: "shipperAconDebitorCode",
      header: "Shipper ACON Debitor Code",
      sortable: true,
    },
    {
      accessorKey: "shipperShLoginAccount",
      header: "Shipper Sh Login Account",
      sortable: true,
    },
    {
      accessorKey: "shipperVatRegistrationNumber",
      header: "Shipper VAT Registration Number",
      sortable: true,
    },
    {
      accessorKey: "shipperTaxPayerId",
      header: "Shipper Tax Payer ID",
      sortable: true,
    },
    {
      accessorKey: "shipperName",
      header: "Shipper Name",
      sortable: true,
    },
    {
      accessorKey: "shipperStreetAndHouseNumber",
      header: "Shipper Street and House Number",
      sortable: true,
    },
    {
      accessorKey: "shipperPostalCode",
      header: "Shipper Postal Code",
      sortable: true,
    },
    {
      accessorKey: "shipperCountryName",
      header: "Shipper Country Name",
      sortable: true,
    },
    {
      accessorKey: "shipperPhone",
      header: "Shipper Phone",
      sortable: true,
    },
    {
      accessorKey: "shipperEmail",
      header: "Shipper Email",
      sortable: true,
    },
    {
      accessorKey: "consigneeId",
      header: "Consignee ID",
      sortable: true,
    },
    {
      accessorKey: "consigneeCid",
      header: "Consignee CID",
      sortable: true,
    },
    {
      accessorKey: "consigneeAconDebitorCode",
      header: "Consignee ACON Debitor Code",
      sortable: true,
    },
    {
      accessorKey: "consigneeShLoginAccount",
      header: "Consignee Sh Login Account",
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
      name: "status",
      label: "Status",
      type: "select",
      options: [
        "All",
        "ACTIVE",
        "INACTIVE",
        "PENDING",
        "COMPLETED",
        "CANCELLED"
      ],
    },
  ];

  // Load data on component mount
  useEffect(() => {
    const loadReportData = async () => {
      try {
        const response = await fetch("/reports/allRoundBigReport.json");
        const data = await response.json();
        setReportData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading report data:", error);
        setLoading(false);
      }
    };

    loadReportData();
  }, []);

  // Handle search functionality
  const handleSearch = (formValues) => {
    let filtered = [...reportData];

    // Filter by booking ID (using order ID as proxy)
    if (formValues.bookingId) {
      filtered = filtered.filter(item => 
        item.orderId.toLowerCase().includes(formValues.bookingId.toLowerCase())
      );
    }

    // Filter by status (simplified - you can add status field to your data)
    if (formValues.status && formValues.status !== "All") {
      // For demo purposes, we'll filter by order ID patterns as status
      switch (formValues.status) {
        case "ACTIVE":
          filtered = filtered.filter(item => item.id <= 5);
          break;
        case "INACTIVE":
          filtered = filtered.filter(item => item.id > 5);
          break;
        case "PENDING":
          filtered = filtered.filter(item => item.id % 2 === 0);
          break;
        case "COMPLETED":
          filtered = filtered.filter(item => item.id % 2 === 1);
          break;
        case "CANCELLED":
          filtered = filtered.filter(item => item.id > 8);
          break;
        default:
          break;
      }
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
    a.download = 'all_round_big_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing report for:", row);
    // You can implement detailed view logic here
    alert(`Viewing detailed report for ${row.shipperName} - ${row.orderId}`);
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
    { label: "Clear Filters", onClick: () => setFilteredData(reportData) },
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
        <div className="text-lg">Loading all round big report...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="All Round Big Report"
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