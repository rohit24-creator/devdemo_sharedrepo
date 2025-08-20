"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const ReusableMassStatus = dynamic(() => import("@/components/ui/reusableComponent/reusablemasstatus"), { ssr: false });

export default function MassStatusPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState([
    { name: "bookingId", label: "Booking ID", value: "" },
    { name: "tripId", label: "Trip ID", value: "" },
    { name: "containerNumber", label: "Container Number", value: "" },
    { name: "carrierDriver", label: "Carrier / Driver", value: "" },
  ]);

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/bookings/masstatusView.json");
        
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-6">
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
      </div>
    );
  }
