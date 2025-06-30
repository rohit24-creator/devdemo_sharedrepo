"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Eye, Edit, Trash2 } from "lucide-react";

export default function VehicleTypeViewPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const res = await fetch("/vehicleType.json");
        const data = await res.json();

        const formattedColumns = data.headers.map(header => ({
          accessorKey: header.accessorKey,
          header: header.header,
          cell: header.accessorKey === "attachment"
            ? ({ row }) => (
                <a
                  href={`/uploads/${row.getValue("attachment")}`}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {row.getValue("attachment")}
                </a>
              )
            : undefined
        }));

        setColumns(formattedColumns);
        setRows(data.rows);
      } catch (err) {
        console.error("Failed to load vehicle type data:", err);
      }
    };

    fetchData();
  }, []);

  const actions = [
    {
      label: "Edit",
      icon: <Edit size={18} className="mr-1" />,
      onClick: (row) => console.log("Edit", row)
    },
    {
      label: "View",
      icon: <Eye size={18} className="mr-1" />,
      onClick: (row) => console.log("View", row)
    },
    {
      label: "Delete",
      icon: <Trash2 size={18} className="mr-1" />,
      onClick: (row) => console.log("Delete", row)
    }
  ];

  const filterFields = [
    { name: "vechicletype", label: "Vehicle Type" },
    { name: "companyCode", label: "Company Code" },
    { name: "departmentCode", label: "Department Code" }
  ];

  return (
    <div className="p-4">
      <ReusableTable
        title="Vehicle Type List"
        columns={columns}
        rows={rows}
        showActions={true}
        actions={actions}
        filterFields={filterFields}
        showFirstIcon
        showSecondIcon
        showThirdIcon
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
