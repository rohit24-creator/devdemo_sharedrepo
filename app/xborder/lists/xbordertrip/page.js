"use client";

import { useEffect, useState } from "react";
import ReusableMassStatus from "@/components/ui/reusableComponent/reusablemasstatus";

export default function MassStatusPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([
    { name: "bookingId", label: "Booking ID", value: "" },
    { name: "tripId", label: "Trip ID", value: "" },
    { name: "containerNumber", label: "Container Number", value: "" },
    { name: "carrierDriver", label: "Carrier / Driver", value: "" },
  ]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/masstatusView.json");
      const data = await res.json();
      setColumns(data.columns || []);
      setRows(data.rows || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Row selection state
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter change handler
  const handleFilterChange = (name, value) => {
    setFilters((prev) => prev.map(f => f.name === name ? { ...f, value } : f));
  };

  // Search handler (simple filter example)
  const handleSearch = () => {
    // Filter rows based on filter values
    setRows(prevRows => {
      let filtered = prevRows;
      filters.forEach(f => {
        if (f.value) {
          filtered = filtered.filter(row =>
            (row[f.name] || "").toString().toLowerCase().includes(f.value.toLowerCase())
          );
        }
      });
      return filtered;
    });
  };

  // Row select handler
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Row action handler
  const handleActionClick = (action, row) => {
    alert(`${action} clicked for Order ID: ${row.orderId}`);
  };

  return (
    <div className="p-6">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ReusableMassStatus
          filterFields={filters}
          columns={columns}
          data={rows}
          selectedRows={selectedRows}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onRowSelect={handleRowSelect}
          onActionClick={handleActionClick}
          enabledActions={["edit", "view", "delete"]}
          groupHeaders={["Origin", "Destination"]}
        />
      )}
    </div>
  );
}
