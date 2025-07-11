"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function PartnerDetailsPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [formValues, setFormValues] = useState({});

  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { name: "customerCode", label: "Customer Code" },
    { name: "cid", label: "CID" },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: ["India", "USA", "Germany"],
    },
    {
      name: "branchCode",
      label: "Branch Code",
      type: "select",
      options: ["HYD", "BNG", "CHN"],
    },
    {
      name: "partyType",
      label: "Party Type",
      type: "select",
      options: ["Individual", "Company"],
    },
  ];

  // Action handler for actions like Edit, View, Delete
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
        const res = await fetch("/partnerData.json");
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
        console.error("Error fetching partner data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <ReusableTable
        title="Partner Details"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        formValues={formValues}
        setFormValues={setFormValues}
        onSearch={(data) => {
          console.log("Search Triggered with values:", data);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        enabledActions={["edit", "view", "delete"]} // show only needed actions
        onActionClick={handleActionClick} // trigger delete/edit/view
        secondIconMenu={[
          { label: "View as Grid", onClick: () => console.log("Grid View") },
          { label: "View as Table", onClick: () => console.log("Table View") },
        ]}
        thirdIconMenu={[
          { label: "Export PDF", onClick: () => console.log("PDF Export") },
          { label: "Export Excel", onClick: () => console.log("Excel Export") },
        ]}
      />
    </div>
  );
}
