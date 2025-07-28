"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm"

const laneSchema = z.object({
  laneId: z.string().min(1),
  laneName: z.string().min(1),
  sourceGeo: z.string().min(1),
  companyCode: z.string().min(1),
  sourceCountry: z.string().min(1),
  source: z.string().min(1),
  destinationGeo: z.string().min(1),
  destinationCountry: z.string().min(1),
  destination: z.string().min(1),
})

const fieldConfig = [
  { name: "laneId", label: "Lane ID", disabled: true },
  { name: "laneName", label: "Lane Name" },
  {
    name: "sourceGeo",
    label: "Source Geo",
    type: "select",
    options: [
      { label: "North America", value: "NA" },
      { label: "Europe", value: "EU" },
      { label: "Asia", value: "AS" },
    ],
  },
  { name: "companyCode", label: "Company Code" },
  {
    name: "sourceCountry",
    label: "Source Country",
    type: "select",
    options: [
      { label: "USA", value: "US" },
      { label: "India", value: "IN" },
      { label: "Germany", value: "DE" },
    ],
  },
  { name: "source", label: "Source" },
  {
    name: "destinationGeo",
    label: "Destination Geo",
    type: "select",
    options: [
      { label: "Africa", value: "AF" },
      { label: "Australia", value: "AU" },
      { label: "South America", value: "SA" },
    ],
  },
  {
    name: "destinationCountry",
    label: "Destination Country",
    type: "select",
    options: [
      { label: "South Africa", value: "ZA" },
      { label: "Brazil", value: "BR" },
      { label: "Australia", value: "AU" },
    ],
  },
  { name: "destination", label: "Destination" },
]

export default function LaneForm() {
  const form = useForm({
    resolver: zodResolver(laneSchema),
    defaultValues: {
      laneId: "LN-001",
      laneName: "",
      sourceGeo: "",
      companyCode: "",
      sourceCountry: "",
      source: "",
      destinationGeo: "",
      destinationCountry: "",
      destination: "",
    },
  })

  const handleSubmit = (data) => {
    console.log("Submitted Lane Data:", data)
  }

  const sections = [
    {
      type: "form",
      title: "Lane Master",
      form,
      fields: fieldConfig,
      disableAccordionToggle: true,
      onSubmit: handleSubmit,
      children: (
        <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
          Save Lane
        </Button>
      ),
    },
  ]

  return <div className="p-6"><ReusableForm sections={sections} /></div>
}
