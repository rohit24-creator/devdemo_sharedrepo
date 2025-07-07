"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2 } from "lucide-react";
import { formatRowsWithId } from "@/lib/utils";

export default function NotificationViewPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/communication.json");
        const data = await res.json();

        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header
        }));

        setColumns(formattedColumns);
        setRows(formatRowsWithId(data.rows));
      } catch (error) {
        console.error("Error fetching notification data:", error);
      }
    };

    fetchData();
  }, []);

  const filterFields = [
    { name: "notificationId", label: "Notification ID" },
    { name: "customer", label: "Customer Code" },
    {
      name: "service",
      label: "Select Service",
      type: "select",
      options: ["Express", "Regular", "Economy"]
    },
    {
      name: "product",
      label: "Select Product",
      type: "select",
      options: ["Electronics", "Furniture", "Apparel"]
    }
  ];

  // Action handler for actions like Edit, View, Delete
  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r !== row);
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
        title="Notification List"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        formValues={formValues}
        setFormValues={setFormValues}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        enabledActions={["edit", "view", "delete"]} // show only needed actions
        onActionClick={handleActionClick} // trigger delete/edit/view
        secondIconMenu={[
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") }
        ]}
        thirdIconMenu={[
          { label: "Export PDF", onClick: () => console.log("Export PDF") },
          { label: "Export Excel", onClick: () => console.log("Export Excel") }
        ]}
      />
    </div>
  );
}
