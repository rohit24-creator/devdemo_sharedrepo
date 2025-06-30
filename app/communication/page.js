"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm"

const schema = z.object({
  notificationId: z.string(),
  customer: z.string(),
  fromCountry: z.string(),
  companyCode: z.string(),
  orderType: z.string(),
  service: z.string(),
  toCountry: z.string(),
  branchCode: z.string(),
  product: z.string(),
  incoTerms: z.string(),
  departmentCode: z.string(),
})

const fieldConfig = [
  { name: "notificationId", label: "Notification ID", disabled: true },
  { name: "customer", label: "Customer" },
  {
    name: "fromCountry",
    label: "From Country",
    type: "select",
    options: [
      { value: "IN", label: "India" },
      { value: "US", label: "USA" },
      { value: "DE", label: "Germany" },
    ],
  },
  { name: "companyCode", label: "Company Code" },
  {
    name: "orderType",
    label: "Order Type",
    type: "select",
    options: [
      { value: "bulk", label: "Bulk" },
      { value: "single", label: "Single" },
    ],
  },
  {
    name: "service",
    label: "Service",
    type: "select",
    options: [
      { value: "air", label: "Air" },
      { value: "sea", label: "Sea" },
      { value: "road", label: "Road" },
    ],
  },
  {
    name: "toCountry",
    label: "To Country",
    type: "select",
    options: [
      { value: "IN", label: "India" },
      { value: "US", label: "USA" },
      { value: "DE", label: "Germany" },
    ],
  },
  { name: "branchCode", label: "Branch Code" },
  {
    name: "product",
    label: "Product",
    type: "select",
    options: [
      { value: "mobile", label: "Mobile" },
      { value: "laptop", label: "Laptop" },
    ],
  },
  {
    name: "incoTerms",
    label: "Inco Terms",
    type: "select",
    options: [
      { value: "FOB", label: "FOB" },
      { value: "CIF", label: "CIF" },
    ],
  },
  {
    name: "departmentCode",
    label: "Department Code",
    type: "select",
    options: [
      { value: "sales", label: "Sales" },
      { value: "logistics", label: "Logistics" },
    ],
  },
]

const tableColumns = [
  { accessorKey: "booking", header: "Booking" },
  { accessorKey: "trip", header: "Trip" },
  { accessorKey: "visibility", header: "Visibility" },
  { accessorKey: "alerts", header: "Alerts" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "select", header: "#" },
]

const initialTableRow = {
  booking: "Create, Modify, Delete",
  trip: "Create, Modify, Delete",
  visibility: "Driver-Accept, Pickup, Delivered, ePOD",
  alerts: "Route Deviation, Speed, Temperature",
  action: "Email, SMS, WhatsApp",
  select: "Select All",
}

export default function NotificationForm() {
  const [rows] = useState([initialTableRow])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      notificationId: "NTF-001",
      customer: "",
      fromCountry: "",
      companyCode: "THKN",
      orderType: "",
      service: "",
      toCountry: "",
      branchCode: "",
      product: "",
      incoTerms: "",
      departmentCode: "",
    },
  })

  const handleSubmit = (data) => {
    console.log("Submitted:", data)
  }

  const sections = [
    {
      type: "form",
      title: "Search",
      form,
      fields: fieldConfig,
      onSubmit: handleSubmit,
      children: (
        <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
          Save Notification
        </Button>
      ),
    },
    {
      type: "table",
      title: "Notification Rules",
      columns: tableColumns,
      rows,
    },
  ]

  return <div className="p-6"><ReusableForm sections={sections} tableAccordion={false} /></div>
}
