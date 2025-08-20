"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Home } from "lucide-react";

const shipperSchema = z.object({
  shipperId: z.string().min(1, { message: "Shipper ID is required" }),
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
  consigneeId: z.string().min(1, { message: "Consignee ID is required" }),
  consigneeName: z.string().min(1, { message: "Consignee Name is required" }),
  estimatedEarlyDelivery: z.string().min(1, { message: "Estimated Early Delivery is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  estimatedLateDelivery: z.string().min(1, { message: "Estimated Late Delivery is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  zipcode: z.string().min(1, { message: "Zipcode is required" }),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
});

const carrierDetailsSchema = z.object({
  adviceNumber: z.string().optional(),
  carrierName: z.string().optional(),
  vesselName: z.string().optional(),
  voyageNumber: z.string().optional(),
  billOfLandingNo: z.string().optional(),
});

const portDetailsSchema = z.object({
  loadingPort: z.string().optional(),
  dischargePort: z.string().optional(),
  finalDestination: z.string().optional(),
  eta: z.string().optional(),
});

const deliveryContainersSchema = z.object({
  addDeliveryContainers: z.boolean().default(false),
  containerNumber: z.string().optional(),
  sealNumber: z.string().optional(),
  noOfPackages: z.string().optional(),
  goodsDescription: z.string().optional(),
  weight: z.string().optional(),
  volume: z.string().optional(),
});

const shipperFields = [
  { name: "shipperId", label: "Shipper ID *" },
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
  { name: "consigneeId", label: "Consignee ID *" },
  { name: "consigneeName", label: "Consignee Name *" },
  { name: "estimatedEarlyDelivery", label: "Estimated Early Delivery *", type: "date" },
  { name: "street", label: "Street *" },
  { name: "city", label: "City *" },
  { name: "estimatedLateDelivery", label: "Estimated Late Delivery *", type: "date" },
  { name: "province", label: "Province *" },
  { name: "country", label: "Country *" },
  { name: "zipcode", label: "Zipcode *" },
  { name: "phone", label: "Phone" },
  { name: "fax", label: "Fax" },
  { name: "email", label: "Email" },
];

const carrierDetailsFields = [
  { name: "adviceNumber", label: "Advice number" },
  { name: "carrierName", label: "Carrier name" },
  { name: "vesselName", label: "Vessel Name" },
  { name: "voyageNumber", label: "Voyage Number" },
  { name: "billOfLandingNo", label: "Bill Of Landing No." },
];


const portDetailsFields = [
  { name: "loadingPort", label: "Loading Port" },
  { name: "dischargePort", label: "Discharge Port" },
  { name: "finalDestination", label: "Final Destination" },
  { name: "eta", label: "ETA", type: "date" },
];

const deliveryContainersFields = [
  { name: "addDeliveryContainers", label: "Add Delivery Containers", type: "checkbox" },
  { name: "containerNumber", label: "Container number" },
  { name: "sealNumber", label: "Seal number" },
  { name: "noOfPackages", label: "No. Of Packages" },
  { name: "goodsDescription", label: "Goods Description" },
  { name: "weight", label: "Weight", placeholder: "in tonnes" },
  { name: "volume", label: "Volume", placeholder: "in cbm" },
];

export default function DeliveryPage() {
  const shipperForm = useForm({
    resolver: zodResolver(shipperSchema),
    defaultValues: {
      shipperId: "",
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
      consigneeId: "",
      consigneeName: "",
      estimatedEarlyDelivery: "",
      street: "",
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

  const carrierDetailsForm = useForm({
    resolver: zodResolver(carrierDetailsSchema),
    defaultValues: {
      adviceNumber: "",
      carrierName: "",
      vesselName: "",
      voyageNumber: "",
      billOfLandingNo: "",
    },
  });

  const portDetailsForm = useForm({
    resolver: zodResolver(portDetailsSchema),
    defaultValues: {
      loadingPort: "",
      dischargePort: "",
      finalDestination: "",
      eta: "",
    },
  });

  const deliveryContainersForm = useForm({
    resolver: zodResolver(deliveryContainersSchema),
    defaultValues: {
      addDeliveryContainers: false,
      containerNumber: "",
      sealNumber: "",
      noOfPackages: "",
      goodsDescription: "",
      weight: "",
      volume: "",
    },
  });

  const dummyForm = useForm();

  const sections = [
    {
      title: "Routing Details",
      type: "form",
      form: dummyForm,
      onSubmit: () => {},
      onInvalid: () => {},
      fields: [],
      renderLayout: ({ renderField }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipper Card */}
          <Card className="shadow-lg border-t-4 border-[#0088d2]">
            <CardContent className="pt-8">
              <FormProvider {...shipperForm}>
                <form>
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
                    {shipperFields.map(field =>
                      renderField(field, shipperForm, 0)
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
          {/* Consignee Card */}
          <Card className="shadow-lg border-t-4 border-[#0088d2]">
            <CardContent className="pt-8">
              <FormProvider {...consigneeForm}>
                <form>
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
                    {consigneeFields.map(field =>
                      renderField(field, consigneeForm, 1)
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Carrier Details",
      type: "form",
      form: carrierDetailsForm,
      fields: carrierDetailsFields,
      disableAccordionToggle: true,
    },
    {
      title: "Port Details",
      type: "form",
      form: portDetailsForm,
      fields: portDetailsFields,
      disableAccordionToggle: true,
    },
    {
      title: "Delivery Containers",
      type: "form",
      form: deliveryContainersForm,
      fields: deliveryContainersFields,
      disableAccordionToggle: true,
    },
  ];

  return (
    <div className="p-6">
      <OrdersForm sections={sections} useAccordion={true} />
    </div>
  );
}
