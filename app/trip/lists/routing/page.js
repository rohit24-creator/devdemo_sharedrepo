"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2, History } from "lucide-react";
import { formatRowsWithId } from "@/lib/utils";
import { TRIP_ROUTES } from "@/lib/tripRoutes";

export default function RoutingListingPage() {
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
        
        const { data } = await api.get("/trips/routingData.json");
        
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
      name: "customerName", 
      label: "Customer Code"
    },

    { 
      name: "service", 
      label: "Service", 
      type: "select",
      options: ["AsiaLink LTL", "FTL Oil&Gas", "Oil&Gas", "Express Delivery", "Bulk Transport", "International", "Same Day", "Economy"]
    },
    { 
      name: "status", 
      label: "Status", 
      type: "select",
      options: ["AsiaLink LTL", "FTL Oil&Gas", "Oil&Gas", "Express Delivery", "Bulk Transport", "International", "Same Day", "Economy"]
    },
  ];

  // Central action handler
  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit routing", row);
    } else if (action === "view") {
      console.log("View routing", row);
    } 
  };

  const handleSearch = (searchData) => {
    console.log("Search filters:", searchData);
  };

  const secondIconMenu = [
    { label: "+ Add New", onClick: () => router.push(TRIP_ROUTES.routing) },
    { label: "Region Template", onClick: () => console.log("Region Template") },
    { label: "Upload Region", onClick: () => console.log("Upload Region") },
  ];

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
        title="Routing List"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={handleSearch}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
} 