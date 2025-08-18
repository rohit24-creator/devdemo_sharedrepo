"use client";

import { useEffect, useState } from "react";
import CustomerRoleList from "@/components/ui/reusableComponent/customerRoleList";
import { formatRowsWithId } from "@/lib/utils";

export default function CustomerDailyStatusPage() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { name: "bookingId", label: "Booking ID", type: "text" },
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
        const res = await fetch("/customerRole/reports/customerDailyStatus.json");
        const data = await res.json();
        
        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setRows(formatRowsWithId(data.rows || []));
        setColumns(formattedColumns);
      } catch (err) {
        console.error("Error fetching Customer Daily Status data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <CustomerRoleList
        title="Customer Daily Status"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("Customer Daily Status search:", values);
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
