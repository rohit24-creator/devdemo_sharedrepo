"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";

export default function WorkOrdersListPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/workOrdersView.json");
      const data = await res.json();
      setColumns(data.columns || []);
      setRows(data.rows || []);
      setFilteredRows(data.rows || []);
      setLoading(false);
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
      />
    </div>
  );
}
