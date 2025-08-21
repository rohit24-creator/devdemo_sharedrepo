"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/masterList";
import { formatRowsWithId } from "@/lib/utils";


export default function ReturnTrucksListingPage() {
  const router = useRouter();
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
        
        const { data } = await api.get("/trips/returnTrucksData.json");
        
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
    { 
      name: "fromDate", 
      label: "From Date",
      type: "date"
    },
    { 
      name: "toDate", 
      label: "To Date",
      type: "date"
    }
  ];

  // Central action handler
  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit return truck", row);
    } else if (action === "view") {
      console.log("View return truck", row);
    } 
  };

  const handleSearch = (searchData) => {
    console.log("Search filters:", searchData);
  };

  const thirdIconMenu = [
    { label: "Export Excel", onClick: () => console.log("Export Excel") },
    { label: "Export PDF", onClick: () => console.log("Export PDF") },
    { label: "Print Report", onClick: () => console.log("Print Report") },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-4">
      <ReusableTable
        title="Return Trucks List"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={handleSearch}
        showFirstIcon={false}
        showSecondIcon={false}
        showThirdIcon={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
} 