"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm"
import { formatRowsWithId } from "@/lib/utils"

const ediFormSchema = z.object({
  transactionAction: z.string(),
  incoTerms: z.string(),
  triggeredAt: z.string(),
  retrigger: z.string(),
  orderType: z.string(),
  orderStatus: z.string(),
  product: z.string(),
  service: z.string(),
  modeOfTransport: z.string(),
  pickUp: z.string(),
  destination: z.string(),
  commodity: z.string(),
  type: z.string(),
  userName: z.string(),
  password: z.string(),
  ediUrl: z.string(),
  xsdFile: z.any(),
})

export default function EdiFormComponent() {
  const form = useForm({
    resolver: zodResolver(ediFormSchema),
    defaultValues: {
      transactionAction: "",
      incoTerms: "",
      triggeredAt: "",
      retrigger: "",
      orderType: "",
      orderStatus: "",
      product: "",
      service: "",
      modeOfTransport: "",
      pickUp: "",
      destination: "",
      commodity: "",
      type: "",
      userName: "",
      password: "",
      ediUrl: "",
      xsdFile: null,
    },
  })

  const [entries, setEntries] = useState([])

  const onSubmit = (data) => {
    setEntries((prev) => formatRowsWithId([...prev, data]))
    form.reset()
  }

  const ediFields = [
    { name: "transactionAction", label: "Transaction Action", type: "select", options: ["A", "B"] },
    { name: "incoTerms", label: "Inco Terms", type: "select", options: ["FOB", "CIF"] },
    { name: "triggeredAt", label: "Triggered At", type: "select", options: ["Start", "End"] },
    { name: "retrigger", label: "Retrigger", type: "select", options: ["Yes", "No"] },
    { name: "orderType", label: "Order Type", type: "select", options: ["Bulk", "Single"] },
    { name: "orderStatus", label: "Order Status", type: "select", options: ["Pending", "Confirmed"] },
    { name: "product", label: "Product", type: "select", options: ["A", "B"] },
    { name: "service", label: "Service", type: "select", options: ["S1", "S2"] },
    { name: "modeOfTransport", label: "Mode Of Transport", type: "select", options: ["Air", "Sea"] },
    { name: "pickUp", label: "Pick Up" },
    { name: "destination", label: "Destination" },
    { name: "commodity", label: "Commodity" },
    { name: "type", label: "Type", type: "select", options: ["X", "Y"] },
    { name: "userName", label: "User Name" },
    { name: "password", label: "Password" },
    { name: "ediUrl", label: "EDI URL" },
    { name: "xsdFile", label: "Upload XSD File", type: "file" },
  ]

const sections = [
  {
    type: "form",
    title: "EDI/API",
    form,
    fields: ediFields,
    disableAccordionToggle: true,
    onSubmit,
    children: (
      <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
        Add EDI/API
      </Button>
    ),
    customTable: {
      schema: ediFormSchema,
      entries,
      onEdit: (entry, index) => form.reset(entry),
      onDelete: (row) => {
        const updated = entries.filter((r) => r.id !== row.id)
        setEntries(updated)
      },
      renderOutsideForm: true, 
    },
  },
];


  return (
    <div className="p-6">
      <ReusableForm sections={sections} />
    </div>
  )
}
