"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm"

const vehicleSchema = z.object({
  profileId: z.string().min(1, "Profile ID is required"),
  name: z.string().min(1),
  description: z.string().min(1),
  companyCode: z.string().min(1, "Company Code is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
})

const fieldConfig = [
  { name: "profileId", label: "Profile ID", disabled: true },
  { name: "name", label: "Name" },
  { name: "description", label: "Description" },
  { name: "companyCode", label: "Company Code" },
  { name: "branchCode", label: "Branch Code" },
]

const tableColumns = [
  { accessorKey: "vehicleType", header: "Vehicle Type" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "icon", header: "Icon" },
]

export default function VehicleProfileForm() {
  const [rows, setRows] = useState([])

  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      profileId: "VH-001",
      name: "",
      description: "",
      companyCode: "",
      branchCode: "",
    },
  })

  const handleSubmit = (data) => {
    console.log("Submitted:", data)
  }

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: fieldConfig,
      onSubmit: handleSubmit,
      children: (
        <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
          Save Profile
        </Button>
      ),
    },
    {
      type: "table",
      title: "Vehicle List",
      columns: tableColumns,
      rows,
    },
  ]

  return <div className="p-6"><ReusableForm sections={sections} /></div>
}
