"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/masterList";

const claimStatusOptions = [
  "Started",
  "In-Progress",
  "Closed",
  "Waiting on Invoice",
  "Carrier MiA",
  "Filed with Carrier",
  "Claim Submitted",
  "Under Investigation",
  "Under Review",
  "Approved",
  "Rejected",
  "Resolved"
];

export default function ClaimsViewPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/bookings/claimsView.json");
        
        const formattedColumns = data?.columns?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = data?.rows || [];
        
        setColumns(formattedColumns);
        setRows(formattedRows);
        
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === id ? { ...row, claimStatus: newStatus } : row
      )
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-4">

        <ReusableTable
          title="Claims"
          columns={columns}
          rows={rows}
          enabledActions={["edit", "view", "delete"]}
          showActions={true}
          showFirstIcon={true}
          showSecondIcon={false}
          showThirdIcon={false}
          showFourthIcon={false}
          showFifthIcon={false}
          filterFields={[
            { name: "orderId", label: "Order ID", type: "text" }
          ]}
          claimStatusOptions={claimStatusOptions}
          onStatusChange={handleStatusChange}
          onSearch={(filters) => {
            let filteredRows = rows;
            if (filters.orderId) {
              filteredRows = filteredRows.filter(row => row.bookingNumber.includes(filters.orderId));
            }
            setRows(filteredRows);
          }}
        />
    </div>
  );
}
