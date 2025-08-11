"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReusableTable = dynamic(() => import("@/components/ui/reusableComponent/viewtable"), { ssr: false });

export default function CarrierRatesListPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterFields = [
    { name: "carrier", label: "Select Carrier", type: "select", options: ["ShipmentX", "Speedy Freight", "DHL", "FedEx"] },
    { name: "city", label: "City", type: "text" },
    { name: "zip", label: "Zip Code", type: "text" },
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/tenders/carrierrates.json");
      const data = await res.json();
      setColumns(data.columns || []);
      setRows(data.rows || []);
      setAllRows(data.rows || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSearch = (filters) => {
    let filtered = allRows;
    if (filters.carrier) {
      filtered = filtered.filter(r => (r.carrier || "").toString().toLowerCase().includes(filters.carrier.toLowerCase()));
    }
    if (filters.city) {
      filtered = filtered.filter(r => (r.city || "").toString().toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.zip) {
      filtered = filtered.filter(r => (r.zip || "").toString().toLowerCase().includes(filters.zip.toLowerCase()));
    }
    setRows(filtered);
  };

  const handleActionClick = (action, row) => {
    alert(`${action} clicked for Carrier: ${row.carrier}`);
  };

  return (
    <div className="p-6">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ReusableTable
          title="Carrier Rates"
          filterFields={filterFields}
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
