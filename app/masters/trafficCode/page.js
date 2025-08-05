"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const trafficSchema = z.object({
  trafficCode: z.string().min(1),
  service: z.string().min(1),
  customerName: z.string().min(1),
  companyCode: z.string().min(1),
  product: z.string().min(1),
  spillOne: z.string().min(1),
  spillTwo: z.string().min(1),
  branchCode: z.string().min(1),
  modeOfTransport: z.string().min(1),
  sourceCountry: z.string().min(1),
  destinationCountry: z.string().min(1),
  departmentCode: z.string().min(1),
});

export default function TrafficFormPage() {
  const form = useForm({
    resolver: zodResolver(trafficSchema),
    defaultValues: {
      trafficCode: "",
      service: "",
      customerName: "",
      companyCode: "",
      product: "",
      spillOne: "",
      spillTwo: "",
      branchCode: "",
      modeOfTransport: "",
      sourceCountry: "",
      destinationCountry: "",
      departmentCode: "",
    },
  });

  const fields = [
    { name: "trafficCode", label: "Traffic Code *" },
    { name: "service", label: "Service", type: "select", options: ["Air", "Land", "Sea"] },
    { name: "customerName", label: "Customer Name", type: "select", options: ["Flipkart", "Amazon"] },
    { name: "companyCode", label: "Company Code *" },
    { name: "product", label: "Product", type: "select", options: ["Standard", "Premium"] },
    { name: "spillOne", label: "Spill One *" },
    { name: "spillTwo", label: "Spill Two *" },
    { name: "branchCode", label: "Branch Code *" },
    { name: "modeOfTransport", label: "Mode Of Transport", type: "select", options: ["Truck", "Ship"] },
    { name: "sourceCountry", label: "Source Country" },
    { name: "destinationCountry", label: "Destination Country" },
    { name: "departmentCode", label: "Department Code", type: "select", options: ["OPS", "HR"] },
  ];

  return (
    <div className="p-4">
      <ReusableForm
        sections={[
          {
            title: "Traffic Code",
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
