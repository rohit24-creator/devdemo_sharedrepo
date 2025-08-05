"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm"

const shipmentSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  name: z.string().min(1, "Name is required"),
  shipmentType: z.string().min(1, "Shipment Type is required"),
  minWeight: z.string().min(1, "Minimum Weight is required"),
  maxWeight: z.string().min(1, "Maximum Weight is required"),
  description: z.string().min(1, "Description is required"),
  region: z.string().min(1, "Region is required"),
  priority: z.string().min(1, "Priority is required"),
})

const weightOptions = Array.from({ length: 20 }, (_, i) => ({
  label: `${i + 1} kg`,
  value: `${i + 1}`,
}))

const fieldConfig = [
  { name: "customerId", label: "Customer ID" },
  { name: "name", label: "Name", placeholder: "Enter name" },
  { name: "shipmentType", label: "Shipment Type" },
  {
    name: "minWeight",
    label: "Minimum Weight",
    type: "select",
    options: weightOptions,
  },
  {
    name: "maxWeight",
    label: "Maximum Weight",
    type: "select",
    options: weightOptions,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
  },
  {
    name: "region",
    label: "Region",
    type: "select",
    options: [
      { label: "North", value: "north" },
      { label: "South", value: "south" },
      { label: "East", value: "east" },
      { label: "West", value: "west" },
    ],
  },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: [
      { label: "High", value: "high" },
      { label: "Medium", value: "medium" },
      { label: "Low", value: "low" },
    ],
  },
]

export default function StatusForm() {
  const form = useForm({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      customerId: "",
      name: "",
      shipmentType: "",
      minWeight: "",
      maxWeight: "",
      description: "",
      region: "",
      priority: "",
    },
  })

  const handleSubmit = (data) => {
    console.log("Submitted Shipment Form:", data)
  }

  const sections = [
    {
      type: "form",
      title: "Allocation Rule",
      form,
      fields: fieldConfig,
      onSubmit: handleSubmit,
      children: (
        <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
          Save Shipment
        </Button>
      ),
    },
  ]

  return <div className="p-6"><ReusableForm sections={sections} /></div>
}
