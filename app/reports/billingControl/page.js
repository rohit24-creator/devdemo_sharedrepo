"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function BillingControlReportPage() {
  const [billingData, setBillingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns based on the billing control report structure
  const columns = [
    {
      accessorKey: "serialNo",
      header: "S.No",
      sortable: true,
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      sortable: true,
    },
    {
      accessorKey: "orderId",
      header: "Order ID",
      sortable: true,
    },
    {
      accessorKey: "deliveryStatus",
      header: "Delivery Status",
      sortable: true,
    },
    {
      accessorKey: "pickupDate",
      header: "Pickup Date",
      sortable: true,
    },
    {
      accessorKey: "deliveryDate",
      header: "Delivery Date",
      sortable: true,
    },
    {
      accessorKey: "originalDocumentsReceived",
      header: "Original Documents Received",
      sortable: true,
    },
    {
      accessorKey: "originalDocumentsSent",
      header: "Original Documents Sent",
      sortable: true,
    },
    {
      accessorKey: "invoicesToCustomerExist",
      header: "Invoices To Customer Exist",
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
      name: "deliveryFromDate",
      label: "Delivery From Date",
      type: "date",
    },
    {
      name: "deliveryToDate",
      label: "Delivery To Date",
      type: "date",
    },
  ];

  // Load data on component mount
  useEffect(() => {
    const loadBillingData = async () => {
      try {
        const response = await fetch("/reports/billingControl.json");
        const data = await response.json();
        setBillingData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading billing data:", error);
        setLoading(false);
      }
    };

    loadBillingData();
  }, []);

  // Handle search functionality
  const handleSearch = (formValues) => {
    let filtered = [...billingData];

    // Filter by date range (pickup dates)
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

    // Filter by delivery date range
    if (formValues.deliveryFromDate || formValues.deliveryToDate) {
      if (formValues.deliveryFromDate) {
        const deliveryFromDate = new Date(formValues.deliveryFromDate);
        filtered = filtered.filter(item => {
          const deliveryDate = new Date(item.deliveryDate);
          return deliveryDate >= deliveryFromDate;
        });
      }
      if (formValues.deliveryToDate) {
        const deliveryToDate = new Date(formValues.deliveryToDate);
        filtered = filtered.filter(item => {
          const deliveryDate = new Date(item.deliveryDate);
          return deliveryDate <= deliveryToDate;
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
    a.download = 'billing_control_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing report for:", row);
    // You can implement detailed view logic here
    alert(`Viewing detailed billing report for ${row.customerId} - ${row.orderId}`);
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
    { label: "Clear Filters", onClick: () => setFilteredData(billingData) },
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
        <div className="text-lg">Loading billing control report...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="Billing Control Report"
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
