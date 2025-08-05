"use client";
import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Schema for trip expenses form
const tripExpensesSchema = z.object({
  chooseVehicle: z.string().min(1, { message: "Vehicle selection is required" }),
  chooseTrip: z.string().min(1, { message: "Trip selection is required" }),
  driverName: z.string().min(1, { message: "Driver name is required" }),
  pickupDate: z.string().min(1, { message: "Pickup date is required" }),
  deliveryDate: z.string().min(1, { message: "Delivery date is required" }),
  haltingDays: z.number().min(0, { message: "Halting days must be 0 or greater" }),
  haltingRevenue: z.number().min(0, { message: "Halting revenue must be 0 or greater" }),
});

// Schema for advance CMS form
const advanceCMSSchema = z.object({
  expenseRows: z.array(z.object({
    expenseType: z.string().min(1, { message: "Expense type is required" }),
    amount: z.number().min(0, { message: "Amount must be 0 or greater" }),
    date: z.string().min(1, { message: "Date is required" }),
    description: z.string().optional(),
  })),
  totalPrice: z.number().min(0, { message: "Total price must be 0 or greater" }),
});

// Fields configuration for trip expenses
const tripExpensesFields = [
  { 
    name: "chooseVehicle", 
    label: "Choose Vehicle *", 
    type: "select", 
    options: [
      "Truck-001 (Mahindra 407)",
      "Truck-002 (Tata 407)",
      "Truck-003 (Ashok Leyland Dost)",
      "Truck-004 (Mahindra Jeeto)",
      "Truck-005 (Tata Ace)"
    ] 
  },
  { 
    name: "chooseTrip", 
    label: "Choose Trip *", 
    type: "select", 
    options: [
      "Trip-001 (Mumbai to Delhi)",
      "Trip-002 (Delhi to Bangalore)",
      "Trip-003 (Bangalore to Chennai)",
      "Trip-004 (Chennai to Kolkata)",
      "Trip-005 (Kolkata to Mumbai)"
    ] 
  },
  { name: "driverName", label: "Driver Name *" },
  { name: "pickupDate", label: "Pickup Date *", type: "date" },
  { name: "deliveryDate", label: "Delivery Date *", type: "date" },
  { 
    name: "haltingDays", 
    label: "Halting Days *", 
    type: "number",
    placeholder: "Enter number of halting days"
  },
  { 
    name: "haltingRevenue", 
    label: "Halting Revenue *", 
    type: "number",
    placeholder: "Enter halting revenue amount",
  },
];

// Dynamic expense type options
const expenseTypeOptions = [
  { value: "fuel", label: "Fuel" },
  { value: "maintenance", label: "Maintenance" },
  { value: "toll", label: "Toll" },
  { value: "parking", label: "Parking" },
  { value: "food", label: "Food" },
  { value: "accommodation", label: "Accommodation" },
  { value: "other", label: "Other" },
];

// Configuration for expense row fields
const expenseRowFields = [
  {
    name: "expenseType",
    label: "Expense Type *",
    type: "select",
    options: expenseTypeOptions,
    placeholder: "Select expense type"
  },
  {
    name: "amount",
    label: "Amount *",
    type: "number",
    placeholder: "Enter amount"
  },
  {
    name: "date",
    label: "Date *",
    type: "date"
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description"
  }
];

export default function TripExpensePage() {
  const tripExpensesForm = useForm({
    resolver: zodResolver(tripExpensesSchema),
    defaultValues: {
      chooseVehicle: "",
      chooseTrip: "",
      driverName: "",
      pickupDate: "",
      deliveryDate: "",
      haltingDays: 0,
      haltingRevenue: 0,
    },
  });

  const advanceCMSForm = useForm({
    resolver: zodResolver(advanceCMSSchema),
    defaultValues: {
      expenseRows: [
        {
          expenseType: "",
          amount: 0,
          date: "",
          description: "",
        }
      ],
      totalPrice: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: advanceCMSForm.control,
    name: "expenseRows",
  });

  const addExpenseRow = () => {
    append({
      expenseType: "",
      amount: 0,
      date: "",
      description: "",
    });
  };

  const removeExpenseRow = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Dynamic render function for expense rows using renderField from renderLayout
  const renderExpenseRow = (field, index, renderField) => {
    return (
      <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end border border-[#E7ECFD] rounded-lg p-4 bg-gray-50">
        {expenseRowFields.map((fieldConfig) => {
  
          const arrayFieldConfig = {
            ...fieldConfig,
            name: `expenseRows.${index}.${fieldConfig.name}`,
            modalFieldName: fieldConfig.name 
          };
          
          return (
            <div key={fieldConfig.name} className={fieldConfig.name === "description" ? "" : "w-full"}>
              {renderField(arrayFieldConfig, advanceCMSForm, 1)}
            </div>
          );
        })}
        
        {/* Download Symbol and Remove Button */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="p-2 border-[#006397] text-[#006397] hover:bg-[#e7ecfd]"
            title="Download"
          >
            <Download size={16} />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => removeExpenseRow(index)}
            className="px-3 py-1 rounded-full"
            disabled={fields.length === 1}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  };

  const sections = [
    {
      title: "Trip Expenses",
      type: "form",
      form: tripExpensesForm,
      fields: tripExpensesFields,
      onSubmit: (data) => {
        console.log("Trip Expenses Form Data:", data);
      },
      onInvalid: (errors) => {
        console.log("Form validation errors:", errors);
      },
    },
    {
      title: "Advance CMS / Drivers Amount",
      type: "form",
      form: advanceCMSForm,
      fields: [],
      onSubmit: (data) => {
        console.log("Advance CMS Form Data:", data);
      },
      onInvalid: (errors) => {
        console.log("Form validation errors:", errors);
      },
      renderLayout: ({ renderField }) => (
        <FormProvider {...advanceCMSForm}>
          <div className="space-y-6">
            {/* Dynamic Expense Rows */}
            <div className="space-y-4">
              {fields.map((field, index) => renderExpenseRow(field, index, renderField))}
            </div>

            {/* Add Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                onClick={addExpenseRow}
                className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
              >
                Add Expense Row
              </Button>
            </div>

            {/* Total Price */}
            <div className="border-t border-[#E7ECFD] pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#006397] mb-1">
                    Total Price *
                  </label>
                  <input
                    type="number"
                    value={advanceCMSForm.watch("totalPrice")}
                    onChange={(e) => 
                      advanceCMSForm.setValue("totalPrice", parseFloat(e.target.value) || 0)
                    }
                    placeholder="Enter total price"
                    className="w-80 px-3 py-2 rounded-md border-2 border-[#E7ECFD] bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#006397]">Trip Expenses</h1>
      </div>
      <OrdersForm sections={sections} useAccordion={true} />
    </div>
  );
}
