"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";


const generalInfoSchema = z.object({
  rateId: z.string().min(1, "Rate ID is required"),
  rateRecordName: z.string().min(1, "Rate Record Name is required"),
  description: z.string().min(1, "Description is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  offeringId: z.string().min(1, "Offering ID is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
});


const conditionsRowSchema = z.object({
  referenceId: z.string().min(1, "Reference ID is required"),
  referenceName: z.string().optional(), 
  referenceValue: z.string().min(1, "Reference Value is required"),
  conditionType: z.string().min(1, "Condition Type is required"),
});


const generalInfoFields = [
  { 
    name: "rateId", 
    label: "Rate ID", 
    type: "text",
    placeholder: "Enter Rate ID",
  },
  { 
    name: "rateRecordName", 
    label: "Rate Record Name", 
    type: "text",
    placeholder: "Enter Rate Record Name"
  },
  { 
    name: "description", 
    label: "Description", 
    type: "textarea",
    placeholder: "Enter Description",
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
  },
  { 
    name: "offeringId", 
    label: "Offering ID", 
    type: "select",
    options: [
      { value: "OFF001", label: "OFF001" },
      { value: "OFF002", label: "OFF002" },
      { value: "OFF003", label: "OFF003" },
      { value: "OFF004", label: "OFF004" },
      { value: "OFF005", label: "OFF005" }
    ],
    placeholder: "Select Offering ID"
  },
  { 
    name: "branchCode", 
    label: "Branch Code", 
    type: "text",
    placeholder: "Enter Branch Code",
  },
];


const referenceData = [
  { referenceId: "REF001", referenceName: "Customer Type" },
  { referenceId: "REF002", referenceName: "Shipment Weight" },
  { referenceId: "REF003", referenceName: "Distance Range" },
  { referenceId: "REF004", referenceName: "Service Level" },
  { referenceId: "REF005", referenceName: "Package Type" },
  { referenceId: "REF006", referenceName: "Delivery Zone" },
  { referenceId: "REF007", referenceName: "Seasonal Factor" },
  { referenceId: "REF008", referenceName: "Priority Level" },
];


const conditionTypeData = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "contains", label: "Contains" },
  { value: "starts_with", label: "Starts With" },
  { value: "ends_with", label: "Ends With" },
  { value: "between", label: "Between" },
  { value: "in_list", label: "In List" },
  { value: "not_in_list", label: "Not In List" }
];


const conditionsColumns = [
  { 
    accessorKey: "referenceId", 
    header: "Reference ID", 
    type: "select",
    options: referenceData.map(ref => ({ value: ref.referenceId, label: ref.referenceId })),
    placeholder: "Select Reference ID"
  },
  { 
    accessorKey: "referenceName", 
    header: "Reference Name", 
    type: "text",
    disabled: true,
    placeholder: "Reference Name"
  },
  { 
    accessorKey: "referenceValue", 
    header: "Reference Value", 
    type: "text",
    placeholder: "Enter Reference Value"
  },
  { 
    accessorKey: "conditionType", 
    header: "Condition Type", 
    type: "select",
    options: conditionTypeData,
    placeholder: "Select Condition Type"
  },
];

export default function RateRecordGeneralInfoPage() {
  const form = useForm({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      rateId: "",
      rateRecordName: "",
      description: "",
      companyCode: "",
      offeringId: "",
      branchCode: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Rate Record General Info Submitted:", data);
  };

  const handleTableSave = (rowData, rowIndex) => {
    console.log("Conditions row saved:", rowData, "at index:", rowIndex);
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
            Save Rate Record
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Conditions",
      dynamicRows: true,
      showActions: true,
      columns: conditionsColumns,
      defaultRow: {
        referenceId: "",
        referenceName: "",
        referenceValue: "",
        conditionType: "",
      },
      onSave: handleTableSave,
      tableSchema: conditionsRowSchema,
      mappingConfig: {
        referenceId: {
          keyField: "referenceId",
          data: referenceData,
          mappedFields: ["referenceName"]
        },
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Rate Record - General Info</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
