"use client"
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Home } from "lucide-react";

// Zod schema for general info
const generalInfoSchema = z.object({
  companyCode: z.string().min(1, "Company Code is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  tenderType: z.string().min(1, "Tender Type is required"),
  tenderStatus: z.string().min(1, "Tender Status is required"),
  modeOfTransport: z.string().min(1, "Mode of Transport is required"),
  createdOn: z.string().min(1, "Created On is required"),
  vehicleTypeCode: z.string().min(1, "Vehicle Type Code is required"),
});

// Zod schema for shipper
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

// Zod schema for consignee
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

// Zod schema for cargo details row
const cargoDetailsRowSchema = z.object({
  handlingUnit: z.string().min(1, "Handling Unit is required"),
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  actualWeight: z.string().min(1, "Actual Weight is required"),
  volume: z.string().min(1, "Volume is required"),
  quantity: z.string().min(1, "Quantity is required"),
});

export default function ShipmentTenderPage() {

  // Form for general info
  const generalInfoForm = useForm({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      companyCode: "",
      branchCode: "",
      tenderType: "",
      tenderStatus: "",
      modeOfTransport: "",
      createdOn: "",
      vehicleTypeCode: "",
    },
  });

  // Form for shipper
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

  // Form for consignee
  const consigneeForm = useForm({
    resolver: zodResolver(consigneeSchema),
    defaultValues: {
      consigneeId: "",
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

  // Field configuration for shipper
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

  // Field configuration for consignee
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

  // Field configuration for general info
  const generalInfoFields = [
    {
      name: "companyCode",
      label: "Company Code",
      type: "text",
      modalFieldName: "companyCode",
    },
    {
      name: "branchCode",
      label: "Branch Code",
      type: "text",
      modalFieldName: "branchCode",
    },
    {
      name: "tenderType",
      label: "Tender Type",
      type: "text",
    },
    {
      name: "tenderStatus",
      label: "Tender Status",
      type: "text",
    },
    {
      name: "modeOfTransport",
      label: "Mode of Transport",
      type: "select",
      options: [
        { value: "road", label: "Road" },
        { value: "rail", label: "Rail" },
        { value: "air", label: "Air" },
        { value: "sea", label: "Sea" },
        { value: "multimodal", label: "Multimodal" },
      ],
    },
    {
      name: "createdOn",
      label: "Created On",
      type: "date",
    },
    {
      name: "vehicleTypeCode",
      label: "Vehicle Type Code",
      type: "select",
      options: [
        { value: "truck", label: "Truck" },
        { value: "trailer", label: "Trailer" },
        { value: "container", label: "Container" },
        { value: "flatbed", label: "Flatbed" },
        { value: "refrigerated", label: "Refrigerated" },
      ],
    },
  ];



  // Column configuration for cargo details table
  const cargoDetailsColumns = [
    {
      accessorKey: "handlingUnit",
      header: "Handling Unit",
      type: "text",
      placeholder: "Enter handling unit",
    },
    {
      accessorKey: "length",
      header: "Length",
      type: "text",
      placeholder: "Enter length",
    },
    {
      accessorKey: "width",
      header: "Width",
      type: "text",
      placeholder: "Enter width",
    },
    {
      accessorKey: "height",
      header: "Height",
      type: "text",
      placeholder: "Enter height",
    },
    {
      accessorKey: "actualWeight",
      header: "Actual Weight",
      type: "text",
      placeholder: "Enter weight",
    },
    {
      accessorKey: "volume",
      header: "Volume",
      type: "text",
      placeholder: "Enter volume",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      type: "text",
      placeholder: "Enter quantity",
    },
  ];

  // Default row for cargo details
  const defaultCargoRow = {
    handlingUnit: "",
    length: "",
    width: "",
    height: "",
    actualWeight: "",
    volume: "",
    quantity: "",
  };

  // Handle form submission
  const handleGeneralInfoSubmit = (data) => {
    console.log("General Info submitted:", data);
  };

  // Handle shipper submission
  const handleShipperSubmit = (data) => {
    console.log("Shipper submitted:", data);
  };

  // Handle consignee submission
  const handleConsigneeSubmit = (data) => {
    console.log("Consignee submitted:", data);
  };

  // Handle overall page submission
  const handleOverallSubmit = async () => {
    try {
      // Get data from all forms
      const generalInfoData = generalInfoForm.getValues();
      const shipperData = shipperForm.getValues();
      const consigneeData = consigneeForm.getValues();

      // Validate all forms
      const generalInfoValidation = generalInfoSchema.safeParse(generalInfoData);
      const shipperValidation = shipperSchema.safeParse(shipperData);
      const consigneeValidation = consigneeSchema.safeParse(consigneeData);

      if (generalInfoValidation.success && shipperValidation.success && consigneeValidation.success) {
        console.log("All validations successful:", {
          generalInfo: generalInfoValidation.data,
          shipper: shipperValidation.data,
          consignee: consigneeValidation.data
        });
        alert("Shipment Tender submitted successfully!");
      } else {
        console.error("Validation failed:", {
          generalInfo: generalInfoValidation.error,
          shipper: shipperValidation.error,
          consignee: consigneeValidation.error
        });
        alert("Please fill in all required fields correctly.");
      }
    } catch (error) {
      console.error("Error in overall submit:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  // Custom layout for routing details with shipper/consignee cards
  const renderRoutingLayout = ({ renderField }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipper Card */}
        <Card className="shadow-lg border-t-4 border-[#0088d2]">
          <CardContent className="pt-8">
            <FormProvider {...shipperForm}>
              <form onSubmit={shipperForm.handleSubmit(handleShipperSubmit)}>
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
              <form onSubmit={consigneeForm.handleSubmit(handleConsigneeSubmit)}>
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
                    renderField(field, consigneeForm, 0)
                  )}
                </div>
                
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Section configuration
  const sections = [
    {
      type: "form",
      title: "General Info",
      form: generalInfoForm,
      fields: generalInfoFields,
      onSubmit: handleGeneralInfoSubmit,
      children: (
        <div className="col-span-full">
          <button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2">
            Save General Info
          </button>
        </div>
      ),
    },
    {
      title: "Routing Details",
      renderLayout: renderRoutingLayout,
    },
    {
      type: "table",
      title: "Cargo Details",
      dynamicRows: true,
      showActions: true,
      columns: cargoDetailsColumns,
      defaultRow: defaultCargoRow,
      onSave: (rowData, rowIndex) => {
        console.log("Cargo Details row saved:", rowData, "at index:", rowIndex);
      },
      tableSchema: cargoDetailsRowSchema,
    },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#162d56]">Shipment Tender</h2>
        <button
          onClick={handleOverallSubmit}
          className="px-6 py-2 bg-[#006397] text-white rounded-full hover:bg-[#004d7a] transition-colors"
        >
          Submit Tender
        </button>
      </div>

      {/* Form */}
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
