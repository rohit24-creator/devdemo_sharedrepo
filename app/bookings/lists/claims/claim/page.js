"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";

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

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/claimsView.json");
      const data = await res.json();
      setColumns(data.columns || []);
      setRows(data.rows || []);
      setLoading(false);
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
