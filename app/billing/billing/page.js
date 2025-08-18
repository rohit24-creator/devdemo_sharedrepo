"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";
import { useEffect, useState } from "react";

const billingInfoSchema = z.object({
  billGroup: z.string().min(1, "Bill Group is required"),
  customerCode: z.string().min(1, "Customer Code is required"),
  billType: z.string().min(1, "Bill Type is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  name: z.string().min(1, "Name is required"),
  cid: z.string().min(1, "CID is required"),
  acDebitorCode: z.string().min(1, "AC Debitor Code is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  invoiceNumber: z.string().min(1, "Invoice Number is required"),
  invoiceDate: z.string().min(1, "Invoice Date is required"),
  invoiceStatus: z.string().min(1, "Invoice Status is required"),
  departmentCode: z.string().min(1, "Department Code is required"),
});

const fieldConfig = [
  { 
    name: "billGroup", 
    label: "Bill Group", 
    type: "select", 
    options: ["Group A", "Group B", "Group C", "Group D"],
    placeholder: "Select Bill Group"
  },
  { 
    name: "customerCode", 
    label: "Customer Code", 
    type: "text",
    placeholder: "Enter Customer Code"
  },
  { 
    name: "billType", 
    label: "Bill Type", 
    type: "select", 
    options: ["Standard", "Express", "Premium", "Economy"],
    placeholder: "Select Bill Type"
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    modalFieldName: "companyCode",
    placeholder: "Select Company"
  },
  { 
    name: "name", 
    label: "Name", 
    type: "text",
    placeholder: "Enter Name"
  },
  { 
    name: "cid", 
    label: "CID", 
    type: "text",
    placeholder: "Enter CID"
  },
  { 
    name: "acDebitorCode", 
    label: "AC Debitor Code", 
    type: "text",
    placeholder: "Enter AC Debitor Code"
  },
  { 
    name: "branchCode", 
    label: "Branch Code", 
    modalFieldName: "branchCode",
    placeholder: "Select Branch"
  },
  { 
    name: "invoiceNumber", 
    label: "Invoice Number", 
    type: "text",
    placeholder: "Enter Invoice Number"
  },
  { 
    name: "invoiceDate", 
    label: "Invoice Date", 
    type: "date",
    placeholder: "Select Invoice Date"
  },
  { 
    name: "invoiceStatus", 
    label: "Invoice Status", 
    type: "select", 
    options: ["Draft", "Pending", "Approved", "Rejected", "Paid"],
    placeholder: "Select Invoice Status"
  },
  { 
    name: "departmentCode", 
    label: "Department Code", 
    type: "select", 
    options: ["IT", "Finance", "Operations", "Sales", "Marketing"],
    placeholder: "Select Department Code"
  },
];

// Filter fields for the reports section
const filterFields = [
  { name: "bookingId", label: "Booking ID", type: "filterSelect" },
  { name: "earlyPickupFromDate", label: "Early Pickup From Date", type: "date" },
  { name: "earlyPickupToDate", label: "Early Pickup To Date", type: "date" },
  { name: "earlyDeliveryFromDate", label: "Early Delivery From Date", type: "date" },
  { name: "earlyDeliveryToDate", label: "Early Delivery To Date", type: "date" },
  { name: "statusPickupFromDate", label: "Status Pickup From Date", type: "date" },
  { name: "statusPickupToDate", label: "Status Pickup To Date", type: "date" },
  { name: "statusDeliveryFromDate", label: "Status Delivery From Date", type: "date" },
  { name: "statusDeliveryToDate", label: "Status Delivery To Date", type: "date" },
  { 
    name: "docAvailability", 
    label: "Doc Availability", 
    type: "select",
    options: ["Available", "Not Available", "Pending", "Completed"]
  },
  { 
    name: "refType", 
    label: "Ref Type", 
    type: "select",
    options: ["Invoice", "PO", "Contract", "Agreement", "Other"]
  },
  { name: "referenceValue", label: "Reference Value", type: "text" },
  { 
    name: "status", 
    label: "Status", 
    type: "select",
    options: ["Active", "Inactive", "Pending", "Completed", "Cancelled"]
  },
];



export default function BillingPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const form = useForm({
    resolver: zodResolver(billingInfoSchema),
    defaultValues: {
      billGroup: "",
      customerCode: "",
      billType: "",
      companyCode: "",
      name: "",
      cid: "",
      acDebitorCode: "",
      branchCode: "",
      invoiceNumber: "",
      invoiceDate: "",
      invoiceStatus: "",
      departmentCode: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Billing Info Submitted:", data);
  };

  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    } else {
      console.log("Unknown action", action, row);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/billing/billingData.json");
        const data = await res.json();

        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        const formattedRows = formatRowsWithId(data.rows);
        setColumns(formattedColumns);
        setRows(formattedRows);
      } catch (err) {
        console.error("Error fetching billing data:", err);
      }
    };
    fetchData();
  }, []);

  const sections = [
    {
      type: "form",
      title: "Billing Info",
      form,
      fields: fieldConfig,
      onSubmit: handleSubmit,
      children: (
        <div className="col-span-full">
          <button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2">
            Save Billing Info
          </button>
        </div>
      ),
    },
    {
      type: "custom",
      title: "Pending Bills",
      renderLayout: () => (
        <ReportsList
          title="Billing Reports"
          columns={columns}
          rows={rows}
          filterFields={filterFields}
          onSearch={(data) => {
            console.log("Search Triggered with values:", data);
          }}
          showFirstIcon={true}
          showSecondIcon={true}
          showThirdIcon={true}
          secondIconMenu={[
            { label: "View as Grid", onClick: () => console.log("Grid View") },
            { label: "View as Table", onClick: () => console.log("Table View") },
          ]}
          thirdIconMenu={[
            { label: "Export PDF", onClick: () => console.log("PDF Export") },
            { label: "Export Excel", onClick: () => console.log("Excel Export") },
          ]}
          showActions={true}
          enabledActions={["edit", "view", "delete"]}
          onActionClick={handleActionClick}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Billing Management</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
