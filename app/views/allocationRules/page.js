"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";

export default function RulesViewPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/allocationRules.json");
        const data = await res.json();

        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setColumns(formattedColumns);
        setRows(data.rows);
      } catch (err) {
        console.error("Error fetching rules data:", err);
      }
    };

    fetchData();
  }, []);

  const filterFields = [
    { name: "ruleName", label: "Rule Name" },
    { name: "shipmentType", label: "Shipment Type" },
  ];

  // ✅ Central action handler
  const handleActionClick = (action, row) => {
    if (action === "edit") {
      console.log("Edit clicked:", row);
      // Add logic to navigate/edit modal
    } else if (action === "view") {
      console.log("View clicked:", row);
    } else if (action === "delete") {
      console.log("Delete clicked:", row);
    } else if (action === "map") {
      console.log("Map clicked:", row);
    } else if (action === "track") {
      console.log("Track clicked:", row);
    } else {
      console.log("Unknown action:", action, row);
    }
  };

  return (
    <div className="p-4">
      <ReusableTable
        title="Rules"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={false}
        enabledActions={["edit", "view", "delete", "map", "track"]} // ✅ list of action keys
        onActionClick={handleActionClick} // ✅ single function handles all
        secondIconMenu={[
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") },
        ]}
      />
    </div>
  );
}
