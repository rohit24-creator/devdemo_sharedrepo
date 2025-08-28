"use client";


import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";


const serviceRowSchema = z.object({
  vasId: z.string().min(1, "VAS ID is required"),
  vasName: z.string().optional(), 
  chargeId: z.string().min(1, "Charge ID is required"),
  chargeBasis: z.string().min(1, "Charge Basis is required"),
  minimumAmount: z.string().min(1, "Minimum Amount is required"),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string().optional(), 
});


const vasData = [
  { vasId: "VAS001", vasName: "Insurance" },
  { vasId: "VAS002", vasName: "Packing" },
  { vasId: "VAS003", vasName: "Customs Clearance" },
  { vasId: "VAS004", vasName: "Documentation" },
  { vasId: "VAS005", vasName: "Special Handling" },
  { vasId: "VAS006", vasName: "Express Delivery" },
  { vasId: "VAS007", vasName: "Temperature Control" },
  { vasId: "VAS008", vasName: "Security Screening" },
];


const chargeData = [
  { chargeId: "CHG001", currency: "USD" },
  { chargeId: "CHG002", currency: "EUR" },
  { chargeId: "CHG003", currency: "INR" },
  { chargeId: "CHG004", currency: "GBP" },
  { chargeId: "CHG005", currency: "JPY" },
  { chargeId: "CHG006", currency: "AUD" },
  { chargeId: "CHG007", currency: "CAD" },
  { chargeId: "CHG008", currency: "SGD" },
];


const chargeBasisData = [
  { value: "per_unit", label: "Per Unit" },
  { value: "per_weight", label: "Per Weight" },
  { value: "per_distance", label: "Per Distance" },
  { value: "per_shipment", label: "Per Shipment" },
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed" },
  { value: "tiered", label: "Tiered" },
  { value: "volume_based", label: "Volume Based" },
];


const serviceColumns = [
  { 
    accessorKey: "vasId", 
    header: "VAS ID", 
    type: "select",
    options: vasData.map(vas => ({ value: vas.vasId, label: vas.vasId })),
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
    options: chargeData.map(charge => ({ value: charge.chargeId, label: charge.chargeId })),
    placeholder: "Select Charge ID"
  },
  { 
    accessorKey: "chargeBasis", 
    header: "Charge Basis", 
    type: "select",
    options: chargeBasisData,
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

export default function RateRecordServicePage() {
  const handleTableSave = (rowData, rowIndex) => {
    console.log("Service row saved:", rowData, "at index:", rowIndex);
  };

  const sections = [
    {
      type: "table",
      title: "Service",
      dynamicRows: true,
      showActions: true,
      columns: serviceColumns,
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
      tableSchema: serviceRowSchema,
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
        },
      },
    },
  ];

  return (
    <BillingForm sections={sections} useAccordion={true} />
  );
}
