"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const geoTierSchema = z.object({
  geoTierId: z.string().min(1, "Geo Tier ID is required"),
  geoTierName: z.string().min(1, "Geo Tier Name is required"),
  geoHierarchy: z.string().min(1, "Geo Hierarchy is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  uom: z.string().min(1, "UOM is required"),
  currency: z.string().min(1, "Currency is required"),
  vehicleType: z.string().min(1, "Vehicle Type is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  marginalCost: z.boolean().default(false),
  flat: z.boolean().default(false),
});

const geoTierFields = [
  { 
    name: "geoTierId", 
    label: "Geo Tier ID", 
    type: "text",
    placeholder: "Enter Geo Tier ID",
  },
  { 
    name: "geoTierName", 
    label: "Geo Tier Name", 
    type: "text",
    placeholder: "Enter Geo Tier Name",
  },
  { 
    name: "geoHierarchy", 
    label: "Geo Hierarchy", 
    type: "select",
    options: [
      { value: "country", label: "Country" },
      { value: "state", label: "State/Province" },
      { value: "city", label: "City" },
      { value: "postal_code", label: "Postal Code" },
      { value: "zone", label: "Zone" },
      { value: "region", label: "Region" },
      { value: "district", label: "District" },
      { value: "area", label: "Area" },
    ],
    placeholder: "Select Geo Hierarchy",
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
    modalFieldName: "companyCode",
  },
  { 
    name: "uom", 
    label: "UOM", 
    type: "text",
    placeholder: "Enter UOM",
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
    name: "currency", 
    label: "Currency", 
    type: "select",
    options: [
      { value: "USD", label: "US Dollar (USD)" },
      { value: "EUR", label: "Euro (EUR)" },
      { value: "GBP", label: "British Pound (GBP)" },
      { value: "JPY", label: "Japanese Yen (JPY)" },
      { value: "AUD", label: "Australian Dollar (AUD)" },
      { value: "CAD", label: "Canadian Dollar (CAD)" },
      { value: "CHF", label: "Swiss Franc (CHF)" },
      { value: "CNY", label: "Chinese Yuan (CNY)" },
      { value: "INR", label: "Indian Rupee (INR)" },
      { value: "SGD", label: "Singapore Dollar (SGD)" },
      { value: "THB", label: "Thai Baht (THB)" },
      { value: "MYR", label: "Malaysian Ringgit (MYR)" },
    ],
    placeholder: "Select Currency",
  },
  { 
    name: "vehicleType", 
    label: "Vehicle Type", 
    type: "select",
    options: [
      { value: "truck", label: "Truck" },
      { value: "van", label: "Van" },
      { value: "car", label: "Car" },
      { value: "motorcycle", label: "Motorcycle" },
      { value: "bicycle", label: "Bicycle" },
      { value: "ship", label: "Ship" },
      { value: "airplane", label: "Airplane" },
      { value: "train", label: "Train" },
      { value: "bus", label: "Bus" },
      { value: "container", label: "Container" },
      { value: "trailer", label: "Trailer" },
      { value: "pickup", label: "Pickup Truck" },
    ],
    placeholder: "Select Vehicle Type",
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
  { 
    name: "flat", 
    label: "Flat", 
    type: "checkbox",
    placeholder: "Enable Flat Rate",
  },
];

export default function GeoTierPage() {
  const form = useForm({
    resolver: zodResolver(geoTierSchema),
    defaultValues: {
      geoTierId: "",
      geoTierName: "",
      geoHierarchy: "",
      companyCode: "",
      uom: "",
      currency: "",
      vehicleType: "",
      branchCode: "",
      marginalCost: false,
      flat: false,
    },
  });

  const handleSubmit = (data) => {
    console.log("Geo Tier Submitted:", data);
  };

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: geoTierFields,
      onSubmit: handleSubmit,
      children: (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2"
          >
            Save Geo Tier
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Geo Tier</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
