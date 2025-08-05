"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function FinancialReportsPage() {
  const [financialData, setFinancialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns based on the financial report structure
  const columns = [
    {
      accessorKey: "trackingNo",
      header: "TrackingNo",
      sortable: true,
    },
    {
      accessorKey: "custRefNo",
      header: "Cust.RefNo",
      sortable: true,
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      sortable: true,
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      sortable: true,
    },
    {
      accessorKey: "revenueLine",
      header: "Revenue Line",
      sortable: true,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      sortable: true,
    },
    {
      accessorKey: "code",
      header: "Code",
      sortable: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      accessorKey: "bu",
      header: "BU",
      sortable: true,
    },
    {
      accessorKey: "jobFileNumber",
      header: "Job File Number",
      sortable: true,
    },
    {
      accessorKey: "invoiceNo",
      header: "Invoice No",
      sortable: true,
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      sortable: true,
    },
  ];

  // Define filter fields
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
      name: "status",
      label: "Select Status",
      type: "select",
      options: [
        "All",
        "Paid",
        "Pending",
        "Overdue",
        "Cancelled"
      ],
    },
    {
      name: "customer",
      label: "Select Customer",
      type: "select",
      options: [
        "All",
        "ABC Logistics Ltd",
        "XYZ Transport Co",
        "Global Shipping Inc",
        "Maritime Solutions",
        "Express Cargo Ltd",
        "Ocean Freight Co",
        "Air Cargo Express",
        "Land Transport Ltd",
        "Rail Cargo Services",
        "Container Solutions"
      ],
    },
  ];

  // Load data on component mount
  useEffect(() => {
    const loadFinancialData = async () => {
      try {
        const response = await fetch("/reports/financialreport.json");
        const data = await response.json();
        setFinancialData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading financial data:", error);
        setLoading(false);
      }
    };

    loadFinancialData();
  }, []);

  // Handle search functionality
  const handleSearch = (formValues) => {
    let filtered = [...financialData];

    // Filter by customer
    if (formValues.customer && formValues.customer !== "All") {
      filtered = filtered.filter(item => 
        item.customerName === formValues.customer
      );
    }

    // Filter by status (simplified - you can add status field to your data)
    if (formValues.status && formValues.status !== "All") {
      // For demo purposes, we'll filter by amount ranges as status
      switch (formValues.status) {
        case "Paid":
          filtered = filtered.filter(item => item.amount > 2000);
          break;
        case "Pending":
          filtered = filtered.filter(item => item.amount <= 1000);
          break;
        case "Overdue":
          filtered = filtered.filter(item => item.amount > 1000 && item.amount <= 2000);
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
    a.download = 'financial_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing report for:", row);
    // You can implement detailed view logic here
    alert(`Viewing detailed report for ${row.customerName} - ${row.trackingNo}`);
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
    { label: "Clear Filters", onClick: () => setFilteredData(financialData) },
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
        <div className="text-lg">Loading financial reports...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="Financial Reports"
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
