"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { formatRowsWithId } from "@/lib/utils";

export default function XBRDRordersPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/XBRDRorders.json");
        const data = await res.json();
        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));
        setColumns(formattedColumns);
        setRows(formatRowsWithId(data.rows));
      } catch (err) {
        console.error("Error fetching XBRDRorders data:", err);
      }
    };
    fetchData();
  }, []);

  const filterFields = [
    { name: "orderId", label: "Order ID" },
    { name: "tripNo", label: "Trip No" },
    { name: "status", label: "Status" },
  ];

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
        title="XBorder Orders"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={false}   // Bell (notification) icon
        showSecondIcon={true}  // Search icon
        showThirdIcon={true}   // Wallet icon
        showFourthIcon={false} // No document icon
        showFifthIcon={true}   // Fifth bell icon
        enabledActions={["edit", "view", "delete", "copyOrder", "reverseOrder", "generateTWB", "printLabel"]}
        onActionClick={handleActionClick}
        secondIconMenu={[
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") },
        ]}
        thirdIconMenu={[
          { label: "Money View", onClick: () => console.log("Money View") },
        ]}
        fifthIconMenu={[
          { label: "Bell Action 1", onClick: () => console.log("Bell Action 1") },
        ]}
      />
    </div>
  );
}
