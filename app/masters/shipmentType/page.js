"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const shipmenttypeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  departmentCode: z.string().min(1),

});

export default function ShipmentTypeFormPage() {
  const form = useForm({
    resolver: zodResolver(shipmenttypeSchema),
    defaultValues: {
      name: "",
      description: "",
      departmentCode: "",

    },
  });

  const fields = [
    { name: "name", label: "Name*" },
    { name: "description", label: "Description", type: "textarea", wide: true },
    { name: "departmentCode", label: "Department Code ", type: "select", options: ["Standard", "Premium"] },
  ];

  return (
    <div className="p-6">
      <ReusableForm
        sections={[
          {
            title: "Shipment Types",
            type: "form",
            form,
            fields,
            disableAccordionToggle: true,
           onSubmit: (data) => {
              console.log("Submitted:", data);
            },
          },
        ]}
      />
    </div>
  );
}
