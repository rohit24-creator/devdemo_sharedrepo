"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2 } from "lucide-react";

export default function RegionViewPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/shipmentType.json");
        const data = await res.json();
        
      console.log("Fetched Data:", data);

        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setColumns(formattedColumns);
        setRows(data.rows);
      } catch (err) {
        console.error("Error fetching region data:", err);
      }
    };

    fetchData();
  }, []);

  const actions = [
    {
      label: "Edit",
      icon: <Edit size={18} className="mr-2" />,
      onClick: (row) => console.log("Edit", row),
    },
    {
      label: "View",
      icon: <Eye size={18} className="mr-2" />,
      onClick: (row) => console.log("View", row),
    },
    {
      label: "Delete",
      icon: <Trash2 size={18} className="mr-2" />,
      onClick: (row) => console.log("Delete", row),
    },
  ];

  const filterFields = [
    { name: "name", label: "Region Name" },
    { name: "departmentCode", label: "Department Code" },
  ];

  return (
    <div className="p-4">
      <ReusableTable
        title="Region List"
        columns={columns}
        rows={rows}
        actions={actions}
        showActions={true}
        filterFields={filterFields}
        formValues={formValues}
        setFormValues={setFormValues}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}

        secondIconMenu={[
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") },
        ]}
        thirdIconMenu={[
          { label: "Export PDF", onClick: () => console.log("Export PDF") },
          { label: "Export Excel", onClick: () => console.log("Export Excel") },
        ]}
      />
    </div>
  );
}
