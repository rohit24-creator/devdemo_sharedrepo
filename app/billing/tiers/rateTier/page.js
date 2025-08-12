"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const rateTierSchema = z.object({
  tierId: z.string().min(1, "Tier ID is required"),
  tierName: z.string().min(1, "Tier Name is required"),
  unitsOfMeasurement: z.string().min(1, "Units of Measurement is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  billingUnitsOfMeasurement: z.string().min(1, "Billing Units of Measurement is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  marginalCost: z.boolean().default(false),
});

const rateTierFields = [
  { 
    name: "tierId", 
    label: "Tier ID", 
    type: "text",
    placeholder: "Enter Tier ID",
  },
  { 
    name: "tierName", 
    label: "Tier Name", 
    type: "text",
    placeholder: "Enter Tier Name",
  },
  { 
    name: "unitsOfMeasurement", 
    label: "Units of Measurement", 
    type: "text",
    placeholder: "Enter Units",
    unitOptions: [
      { value: "kg", label: "Kilogram (kg)" },
      { value: "lb", label: "Pound (lb)" },
      { value: "ton", label: "Ton (ton)" },
      { value: "m3", label: "Cubic Meter (m³)" },
      { value: "ft3", label: "Cubic Feet (ft³)" },
      { value: "ltr", label: "Liter (L)" },
      { value: "gal", label: "Gallon (gal)" },
      { value: "km", label: "Kilometer (km)" },
      { value: "mile", label: "Mile (mile)" },
      { value: "pcs", label: "Pieces (pcs)" },
      { value: "box", label: "Box (box)" },
      { value: "pallet", label: "Pallet (pallet)" },
    ],
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
    modalFieldName: "companyCode",
  },
  { 
    name: "billingUnitsOfMeasurement", 
    label: "Billing Units of Measurement", 
    type: "select",
    options: [
      { value: "per_kg", label: "Per Kilogram" },
      { value: "per_ton", label: "Per Ton" },
      { value: "per_m3", label: "Per Cubic Meter" },
      { value: "per_km", label: "Per Kilometer" },
      { value: "per_piece", label: "Per Piece" },
      { value: "per_box", label: "Per Box" },
      { value: "per_pallet", label: "Per Pallet" },
      { value: "flat_rate", label: "Flat Rate" },
      { value: "percentage", label: "Percentage" },
    ],
    placeholder: "Select Billing Units",
  },
  { 
    name: "branchCode", 
    label: "Branch Code", 
    type: "text",
    placeholder: "Enter Branch Code",
    modalFieldName: "branchCode",
  },
  { 
    name: "marginalCost", 
    label: "Marginal Cost", 
    type: "checkbox",
    placeholder: "Enable Marginal Cost",
  },
];

export default function RateTierPage() {
  const form = useForm({
    resolver: zodResolver(rateTierSchema),
    defaultValues: {
      tierId: "",
      tierName: "",
      unitsOfMeasurement: "",
      companyCode: "",
      billingUnitsOfMeasurement: "",
      branchCode: "",
      marginalCost: false,
    },
  });

  const handleSubmit = (data) => {
    console.log("Rate Tier Submitted:", data);
  };

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: rateTierFields,
      onSubmit: handleSubmit,
      children: (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2"
          >
            Save Rate Tier
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Rate Tier</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
