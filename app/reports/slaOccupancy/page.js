"use client";

import { useEffect, useState } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { v4 as uuidv4 } from "uuid";

export default function SlaOccupancyPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // Filter fields for SLA occupancy reports
  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { name: "tripVehicle", label: "Trip Vehicle" },
    { 
      name: "zone", 
      label: "Zone", 
      type: "select",
      options: ["North Zone", "South Zone", "East Zone", "West Zone", "Central Zone"]
    },
    { name: "driver", label: "Driver" },
    { 
      name: "regularInput", 
      label: "Regular Input", 
      type: "select",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    { 
      name: "shipmentType", 
      label: "Shipment Type", 
      type: "select",
      options: ["Express", "Standard", "Economy", "Premium"]
    }
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
        const res = await fetch("/reports/slaOccupancy.json");
        const data = await res.json();

        // Format columns
        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        // Add unique ID to each row 
        const formattedRows = data.rows.map((row, index) => ({
          ...row,
          id: row.id || uuidv4() || `row-${index}`,
        }));

        setColumns(formattedColumns);
        setRows(formattedRows);
      } catch (err) {
        console.error("Error fetching SLA occupancy data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <ReportsList
        title="SLA Occupancy Reports"
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