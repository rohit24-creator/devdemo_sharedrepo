"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/bookingList";
import { BOOKING_ROUTES } from "@/lib/bookingRoutes";
import { formatRowsWithId } from "@/lib/utils";

export default function WorkOrdersListPage() {
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  const secondIconMenu = [
    { label: "+ Add New", onClick: () => router.push(BOOKING_ROUTES.workOrder) },
  ];

  const thirdIconMenu = [
    { label: "Excel", onClick: () => console.log("Excel") },
    { label: "PDF", onClick: () => console.log("PDF") },
    { label: "Print", onClick: () => console.log("Print") },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/bookings/workOrders.json");
        
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || []);
        
        setColumns(formattedColumns);
        setRows(formattedRows);
        setFilteredRows(formattedRows);
        
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filterFields = [
    { name: "customer", label: "Customer", type: "text" },
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" }
  ];

  const onSearch = (filters) => {
    let filtered = rows;
    if (filters.customer) {
      filtered = filtered.filter(row =>
        row.customer && row.customer.toLowerCase().includes(filters.customer.toLowerCase())
      );
    }
    if (filters.fromDate) {
      filtered = filtered.filter(row =>
        row.date && new Date(row.date) >= new Date(filters.fromDate)
      );
    }
    if (filters.toDate) {
      filtered = filtered.filter(row =>
        row.date && new Date(row.date) <= new Date(filters.toDate)
      );
    }
    setFilteredRows(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-4">
      <ReusableTable
        title="Work Orders"
        columns={columns}
        rows={filteredRows}
        enabledActions={["edit", "view", "delete"]}
        showActions={true}
        filterFields={filterFields}
        onSearch={onSearch}
        showSecondIcon={true}
        showFourthIcon={false}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
}
