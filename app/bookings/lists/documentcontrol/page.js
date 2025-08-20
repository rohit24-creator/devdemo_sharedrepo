"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { formatRowsWithId } from "@/lib/utils";

export default function DocumentControlPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
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
        
        const { data } = await api.get("/documentcontrol.json");
        
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
    fetchData();
  }, []);

  const filterFields = [
    { name: "bookingId", label: "Booking ID" },
    { name: "carrier", label: "Carrier" },
    { name: "customer", label: "Customer" },
  ];

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-4">
      <ReusableTable
        title="Document Control"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={false}
        showSecondIcon={true}
        showThirdIcon={true}
        showFourthIcon={false}
        showFifthIcon={false}
        enabledActions={["edit", "view", "delete", "copyOrder", "reverseOrder", "generateTWB", "printLabel"]}
        onActionClick={handleActionClick}
        secondIconMenu={[
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") },
        ]}
        thirdIconMenu={[
          { label: "Money View", onClick: () => console.log("Money View") },
        ]}
        fifthIconMenu={[
          { label: "Bell Action 1", onClick: () => console.log("Bell Action 1") },
          { label: "Bell Action 2", onClick: () => console.log("Bell Action 2") },
        ]}
      />
    </div>
  );
}
