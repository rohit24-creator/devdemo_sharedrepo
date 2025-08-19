"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";

export default function MisReportPage() {
  const [misData, setMisData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Columns will be dynamically generated from API data
  const [columns, setColumns] = useState([]);

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

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  // Load data on component mount
  useEffect(() => {
    const loadMisData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/reports/misReport.json");
        
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || data) || [];
        
        setColumns(formattedColumns);
        setMisData(formattedRows);
        setFilteredData(formattedRows);
      } catch (error) {
        console.error("Error loading MIS data:", error);
      } finally {
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
