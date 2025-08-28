"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";

export default function TruckerVolumeReport() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter fields for trucker volume report
  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { 
      name: "status", 
      label: "Status", 
      type: "select",
      options: ["Pending", "In Transit", "Delivered", "Cancelled", "Returned"]
    },
    { 
      name: "carrier", 
      label: "Carrier", 
      type: "filterSelect",
      options: ["Carrier A", "Carrier B", "Carrier C", "Carrier D", "Carrier E", "Carrier F", "Carrier G", "Carrier H"]
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/reports/operationalReport/truckerVolume.json");

        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || []);
        setColumns(formattedColumns);
        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching trucker volume report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading trucker volume report...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ReportsList
        title="Trucker Volume Report"
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