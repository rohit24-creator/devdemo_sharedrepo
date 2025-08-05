"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const vehicleSchema = z.object({
  vechicletype: z.string().min(1),
  Description: z.string().min(1),
  companyCode: z.string().min(1),
  branchCode: z.string().min(1),
  departmentCode: z.string().min(1),
    attachment: z.any().optional(), // File input

});

export default function VehicleTypeFormPage() {
  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vechicletype: "",
      Description: "",
      companyCode: "",
      branchCode: "",
      departmentCode: "",
      attachment: undefined,

    },
  });

  const fields = [
    { name: "vechicletype", label: "Vehicle Type *" },
    { name: "description", label: "Description", type: "select", options: ["Air", "Land", "Sea"] },
    { name: "companyCode", label: "Company Code *" },
    { name: "Department Code", label: "Department Code ", type: "select", options: ["Standard", "Premium"] },
    { name: "branchCode", label: "Branch Code  *" },
    { name: "attachment", label: "Image", type: "file" }, // file input

   
  ];

  return (
    <div className="p-4">
      <ReusableForm
        sections={[
          {
            title: "Vechicle Type",
            type: "form",
            form,
            fields,
           onSubmit: (data) => {
              console.log("Submitted:", data);
              if (data.attachment) {
                console.log("Uploaded File:", data.attachment.name);
              }
            },
          },
        ]}
      />
    </div>
  );
}
