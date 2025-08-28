"use client";
import React from "react";
import { z } from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";


const vasData = [
  { vasId: "VAS001", vasName: "Insurance" },
  { vasId: "VAS002", vasName: "Packing" },
  { vasId: "VAS003", vasName: "Storage" },
];

const chargeData = [
  { chargeId: "CHG001", currency: "USD" },
  { chargeId: "CHG002", currency: "INR" },
  { chargeId: "CHG003", currency: "EUR" },
];

const chargeBasisData = [
  { value: "Per Shipment", label: "Per Shipment" },
  { value: "Per Kg", label: "Per Kg" },
  { value: "Per Pallet", label: "Per Pallet" },
];

const defaultServicesColumns = [
  {
    accessorKey: "vasId",
    header: "VAS ID",
    type: "select",
    options: vasData.map(v => v.vasId),
    placeholder: "Select VAS ID"
  },
  {
    accessorKey: "vasName",
    header: "VAS Name",
    type: "text",
    disabled: true,
    placeholder: "VAS Name"
  },
  {
    accessorKey: "chargeId",
    header: "Charge ID",
    type: "select",
    options: chargeData.map(c => c.chargeId),
    placeholder: "Select Charge ID"
  },
  {
    accessorKey: "chargeBasis",
    header: "Charge Basis",
    type: "select",
    options: chargeBasisData.map(b => b.value),
    placeholder: "Select Charge Basis"
  },
  {
    accessorKey: "minimumAmount",
    header: "Minimum Amount",
    type: "number",
    placeholder: "Enter Minimum Amount"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    type: "number",
    placeholder: "Enter Amount"
  },
  {
    accessorKey: "currency",
    header: "Currency",
    type: "text",
    disabled: true,
    placeholder: "Currency"
  },
];


const defaultServicesRowSchema = z.object({
  vasId: z.string().min(1, "VAS ID is required"),
  vasName: z.string().optional(), 
  chargeId: z.string().min(1, "Charge ID is required"),
  chargeBasis: z.string().min(1, "Charge Basis is required"),
  minimumAmount: z.string().min(1, "Minimum Amount is required"),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string().optional(), 
});

export default function DefaultServicesPage() {
  const handleTableSave = (rowData, rowIndex) => {
    console.log("Default Service row saved:", rowData, "at index:", rowIndex);
  };

  const sections = [
    {
      type: "table",
      title: "Default Services",
      dynamicRows: true,
      showActions: false,
      columns: defaultServicesColumns,
      defaultRow: {
        vasId: "",
        vasName: "",
        chargeId: "",
        chargeBasis: "",
        minimumAmount: "",
        amount: "",
        currency: "",
      },
      onSave: handleTableSave,
      tableSchema: defaultServicesRowSchema,
      mappingConfig: {
        vasId: {
          keyField: "vasId",
          data: vasData,
          mappedFields: ["vasName"]
        },
        chargeId: {
          keyField: "chargeId",
          data: chargeData,
          mappedFields: ["currency"]
        }
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Default Services</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
