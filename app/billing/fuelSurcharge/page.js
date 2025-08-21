"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const fuelSurchargeSchema = z.object({
  fafId: z.string().min(1, "FAF ID is required"),
  fafName: z.string().min(1, "FAF Name is required"),
  description: z.string().min(1, "Description is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  tariffType: z.string().min(1, "Tariff Type is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
});

const fuelSurchargeRowSchema = z.object({
  fromDate: z.string().min(1, "From Date is required"),
  toDate: z.string().min(1, "To Date is required"),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string().min(1, "Currency is required"),
  percentage: z.string().min(1, "Percentage is required"),
});

const generalInfoFields = [
  { 
    name: "fafId", 
    label: "FAF ID", 
    type: "text",
    placeholder: "Enter FAF ID",
  },
  { 
    name: "fafName", 
    label: "FAF Name", 
    type: "text",
    placeholder: "Enter FAF Name"
  },
  { 
    name: "description", 
    label: "Description", 
    type: "textarea",
    placeholder: "Enter Description",
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
  },
  { 
    name: "tariffType", 
    label: "Tariff Type", 
    type: "select",
    options: [
      { value: "import", label: "Import" },
      { value: "export", label: "Export" },
      { value: "domestic", label: "Domestic" },
      { value: "transit", label: "Transit" },
      { value: "cross_trade", label: "Cross Trade" }
    ],
    placeholder: "Select Tariff Type"
  },
  { 
    name: "branchCode", 
    label: "Branch Code", 
    type: "text",
    placeholder: "Enter Branch Code",
  },
];

const currencyData = [
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "JPY", label: "Japanese Yen (JPY)" },
  { value: "AUD", label: "Australian Dollar (AUD)" },
  { value: "CAD", label: "Canadian Dollar (CAD)" },
  { value: "CHF", label: "Swiss Franc (CHF)" },
  { value: "CNY", label: "Chinese Yuan (CNY)" },
  { value: "INR", label: "Indian Rupee (INR)" },
  { value: "SGD", label: "Singapore Dollar (SGD)" },
  { value: "THB", label: "Thai Baht (THB)" },
  { value: "MYR", label: "Malaysian Ringgit (MYR)" },
  { value: "IDR", label: "Indonesian Rupiah (IDR)" },
  { value: "PHP", label: "Philippine Peso (PHP)" },
  { value: "VND", label: "Vietnamese Dong (VND)" },
  { value: "KRW", label: "South Korean Won (KRW)" },
];

const fuelSurchargeColumns = [
  { 
    accessorKey: "fromDate", 
    header: "From Date", 
    type: "date",
    placeholder: "Select From Date"
  },
  { 
    accessorKey: "toDate", 
    header: "To Date", 
    type: "date",
    placeholder: "Select To Date"
  },
  { 
    accessorKey: "amount", 
    header: "Amount", 
    type: "text",
    placeholder: "Enter Amount"
  },
  { 
    accessorKey: "currency", 
    header: "Currency", 
    type: "select",
    options: currencyData,
    placeholder: "Select Currency"
  },
  { 
    accessorKey: "percentage", 
    header: "Percentage", 
    type: "text",
    placeholder: "Enter Percentage"
  },
];

export default function FuelSurchargePage() {
  const form = useForm({
    resolver: zodResolver(fuelSurchargeSchema),
    defaultValues: {
      fafId: "",
      fafName: "",
      description: "",
      companyCode: "",
      tariffType: "",
      branchCode: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Fuel Surcharge General Info Submitted:", data);
  };

  const handleFuelSurchargeTableSave = (rowData, rowIndex) => {
    console.log("Fuel Surcharge row saved:", rowData, "at index:", rowIndex);
  };

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: generalInfoFields,
      onSubmit: handleSubmit,
      children: (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2"
          >
            Save Fuel Surcharge
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Fuel Surcharge",
      dynamicRows: true,
      showActions: true,
      columns: fuelSurchargeColumns,
      defaultRow: {
        fromDate: "",
        toDate: "",
        amount: "",
        currency: "",
        percentage: "",
      },
      onSave: handleFuelSurchargeTableSave,
      tableSchema: fuelSurchargeRowSchema,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Fuel Surcharge</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
