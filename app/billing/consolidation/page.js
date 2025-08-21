"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const consolidationSchema = z.object({
  consolidationRuleId: z.string().min(1, "Consolidation Rule ID is required"),
  consolidationRuleName: z.string().min(1, "Consolidation Rule Name is required"),
  consolidationTariffType: z.string().min(1, "Consolidation Tariff Type is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  consolidationRuleUOM: z.string().min(1, "Consolidation Rule UOM is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  // Consolidation details fields
  customerCid: z.boolean().default(false),
  earlyPickupCreatedDate: z.boolean().default(false),
  earlyDeliveryCreatedDate: z.boolean().default(false),
  shipperCid: z.boolean().default(false),
  shipperCity: z.boolean().default(false),
  shipperPostalcode: z.boolean().default(false),
  consigneeCid: z.boolean().default(false),
  consigneeCity: z.boolean().default(false),
  consigneePostalcode: z.boolean().default(false),
  tripNo: z.boolean().default(false),
  reference1Checkbox: z.boolean().default(false),
  reference2Checkbox: z.boolean().default(false),
  reference3Checkbox: z.boolean().default(false),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

const generalInfoFields = [
  { 
    name: "consolidationRuleId", 
    label: "Consolidation Rule ID", 
    type: "text",
    placeholder: "Enter Consolidation Rule ID",
  },
  { 
    name: "consolidationRuleName", 
    label: "Consolidation Rule Name", 
    type: "text",
    placeholder: "Enter Consolidation Rule Name"
  },
  { 
    name: "consolidationTariffType", 
    label: "Consolidation Tariff Type", 
    type: "select",
    options: [
      { value: "import", label: "Import" },
      { value: "export", label: "Export" },
      { value: "domestic", label: "Domestic" },
      { value: "transit", label: "Transit" },
      { value: "cross_trade", label: "Cross Trade" }
    ],
    placeholder: "Select Consolidation Tariff Type"
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
  },
  { 
    name: "consolidationRuleUOM", 
    label: "Consolidation Rule UOM", 
    type: "select",
    options: [
      { value: "kg", label: "Kilogram (KG)" },
      { value: "lb", label: "Pound (LB)" },
      { value: "cbm", label: "Cubic Meter (CBM)" },
      { value: "cft", label: "Cubic Feet (CFT)" },
      { value: "piece", label: "Piece" },
      { value: "pallet", label: "Pallet" },
      { value: "container", label: "Container" }
    ],
    placeholder: "Select Consolidation Rule UOM"
  },
  { 
    name: "branchCode", 
    label: "Branch Code", 
    type: "text",
    placeholder: "Enter Branch Code",
  },
];

const referenceOptions = [
  { value: "ref001", label: "Reference 001" },
  { value: "ref002", label: "Reference 002" },
  { value: "ref003", label: "Reference 003" },
  { value: "ref004", label: "Reference 004" },
  { value: "ref005", label: "Reference 005" },
  { value: "ref006", label: "Reference 006" },
  { value: "ref007", label: "Reference 007" },
  { value: "ref008", label: "Reference 008" },
  { value: "ref009", label: "Reference 009" },
  { value: "ref010", label: "Reference 010" },
];

const consolidationDetailsFields = [
  { 
    name: "customerCid", 
    type: "checkbox",
    placeholder: "Customer CID"
  },
  { 
    name: "earlyPickupCreatedDate", 
    type: "checkbox",
    placeholder: "Early Pickup Created Date"
  },
  { 
    name: "earlyDeliveryCreatedDate", 
    type: "checkbox",
    placeholder: "Early Delivery Created Date"
  },
  { 
    name: "shipperCid", 
    type: "checkbox",
    placeholder: "Shipper CID"
  },
  { 
    name: "shipperCity", 
    type: "checkbox",
    placeholder: "Shipper City"
  },
  { 
    name: "shipperPostalcode", 
    type: "checkbox",
    placeholder: "Shipper Postalcode"
  },
  { 
    name: "consigneeCid", 
    type: "checkbox",
    placeholder: "Consignee CID"
  },
  { 
    name: "consigneeCity", 
    type: "checkbox",
    placeholder: "Consignee City"
  },
  { 
    name: "consigneePostalcode", 
    type: "checkbox",
    placeholder: "Consignee Postalcode"
  },
  {
    name: "tripNo",
    type: "checkbox",
    placeholder: "Trip No"
  },
  { 
    name: "reference1Checkbox", 
    type: "checkboxWithInput",
    label: "Reference 1",
    placeholder: "Reference 1",
    inputField: {
      type: "select",
      options: referenceOptions,
      placeholder: "Select Reference 1"
    }
  },
  { 
    name: "reference2Checkbox", 
    type: "checkboxWithInput",
    label: "Reference 2",
    placeholder: "Reference 2",
    inputField: {
      type: "select",
      options: referenceOptions,
      placeholder: "Select Reference 2"
    }
  },
  { 
    name: "reference3Checkbox", 
    type: "checkboxWithInput",
    label: "Reference 3",
    placeholder: "Reference 3",
    inputField: {
      type: "select",
      options: referenceOptions,
      placeholder: "Select Reference 3"
    }
  },
];

export default function ConsolidationPage() {
  const form = useForm({
    resolver: zodResolver(consolidationSchema),
    defaultValues: {
      consolidationRuleId: "",
      consolidationRuleName: "",
      consolidationTariffType: "",
      companyCode: "",
      consolidationRuleUOM: "",
      branchCode: "",
      customerCid: false,
      earlyPickupCreatedDate: false,
      earlyDeliveryCreatedDate: false,
      shipperCid: false,
      shipperCity: false,
      shipperPostalcode: false,
      consigneeCid: false,
      consigneeCity: false,
      consigneePostalcode: false,
      tripNo: false,
      reference1Checkbox: false,
      reference2Checkbox: false,
      reference3Checkbox: false,
      reference1: "",
      reference2: "",
      reference3: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Consolidation General Info Submitted:", data);
  };

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: generalInfoFields,
      onSubmit: handleSubmit,
      children: (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2"
          >
            Save Consolidation
          </button>
        </div>
      ),
    },
    {
      type: "form",
      title: "Consolidation Details",
      form,
      fields: consolidationDetailsFields,
      onSubmit: handleSubmit,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Consolidation</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
