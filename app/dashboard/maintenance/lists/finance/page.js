"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
export default function FinancePage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([
    { name: "vehicleNumber", label: "Vehicle No.", value: "" }
  ]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/dashboard/maintenance/finance.json");
      const data = await res.json();
      setColumns(data.columns || []);
      setRows(data.rows || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSearch = (formValues) => {
    setRows((prevRows) =>
      prevRows.filter((row) =>
        row.vehicleNumber.toLowerCase().includes(formValues.vehicleNumber?.toLowerCase() || "")
      )
    );
  };

  const handleActionClick = (action, row) => {
    alert(`${action} clicked for Vehicle Number: ${row.vehicleNumber}`);
  };

  return (
    <div className="p-6">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ReusableTable
          title="Finance"
          filterFields={filters}
          columns={columns}
          rows={rows}
          onSearch={handleSearch}
          onActionClick={handleActionClick}
          enabledActions={["edit", "view", "delete"]}
        />
      )}
    </div>
  );
}
