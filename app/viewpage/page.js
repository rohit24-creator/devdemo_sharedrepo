"use client";

import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2 } from "lucide-react";

export default function ViewPage() {
  const columns = [
    { accessorKey: "region", header: "Region Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "status", header: "Status" },
  ];

  const rows = [
    { region: "Swathi", description: "Test Region 1", status: "Active" },
    { region: "Hyderabad", description: "Test Region 2", status: "Inactive" },
  ];

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
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { name: "customerCode", label: "Customer Code" },
    { name: "cid", label: "CID" },
    { name: "country", label: "Country", type: "select", options: ["India", "USA", "Germany"] },
    { name: "branchCode", label: "Branch Code", type: "select", options: ["HYD", "BNG", "CHN"] },
    { name: "partyType", label: "Party Type", type: "select", options: ["Individual", "Company"] },
  ];

  const secondIconMenu = [
    { label: "View as Grid", onClick: () => console.log("Grid View") },
    { label: "View as Table", onClick: () => console.log("Table View") },
  ];

  const thirdIconMenu = [
    { label: "Export PDF", onClick: () => console.log("PDF Export") },
    { label: "Export Excel", onClick: () => console.log("Excel Export") },
  ];

  return (
    <div className="p-4">
      <ReusableTable
        title="Region"
        columns={columns}
        rows={rows}
        actions={actions}
        showActions={true}
        filterFields={filterFields}
        onSearch={(data) => {
          console.log("Search Triggered with values:", data);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
}
