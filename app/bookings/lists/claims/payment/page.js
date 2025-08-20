"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";

export default function ClaimsPaymentsViewPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
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
        
        const { data } = await api.get("/claimsPaymentsView.json");
        
        const formattedColumns = data?.columns?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = data?.rows || [];
        
        setColumns(formattedColumns);
        setRows(formattedRows);
        setOriginalRows(formattedRows);
        
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleReset = () => {
    setRows(originalRows);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

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
          showFourthIcon={false}
          showFifthIcon={false}
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
