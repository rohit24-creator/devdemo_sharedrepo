"use client";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";

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
  { label: "Edit", icon: "✏️", onClick: (row) => console.log("Edit", row) },
  { label: "View", icon: "👁️", onClick: (row) => console.log("View", row) },
  { label: "Delete", icon: "🗑️", onClick: (row) => console.log("Delete", row) },
];

export default function ViewPage() {
  return (
    <div className="p-4">
      <ReusableTable
        title="Region"
        columns={columns}
        rows={rows}
        actions={actions}
        showActions={true}
      />
    </div>
  );
}
