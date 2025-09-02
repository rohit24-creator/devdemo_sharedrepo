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

   const secondIconMenu = [
    { label: "View as Grid", onClick: () => console.log("Grid View") },
    { label: "View as Table", onClick: () => console.log("Table View") },
  ];

  const thirdIconMenu = [
    { label: "Export PDF", onClick: () => console.log("PDF Export") },
    { label: "Export Excel", onClick: () => console.log("Excel Export") },
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
          onSearch={(data) => {
          console.log("Search Triggered with values:", data);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true} 
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
}
