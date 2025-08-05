"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { BillingForm } from "@/components/ui/reusableComponent/billingForm"

const billingSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice Number is required"),
  invoiceDate: z.string().min(1, "Invoice Date is required"),
  customerId: z.string().min(1, "Customer ID is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
})

const fieldConfig = [
  { name: "invoiceNumber", label: "Invoice Number", type: "text" },
  { name: "invoiceDate", label: "Invoice Date", type: "date" },
  { name: "customerId", label: "Customer ID", modalFieldName: "customerId" },
  { name: "companyCode", label: "Company Code", modalFieldName: "companyCode" },
  { name: "branchCode", label: "Branch Code", modalFieldName: "branchCode" },
]

const tableColumns = [
  { accessorKey: "itemName", header: "Item Name" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "rate", header: "Rate" },
  { accessorKey: "amount", header: "Amount" },
]

export default function BillingPage() {
  const form = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      invoiceNumber: "",
      invoiceDate: "",
      customerId: "",
      companyCode: "",
      branchCode: "",
    },
  })

  const handleSubmit = (data) => {
    console.log("Billing Form Submitted:", data)
  }

  const sections = [
    {
      type: "form",
      title: "Billing Information",
      form,
      fields: fieldConfig,
      onSubmit: handleSubmit,
      children: (
        <div className="col-span-full">
          <button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2">
            Save Billing
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Billing Items",
      dynamicRows: true, // Enable dynamic table logic
      columns: tableColumns,
      defaultRow: {
        itemName: "",
        quantity: "",
        rate: "",
        amount: "",
      },
      initialRows: [], // Start with no rows
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-6">Billing Management</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  )
} 