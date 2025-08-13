"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBillingFields } from "@/components/ui/reusableComponent/billingForm";
import { formatRowsWithId } from "@/lib/utils";
import BillingList from "@/components/ui/reusableComponent/billingList";
import { LayoutGrid, FileSpreadsheet, Upload } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const serviceAttributesSchema = z.object({
  rateServiceId: z.string().min(1, { message: "Rate Service ID is required" }),
  laneId: z.string().min(1, { message: "Lane ID is required" }),
  rateServiceName: z.string().min(1, { message: "Rate Service Name is required" }),
  sourceGeo: z.string().optional(),
  serviceType: z.string().min(1, { message: "Service Type is required" }),
  source: z.string().optional(),
  product: z.string().min(1, { message: "Product is required" }),
  destinationGeo: z.string().optional(),
  durationDays: z.string().optional(),
  durationHours: z.string().optional(),
  durationMinutes: z.string().optional(),
  destination: z.string().optional(),
});

const rateAttributesSchema = z.object({
  tariffType: z.string().min(1, { message: "Tariff Type is required" }),
  vehicleProfile: z.string().min(1, { message: "Vehicle Profile is required" }),
  effectiveDate: z.string().min(1, { message: "Effective Date is required" }),
  conversionFactor: z.string().min(1, { message: "Conversion Factor is required" }),
  expiryDate: z.string().min(1, { message: "Expiry Date is required" }),
  active: z.boolean().default(true),
  quote: z.boolean().default(false),
  vendorProfile: z.string().min(1, { message: "Vendor Profile is required" }),
  customerProfile: z.string().min(1, { message: "Customer Profile is required" }),
});

export default function QuickRatesPage() {
  const { renderField } = useBillingFields();
  
  // State for table data
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const serviceAttributesForm = useForm({
    resolver: zodResolver(serviceAttributesSchema),
    defaultValues: {
      rateServiceId: "",
      laneId: "",
      rateServiceName: "",
      sourceGeo: "",
      serviceType: "",
      source: "",
      product: "",
      destinationGeo: "",
      durationDays: "",
      durationHours: "",
      durationMinutes: "",
      destination: "",
    },
  });

  const rateAttributesForm = useForm({
    resolver: zodResolver(rateAttributesSchema),
    defaultValues: {
      tariffType: "",
      vehicleProfile: "",
      effectiveDate: "",
      conversionFactor: "",
      expiryDate: "",
      active: true,
      quote: false,
      vendorProfile: "",
      customerProfile: "",
    },
  });



  const serviceTypeOptions = [
    { value: "express", label: "Express" },
    { value: "standard", label: "Standard" },
    { value: "economy", label: "Economy" },
    { value: "premium", label: "Premium" },
  ];

  const productOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "food", label: "Food" },
    { value: "automotive", label: "Automotive" },
    { value: "pharmaceuticals", label: "Pharmaceuticals" },
  ];

  const tariffTypeOptions = [
    { value: "flat", label: "Flat Rate" },
    { value: "tiered", label: "Tiered Rate" },
    { value: "distance", label: "Distance Based" },
    { value: "weight", label: "Weight Based" },
  ];

  const vehicleProfileOptions = [
    { value: "truck", label: "Truck" },
    { value: "trailer", label: "Trailer" },
    { value: "container", label: "Container" },
    { value: "van", label: "Van" },
  ];

  const conversionFactorOptions = [
    { value: "1.0", label: "1.0" },
    { value: "1.5", label: "1.5" },
    { value: "2.0", label: "2.0" },
    { value: "0.5", label: "0.5" },
  ];

  const vendorProfileOptions = [
    { value: "vendor1", label: "Vendor 1" },
    { value: "vendor2", label: "Vendor 2" },
    { value: "vendor3", label: "Vendor 3" },
  ];

  const customerProfileOptions = [
    { value: "customer1", label: "Customer 1" },
    { value: "customer2", label: "Customer 2" },
    { value: "customer3", label: "Customer 3" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/quickRatesData.json");
        const data = await res.json();

        const formattedColumns = data.headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        }));

        const formattedRows = formatRowsWithId(data.rows);
        setColumns(formattedColumns);
        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching quick rates data:", error);
      }
    };

    fetchData();
  }, []);



  const laneData = [
    {
      laneId: "LANE001",
      sourceGeo: "Mumbai",
      source: "Mumbai Port",
      destinationGeo: "Delhi",
      destination: "Delhi Hub",
    },
    {
      laneId: "LANE002",
      sourceGeo: "Chennai",
      source: "Chennai Port",
      destinationGeo: "Bangalore",
      destination: "Bangalore Hub",
    },
    {
      laneId: "LANE003",
      sourceGeo: "Kolkata",
      source: "Kolkata Port",
      destinationGeo: "Hyderabad",
      destination: "Hyderabad Hub",
    },
    {
      laneId: "LANE004",
      sourceGeo: "Pune",
      source: "Pune Hub",
      destinationGeo: "Ahmedabad",
      destination: "Ahmedabad Hub",
    },
  ];

  const mappingConfig = {
    laneId: {
      keyField: "laneId",
      data: laneData,
      mappedFields: ["sourceGeo", "source", "destinationGeo", "destination"]
    }
  };


  const laneOptions = laneData.map(lane => ({ value: lane.laneId, label: `${lane.source} - ${lane.destination}` }));

  // Local mapping function with same logic as billing form (adapted for quick rates)
  const handleMappingChange = (fieldName, value) => {
    if (mappingConfig && mappingConfig[fieldName]) {
      const mapping = mappingConfig[fieldName];
      const selectedData = mapping.data.find(item => item[mapping.keyField] === value);
      if (selectedData) {
        mapping.mappedFields.forEach(mappedField => {
          serviceAttributesForm.setValue(mappedField, selectedData[mappedField]);
        });
      }
    }
  };

  const serviceAttributesFields = [
    { name: "rateServiceId", label: "Rate Service ID *" },
    { 
      name: "laneId", 
      label: "Lane ID *", 
      type: "select", 
      options: laneOptions,
      onValueChange: (value) => handleMappingChange("laneId", value)
    },
    { name: "rateServiceName", label: "Rate Service Name *" },
    { name: "sourceGeo", label: "Source Geo", disabled: true },
    { name: "serviceType", label: "Service Type *", type: "select", options: serviceTypeOptions },
    { name: "source", label: "Source", disabled: true },
    { name: "product", label: "Product *", type: "select", options: productOptions },
    { name: "destinationGeo", label: "Destination Geo", disabled: true },
    { name: "destination", label: "Destination", disabled: true },
    { name: "durationDays", label: "Days", type: "number", placeholder: "Days" },
    { name: "durationHours", label: "Hours", type: "number", placeholder: "Hours" },
    { name: "durationMinutes", label: "Minutes", type: "number", placeholder: "Minutes" },

  ];

  const rateAttributesFields = [
    { name: "tariffType", label: "Tariff Type *", type: "select", options: tariffTypeOptions },
    { name: "vehicleProfile", label: "Vehicle Profile *", type: "select", options: vehicleProfileOptions },
    { name: "effectiveDate", label: "Effective Date *", type: "date" },
    { name: "conversionFactor", label: "Conversion Factor *", type: "select", options: conversionFactorOptions },
    { name: "expiryDate", label: "Expiry Date *", type: "date" },
    { name: "vendorProfile", label: "Vendor Profile *", type: "select", options: vendorProfileOptions },
    { name: "customerProfile", label: "Customer Profile *", type: "select", options: customerProfileOptions },
    { name: "active", label: "Active", type: "checkbox" },
    { name: "quote", label: "Quote", type: "checkbox" },
  ];

  const sections = [
    {
      title: "Quick Rate Configuration",
      type: "form",
      renderLayout: ({ renderField }) => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Service Attributes Card */}
          <Card className="shadow-lg lg:col-span-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-[#0088d2]">Service Attributes</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...serviceAttributesForm}>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceAttributesFields
                      .filter(field => !["durationDays", "durationHours", "durationMinutes"].includes(field.name))
                      .map((field) =>
                        renderField(field, serviceAttributesForm, 0)
                      )}
                    {/* Duration fields grouped together */}
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Duration</label>
                      <div className="grid grid-cols-3 gap-4">
                        {renderField(
                          serviceAttributesFields.find(field => field.name === "durationDays"),
                          serviceAttributesForm,
                          0
                        )}
                        {renderField(
                          serviceAttributesFields.find(field => field.name === "durationHours"),
                          serviceAttributesForm,
                          0
                        )}
                        {renderField(
                          serviceAttributesFields.find(field => field.name === "durationMinutes"),
                          serviceAttributesForm,
                          0
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>

          {/* Rate Attributes Card */}
          <Card className="shadow-lg lg:col-span-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-[#0088d2]">Rate Attributes</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...rateAttributesForm}>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rateAttributesFields.map((field) =>
                      renderField(field, rateAttributesForm, 1)
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  const handleSave = () => {
    console.log("Service Attributes:", serviceAttributesForm.getValues());
    console.log("Rate Attributes:", rateAttributesForm.getValues());
  };

  const handleCancel = () => {
    serviceAttributesForm.reset();
    rateAttributesForm.reset();
  };

  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit charge", row);
    } else if (action === "view") {
      console.log("View charge", row);
    }
  };

  const actionMenuItems = [
    {
      label: "Order Template",
      icon: <FileSpreadsheet size={18} className="mr-2" />,
      onClick: () => console.log("Order Template clicked")
    },
    {
      label: "Upload Excel",
      icon: <Upload size={18} className="mr-2" />,
      onClick: () => console.log("Upload Excel clicked")
    }
  ];



  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quick Rates</h1>
      </div>
      
      <BillingForm sections={sections} useAccordion={false} />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Rate Charges</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 py-2 rounded-full flex items-center gap-2"
              >
                <LayoutGrid size={18} />
                Action
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {actionMenuItems.map((item, index) => (
                <DropdownMenuItem key={index} onClick={item.onClick}>
                  {item.icon}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        

        <BillingList
          columns={columns}
          rows={rows}
          showActions={false}
          enabledActions={["edit", "view", "delete"]}
          onActionClick={handleActionClick}
          hideFilterSection={true}
        />

        {/* Save/Cancel Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" className="px-6 py-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="bg-[#006397] hover:bg-[#02abf5] text-white px-6 py-2" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
