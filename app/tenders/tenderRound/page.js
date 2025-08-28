"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

// Zod schema for tender round
const tenderRoundSchema = z.object({
  roundType: z.string().min(1, "Round Type is required"),
  groupType: z.string().min(1, "Group Type is required"),
  selectCarrier: z.string().min(1, "Select Carrier is required"),
  estimatedPrice: z.string().min(1, "Estimated Price is required"),
  roundStatus: z.string().min(1, "Round Status is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
});

// Zod schema for cost details row
const costDetailsRowSchema = z.object({
  chargeType: z.string().min(1, "Charge Type is required"),
  currency: z.string().min(1, "Currency is required"),
  rate: z.string().min(1, "Rate is required"),
  rateUnit: z.string().min(1, "Rate Unit is required"),
  estimatedUnits: z.string().min(1, "Estimated Units is required"),
  estimatedPrice: z.string().min(1, "Estimated Price is required"),
  notes: z.string().optional(),
});

export default function TenderRoundPage() {
  // Form for tender round
  const tenderRoundForm = useForm({
    resolver: zodResolver(tenderRoundSchema),
    defaultValues: {
      roundType: "",
      groupType: "",
      selectCarrier: "",
      estimatedPrice: "",
      roundStatus: "",
      startDate: "",
      endDate: "",
    },
  });

  // Field configuration for tender round
  const tenderRoundFields = [
    {
      name: "roundType",
      label: "Round Type",
      type: "select",
      options: [
        { value: "first", label: "First Round" },
        { value: "second", label: "Second Round" },
        { value: "final", label: "Final Round" },
        { value: "negotiation", label: "Negotiation Round" },
      ],
    },
    {
      name: "groupType",
      label: "Group Type",
      type: "select",
      options: [
        { value: "express", label: "Express" },
        { value: "standard", label: "Standard" },
        { value: "economy", label: "Economy" },
        { value: "premium", label: "Premium" },
      ],
    },
    {
      name: "selectCarrier",
      label: "Select Carrier",
      type: "select",
      options: [
        { value: "carrier1", label: "Carrier 1" },
        { value: "carrier2", label: "Carrier 2" },
        { value: "carrier3", label: "Carrier 3" },
        { value: "carrier4", label: "Carrier 4" },
      ],
    },
    {
      name: "estimatedPrice",
      label: "Estimated Price",
      type: "text",
      placeholder: "Enter estimated price",
    },
    {
      name: "roundStatus",
      label: "Round Status",
      type: "text",
      placeholder: "Enter round status",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
    },
  ];

  // Column configuration for cost details table
  const costDetailsColumns = [
    {
      accessorKey: "chargeType",
      header: "Charge Type",
      type: "select",
      options: [
        { value: "freight", label: "Freight" },
        { value: "handling", label: "Handling" },
        { value: "documentation", label: "Documentation" },
        { value: "insurance", label: "Insurance" },
        { value: "customs", label: "Customs" },
        { value: "storage", label: "Storage" },
      ],
      placeholder: "Select charge type",
    },
    {
      accessorKey: "currency",
      header: "Currency",
      type: "select",
      options: [
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
        { value: "GBP", label: "GBP" },
        { value: "INR", label: "INR" },
        { value: "THB", label: "THB" },
      ],
      placeholder: "Select currency",
    },
    {
      accessorKey: "rate",
      header: "Rate",
      type: "text",
      placeholder: "Enter rate",
    },
    {
      accessorKey: "rateUnit",
      header: "Rate Unit",
      type: "select",
      options: [
        { value: "per_kg", label: "Per KG" },
        { value: "per_cbm", label: "Per CBM" },
        { value: "per_unit", label: "Per Unit" },
        { value: "per_km", label: "Per KM" },
        { value: "per_day", label: "Per Day" },
      ],
      placeholder: "Select rate unit",
    },
    {
      accessorKey: "estimatedUnits",
      header: "Estimated Units",
      type: "text",
      placeholder: "Enter estimated units",
    },
    {
      accessorKey: "estimatedPrice",
      header: "Estimated Price",
      type: "text",
      placeholder: "Enter estimated price",
    },
    {
      accessorKey: "notes",
      header: "Notes",
      type: "textarea",
      placeholder: "Enter notes/description",
    },
  ];

  // Default row for cost details
  const defaultCostRow = {
    chargeType: "",
    currency: "",
    rate: "",
    rateUnit: "",
    estimatedUnits: "",
    estimatedPrice: "",
    notes: "",
  };

  // Handle form submission
  const handleTenderRoundSubmit = (data) => {
    console.log("Tender Round submitted:", data);
  };

  // Handle overall page submission
  const handleOverallSubmit = async () => {
    try {
      // Get data from form
      const tenderRoundData = tenderRoundForm.getValues();

      // Validate form
      const tenderRoundValidation = tenderRoundSchema.safeParse(tenderRoundData);

      if (tenderRoundValidation.success) {
        console.log("Tender Round validation successful:", tenderRoundValidation.data);
        alert("Tender Round submitted successfully!");
      } else {
        console.error("Validation failed:", tenderRoundValidation.error);
        alert("Please fill in all required fields correctly.");
      }
    } catch (error) {
      console.error("Error in overall submit:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  // Section configuration
  const sections = [
    {
      type: "form",
      title: "Tender Round",
      form: tenderRoundForm,
      fields: tenderRoundFields,
      onSubmit: handleTenderRoundSubmit,
      children: (
        <div className="col-span-full">
          <button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2">
            Save Tender Round
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Cost Details",
      dynamicRows: true,
      showActions: true,
      columns: costDetailsColumns,
      defaultRow: defaultCostRow,
      onSave: (rowData, rowIndex) => {
        console.log("Cost Details row saved:", rowData, "at index:", rowIndex);
      },
      tableSchema: costDetailsRowSchema,
    },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#162d56]">Tender Round</h2>
        <button
          onClick={handleOverallSubmit}
          className="px-6 py-2 bg-[#006397] text-white rounded-full hover:bg-[#004d7a] transition-colors"
        >
          Submit Tender Round
        </button>
      </div>

      {/* Form */}
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
