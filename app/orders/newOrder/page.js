"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderFomrs";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Home } from "lucide-react";

// Zod schemas for validation
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

// General Info fields (matching screenshot)
const generalInfoFields = [
  { name: "bookingId", label: "Booking ID", disabled: true },
  { name: "product", label: "Product *", type: "select", options: ["Mobile", "Laptop", "Tablet"] },
  { name: "orderStatus", label: "Order Status", type: "select", options: ["PENDING", "CONFIRMED", "CANCELLED"] },
  { name: "companyCode", label: "Company Code *" },
  { name: "externalOrderId", label: "External Order ID" },
  { name: "deliveryTerms", label: "Delivery Terms", type: "select", options: ["FOB", "CIF", "EXW"] },
  { name: "service", label: "Service *", type: "select", options: ["Air", "Sea", "Road"] },
  { name: "branchCode", label: "Branch Code *" },
  { name: "incoTerms", label: "Inco Terms", type: "select", options: ["FOB", "CIF", "EXW"] },
  { name: "orderType", label: "Order Type *", type: "select", options: ["Bulk", "Single"] },
  { name: "modeOfTransport", label: "Mode Of Transport *", type: "select", options: ["Truck", "Rail", "Ship"] },
  { name: "departmentCode", label: "Department Code *", type: "select", options: ["Sales", "Logistics"] },
  { name: "customerId", label: "Customer ID *" },
  { name: "custDo", label: "# Cust-DO" },
  { name: "custRefPo", label: "# Custref-PO" },
  { name: "goodsValue", label: "Goods Value", unitOptions: ["USD"] },
  { name: "originalDocumentSent", label: "Original Document Sent", type: "date" },
  { name: "originalDocumentReceived", label: "Original Document Received", type: "date" },
  { name: "shipmentType", label: "Shipment Type", type: "select", options: ["Type1", "Type2"] },
  { name: "region", label: "Region", type: "select", options: ["North", "South", "East", "West"] },
  { name: "driverPickupInstructions", label: "Driver Pickup Instructions", type: "textarea", wide: true },
  { name: "driverDeliveryInstructions", label: "Driver Delivery Instructions", type: "textarea", wide: true },
  { name: "loadBoard123", placeholder: "123 Load Board", type: "checkbox" },
  { name: "truckStop", placeholder: "Truck Stop", type: "checkbox" },
  { name: "dat", placeholder: "DAT", type: "checkbox" },
];

export default function NewOrderPage() {
  // Move all useForm calls here
  const generalInfoForm = useForm({
    defaultValues: {
      bookingId: "Auto-generated",
      // ...other defaults as needed
    }
  });

  const shipperForm = useForm();
  const consigneeForm = useForm();
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
    }
  ];

  return (
    <div className="p-6">
      <OrdersForm sections={sections} useAccordion={true} />
    </div>
  );
}