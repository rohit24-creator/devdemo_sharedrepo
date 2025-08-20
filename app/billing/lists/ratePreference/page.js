"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { formatRowsWithId } from "@/lib/utils";

export default function RatePreferenceListPage() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterFields = [
    { name: "rateReferenceId", label: "Rate Reference ID", type: "text" },
    { name: "rateReferenceName", label: "Rate Reference Name", type: "text" },
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
  ];

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  const handleActionClick = (action, row) => {
    if (action === "delete") {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/billing/ratePreferenceList.json");
        
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || []);
        
        setRows(formattedRows);
        setColumns(formattedColumns);
        
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
      <BillingList
        title="Rate Preference List"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("Rate Preference search:", values);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={[]}
        thirdIconMenu={[]}
        showActions={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
