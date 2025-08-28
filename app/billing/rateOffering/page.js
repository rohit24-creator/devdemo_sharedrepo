"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";
import { TabsNavbar } from "@/components/ui/reusableComponent/tabsNavbar";

// Import the other pages as components
import DefaultServicesPage from "./defaultServices/page";
import ReferenceInfoPage from "./referenceInfo/page";

const generalInfoSchema = z.object({
  offeringId: z.string().min(1, "Offering ID is required"),
  offeringName: z.string().min(1, "Offering Name is required"),
  description: z.string().optional(),
  companyCode: z.string().min(1, "Company Code is required"),
  offeringType: z.string().min(1, "Offering Type is required"),
  rateService: z.string().min(1, "Rate Service is required"),
  laneId: z.string().min(1, "Lane ID is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  effectiveDate: z.string().min(1, "Effective Date is required"),
  expireDate: z.string().min(1, "Expire Date is required"),
  active: z.boolean().optional(),
  quote: z.boolean().optional(),
  tariffType: z.string().min(1, "Tariff Type is required"),
  vehicleProfile: z.string().optional(),
  vendorProfile: z.string().optional(),
  conversionFactorId: z.string().min(1, "Conversion Factor ID is required"),
});

const constraintsSchema = z.object({
  weightMin: z.string().optional(),
  weightMax: z.string().optional(),
  volumeMin: z.string().optional(),
  volumeMax: z.string().optional(),
  distanceMin: z.string().optional(),
  distanceMax: z.string().optional(),
  cargoProfile: z.string().optional(),
});

const fieldConfig = [
  { name: "offeringId", label: "Offering ID" },
  { name: "offeringName", label: "Offering Name" },
  { name: "description", label: "Description" },
  { name: "companyCode", label: "Company Code" },
  { name: "offeringType", label: "Offering Type", type: "select", options: ["Type 1", "Type 2"] },
  { name: "rateService", label: "Rate Service", type: "select", options: ["Service 1", "Service 2"] },
  { name: "laneId", label: "Lane ID", type: "select", options: ["Lane 1", "Lane 2"] },
  { name: "branchCode", label: "Branch Code" },
  { name: "effectiveDate", label: "Effective Date", type: "date" },
  { name: "expireDate", label: "Expire Date", type: "date" },
  { name: "active", label: "Active", type: "checkbox" },
  { name: "quote", label: "Quote", type: "checkbox" },
  { name: "tariffType", label: "Tariff Type", type: "select", options: ["Tariff 1", "Tariff 2"] },
  { name: "vehicleProfile", label: "Vehicle Profile" },
  { name: "vendorProfile", label: "Vendor Profile" },
  { name: "conversionFactorId", label: "Conversion Factor ID", type: "select", options: ["Factor 1", "Factor 2"] },
];

const constraintsConfig = [
  {
    title: "Weight",
    fields: [
      { name: "weightMin", label: "Min", placeholder: "Min", unitOptions: ["KG", "LB", "TON"] },
      { name: "weightMax", label: "Max", placeholder: "Max", unitOptions: ["KG", "LB", "TON"] }
    ]
  },
  {
    title: "Volume",
    fields: [
      { name: "volumeMin", label: "Min", placeholder: "Min", unitOptions: ["CBM", "CFT", "LTR"] },
      { name: "volumeMax", label: "Max", placeholder: "Max", unitOptions: ["CBM", "CFT", "LTR"] }
    ]
  },
  {
    title: "Distance",
    fields: [
      { name: "distanceMin", label: "Min", placeholder: "Min", unitOptions: ["KM", "MI", "NM"] },
      { name: "distanceMax", label: "Max", placeholder: "Max", unitOptions: ["KM", "MI", "NM"] }
    ]
  },
  {
    title: "Cargo Profile",
    fields: [
      { name: "cargoProfile", label: "Profile", placeholder: "Enter cargo profile" }
    ]
  }
];

const handleSubmit = (data) => {
    console.log("Billing Form Submitted:", data)
  }

// Main Rate Offering Content Component
function RateOfferingContent() {
  const form = useForm({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      offeringId: "",
      offeringName: "",
      description: "",
      companyCode: "",
      offeringType: "",
      rateService: "",
      laneId: "",
      branchCode: "",
      effectiveDate: "",
      expireDate: "",
      active: false,
      quote: false,
      tariffType: "",
      vehicleProfile: "",
      vendorProfile: "",
      conversionFactorId: "",
    },
  });

  const constraintsForm = useForm({
    resolver: zodResolver(constraintsSchema),
    defaultValues: {
      weightMin: "",
      weightMax: "",
      volumeMin: "",
      volumeMax: "",
      distanceMin: "",
      distanceMax: "",
      cargoProfile: "",
    },
  });

  const dummyForm = useForm();

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: fieldConfig,
      onSubmit: handleSubmit,
    },
    {
      title: "Constraints",
      type: "form",
      form: dummyForm,
      onSubmit: () => {},
      onInvalid: () => {},
      fields: [],
      renderLayout: ({ renderField }) => {
        return (
          <FormProvider {...constraintsForm}>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {constraintsConfig.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-4">
                    <div className="text-[#0088d2] font-semibold text-center">{column.title}</div>
                    <div className="space-y-3">
                      {column.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex}>
                          {renderField(field, constraintsForm, columnIndex)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </FormProvider>
        );
      }
    },
  ];

  return (
    <BillingForm sections={sections} />
  );
}

export default function RateOfferingPage() {
  // Define tabs configuration
  const tabs = [
    {
      value: "main",
      label: "General Info",
      component: RateOfferingContent,
    },
    {
      value: "defaultServices",
      label: "Default Services",
      component: DefaultServicesPage,
    },
    {
      value: "referenceInfo",
      label: "Reference Info",
      component: ReferenceInfoPage,
    },
  ];

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#006397]">Rate Offering</h2>
      </div>

      {/* Tabs Navigation */}
      <TabsNavbar tabs={tabs} defaultTab="main" />
    </div>
  );
}