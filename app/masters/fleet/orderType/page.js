"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const ordertypeSchem = z.object({
  OrderType: z.string().min(1),
  Description: z.string().min(1),
  customerName: z.string().min(1),
  companyCode: z.string().min(1),
  branchCode: z.string().min(1),
  departmentCode: z.string().min(1),
});

export default function OrderTypeFormPage() {
  const form = useForm({
    resolver: zodResolver(ordertypeSchem),
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
    { name: "Order Type", label: "Order Type *" },
    { name: "Description", label: "Description", type: "select", options: ["Air", "Land", "Sea"] },
    { name: "Customer Name", label: "Customer Name *", type: "select", options: ["Flipkart", "Amazon"] },
    { name: "companyCode", label: "Company Code *" },
    { name: "Department Code", label: "Department Code ", type: "select", options: ["Standard", "Premium"] },
    { name: "branchCode", label: "Branch Code  *" },
   
  ];

  return (
    <div className="p-4">
      <ReusableForm
        sections={[
          {
            title: "Order Type",
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
