"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillingForm } from "@/components/ui/reusableComponent/dashboardform";
import { Button } from "@/components/ui/button";

const toNumberOrUndefined = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
};

const carrierRateSchema = z.object({
  carrier: z.string().min(1, "Carrier is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip Code is required"),
  totalMiles: z.preprocess(toNumberOrUndefined, z.number({ required_error: "Total Miles is required" }).min(0, "Total Miles must be >= 0")),
  chargeRate2014: z.preprocess(toNumberOrUndefined, z.number().min(0, "Must be >= 0")).optional(),
  chargeRate2020: z.preprocess(toNumberOrUndefined, z.number().min(0, "Must be >= 0")).optional(),
  chargeRate2022: z.preprocess(toNumberOrUndefined, z.number().min(0, "Must be >= 0")).optional(),
  fscPercent: z.preprocess(toNumberOrUndefined, z.number().min(0, "FSC % must be between 0 and 100").max(100, "FSC % must be between 0 and 100")).optional(),
  fscDollar: z.preprocess(toNumberOrUndefined, z.number().min(0, "Must be >= 0")).optional(),
  greenTruckFeesGitPercent: z.preprocess(toNumberOrUndefined, z.number().min(0).max(100)).optional(),
  greenTruckFeesGitDollar: z.preprocess(toNumberOrUndefined, z.number().min(0)).optional(),
  chargeRateIncluding: z.preprocess(toNumberOrUndefined, z.number().min(0, "Must be >= 0")).optional(),
});

export default function CarrierRatesPage() {
  const form = useForm({
    resolver: zodResolver(carrierRateSchema),
    defaultValues: {
      carrier: "",
      city: "",
      zipCode: "",
      totalMiles: "",
      chargeRate2014: "",
      chargeRate2020: "",
      chargeRate2022: "",
      fscPercent: "",
      fscDollar: "",
      greenTruckFeesGitPercent: "",
      greenTruckFeesGitDollar: "",
      chargeRateIncluding: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (values) => {
    console.log("Carrier Rate - Save:", values);
    // TODO: integrate with API when ready
  };

  const handleReset = () => form.reset();
  const handleCancel = () => form.reset();

  const sections = [
    {
      title: "Add Rate",
      disableAccordionToggle: true,
      form: {
        ...form,
        handleSubmit: form.handleSubmit,
      },
      fields: [
        { name: "carrier", label: "Carrier", type: "select", options: ["ShipmentX", "Speedy Freight", "DHL", "FedEx"], placeholder: "Select Carrier" },
        { name: "city", label: "City", type: "text", placeholder: "City" },
        { name: "zipCode", label: "Zip Code", type: "text", placeholder: "Zip Code" },

        { name: "totalMiles", label: "Total Miles", type: "number", placeholder: "Total Miles" },

        { name: "chargeRate2014", label: "Charge Rate 2014", type: "number", placeholder: "Charge Rate 2014" },
        { name: "chargeRate2020", label: "Charge Rate 2020", type: "number", placeholder: "Charge Rate 2020" },
        { name: "chargeRate2022", label: "Charge Rate 2022", type: "number", placeholder: "Charge Rate 2022" },

        { name: "fscPercent", label: "FSC %", type: "number", placeholder: "FSC %" },
        { name: "fscDollar", label: "FSC $", type: "number", placeholder: "FSC $" },

        { name: "greenTruckFeesGitPercent", label: "Green Truck Feels Git %", type: "number", placeholder: "Green Truck Feels Git %" },
        { name: "greenTruckFeesGitDollar", label: "Green Truck Feels Git $", type: "number", placeholder: "Green Truck Feels Git $" },

        { name: "chargeRateIncluding", label: "Charge Rate(Including FSC + GTF + TOLL)", type: "number", placeholder: "Charge Rate(Including FSC + GTF + TOLL)" },
      ],
    
    },
  ];

  return (
    <div className="p-6">
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
