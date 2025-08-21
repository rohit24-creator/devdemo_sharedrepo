"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const rateCalendarSchema = z.object({
  calendarId: z.string().min(1, "Calendar ID is required"),
  billType: z.string().min(1, "Bill Type is required"),
  applyType: z.string().min(1, "Apply Type is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
});

const holidaysRowSchema = z.object({
  createdDate: z.string().min(1, "Created Date is required"),
  absoluteCurrency: z.string().min(1, "Absolute Currency is required"),
  percentageMargin: z.string().min(1, "% - Margin is required"),
});

const rateCalendarFields = [
  { 
    name: "calendarId", 
    label: "Calendar ID", 
    type: "text",
    placeholder: "Enter Calendar ID",
  },
  { 
    name: "billType", 
    label: "Bill Type", 
    type: "select",
    options: [
      { value: "freight", label: "Freight" },
      { value: "handling", label: "Handling" },
      { value: "storage", label: "Storage" },
      { value: "customs", label: "Customs" },
      { value: "insurance", label: "Insurance" },
      { value: "fuel_surcharge", label: "Fuel Surcharge" },
      { value: "peak_season", label: "Peak Season" },
      { value: "weekend", label: "Weekend" },
      { value: "holiday", label: "Holiday" },
      { value: "urgent", label: "Urgent" },
      { value: "express", label: "Express" },
      { value: "standard", label: "Standard" },
    ],
    placeholder: "Select Bill Type",
  },
  { 
    name: "applyType", 
    label: "Apply Type", 
    type: "select",
    options: [
      { value: "percentage", label: "Percentage" },
      { value: "fixed_amount", label: "Fixed Amount" },
      { value: "per_unit", label: "Per Unit" },
      { value: "per_kg", label: "Per Kilogram" },
      { value: "per_m3", label: "Per Cubic Meter" },
      { value: "per_km", label: "Per Kilometer" },
      { value: "per_day", label: "Per Day" },
      { value: "per_hour", label: "Per Hour" },
      { value: "flat_rate", label: "Flat Rate" },
      { value: "tiered", label: "Tiered" },
    ],
    placeholder: "Select Apply Type",
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
    modalFieldName: "companyCode",
  },
  { 
    name: "name", 
    label: "Name", 
    type: "text",
    placeholder: "Enter Name",
  },
  { 
    name: "description", 
    label: "Description", 
    type: "textarea",
    placeholder: "Enter Description",
  },
  { 
    name: "branchCode", 
    label: "Branch Code", 
    type: "text",
    placeholder: "Enter Branch Code",
    modalFieldName: "branchCode",
  },
];

const holidaysColumns = [
  { 
    accessorKey: "createdDate", 
    header: "Created Date", 
    type: "date",
    placeholder: "Select Date"
  },
  { 
    accessorKey: "absoluteCurrency", 
    header: "Absolute Currency", 
    type: "text",
    placeholder: "Enter Absolute Currency"
  },
  { 
    accessorKey: "percentageMargin", 
    header: "% - Margin", 
    type: "text",
    placeholder: "Enter % - Margin"
  },
];

export default function RateCalendarPage() {
  const form = useForm({
    resolver: zodResolver(rateCalendarSchema),
    defaultValues: {
      calendarId: "",
      billType: "",
      applyType: "",
      companyCode: "",
      name: "",
      description: "",
      branchCode: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Rate Calendar Submitted:", data);
  };

  const handleHolidaysSave = (rowData, rowIndex) => {
    console.log("Holidays row saved:", rowData, "at index:", rowIndex);
  };

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: rateCalendarFields,
      onSubmit: handleSubmit,
      children: (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2"
          >
            Save Rate Calendar
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Holidays",
      dynamicRows: true,
      showActions: true,
      columns: holidaysColumns,
      defaultRow: {
        createdDate: "",
        absoluteCurrency: "",
        percentageMargin: "",
      },
      onSave: handleHolidaysSave,
      tableSchema: holidaysRowSchema,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Rate Calendar</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
