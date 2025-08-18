"use client";

import { useEffect, useState } from "react";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { formatRowsWithId } from "@/lib/utils";

export default function RatePreferenceListPage() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const filterFields = [
    { name: "rateReferenceId", label: "Rate Reference ID", type: "text" },
    { name: "rateReferenceName", label: "Rate Reference Name", type: "text" },
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
  ];

  const handleActionClick = (action, row) => {
    if (action === "delete") {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/billing/ratePreferenceList.json");
        const data = await res.json();
        
        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setRows(formatRowsWithId(data.rows || []));
        setColumns(formattedColumns);
      } catch (err) {
        console.error("Error fetching Rate Preference List data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <BillingList
        title="Rate Preference List"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("Rate Preference search:", values);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={[]}
        thirdIconMenu={[]}
        showActions={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
