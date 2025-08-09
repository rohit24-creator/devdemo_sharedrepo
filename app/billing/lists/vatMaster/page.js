"use client";

import { useEffect, useState } from "react";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { formatRowsWithId } from "@/lib/utils";

export default function VatMasterListPage() {
  const [rows, setRows] = useState([]);

  // Filters: VAT Id, Name, Customer Name
  const filterFields = [
    { name: "vatId", label: "VAT ID", type: "text" },
    { name: "name", label: "Name", type: "text" },
    { name: "customerName", label: "Customer Name", type: "text" },
  ];

  const [columns, setColumns] = useState([]);

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
        const res = await fetch("/billing/vatMasterList.json");
        const data = await res.json();
        setRows(formatRowsWithId(data.rows || []));
        setColumns(data.headers || []);
      } catch (err) {
        console.error("Error fetching VAT Master List data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <BillingList
        title="VAT Master List"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("VAT Master search:", values);
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


