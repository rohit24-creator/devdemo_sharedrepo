"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2 } from "lucide-react";
import { formatRowsWithId } from "@/lib/utils";

export default function OrderPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/order.json");
        const data = await res.json();

        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setColumns(formattedColumns);
        setRows(formatRowsWithId(data.rows));
      } catch (err) {
        console.error("Error fetching order data:", err);
      }
    };

    fetchData();
  }, []);

  const filterFields = [
    { name: "bookingId", label: "Booking ID" },
    { name: "customerName", label: "Customer Name" },
    { name: "status", label: "Status" },
  ];

  // Central action handler
  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    } else {
      console.log("Unknown action", action, row);
    }
  };

  return (
    <div className="p-4">
      <ReusableTable
        title="Orders"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        showFourthIcon={true} // Add this if your viewtable supports a fourth icon
        enabledActions={["edit", "view", "delete", "copyOrder", "reverseOrder", "generateTWB", "printLabel"]}
        onActionClick={handleActionClick}
        secondIconMenu={[
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") },
        ]}
        thirdIconMenu={[
          { label: "Money View", onClick: () => console.log("Money View") },
        ]}
        fourthIconMenu={[
          { label: "Document View", onClick: () => console.log("Document View") },
        ]}
      />
    </div>
  );
}
