"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";

export default function TripReportsPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);


  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { name: "tripVehicle", label: "Trip Vehicle" },
    { 
      name: "shipmentType", 
      label: "Shipment Type", 
      type: "select",
      options: ["Express", "Standard", "Economy", "Premium"]
    },
    { name: "regularInput", label: "Regular Input" }
  ];



  const secondIconMenu = [
    { label: "View as Grid", onClick: () => console.log("Grid View") },
    { label: "View as Table", onClick: () => console.log("Table View") },
  ];

  const thirdIconMenu = [
    { label: "Export PDF", onClick: () => console.log("PDF Export") },
    { label: "Export Excel", onClick: () => console.log("Excel Export") },
  ];

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/reports/tripReports.json");

        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || []);
        setColumns(formattedColumns);
        setRows(formattedRows);
      } catch (err) {
        console.error("Error fetching trip reports data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading trip reports...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ReportsList
        title="Trip Reports"
        columns={columns}
        rows={rows}
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
