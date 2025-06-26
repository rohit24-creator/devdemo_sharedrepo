"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const regionSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  departmentCode: z.string().min(1),

});

export default function RegionsFormPage() {
  const form = useForm({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      name: "",
      description: "",
      departmentCode: "",

    },
  });

  const fields = [
    { name: "name", label: "Name*" },
    { name: "description", label: "Description", type: "textarea"},
    { name: "departmentCode", label: "Department Code ", type: "select", options: ["Standard", "Premium"] },
   

   
  ];

  return (
    <div className="p-4">
      <ReusableForm
        sections={[
          {
            title: "Regions",
            type: "form",
            form,
            fields,
           onSubmit: (data) => {
              console.log("Submitted:", data);
            },
          },
        ]}
      />
    </div>
  );
}
