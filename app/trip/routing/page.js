"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { Card, CardContent } from "@/components/ui/card";


const generalInfoSchema = z.object({
  routingAutomationId: z.string(),
  triggeredType: z.string().min(1, { message: "Triggered Type is required" }),
  triggeredAt: z.string().min(1, { message: "Triggered At is required" }),
  incoTerms: z.string().optional(),
  customerId: z.string().min(1, { message: "Customer ID is required" }),
  orderType: z.string().optional(),
  modeOfTransport: z.string().optional(),
  templateId: z.string().optional(),
  transactionAction: z.string().min(1, { message: "Transaction Action is required" }),
  orderStatus: z.string().optional(),
  service: z.string().optional(),
  companyCode: z.string().min(1, { message: "Company Code is required" }),
  branchCode: z.string().min(1, { message: "Branch Code is required" }),
  product: z.string().optional(),
});

const pickupSchema = z.object({
  pickupType: z.string().min(1, { message: "Pickup Type is required" }),
  pickupValue: z.string().min(1, { message: "Pickup Value is required" }),
});

const deliverySchema = z.object({
  deliveryType: z.string().min(1, { message: "Delivery Type is required" }),
  deliveryValue: z.string().min(1, { message: "Delivery Value is required" }),
});

const generalInfoFields = [
  { name: "routingAutomationId", label: "Routing Automation ID", disabled: true },
  { name: "customerId", label: "Customer ID *" },
  { name: "transactionAction", label: "Transaction Action *", type: "select", options: ["Create", "Update", "Delete", "Process"] },
  { name: "companyCode", label: "Company Code *" },
  { name: "triggeredType", label: "Triggered Type *", type: "select", options: ["Manual", "Automatic", "Scheduled"] },
  { name: "orderType", label: "Order Type", type: "select", options: ["Bulk", "Single", "Express"] },
  { name: "orderStatus", label: "Order Status", type: "select", options: ["Pending", "Confirmed", "In Progress", "Completed"] },
  { name: "branchCode", label: "Branch Code *" },
  { name: "triggeredAt", label: "Triggered At *", type: "select", options: ["Order Creation", "Status Change", "Time Based"] },
  { name: "modeOfTransport", label: "Mode Of Transport", type: "select", options: ["Truck", "Rail", "Ship", "Air"] },
  { name: "service", label: "Service", type: "select", options: ["Standard", "Express", "Premium"] },
  { name: "product", label: "Product", type: "select", options: ["Mobile", "Laptop", "Tablet", "Other"] },
  { name: "incoTerms", label: "Inco Terms", type: "select", options: ["FOB", "CIF", "EXW", "DDP"] },
  { name: "templateId", label: "Template ID", type: "select", options: ["Template 1", "Template 2", "Template 3"] },
];

const pickupFields = [
  { name: "pickupType", label: "Pickup Type *", type: "select", options: ["Warehouse", "Factory", "Port", "Airport", "Custom Location"] },
  { name: "pickupValue", label: "Pickup Value *" },
];

const deliveryFields = [
  { name: "deliveryType", label: "Delivery Type *", type: "select", options: ["Warehouse", "Factory", "Port", "Airport", "Custom Location"] },
  { name: "deliveryValue", label: "Delivery Value *" },
];

export default function TripsRoutingPage() {
  const generalInfoForm = useForm({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      routingAutomationId: "Auto-generated",
      triggeredType: "",
      triggeredAt: "",
      incoTerms: "",
      customerId: "",
      orderType: "",
      modeOfTransport: "",
      templateId: "",
      transactionAction: "",
      orderStatus: "",
      service: "",
      companyCode: "",
      branchCode: "",
      product: "",
    },
  });

  const pickupForm = useForm({
    resolver: zodResolver(pickupSchema),
    defaultValues: {
      pickupType: "",
      pickupValue: "",
    },
  });

  const deliveryForm = useForm({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryType: "",
      deliveryValue: "",
    },
  });

  const dummyForm = useForm();

  const sections = [
    {
      title: "General Info",
      type: "form",
      form: generalInfoForm,
      fields: generalInfoFields,
    },
    {
      title: "Routing Details",
      type: "form",
      form: dummyForm,
      onSubmit: () => {},
      onInvalid: () => {},
      fields: [],
             renderLayout: ({ renderField }) => (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Pickup Card */}
           <Card className="shadow-lg border-t-4 border-[#0088d2]">
             <CardContent className="pt-4">
               <FormProvider {...pickupForm}>
                 <form>
                   <div className="mb-4">
                     <div className="text-[#0088d2] text-lg font-semibold">Pickup</div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {pickupFields.map(field =>
                       renderField(field, pickupForm, 0)
                     )}
                   </div>
                 </form>
               </FormProvider>
             </CardContent>
           </Card>
           {/* Delivery Card */}
           <Card className="shadow-lg border-t-4 border-[#0088d2]">
             <CardContent className="pt-4">
               <FormProvider {...deliveryForm}>
                 <form>
                   <div className="mb-4">
                     <div className="text-[#0088d2] text-lg font-semibold">Delivery</div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {deliveryFields.map(field =>
                       renderField(field, deliveryForm, 1)
                     )}
                   </div>
                 </form>
               </FormProvider>
             </CardContent>
           </Card>
         </div>
       )
    }
  ];

  return (
    <div className="p-6">
      <OrdersForm sections={sections} useAccordion={true} />
    </div>
  );
}
