"use client";

import { useEffect, useState } from "react";
import CustomerRoleList from "@/components/ui/reusableComponent/customerRoleList";
import { formatRowsWithId } from "@/lib/utils";

export default function ArchivedDocumentsPage() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const filterFields = [
    { 
      name: "select", 
      label: "Select", 
      type: "select",
      options: [
        { value: "all", label: "All" },
        { value: "invoices", label: "Invoices" },
        { value: "delivery_notes", label: "Delivery Notes" },
        { value: "lr_numbers", label: "LR Numbers" },
        { value: "pod", label: "POD" }
      ]
    },
    { name: "bookingId", label: "Booking ID", type: "text" },
    { name: "deliveryNote", label: "Delivery Note", type: "text" },
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
        const res = await fetch("/customerRole/reports/archivedDocuments.json");
        const data = await res.json();
        
        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setRows(formatRowsWithId(data.rows || []));
        setColumns(formattedColumns);
      } catch (err) {
        console.error("Error fetching Archived Documents data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <CustomerRoleList
        title="Archived Documents"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("Archived Documents search:", values);
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
