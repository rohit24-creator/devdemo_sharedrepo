"use client";

import { useEffect, useState } from "react";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { formatRowsWithId } from "@/lib/utils";

export default function ConversionFactorListPage() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const filterFields = [
    { name: "conversionId", label: "Conversion ID", type: "text" },
    { 
      name: "tariffType", 
      label: "Tariff Type", 
      type: "select",
      options: [
        { value: "freight", label: "Freight" },
        { value: "surcharge", label: "Surcharge" },
        { value: "tax", label: "Tax" },
        { value: "handling", label: "Handling" }
      ]
    },
    { name: "baseUom", label: "Base UOM", type: "text" },
  ];

  const handleActionClick = (action, row) => {
    if (action === "delete") {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/billing/conversionFactorList.json");
        const data = await res.json();
        
        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        setRows(formatRowsWithId(data.rows || []));
        setColumns(formattedColumns);
      } catch (err) {
        console.error("Error fetching Conversion Factor List data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <BillingList
        title="Conversion Factor List"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("Conversion Factor search:", values);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={[]}
        thirdIconMenu={[]}
        showActions={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
