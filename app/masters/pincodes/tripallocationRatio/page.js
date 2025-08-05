"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const tripSchema = z.object({
  carrierid: z.string().min(1),
  sequenceno: z.string().min(1),
  startdate: z.string().min(1),
  enddate: z.string().min(1),
  ordertype: z.string().min(1),
  allocationpercentage: z.string().min(1),   
});

export default function TripFormPage() {
  const form = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      carrierid: "",
      sequenceno: "",
      startdate: "",
      enddate: "",
      ordertype: "",
      allocationpercentage: "",   
    },
  });

  const fields = [
    { name: "carrierid", label: "Carrier Id *" , type: "select", options: ["Air", "Land", "Sea"]},
    { name: "sequenceno", label: "Sequence No *" },
    { name: "startdate", label: "Start Date *", type: "date"},
    { name: "enddate", label: "End Date *", type: "date"},
    { name: "ordertype", label: "Order Type *" , type: "select", options: ["Air", "Land", "Sea"]},
    { name: "allocationpercentage", label: "Allocation Percentage *"},
  ];

  return (
    <div className="p-4">
      <ReusableForm
        sections={[
          {
            title: "Trip Allocation Ratio",
            type: "form",
            form,
            fields,
            onSubmit: (data) => console.log("Submitted:", data),
          },
        ]}
      />
    </div>
  );
}
