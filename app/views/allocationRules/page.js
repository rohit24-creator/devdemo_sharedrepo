"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2 } from "lucide-react";
import { formatRowsWithId } from "@/lib/utils";

export default function RulesViewPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [formValues, setFormValues] = useState({});

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
        setRows(formatRowsWithId(data.rows));
      } catch (err) {
        console.error("Error fetching rules data:", err);
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
    { name: "ruleName", label: "Rule Name" },
    {
      name: "shipmentType",
      label: "Shipment Type",
    }
  ];

  return (
    <div className="p-4">
      <ReusableTable
        title="Rules"
        columns={columns}
        rows={rows}
        actions={actions}
        showActions={true}
        filterFields={filterFields}
        formValues={formValues}
        setFormValues={setFormValues}
        onSearch={(data) => console.log("Search:", data)}
        showFirstIcon={false}
        showSecondIcon={true}
        showThirdIcon={false}
        secondIconMenu={[
          { label: "Grid View", onClick: () => console.log("Grid View") },
          { label: "Table View", onClick: () => console.log("Table View") },
        ]}
      />
    </div>
  );
}
