"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";

export default function ClaimsPaymentsViewPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/claimsPaymentsView.json");
      const data = await res.json();
      setColumns(data.columns || []);
      setRows(data.rows || []);
      setOriginalRows(data.rows || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleReset = () => {
    setRows(originalRows);
  };

  return (
    <div className="p-4">
     
        <ReusableTable
          title="Claims Payments"
          columns={columns}
          rows={rows}
          enabledActions={[]}
          showActions={false}
          showFirstIcon={true}
          showSecondIcon={false}
          showThirdIcon={false}
          filterFields={[
            { name: "claimNumber", label: "Claim Number", type: "text" },
            { name: "carrierName", label: "Carrier Name", type: "text" }
          ]}
          showResetButton={true}
          onReset={handleReset}
          onSearch={(filters) => {
            let filteredRows = originalRows;
            if (filters.claimNumber) {
              filteredRows = filteredRows.filter(row => row.claimNumber && row.claimNumber.includes(filters.claimNumber));
            }
            if (filters.carrierName) {
              filteredRows = filteredRows.filter(row => row.carrierName && row.carrierName.includes(filters.carrierName));
            }
            setRows(filteredRows);
          }}
        />
    </div>
  );
}
