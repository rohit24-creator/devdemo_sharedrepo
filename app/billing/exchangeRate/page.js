"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const exchangeRateSchema = z.object({
  exchangeRateId: z.string().min(1, "Exchange Rate ID is required"),
  exchangeRateName: z.string().min(1, "Exchange Rate Name is required"),
  customerId: z.string().min(1, "Customer ID is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  exchangeRateType: z.string().min(1, "Exchange Rate Type is required"),
});

const exchangeRateRowSchema = z.object({
  from: z.string().min(1, "From currency is required"),
  to: z.string().min(1, "To currency is required"),
  exchangeRate: z.string().min(1, "Exchange Rate is required"),
  effectiveDate: z.string().min(1, "Effective Date is required"),
  expiryDate: z.string().min(1, "Expiry Date is required"),
});

const generalInfoFields = [
  { 
    name: "exchangeRateId", 
    label: "Exchange Rate ID", 
    type: "text",
    placeholder: "Enter Exchange Rate ID",
  },
  { 
    name: "exchangeRateName", 
    label: "Exchange Rate Name", 
    type: "text",
    placeholder: "Enter Exchange Rate Name"
  },
  { 
    name: "customerId", 
    label: "Customer ID", 
    type: "text",
    placeholder: "Enter Customer ID",
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
  },
  { 
    name: "exchangeRateType", 
    label: "Exchange Rate Type", 
    type: "select",
    options: [
      { value: "spot", label: "Spot Rate" },
      { value: "forward", label: "Forward Rate" },
      { value: "cross", label: "Cross Rate" },
      { value: "fixed", label: "Fixed Rate" },
      { value: "floating", label: "Floating Rate" }
    ],
    placeholder: "Select Exchange Rate Type"
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

const exchangeRateColumns = [
  { 
    accessorKey: "from", 
    header: "From", 
    type: "select",
    options: currencyData,
    placeholder: "Select From Currency"
  },
  { 
    accessorKey: "to", 
    header: "To", 
    type: "select",
    options: currencyData,
    placeholder: "Select To Currency"
  },
  { 
    accessorKey: "exchangeRate", 
    header: "Exchange Rate", 
    type: "text",
    placeholder: "Enter Exchange Rate"
  },
  { 
    accessorKey: "effectiveDate", 
    header: "Effective Date", 
    type: "date",
    placeholder: "Select Effective Date"
  },
  { 
    accessorKey: "expiryDate", 
    header: "Expiry Date", 
    type: "date",
    placeholder: "Select Expiry Date"
  },
];

export default function ExchangeRatePage() {
  const form = useForm({
    resolver: zodResolver(exchangeRateSchema),
    defaultValues: {
      exchangeRateId: "",
      exchangeRateName: "",
      customerId: "",
      companyCode: "",
      exchangeRateType: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Exchange Rate General Info Submitted:", data);
  };

  const handleExchangeRateTableSave = (rowData, rowIndex) => {
    console.log("Exchange Rate row saved:", rowData, "at index:", rowIndex);
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
            Save Exchange Rate
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Exchange Rate",
      dynamicRows: true,
      showActions: true,
      columns: exchangeRateColumns,
      defaultRow: {
        from: "",
        to: "",
        exchangeRate: "",
        effectiveDate: "",
        expiryDate: "",
      },
      onSave: handleExchangeRateTableSave,
      tableSchema: exchangeRateRowSchema,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Exchange Rate</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
