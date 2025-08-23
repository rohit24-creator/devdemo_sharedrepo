"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/masterList";
import { DASHBOARD_ROUTES } from "@/lib/dashboardRoutes";
import { formatRowsWithId } from "@/lib/utils";

export default function BatteryPage() {
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterFields = [
    { name: "vehicleNumber", label: "Vehicle No.", value: "" }
  ];

  // Action handler for actions like Edit, View, Delete
  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    } else {
      console.log("Unknown action", action, row);
    }
  };

  // Menu configurations
  const secondIconMenu = [
    { label: "+ Add New", onClick: () => router.push(DASHBOARD_ROUTES.battery) },
    { label: "Battery Template", onClick: () => console.log("Battery Template") },
    { label: "Upload Excel", onClick: () => console.log("Upload Excel") },
  ];

  const thirdIconMenu = [
    { label: "PDF", onClick: () => console.log("PDF") },
    { label: "Excel", onClick: () => console.log("Excel") },
    { label: "Print", onClick: () => console.log("Print") },
  ];

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/dashboard/maintenance/battery.json");

        // Format columns
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        // Add unique ID to each row 
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
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-6">
      <ReusableTable
        title="Battery"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(data) => console.log("Search:", data)}
        showActions={true}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        showFourthIcon={false}
        showFifthIcon={false}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
}