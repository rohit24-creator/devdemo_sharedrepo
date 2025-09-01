"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";

const cargoDetailsSchema = z.object({
  cargoType: z.string().min(1, { message: "Cargo Type is required" }),
  itemId: z.string().min(1, { message: "Item ID is required" }),
});

const constraintsSchema = z.object({
  weightMin: z.string().optional(),
  weightMax: z.string().optional(),
  actualWeightMin: z.string().optional(),
  actualWeightMax: z.string().optional(),
  volumeMin: z.string().optional(),
  volumeMax: z.string().optional(),
  actualVolumeMin: z.string().optional(),
  actualVolumeMax: z.string().optional(),
});

const involvedPartiesSchema = z.object({
  shipperIdentifier: z.string().min(1, { message: "Shipper Identifier is required" }),
  consigneeIdentifier: z.string().min(1, { message: "Consignee Identifier is required" }),
  notifyIdentifier: z.string().optional(),
});

const actionSchema = z.object({
  carrierId: z.string().min(1, { message: "Carrier ID is required" }),
  vehicleType: z.string().min(1, { message: "Vehicle Type is required" }),
  vehicleId: z.string().min(1, { message: "Vehicle ID is required" }),
  driverId: z.string().min(1, { message: "Driver ID is required" }),
});

const cargoDetailsFields = [
  { name: "cargoType", label: "Cargo Type *", type: "select", options: ["General", "Hazardous", "Fragile", "Perishable", "Heavy"] },
  { name: "itemId", label: "Item ID *" },
];

const actionFields = [
  { name: "carrierId", label: "Carrier ID *", type: "select", options: ["CAR001", "CAR002", "CAR003", "CAR004"] },
  { name: "vehicleType", label: "Vehicle Type *", type: "select", options: ["Truck", "Trailer", "Container", "Van"] },
  { name: "vehicleId", label: "Vehicle ID *", type: "select", options: ["VEH001", "VEH002", "VEH003", "VEH004"] },
  { name: "driverId", label: "Driver ID *", type: "select", options: ["DRV001", "DRV002", "DRV003", "DRV004"] },
];

const involvedPartiesFields = [
  { name: "shipperIdentifier", label: "Shipper Identifier *" },
  { name: "consigneeIdentifier", label: "Consignee Identifier *" },
  { name: "notifyIdentifier", label: "Notify Identifier" },
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
    title: "Actual Weight", 
    fields: [
      { name: "actualWeightMin", label: "Min", placeholder: "Min", unitOptions: ["KG", "LB", "TON"] },
      { name: "actualWeightMax", label: "Max", placeholder: "Max", unitOptions: ["KG", "LB", "TON"] }
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
    title: "Actual Volume",
    fields: [
      { name: "actualVolumeMin", label: "Min", placeholder: "Min", unitOptions: ["CBM", "CFT", "LTR"] },
      { name: "actualVolumeMax", label: "Max", placeholder: "Max", unitOptions: ["CBM", "CFT", "LTR"] }
    ]
  }
];

export default function AdditionalDetailsPage() {
  const cargoDetailsForm = useForm({
    resolver: zodResolver(cargoDetailsSchema),
    defaultValues: {
      cargoType: "",
      itemId: "",
    },
  });

  const constraintsForm = useForm({
    resolver: zodResolver(constraintsSchema),
    defaultValues: {
      weightMin: "",
      weightMax: "",
      actualWeightMin: "",
      actualWeightMax: "",
      volumeMin: "",
      volumeMax: "",
      actualVolumeMin: "",
      actualVolumeMax: "",
    },
  });

  const involvedPartiesForm = useForm({
    resolver: zodResolver(involvedPartiesSchema),
    defaultValues: {
      shipperIdentifier: "",
      consigneeIdentifier: "",
      notifyIdentifier: "",
    },
  });

  const actionForm = useForm({
    resolver: zodResolver(actionSchema),
    defaultValues: {
      carrierId: "",
      vehicleType: "",
      vehicleId: "",
      driverId: "",
    },
  });

  const dummyForm = useForm();

  const sections = [
    {
      title: "Cargo Details",
      type: "form",
      form: cargoDetailsForm,
      fields: cargoDetailsFields,
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
    {
      title: "Involved Parties",
      type: "form",
      form: involvedPartiesForm,
      fields: involvedPartiesFields,
    },
    {
      title: "Action",
      type: "form",
      form: actionForm,
      fields: actionFields,
    }
  ];

  return (
    <div className="p-6">
      <OrdersForm sections={sections} useAccordion={true} />
g    </div>
  );
}
