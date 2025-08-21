"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/masterList";
import { Edit, Eye, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { MASTER_ROUTES } from "@/lib/masterRoutes";

export default function PartnerDetailsPage() {
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { name: "customerCode", label: "Customer Code" },
    { name: "cid", label: "CID" },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: ["India", "USA", "Germany"],
    },
    {
      name: "branchCode",
      label: "Branch Code",
      type: "select",
      options: ["HYD", "BNG", "CHN"],
    },
    {
      name: "partyType",
      label: "Party Type",
      type: "select",
      options: ["Individual", "Company"],
    },
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
    { label: "+ Add New", onClick: () => router.push(MASTER_ROUTES.partnerDetails) },
    { label: "Business Partner Template", onClick: () => console.log("Business Partner Template") },
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
        
        const { data } = await api.get("/masters/partnerData.json");

        // Format columns
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        // Add unique ID to each row 
        const formattedRows = (data?.rows || []).map((row, index) => ({
          ...row,
          id: row.id || uuidv4() || `row-${index}`,
        }));

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
    <div className="p-4">
      <ReusableTable
        title="Partner Details"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        formValues={formValues}
        setFormValues={setFormValues}
        onSearch={(data) => {
          console.log("Search Triggered with values:", data);
        }}
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
