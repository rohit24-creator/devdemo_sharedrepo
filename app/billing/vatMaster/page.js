"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";
import { useEffect, useState } from "react";

const vatInfoSchema = z.object({
  vatId: z.string().min(1, "VAT ID is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  customerId: z.string().min(1, "Customer Code is required"),
  vendorId: z.string().min(1, "Vendor Code is required"),
  vatCategory: z.string().min(1, "VAT Category is required"),
});

const vatInfoFields = [
  { 
    name: "vatId", 
    label: "VAT ID", 
    type: "text",
    placeholder: "Enter VAT ID",
  },
  { 
    name: "name", 
    label: "Name", 
    type: "text",
    placeholder: "Enter Name"
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
    modalFieldName: "companyCode",
    placeholder: "Select Company"
  },
  { 
    name: "customerId", 
    label: "Customer Code", 
    modalFieldName: "customerId",
    placeholder: "Select Customer"
  },
  { 
    name: "vendorId", 
    label: "Vendor Code", 
    type: "text",
    placeholder: "Enter Vendor Code"
  },
  { 
    name: "vatCategory", 
    label: "VAT Category", 
    type: "select", 
    options: ["Standard", "Reduced", "Zero", "Exempt", "Special"],
    placeholder: "Select VAT Category"
  },
];

// Table columns for Lane and Charges section
const laneChargesColumns = [
  { 
    accessorKey: "sourceGeoCountry", 
    header: "Source Geo Country", 
    type: "select",
    options: ["India", "USA", "UK", "Germany", "France", "Japan", "China", "Australia"],
    placeholder: "Select Source Geo Country"
  },
  { 
    accessorKey: "sourceCountry", 
    header: "Source Country", 
    type: "text",
    placeholder: "Enter Source Country"
  },
  { 
    accessorKey: "destinationGeoCountry", 
    header: "Destination Geo Country", 
    type: "select",
    options: ["India", "USA", "UK", "Germany", "France", "Japan", "China", "Australia"],
    placeholder: "Select Destination Geo Country"
  },
  { 
    accessorKey: "destinationCountry", 
    header: "Destination Country", 
    type: "text",
    placeholder: "Enter Destination Country"
  },
];



export default function VatMasterPage() {
  const form = useForm({
    resolver: zodResolver(vatInfoSchema),
    defaultValues: {
      vatId: "",
      name: "",
      description: "",
      companyCode: "",
      customerId: "",
      vendorId: "",
      vatCategory: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("VAT Info Submitted:", data);
  };

  const handleTableSave = (rowData, rowIndex) => {
    console.log("Lane and Charges row saved:", rowData, "at index:", rowIndex);
  };

  const sections = [
    {
      type: "form",
      title: "VAT Info",
      form,
      fields: vatInfoFields,
      onSubmit: handleSubmit,
      children: (
        <div className="col-span-full">
          <button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2">
            Save VAT Info
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Lane and Charges",
      dynamicRows: true,
      showActions: false, 
      columns: laneChargesColumns,
      defaultRow: {
        sourceGeoCountry: "",
        sourceCountry: "",
        destinationGeoCountry: "",
        destinationCountry: "",
      },
      onSave: handleTableSave,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">VAT Master</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
} 