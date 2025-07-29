"use client";

import { useEffect, useState } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { v4 as uuidv4 } from "uuid";

export default function TripReportsPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // Filter fields for trip reports
  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { name: "tripVehicle", label: "Trip Vehicle" },
    { 
      name: "shipmentType", 
      label: "Shipment Type", 
      type: "select",
      options: ["Express", "Standard", "Economy", "Premium"]
    },
    { name: "regularInput", label: "Regular Input" }
  ];

  // Action handler for report actions
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

  // Icon menu items
  const secondIconMenu = [
    { label: "View as Grid", onClick: () => console.log("Grid View") },
    { label: "View as Table", onClick: () => console.log("Table View") },
  ];

  const thirdIconMenu = [
    { label: "Export PDF", onClick: () => console.log("PDF Export") },
    { label: "Export Excel", onClick: () => console.log("Excel Export") },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/reports/tripReports.json");
        const data = await res.json();


        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        const formattedRows = data.rows.map((row, index) => ({
          ...row,
          id: row.id || uuidv4() || `row-${index}`,
        }));

        setColumns(formattedColumns);
        setRows(formattedRows);
      } catch (err) {
        console.error("Error fetching trip reports data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <ReportsList
        title="Trip Reports"
        columns={columns}
        rows={rows}
        filterFields={filterFields}
        onSearch={(data) => {
          console.log("Search Triggered with values:", data);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
