"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";

export default function SpeedReports() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { 
      name: "allCarriers", 
      label: "All Carriers", 
      type: "filterSelect",
      options: ["Carrier A", "Carrier B", "Carrier C", "Carrier D", "Carrier E", "Carrier F", "Carrier G", "Carrier H"]
    },
    { 
      name: "drivers", 
      label: "Drivers", 
      type: "filterSelect",
      options: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown", "Lisa Davis", "Tom Wilson", "Emma Taylor"]
    }
  ];

  const secondIconMenu = [
    { label: "Export to Excel", onClick: () => console.log("Export to Excel") },
    { label: "Export to PDF", onClick: () => console.log("Export to PDF") },
    { label: "Print Report", onClick: () => console.log("Print Report") }
  ];

  const thirdIconMenu = [
    { label: "Refresh Data", onClick: () => console.log("Refresh Data") },
    { label: "Settings", onClick: () => console.log("Settings") }
  ];

  const handleSearch = (formValues) => {
    console.log("Search with values:", formValues);
  };

  // Simple axios instance
  const api = axios.create({
  timeout: 30000,
});

  // Improved fetch function with axios
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await api.get("/reports/speedReports.json");
      
      const formattedColumns = data?.headers?.map((header) => ({
        accessorKey: header.accessorKey,
        header: header.header,
        sortable: true,
      })) || [];

      const formattedRows = formatRowsWithId(data?.rows || []);
      
      setColumns(formattedColumns);
      setRows(formattedRows);
      
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Simple loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-4">
      <ReportsList
        title="Speed Reports"
        columns={columns}
        rows={rows}
        filterFields={filterFields}
        onSearch={handleSearch}
        showActions={false}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
} 