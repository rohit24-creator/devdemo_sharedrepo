"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderFomrs";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Home } from "lucide-react";
import { Form } from "@/components/ui/form";

// Zod schemas for validation
const shipperSchema = z.object({
  customerId: z.string().min(1, { message: "Shipper ID is required" }),
  shipperName: z.string().min(1, { message: "Shipper Name is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  estimatedEarlyPickup: z.string().min(1, { message: "Estimated Early Pickup is required" }),
  city: z.string().min(1, { message: "City is required" }),
  estimatedLatePickup: z.string().min(1, { message: "Estimated Late Pickup is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  zipcode: z.string().min(1, { message: "Zipcode is required" }),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
});

const consigneeSchema = z.object({
  customerId: z.string().min(1, { message: "Consignee ID is required" }),
  consigneeName: z.string().min(1, { message: "Consignee Name is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  estimatedEarlyDelivery: z.string().min(1, { message: "Estimated Early Delivery is required" }),
  city: z.string().min(1, { message: "City is required" }),
  estimatedLateDelivery: z.string().min(1, { message: "Estimated Late Delivery is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  zipcode: z.string().min(1, { message: "Zipcode is required" }),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
});

// Shipper and Consignee field configs
const shipperFields = [
  { name: "customerId", label: "Shipper ID *" },
  { name: "shipperName", label: "Shipper Name *" },
  { name: "street", label: "Street *" },
  { name: "estimatedEarlyPickup", label: "Estimated Early Pickup *", type: "date" },
  { name: "city", label: "City *" },
  { name: "estimatedLatePickup", label: "Estimated Late Pickup *", type: "date" },
  { name: "province", label: "Province *" },
  { name: "country", label: "Country *" },
  { name: "zipcode", label: "Zipcode *" },
  { name: "phone", label: "Phone" },
  { name: "fax", label: "Fax" },
  { name: "email", label: "Email" },
];

const consigneeFields = [
  { name: "customerId", label: "Consignee ID *" },
  { name: "consigneeName", label: "Consignee Name *" },
  { name: "street", label: "Street *" },
  { name: "estimatedEarlyDelivery", label: "Estimated Early Delivery *", type: "date" },
  { name: "city", label: "City *" },
  { name: "estimatedLateDelivery", label: "Estimated Late Delivery *", type: "date" },
  { name: "province", label: "Province *" },
  { name: "country", label: "Country *" },
  { name: "zipcode", label: "Zipcode *" },
  { name: "phone", label: "Phone" },
  { name: "fax", label: "Fax" },
  { name: "email", label: "Email" },
];

export default function NewOrderPage() {
  const shipperForm = useForm({
    resolver: zodResolver(shipperSchema),
    defaultValues: {
      customerId: "",
      shipperName: "",
      street: "",
      estimatedEarlyPickup: "",
      city: "",
      estimatedLatePickup: "",
      province: "",
      country: "",
      zipcode: "",
      phone: "",
      fax: "",
      email: "",
    },
  });
  const consigneeForm = useForm({
    resolver: zodResolver(consigneeSchema),
    defaultValues: {
      customerId: "",
      consigneeName: "",
      street: "",
      estimatedEarlyDelivery: "",
      city: "",
      estimatedLateDelivery: "",
      province: "",
      country: "",
      zipcode: "",
      phone: "",
      fax: "",
      email: "",
    },
  });

  const handleSubmit = (data) => {
    const shipperData = shipperForm.getValues();
    const consigneeData = consigneeForm.getValues();
    // ... your submit logic ...
  };

  const sections = [
    {
      title: "Routing Details",
      form: {}, // dummy, not used since we use renderLayout
      onSubmit: handleSubmit,
      onInvalid: () => {},
      fields: [],
      renderLayout: ({ renderField }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipper Card */}
          <Form {...shipperForm}>
            <Card className="shadow-lg border-t-4 border-[#0088d2]">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-[#0088d2] rounded-full p-4 mb-2">
                    <Truck size={32} color="white" />
                  </div>
                  <div className="text-[#0088d2] text-lg font-semibold">Shipper</div>
                  <label className="flex items-center mt-2 text-sm">
                    <input type="checkbox" className="mr-2" />
                    Save to Party Master
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {shipperFields.map(field => renderField(field, shipperForm, 0))}
                </div>
              </CardContent>
            </Card>
          </Form>
          {/* Consignee Card */}
          <Form {...consigneeForm}>
            <Card className="shadow-lg border-t-4 border-[#0088d2]">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-[#0088d2] rounded-full p-4 mb-2">
                    <Home size={32} color="white" />
                  </div>
                  <div className="text-[#0088d2] text-lg font-semibold">Consignee</div>
                  <label className="flex items-center mt-2 text-sm">
                    <input type="checkbox" className="mr-2" />
                    Save to Party Master
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {consigneeFields.map(field => renderField(field, consigneeForm, 1))}
                </div>
              </CardContent>
            </Card>
          </Form>
        </div>
      )
    }
  ];

  return (
    <div className="p-4">
      <OrdersForm sections={sections} />
    </div>
  );
}