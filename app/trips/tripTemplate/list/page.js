"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2, History } from "lucide-react";
import { formatRowsWithId } from "@/lib/utils";

export default function TripTemplateListingPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/trips/tripTemplateData.json");
        const data = await res.json();

        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setColumns(formattedColumns);
        setRows(formatRowsWithId(data.rows));
      } catch (err) {
        console.error("Error fetching trip template data:", err);
      }
    };

    fetchData();
  }, []);

  const filterFields = [
    { 
      name: "fromDate", 
      label: "From Date", 
      type: "date" 
    },
    { 
      name: "toDate", 
      label: "To Date", 
      type: "date" 
    },
    { 
      name: "templateId", 
      label: "Template ID", 
      type: "text" 
    },
    { 
      name: "templateName", 
      label: "Template Name", 
      type: "text" 
    },
  ];

  // Central action handler
  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit trip template", row);
    } else if (action === "view") {
      console.log("View trip template", row);
    } 
  };

  const handleSearch = (searchData) => {
    console.log("Search filters:", searchData);
    // Implement search logic here
    // You can filter the rows based on searchData
  };

  return (
    <div className="p-4">
      <ReusableTable
        title="Trip Template List"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={handleSearch}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
        secondIconMenu={[
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") },
          { label: "Card View", onClick: () => console.log("Card View") },
        ]}
        thirdIconMenu={[
          { label: "Export Excel", onClick: () => console.log("Export Excel") },
          { label: "Export PDF", onClick: () => console.log("Export PDF") },
          { label: "Print Report", onClick: () => console.log("Print Report") },
        ]}
      />
    </div>
  );
} 