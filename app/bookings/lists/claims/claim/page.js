"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/bookingList";
import { BOOKING_ROUTES } from "@/lib/bookingRoutes";
import { formatRowsWithId } from "@/lib/utils";

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
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const secondIconMenu = [
    {
      label: "+ Add New",
      onClick: () => router.push(BOOKING_ROUTES.claim)
    }
  ];
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
          showFirstIcon={false}
          showSecondIcon={true}
          showThirdIcon={false}
          showFourthIcon={false}
          filterFields={[
            { name: "orderId", label: "Order ID", type: "text" }
          ]}
          claimStatusOptions={claimStatusOptions}
          onStatusChange={handleStatusChange}
          secondIconMenu={secondIconMenu}
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
