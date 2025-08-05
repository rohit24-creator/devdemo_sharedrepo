"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function MisReportPage() {
  const [misData, setMisData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns based on the MIS report structure
  const columns = [
    {
      accessorKey: "serialNo",
      header: "S.No",
      sortable: true,
    },
    {
      accessorKey: "docketNumber",
      header: "Docket Number",
      sortable: true,
    },
    {
      accessorKey: "origin",
      header: "Origin",
      sortable: true,
    },
    {
      accessorKey: "yearMonth",
      header: "YEAR & MONTH",
      sortable: true,
    },
    {
      accessorKey: "orderNumber",
      header: "Order Number",
      sortable: true,
    },
    {
      accessorKey: "sid",
      header: "SID",
      sortable: true,
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
      sortable: true,
    },
    {
      accessorKey: "manifestDate",
      header: "Manifest Date",
      sortable: true,
    },
    {
      accessorKey: "pickupDate",
      header: "Pickup Date",
      sortable: true,
    },
    {
      accessorKey: "currentStatus",
      header: "Current Status",
      sortable: true,
    },
    {
      accessorKey: "statusType",
      header: "Status Type",
      sortable: true,
    },
    {
      accessorKey: "destination",
      header: "Desti",
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
      name: "status",
      label: "Select Status",
      type: "select",
      options: [
        "All",
        "In Transit",
        "Delivered",
        "Pending",
        "Failed"
      ],
    },
    {
      name: "docketNumber",
      label: "Docket Number",
      type: "text",
    },
    {
      name: "carrier",
      label: "Select Carrier",
      type: "select",
      options: [
        "All",
        "Carrier A",
        "Carrier B",
        "Carrier C",
        "Carrier D"
      ],
    },
  ];

  // Load data on component mount
  useEffect(() => {
    const loadMisData = async () => {
      try {
        const response = await fetch("/reports/misReport.json");
        const data = await response.json();
        setMisData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading MIS data:", error);
        setLoading(false);
      }
    };

    loadMisData();
  }, []);

  // Handle search functionality
  const handleSearch = (formValues) => {
    let filtered = [...misData];

    // Filter by docket number
    if (formValues.docketNumber) {
      filtered = filtered.filter(item => 
        item.docketNumber.toLowerCase().includes(formValues.docketNumber.toLowerCase())
      );
    }

    // Filter by status
    if (formValues.status && formValues.status !== "All") {
      filtered = filtered.filter(item => 
        item.currentStatus === formValues.status
      );
    }

    // Filter by carrier (using SID as proxy)
    if (formValues.carrier && formValues.carrier !== "All") {
      filtered = filtered.filter(item => 
        item.sid.includes(formValues.carrier.split(" ")[1])
      );
    }

    // Filter by date range
    if (formValues.startDate || formValues.endDate) {
      if (formValues.startDate) {
        const startDate = new Date(formValues.startDate);
        filtered = filtered.filter(item => {
          const orderDate = new Date(item.orderDate);
          return orderDate >= startDate;
        });
      }
      if (formValues.endDate) {
        const endDate = new Date(formValues.endDate);
        filtered = filtered.filter(item => {
          const orderDate = new Date(item.orderDate);
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
    a.download = 'mis_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing report for:", row);
    // You can implement detailed view logic here
    alert(`Viewing detailed MIS report for ${row.docketNumber} - ${row.origin} to ${row.destination}`);
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
    { label: "Clear Filters", onClick: () => setFilteredData(misData) },
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
        <div className="text-lg">Loading MIS report...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="MIS Report"
        columns={columns}
        rows={filteredData}
        filterFields={filterFields}
        onSearch={handleSearch}
        onExport={handleExport}
        onViewReport={handleViewReport}
        showFirstIcon={true}
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
