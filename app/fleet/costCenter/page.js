"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";
const costcenterSchema = z.object({
  costcenter: z.string().min(1),
  Description: z.string().min(1),
  customerName: z.string().min(1),
  companyCode: z.string().min(1),
  branchCode: z.string().min(1),
  departmentCode: z.string().min(1),
});

export default function CostFormPage() {
  const form = useForm({
    resolver: zodResolver(costcenterSchema),
    defaultValues: {
      OrderType: "",
      Description: "",
      customerName: "",
      companyCode: "",
      branchCode: "",
      departmentCode: "",
    },
  });

  const fields = [
    { name: "costcenter", label: "Cost Center *" },
    { name: "description", label: "Description", type: "select", options: ["Air", "Land", "Sea"] },
    { name: "customerName", label: "Customer Name *", type: "select", options: ["Flipkart", "Amazon"] },
    { name: "companyCode", label: "Company Code *" },
    { name: "Department Code", label: "Department Code ", type: "select", options: ["Standard", "Premium"] },
    { name: "branchCode", label: "Branch Code  *" },
   
  ];

  return (
    <div className="p-4">
      <ReusableForm
        sections={[
          {
            title: "Cost Center",
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
