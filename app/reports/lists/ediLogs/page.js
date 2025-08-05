"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function EdiTransactionsPage() {
  const [ediData, setEdiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns based on the EDI transaction structure
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      accessorKey: "type",
      header: "Type",
      sortable: true,
    },
    {
      accessorKey: "boundedType",
      header: "Bounded Type",
      sortable: true,
    },
    {
      accessorKey: "formatType",
      header: "Format Type",
      sortable: true,
    },
    {
      accessorKey: "objectName",
      header: "Object Name",
      sortable: true,
    },
    {
      accessorKey: "transactionObjectId",
      header: "Transaction Object ID",
      sortable: true,
    },
    {
      accessorKey: "request",
      header: "Request",
      sortable: true,
    },
    {
      accessorKey: "response",
      header: "Response",
      sortable: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      sortable: true,
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
      sortable: true,
    },
    {
      accessorKey: "companyCode",
      header: "Company Code",
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
      name: "name",
      label: "Name's",
      type: "select",
      options: [
        "All",
        "Order Confirmation",
        "Shipment Notification",
        "Invoice",
        "Purchase Order",
        "Advanced Shipping Notice",
        "Payment Order",
        "Functional Acknowledgment",
        "Inventory Inquiry",
        "Price Catalog",
        "Remittance Advice",
        "Shipment Status",
        "Order Change",
        "Delivery Schedule",
        "Product Activity",
        "Planning Schedule"
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        "All",
        "Success",
        "Pending",
        "Failed"
      ],
    },
    {
      name: "transactionObjectId",
      label: "Transaction Object ID",
      type: "text",
    },
  ];

  // Load data on component mount
  useEffect(() => {
    const loadEdiData = async () => {
      try {
        const response = await fetch("/reports/ediTransactions.json");
        const data = await response.json();
        setEdiData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading EDI data:", error);
        setLoading(false);
      }
    };

    loadEdiData();
  }, []);

  // Handle search functionality
  const handleSearch = (formValues) => {
    let filtered = [...ediData];

    // Filter by name
    if (formValues.name && formValues.name !== "All") {
      filtered = filtered.filter(item => 
        item.name === formValues.name
      );
    }

    // Filter by status
    if (formValues.status && formValues.status !== "All") {
      filtered = filtered.filter(item => 
        item.status === formValues.status
      );
    }

    // Filter by transaction object ID
    if (formValues.transactionObjectId) {
      filtered = filtered.filter(item => 
        item.transactionObjectId.toLowerCase().includes(formValues.transactionObjectId.toLowerCase())
      );
    }

    // Filter by date range
    if (formValues.startDate || formValues.endDate) {
      if (formValues.startDate) {
        const startDate = new Date(formValues.startDate);
        filtered = filtered.filter(item => {
          const createdDate = new Date(item.createdOn);
          return createdDate >= startDate;
        });
      }
      if (formValues.endDate) {
        const endDate = new Date(formValues.endDate);
        filtered = filtered.filter(item => {
          const createdDate = new Date(item.createdOn);
          return createdDate <= endDate;
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
    a.download = 'edi_transactions_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing report for:", row);
    // You can implement detailed view logic here
    alert(`Viewing detailed EDI transaction for ${row.name} - ${row.transactionObjectId}`);
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
    { label: "Clear Filters", onClick: () => setFilteredData(ediData) },
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
        <div className="text-lg">Loading EDI transactions...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="EDI Transaction"
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
