"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/masterList";
import { Edit, Eye, Trash2 } from "lucide-react";
import { formatRowsWithId } from "@/lib/utils";
import { MASTER_ROUTES } from "@/lib/masterRoutes";

export default function DriverViewPage() {
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/masters/Drivers.json");
        
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || []);
        
        setColumns(formattedColumns);
        setRows(formattedRows);
        
      } catch (error) {
        setError(error.message || "Failed to fetch data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterFields = [
    { name: "name", label: "Driver Name" },
    { name: "city", label: "City" },
    { name: "driverType", label: "Driver Type" }
  ];

  // Action handler for actions like Edit, View, Delete
  const handleActionClick = (action, row) => {
    console.log("Action clicked:", action, "Row:", row);
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    } else if (action === "tripHistory") {
      console.log("Trip History row", row);
      // alert(`Trip History for driver`);
    } else {
      console.log("Unknown action", action, row);
    }
  };

  // Menu configurations
  const secondIconMenu = [
    { label: "+ Add New", onClick: () => router.push(MASTER_ROUTES.Drivers) },
    { label: "Driver Template", onClick: () => console.log("Driver Template") },
    { label: "Upload Excel", onClick: () => console.log("Upload Excel") },
  ];

  const thirdIconMenu = [
    { label: "PDF", onClick: () => console.log("PDF") },
    { label: "Excel", onClick: () => console.log("Excel") },
    { label: "Print", onClick: () => console.log("Print") },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-4">
      <ReusableTable
        title="Driver List"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        formValues={formValues}
        setFormValues={setFormValues}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        enabledActions={["edit", "view", "delete", "tripHistory"]}
        onActionClick={handleActionClick}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
}
