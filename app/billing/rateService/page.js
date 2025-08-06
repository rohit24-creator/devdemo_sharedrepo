"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const rateServiceSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  serviceName: z.string().min(1, "Service Name is required"),
  description: z.string().min(1, "Description is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  serviceType: z.string().min(1, "Service Type is required"),
  product: z.string().min(1, "Product is required"),
});

const generalInfoFields = [
  { 
    name: "serviceId", 
    label: "Service ID", 
    type: "text",
    placeholder: "Enter Service ID"
  },
  { 
    name: "serviceName", 
    label: "Service Name", 
    type: "text",
    placeholder: "Enter Service Name"
  },
  { 
    name: "description", 
    label: "Description", 
    type: "textarea",
    placeholder: "Enter Description",
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    modalFieldName: "companyCode",
    placeholder: "Select Company"
  },
  { 
    name: "serviceType", 
    label: "Service Type", 
    type: "select", 
    options: ["Freight", "Express", "Premium", "Economy", "Standard", "Custom"],
    placeholder: "Select Service Type"
  },
  { 
    name: "product", 
    label: "Product", 
    type: "select", 
    options: ["Air Freight", "Sea Freight", "Road Freight", "Rail Freight", "Express Delivery", "Warehousing", "Customs Clearance", "Insurance"],
    placeholder: "Select Product",
  },
];

export default function RateServicePage() {
  const form = useForm({
    resolver: zodResolver(rateServiceSchema),
    defaultValues: {
      serviceId: "",
      serviceName: "",
      description: "",
      companyCode: "",
      serviceType: "",
      product: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Rate Service Submitted:", data);
  };

  // Lane data for mapping example
  const laneData = [
    {
      laneId: "LANE001",
      laneName: "Mumbai to Delhi",
      sourceGeo: "India",
      source: "Mumbai",
      destinationGeo: "India", 
      destination: "Delhi"
    },
    {
      laneId: "LANE002", 
      laneName: "Chennai to Bangalore",
      sourceGeo: "India",
      source: "Chennai", 
      destinationGeo: "India",
      destination: "Bangalore"
    },
    {
      laneId: "LANE003",
      laneName: "Delhi to Kolkata", 
      sourceGeo: "India",
      source: "Delhi",
      destinationGeo: "India",
      destination: "Kolkata"
    }
  ];

  // Table columns for Rate Details section
  const rateDetailsColumns = [
    { 
      accessorKey: "laneId", 
      header: "Lane ID", 
      type: "select",
      options: laneData.map(lane => lane.laneId),
      placeholder: "Select Lane ID"
    },
    { 
      accessorKey: "laneName", 
      header: "Lane Name", 
      type: "text",
      placeholder: "Lane Name",
      disabled: true
    },
    { 
      accessorKey: "sourceGeo", 
      header: "Source Geo", 
      type: "text",
      placeholder: "Source Geo",
      disabled: true
    },
    { 
      accessorKey: "source", 
      header: "Source", 
      type: "text",
      placeholder: "Source",
      disabled: true
    },
    { 
      accessorKey: "destinationGeo", 
      header: "Destination Geo", 
      type: "text",
      placeholder: "Destination Geo", 
      disabled: true
    },
    { 
      accessorKey: "destination", 
      header: "Destination", 
      type: "text",
      placeholder: "Destination",
      disabled: true
    },
    { 
      accessorKey: "calendar", 
      header: "Calendar", 
      type: "select",
      options: ["Standard", "Express", "Premium"],
      placeholder: "Select Calendar"
    },
    { 
      accessorKey: "days", 
      header: "Days", 
      type: "number",
      placeholder: "Enter Days"
    },
    { 
      accessorKey: "hours", 
      header: "Hours", 
      type: "number",
      placeholder: "Enter Hours"
    },
    { 
      accessorKey: "minutes", 
      header: "Minutes", 
      type: "number",
      placeholder: "Enter Minutes"
    },
  ];

  const handleTableSave = (rowData, rowIndex) => {
    console.log("Rate Details row saved:", rowData, "at index:", rowIndex);
  };

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: generalInfoFields,
      onSubmit: handleSubmit,
      children: (
        <div className="col-span-full">
          <button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2">
            Save Rate Service
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Rate Details",
      dynamicRows: true,
      showActions: true,
      columns: rateDetailsColumns,
      defaultRow: {
        laneId: "",
        laneName: "",
        sourceGeo: "",
        source: "",
        destinationGeo: "",
        destination: "",
        calendar: "",
        days: "",
        hours: "",
        minutes: "",
      },

      onSave: handleTableSave,

      mappingConfig: {
        laneId: {
          keyField: "laneId",
          data: laneData,
          mappedFields: ["laneName", "sourceGeo", "source", "destinationGeo", "destination"]
        }
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Rate Service</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
} 