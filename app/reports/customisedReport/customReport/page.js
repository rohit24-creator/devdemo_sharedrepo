"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";

export default function CustomReportPage() {
  const [customReportData, setCustomReportData] = useState([]);
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

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  // Load data on component mount
  useEffect(() => {
    const loadCustomReportData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/reports/customReport.json");
        
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || data) || [];
        
        setColumns(formattedColumns);
        setCustomReportData(formattedRows);
        setFilteredData(formattedRows);
      } catch (error) {
        console.error("Error loading custom report data:", error);
      } finally {
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
