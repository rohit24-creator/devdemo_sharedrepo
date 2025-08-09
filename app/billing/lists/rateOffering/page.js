"use client";

import { useEffect, useState } from "react";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { formatRowsWithId } from "@/lib/utils";

export default function RateOfferingListPage() {
  const [rows, setRows] = useState([]);

  // Filters: Offering ID (input), Offering Type (dropdown), Tariff Type (dropdown)
  const filterFields = [
    { name: "offeringId", label: "Offering ID", type: "text" },
    {
      name: "offeringType",
      label: "Offering Type",
      type: "select",
      options: [
        { value: "all", label: "All" },
        { value: "contract", label: "Contract" },
        { value: "spot", label: "Spot" }
      ],
    },
    {
      name: "tariffType",
      label: "Tariff Type",
      type: "select",
      options: [
        { value: "all", label: "All" },
        { value: "flat", label: "Flat" },
        { value: "tiered", label: "Tiered" },
        { value: "slab", label: "Slab" }
      ],
    },
  ];

  const [columns, setColumns] = useState([]);

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
        const res = await fetch("/billing/rateOfferingList.json");
        const data = await res.json();
        setRows(formatRowsWithId(data.rows || []));
        setColumns(data.headers || []);
      } catch (err) {
        console.error("Error fetching Rate Offering List data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <BillingList
        title="Rate Offering List"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("Rate Offering search:", values);
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


