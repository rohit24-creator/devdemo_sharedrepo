"use client";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2 } from "lucide-react";

const columns = [
   { accessorKey: "region", header: "Region"},
  { accessorKey: "status", header: "Status" },
  { accessorKey: "description", header: "Description", sortable: false },
  
  // { accessorKey: "region", header: "Region Name" },
  // { accessorKey: "description", header: "Description" },
  // { accessorKey: "status", header: "Status" },
  
  // { accessorKey: "region", header: "Region Name" },
  // { accessorKey: "description", header: "Description" },
  // { accessorKey: "status", header: "Status" },
  
  
];

const rows = [
  { region: "Swathi", description: "Test Region 1", status: "Active" },
  { region: "Hyderabad", description: "Test Region 2", status: "Inactive" },
  
  { region: "Swathi", description: "Test Region 1", status: "Active" },
  { region: "Hyderabad", description: "Test Region 2", status: "Inactive" },
  
  { region: "Swathi", description: "Test Region 1", status: "Active" },
  { region: "Hyderabad", description: "Test Region 2", status: "Inactive"},
  
];

const actions = [
  {
    label: "Edit",
    icon: <Edit size={18} className="mr-2 " />,
    onClick: (row) => console.log("Edit", row),
  },
  {
    label: "View",
    icon: <Eye size={18} className="mr-2 " />,
    onClick: (row) => console.log("View", row),
  },
  {
    label: "Delete",
    icon: <Trash2 size={18} className="mr-2 " />,
    onClick: (row) => console.log("Delete", row),
  },
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
