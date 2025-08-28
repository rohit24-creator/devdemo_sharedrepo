"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const PreferredSchema = z.object({
  carrierid: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipcode: z.string().min(1),

});

export default function PreferredFormPage() {
  const form = useForm({
    resolver: zodResolver(PreferredSchema),
    defaultValues: {
      carrierid: "",
      city: "",
      state: "",
      zipcode: "",
     
    },
  });

  const fields = [
    { name: "carrierid", label: "Carrier Id *" , type: "select", options: ["Air", "Land", "Sea"]},
    { name: "city", label: "City *" },
    { name: "state", label: "State *"},
    { name: "zipcode", label: "Zip Code *"},
  ];

  return (
    <div className="p-6">
      <ReusableForm
        sections={[
          {
            title:"Preferred State",
            type: "form",
            form,
            fields,
            disableAccordionToggle: true,
            onSubmit: (data) => console.log("Submitted:", data),
          },
        ]}
      />
    </div>
  );
}
