"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { formatRowsWithId } from "@/lib/utils";
import { BILLING_ROUTES } from "@/lib/billingRoutes";

export default function RateOfferingListPage() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const secondIconMenu = [
    {
      label: "+ Add New",
      onClick: () => router.push(BILLING_ROUTES.rateOffering)
    }
  ];

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

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

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
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/billing/rateOfferingList.json");
        
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || []);
        
        setRows(formattedRows);
        setColumns(formattedColumns);
        
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

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
        secondIconMenu={secondIconMenu}
        thirdIconMenu={[]}
        showActions={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}


