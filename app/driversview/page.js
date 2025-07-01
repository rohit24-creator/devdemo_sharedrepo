"use client";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2 } from "lucide-react";

const columns = [
    { accessorKey: "driver name", header: "Driver Name" },
    { accessorKey: "carrier name", header: "Carrier Name" },
    { accessorKey: "age", header: "Age" },

    { accessorKey: "mobile", header: "Mobile" },
    { accessorKey: "experience", header: "Experience" },
    { accessorKey: "track type", header: "Track Type" },

    { accessorKey: "allocate", header: "Allocate" },

];


const rows = [
    {
        "driver name": "Ravi Kumar",
        "carrier name": "ABC Logistics",
        "age": "35",
        "mobile": "9876543210",
        "experience": "10 years",
        "track type": "Mobile",
        "allocate": "Vehicle list",
    },
    {
        "driver name": "Suresh Reddy",
        "carrier name": "XYZ Transport",
        "age": "42",
        "mobile": "9123456780",
        "experience": "15 years",
        "track type": "Mobile",
        "allocate": "Allocate",
    },
    {
        "driver name": "Anil Sharma",
        "carrier name": "Blue Dart",
        "age": "38",
        "mobile": "9012345678",
        "experience": "12 years",
        "track type": "22-wheeler",
        "allocate": "Vehicle list",
    },
    {
        "driver name": "Mahesh Babu",
        "carrier name": "Gati Movers",
        "age": "29",
        "mobile": "9345678123",
        "experience": "6 years",
        "track type": "Cabinet",
        "allocate": "Allocate",
    },
    {
        "driver name": "Kiran Patel",
        "carrier name": "VRL Logistics",
        "age": "45",
        "mobile": "9988776655",
        "experience": "20 years",
        "track type": "Full-truck-load",
        "allocate": "Vehicle list",
    },
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

    {
        label: "Trip History",
        icon: <Trash2 size={18} className="mr-2 " />,
        onClick: (row) => console.log("Delete", row),
    },
];

export default function Driversview() {
    return (
        <div className="p-4">
            <ReusableTable
                title="Drivers"
                columns={columns}
                rows={rows}
                actions={actions}
                showActions={true}
            />
        </div>
    );
}

//