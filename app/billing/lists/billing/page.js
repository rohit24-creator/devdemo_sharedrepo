"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { formatRowsWithId } from "@/lib/utils";

export default function BillingListPage() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const secondIconMenu = [
    {
      label: "+ Add New",
      onClick: () => router.push('/billing/billing')
    }
  ];

  const filterFields = [
    { name: "billingParty", label: "Billing Party", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "all", label: "All" },
        { value: "draft", label: "Draft" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "paid", label: "Paid" }
      ],
    },
    {
      name: "type",
      label: "Select",
      type: "select",
      options: [
        { value: "all", label: "All" },
        { value: "freight", label: "Freight" },
        { value: "surcharge", label: "Surcharge" },
        { value: "tax", label: "Tax" }
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
    } else if (action === "generateCreditNote") {
      console.log("Generate Credit Note row", row);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/billing/billingList.json");
        
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
        title="Billing List"
        filterFields={filterFields}
        columns={columns}
        rows={rows}
        onSearch={(values) => {
          console.log("Billing List search:", values);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={[]}
        showActions={true}
        enabledActions={["edit", "view", "delete", "generateCreditNote"]}
        onActionClick={handleActionClick}
      />
    </div>
  );
}


