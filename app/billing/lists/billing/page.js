"use client";

import { useEffect, useState } from "react";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { formatRowsWithId } from "@/lib/utils";

export default function BillingListPage() {
  const [rows, setRows] = useState([]);

  const filterFields = [
    { name: "billingParty", label: "Billing Party", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "all", label: "All" },
        { value: "draft", label: "Draft" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "paid", label: "Paid" }
      ],
    },
    {
      name: "type",
      label: "Select",
      type: "select",
      options: [
        { value: "all", label: "All" },
        { value: "freight", label: "Freight" },
        { value: "surcharge", label: "Surcharge" },
        { value: "tax", label: "Tax" }
      ],
    },
  ];

  const [columns, setColumns] = useState([]);

  const handleActionClick = (action, row) => {
    if (action === "delete") {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    } else if (action === "generateCreditNote") {
      console.log("Generate Credit Note row", row);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/billing/billingList.json");
        const data = await res.json();
        
        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setRows(formatRowsWithId(data.rows || []));
        setColumns(formattedColumns);
      } catch (err) {
        console.error("Error fetching Billing List data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <BillingList
        title="Billing List"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("Billing List search:", values);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={[]}
        thirdIconMenu={[]}
        showActions={true}
        enabledActions={["edit", "view", "delete", "generateCreditNote"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}


