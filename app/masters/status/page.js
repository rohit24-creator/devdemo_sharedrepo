"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm"

const statusSchema = z.object({
  statusName: z.string().min(1, "Status Name is required"),
  statusCode: z.string().min(1, "Status Code is required"),
  description: z.string().min(1),
  companyCode: z.string().min(1, "Company Code is required"),
  statusType: z.string().min(1, "Status Type is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
})

const fieldConfig = [
  { name: "statusName", label: "Status Name" },
  { name: "statusCode", label: "Status Code" },
  { name: "description", label: "Description" },
  { name: "companyCode", label: "Company Code" },
{
  name: "statusType",
  label: "Status Type",
  type: "select",
  options: [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Pending", value: "pending" },
  ],
},
  { name: "branchCode", label: "Branch Code" },
]

export default function StatusForm() {
  const form = useForm({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      statusName: "",
      statusCode: "",
      description: "",
      companyCode: "THKN",
      statusType: "",
      branchCode: "",
    },
  })

  const handleSubmit = (data) => {
    console.log("Submitted Status Form:", data)
  }

  const sections = [
    {
      type: "form",
      title: "Status Master",
      form,
      fields: fieldConfig,
      disableAccordionToggle: true,
      onSubmit: handleSubmit,
      children: (
        <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
          Save Status
        </Button>
      ),
    },
  ]

  return <div className="p-6"><ReusableForm sections={sections} /></div>
}
