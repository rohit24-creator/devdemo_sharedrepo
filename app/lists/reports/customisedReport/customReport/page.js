"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function CustomReportPage() {
  const [customReportData, setCustomReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns based on the Customized Report structure
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
      accessorKey: "shipperCity",
      header: "Shipper City",
      sortable: true,
    },
    {
      accessorKey: "shipperPostalCode",
      header: "Shipper Postal Code",
      sortable: true,
    },
    {
      accessorKey: "consigneeName",
      header: "Consignee",
      sortable: true,
    },
    {
      accessorKey: "consigneeStreetAndHouseNumber",
      header: "Consignee Street and House Number",
      sortable: true,
    },
    {
      accessorKey: "consigneeCity",
      header: "Consignee City",
      sortable: true,
    },
    {
      accessorKey: "consigneePostalCode",
      header: "Consignee Postal Code",
      sortable: true,
    },
    {
      accessorKey: "product",
      header: "Product",
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
    {
      name: "companyName",
      label: "Select Company",
      type: "select",
      options: [
        "All",
        "HETERO PHARMA",
        "CEREAL PARTNERS",
        "NESTLE",
        "JTC LOGISTICS"
      ],
    },
  ];

  // Load data on component mount
  useEffect(() => {
    const loadCustomReportData = async () => {
      try {
        const response = await fetch("/reports/customReport.json");
        const data = await response.json();
        setCustomReportData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading custom report data:", error);
        setLoading(false);
      }
    };

    loadCustomReportData();
  }, []);

  // Handle search functionality
  const handleSearch = (formValues) => {
    let filtered = [...customReportData];

    // Filter by booking ID
    if (formValues.bookingId) {
      filtered = filtered.filter(item => 
        item.bookingId.toLowerCase().includes(formValues.bookingId.toLowerCase())
      );
    }

    // Filter by company name
    if (formValues.companyName && formValues.companyName !== "All") {
      filtered = filtered.filter(item => 
        item.companyName === formValues.companyName ||
        item.shipperName.includes(formValues.companyName) ||
        item.consigneeName.includes(formValues.companyName)
      );
    }

    // Filter by date range
    if (formValues.startDate || formValues.endDate) {
      if (formValues.startDate) {
        const startDate = new Date(formValues.startDate);
        filtered = filtered.filter(item => {
          // Using order ID as proxy for date since we don't have actual dates
          const orderDate = new Date(2024, 1, 14); // February 14, 2024
          return orderDate >= startDate;
        });
      }
      if (formValues.endDate) {
        const endDate = new Date(formValues.endDate);
        filtered = filtered.filter(item => {
          // Using order ID as proxy for date since we don't have actual dates
          const orderDate = new Date(2024, 1, 27); // February 27, 2024
          return orderDate <= endDate;
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
    a.download = 'custom_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing custom report for:", row);
    // You can implement detailed view logic here
    alert(`Viewing custom report for ${row.orderId} - ${row.shipperName} to ${row.consigneeName}`);
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

  // Handle print functionality
  const handlePrint = () => {
    console.log("Printing report");
    alert("Print Report - This would print the current report");
  };

  // Define menu items for icons
  const filterIconMenu = [
    { label: "Advanced Search", onClick: handleAdvancedSearch },
    { label: "Clear Filters", onClick: () => setFilteredData(customReportData) },
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
    { label: "Print Report", onClick: handlePrint },
  ];

  const viewIconMenu = [
    { label: "View Details", onClick: () => console.log("View details") },
    { label: "Edit Report", onClick: () => console.log("Edit report") },
    { label: "Delete Report", onClick: () => console.log("Delete report") },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading custom report...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="Customized Report"
        columns={columns}
        rows={filteredData}
        filterFields={filterFields}
        onSearch={handleSearch}
        onExport={handleExport}
        onViewReport={handleViewReport}
        showFirstIcon={true}
        showSecondIcon={true}
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
