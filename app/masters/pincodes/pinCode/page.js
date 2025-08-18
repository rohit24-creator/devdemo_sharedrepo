"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const pincodeSchema = z.object({
  origincity: z.string().min(1),
  originpin: z.string().min(1),
  destinationcity: z.string().min(1),
  destinationpin: z.string().min(1),
  customerId: z.string().min(1),
  customerzone: z.string().min(1),
  customerregion: z.string().min(1),
  customersurfacetat: z.string().min(1),
  customerreturnsurfacetat: z.string().min(1),
  carrierid: z.string().min(1),
  carrierzone: z.string().min(1),
  carrierregion: z.string().min(1),
  carriersurfacetat: z.string().min(1),
  carrierreturnsurfacetat: z.string().min(1),
  destinationstate: z.string().min(1),
  reverseqc: z.string().min(1),
 
});

export default function PinCodeForm() {
  const form = useForm({
    resolver: zodResolver(pincodeSchema),
    defaultValues: {
      origincity: "",
      originpin: "",
      destinationcity: "",
      destinationpin: "",
      customerId: "",
      customerzone: "",
      customerregion: "",
      customersurfacetat: "",
      customerreturnsurfacetat: "",
      carrierid: "",
      carrierzone: "",
      carrierregion: "",
      carriersurfacetat: "",
      carrierreturnsurfacetat: "",
      destinationstate: "",
      reverseqc: "",
    },
  });

  const fields = [
    { name: "origincity", label: "Origin City *" },
    { name: "originpin", label: "Origin Pin *", type: "select", options: ["Air", "Land", "Sea"] },
    { name: "destinationcity", label: "Destination City *"},
    { name: "destinationpin", label: "Destination Pin *"},
    { name:"customerId", label: "Customer ID *", type: "select", options: ["Standard", "Premium"] },
    { name: "customerzone", label: "Customer Zone"},
    { name: "customerregion", label: "Customer Region", type: "select", options: ["Standard", "Premium"] },
    { name: "customersurfacetat", label: "Customer Surface TAT"},
    { name: "customerreturnsurfacetat", label: "Customer Return Surface TAT" },
    { name: "carrierid", label: "Carrier Id *"},
    { name: "carrierzone", label: "Carrier Zone"},
    { name: "carrierregion", label: "Carrier Region", type: "select", options: ["Standard", "Premium"] },
    { name: "carriersurfacetat", label: "Carrier Surface TAT"},
    { name: "carrierreturnsurfacetat", label: "Carrier Return Surface TAT"},
    { name: "destinationstate", label: "Destination State*"},
    { name: "reverseqc", label: "Reverse QC *", type: "select", options: ["Standard", "Premium"] },  
  ];

  return (
    <div className="p-6">
      <ReusableForm
        sections={[
          {
            title: "Customer Pincodes",
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
