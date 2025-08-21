"use client";

import { useState, useEffect } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";

export default function CustomReportSettingPage() {
  const [customReportData, setCustomReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Define columns based on the Customized Report Settings structure
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      accessorKey: "companyCode",
      header: "Company Code",
      sortable: true,
    },
    {
      accessorKey: "branchCode",
      header: "Branch Code",
      sortable: true,
    },
    {
      accessorKey: "description",
      header: "Description",
      sortable: true,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      sortable: true,
    },
    {
      accessorKey: "createdDate",
      header: "Created Date",
      sortable: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      sortable: true,
    },
    {
      accessorKey: "reportType",
      header: "Report Type",
      sortable: true,
    },
    {
      accessorKey: "lastModified",
      header: "Last Modified",
      sortable: true,
    },
    {
      accessorKey: "isDefault",
      header: "Is Default",
      sortable: true,
    },
  ];

  // Define filter fields based on the image
  const filterFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
  ];

  // Load data on component mount
  useEffect(() => {
    const loadCustomReportData = async () => {
      try {
        const response = await fetch("/reports/customReportSetting.json");
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

    // Filter by name
    if (formValues.name) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(formValues.name.toLowerCase())
      );
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
    a.download = 'custom_report_settings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle view report functionality
  const handleViewReport = (row) => {
    console.log("Viewing custom report settings for:", row);
    // You can implement detailed view logic here
    alert(`Viewing custom report settings for ${row.name} - ${row.companyCode}/${row.branchCode}`);
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

  // Handle grid view functionality
  const handleGridView = () => {
    console.log("Switching to grid view");
    alert("Grid View - This would switch to a grid layout view");
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
  ];

  const viewIconMenu = [
    { label: "View Details", onClick: () => console.log("View details") },
    { label: "Edit Settings", onClick: () => console.log("Edit settings") },
    { label: "Delete Report", onClick: () => console.log("Delete report") },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading custom report settings...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <ReportsList
        title="Customized Report Settings"
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
