"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const ratePreferenceSchema = z.object({
  ratePreferenceId: z.string().min(1, "Rate Preference ID is required"),
  ratePreferenceName: z.string().min(1, "Rate Preference Name is required"),
  tariffType: z.string().min(1, "Tariff Type is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  customerProfile: z.string().min(1, "Customer Profile is required"),
  rateService: z.string().min(1, "Rate Service is required"),
  rateOffering: z.string().min(1, "Rate Offering is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  rateRecord: z.string().min(1, "Rate Record is required"),
  departmentCode: z.string().min(1, "Department Code is required"),
});

const sourceRowSchema = z.object({
  shipperId: z.string().min(1, "Shipper ID is required"),
  country: z.string().min(1, "Country is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
});

const destinationRowSchema = z.object({
  consigneeId: z.string().min(1, "Consignee ID is required"),
  country: z.string().min(1, "Country is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
});

const referenceTypeRowSchema = z.object({
  referenceType: z.string().min(1, "Reference Type is required"),
  referenceName: z.string().optional(),
  value: z.string().min(1, "Value is required"),
  condition: z.string().min(1, "Condition is required"),
});

const orderTypeRowSchema = z.object({
  orderTypeId: z.string().min(1, "Order Type ID is required"),
  name: z.string().optional(),
});

const serviceRowSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  name: z.string().optional(),
});

const productRowSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().optional(),
});

const generalInfoFields = [
  { 
    name: "ratePreferenceId", 
    label: "Rate Preference ID", 
    type: "text",
    placeholder: "Enter Rate Preference ID",
  },
  { 
    name: "ratePreferenceName", 
    label: "Rate Preference Name", 
    type: "text",
    placeholder: "Enter Rate Preference Name"
  },
  { 
    name: "tariffType", 
    label: "Tariff Type", 
    type: "select",
    options: [
      { value: "import", label: "Import" },
      { value: "export", label: "Export" },
      { value: "domestic", label: "Domestic" },
      { value: "transit", label: "Transit" },
      { value: "cross_trade", label: "Cross Trade" }
    ],
    placeholder: "Select Tariff Type"
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
  },
  { 
    name: "customerProfile", 
    label: "Customer Profile", 
    type: "text",
    placeholder: "Enter Customer Profile",
  },
  { 
    name: "rateService", 
    label: "Rate Service", 
    type: "select",
    options: [
      { value: "service1", label: "Service 1" },
      { value: "service2", label: "Service 2" },
      { value: "service3", label: "Service 3" },
      { value: "service4", label: "Service 4" },
      { value: "service5", label: "Service 5" }
    ],
    placeholder: "Select Rate Service"
  },
  { 
    name: "rateOffering", 
    label: "Rate Offering", 
    type: "select",
    options: [
      { value: "offering1", label: "Offering 1" },
      { value: "offering2", label: "Offering 2" },
      { value: "offering3", label: "Offering 3" },
      { value: "offering4", label: "Offering 4" },
      { value: "offering5", label: "Offering 5" }
    ],
    placeholder: "Select Rate Offering"
  },
  { 
    name: "branchCode", 
    label: "Branch Code", 
    type: "text",
    placeholder: "Enter Branch Code",
  },
  { 
    name: "rateRecord", 
    label: "Rate Record", 
    type: "select",
    options: [
      { value: "record1", label: "Record 1" },
      { value: "record2", label: "Record 2" },
      { value: "record3", label: "Record 3" },
      { value: "record4", label: "Record 4" },
      { value: "record5", label: "Record 5" }
    ],
    placeholder: "Select Rate Record"
  },
  { 
    name: "departmentCode", 
    label: "Department Code", 
    type: "text",
    placeholder: "Enter Department Code",
  },
];

const countryData = [
  { value: "india", label: "India" },
  { value: "thailand", label: "Thailand" },
  { value: "singapore", label: "Singapore" },
  { value: "malaysia", label: "Malaysia" },
  { value: "indonesia", label: "Indonesia" },
  { value: "vietnam", label: "Vietnam" },
  { value: "philippines", label: "Philippines" },
  { value: "china", label: "China" },
  { value: "japan", label: "Japan" },
  { value: "south_korea", label: "South Korea" }
];

const sourceColumns = [
  { 
    accessorKey: "shipperId", 
    header: "Shipper ID", 
    type: "text",
    placeholder: "Enter Shipper ID"
  },
  { 
    accessorKey: "country", 
    header: "Country", 
    type: "select",
    options: countryData,
    placeholder: "Select Country"
  },
  { 
    accessorKey: "province", 
    header: "Province", 
    type: "text",
    placeholder: "Enter Province"
  },
  { 
    accessorKey: "city", 
    header: "City", 
    type: "text",
    placeholder: "Enter City"
  },
  { 
    accessorKey: "postalCode", 
    header: "Postal Code", 
    type: "text",
    placeholder: "Enter Postal Code"
  },
];

const destinationColumns = [
  { 
    accessorKey: "consigneeId", 
    header: "Consignee ID", 
    type: "text",
    placeholder: "Enter Consignee ID"
  },
  { 
    accessorKey: "country", 
    header: "Country", 
    type: "select",
    options: countryData,
    placeholder: "Select Country"
  },
  { 
    accessorKey: "province", 
    header: "Province", 
    type: "text",
    placeholder: "Enter Province"
  },
  { 
    accessorKey: "city", 
    header: "City", 
    type: "text",
    placeholder: "Enter City"
  },
  { 
    accessorKey: "postalCode", 
    header: "Postal Code", 
    type: "text",
    placeholder: "Enter Postal Code"
  },
];

const referenceTypeData = [
  { referenceType: "REF001", referenceName: "Customer Type" },
  { referenceType: "REF002", referenceName: "Shipment Weight" },
  { referenceType: "REF003", referenceName: "Distance Range" },
  { referenceType: "REF004", referenceName: "Service Level" },
  { referenceType: "REF005", referenceName: "Package Type" },
];

const conditionData = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "contains", label: "Contains" },
  { value: "starts_with", label: "Starts With" },
  { value: "ends_with", label: "Ends With" },
  { value: "between", label: "Between" },
];

const orderTypeData = [
  { orderTypeId: "OT001", name: "Standard Delivery" },
  { orderTypeId: "OT002", name: "Express Delivery" },
  { orderTypeId: "OT003", name: "Same Day Delivery" },
  { orderTypeId: "OT004", name: "Next Day Delivery" },
  { orderTypeId: "OT005", name: "Economy Delivery" },
];

const serviceData = [
  { serviceId: "SVC001", name: "Air Freight" },
  { serviceId: "SVC002", name: "Sea Freight" },
  { serviceId: "SVC003", name: "Road Freight" },
  { serviceId: "SVC004", name: "Rail Freight" },
  { serviceId: "SVC005", name: "Express Delivery" },
];

const productData = [
  { productId: "PRD001", name: "Electronics" },
  { productId: "PRD002", name: "Textiles" },
  { productId: "PRD003", name: "Machinery" },
  { productId: "PRD004", name: "Chemicals" },
  { productId: "PRD005", name: "Food Products" },
];

const referenceTypeColumns = [
  { 
    accessorKey: "referenceType", 
    header: "Reference Type", 
    type: "select",
    options: referenceTypeData.map(ref => ({ value: ref.referenceType, label: ref.referenceType })),
    placeholder: "Select Reference Type"
  },
  { 
    accessorKey: "referenceName", 
    header: "Reference Name", 
    type: "text",
    disabled: true,
    placeholder: "Reference Name"
  },
  { 
    accessorKey: "value", 
    header: "Value", 
    type: "text",
    placeholder: "Enter Value"
  },
  { 
    accessorKey: "condition", 
    header: "Condition", 
    type: "select",
    options: conditionData,
    placeholder: "Select Condition"
  },
];

const orderTypeColumns = [
  { 
    accessorKey: "orderTypeId", 
    header: "Order Type ID", 
    type: "select",
    options: orderTypeData.map(ot => ({ value: ot.orderTypeId, label: ot.orderTypeId })),
    placeholder: "Select Order Type ID"
  },
  { 
    accessorKey: "name", 
    header: "Name", 
    type: "text",
    disabled: true,
    placeholder: "Name"
  },
];

const serviceColumns = [
  { 
    accessorKey: "serviceId", 
    header: "Service ID", 
    type: "select",
    options: serviceData.map(svc => ({ value: svc.serviceId, label: svc.serviceId })),
    placeholder: "Select Service ID"
  },
  { 
    accessorKey: "name", 
    header: "Name", 
    type: "text",
    disabled: true,
    placeholder: "Name"
  },
];

const productColumns = [
  { 
    accessorKey: "productId", 
    header: "Product ID", 
    type: "select",
    options: productData.map(prd => ({ value: prd.productId, label: prd.productId })),
    placeholder: "Select Product ID"
  },
  { 
    accessorKey: "name", 
    header: "Name", 
    type: "text",
    disabled: true,
    placeholder: "Name"
  },
];

export default function RatePreferencePage() {
  const form = useForm({
    resolver: zodResolver(ratePreferenceSchema),
    defaultValues: {
      ratePreferenceId: "",
      ratePreferenceName: "",
      tariffType: "",
      companyCode: "",
      customerProfile: "",
      rateService: "",
      rateOffering: "",
      branchCode: "",
      rateRecord: "",
      departmentCode: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Rate Preference General Info Submitted:", data);
  };

  const handleSourceTableSave = (rowData, rowIndex) => {
    console.log("Source row saved:", rowData, "at index:", rowIndex);
  };

  const handleDestinationTableSave = (rowData, rowIndex) => {
    console.log("Destination row saved:", rowData, "at index:", rowIndex);
  };

  const handleReferenceTypeTableSave = (rowData, rowIndex) => {
    console.log("Reference Type row saved:", rowData, "at index:", rowIndex);
  };

  const handleOrderTypeTableSave = (rowData, rowIndex) => {
    console.log("Order Type row saved:", rowData, "at index:", rowIndex);
  };

  const handleServiceTableSave = (rowData, rowIndex) => {
    console.log("Service row saved:", rowData, "at index:", rowIndex);
  };

  const handleProductTableSave = (rowData, rowIndex) => {
    console.log("Product row saved:", rowData, "at index:", rowIndex);
  };

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: generalInfoFields,
      onSubmit: handleSubmit,
      children: (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2"
          >
            Save Rate Preference
          </button>
        </div>
      ),
    },
    {
      type: "table",
      title: "Source",
      dynamicRows: true,
      showActions: true,
      columns: sourceColumns,
      defaultRow: {
        shipperId: "",
        country: "",
        province: "",
        city: "",
        postalCode: "",
      },
      onSave: handleSourceTableSave,
      tableSchema: sourceRowSchema,
    },
    {
      type: "table",
      title: "Destination",
      dynamicRows: true,
      showActions: true,
      columns: destinationColumns,
      defaultRow: {
        consigneeId: "",
        country: "",
        province: "",
        city: "",
        postalCode: "",
      },
      onSave: handleDestinationTableSave,
      tableSchema: destinationRowSchema,
    },
    {
      type: "table",
      title: "Reference Type",
      dynamicRows: true,
      showActions: true,
      columns: referenceTypeColumns,
      defaultRow: {
        referenceType: "",
        referenceName: "",
        value: "",
        condition: "",
      },
      onSave: handleReferenceTypeTableSave,
      tableSchema: referenceTypeRowSchema,
      mappingConfig: {
        referenceType: {
          keyField: "referenceType",
          data: referenceTypeData,
          mappedFields: ["referenceName"]
        },
      },
    },
    {
      type: "table",
      title: "Order Type",
      dynamicRows: true,
      showActions: true,
      columns: orderTypeColumns,
      defaultRow: {
        orderTypeId: "",
        name: "",
      },
      onSave: handleOrderTypeTableSave,
      tableSchema: orderTypeRowSchema,
      mappingConfig: {
        orderTypeId: {
          keyField: "orderTypeId",
          data: orderTypeData,
          mappedFields: ["name"]
        },
      },
    },
    {
      type: "table",
      title: "Service",
      dynamicRows: true,
      showActions: true,
      columns: serviceColumns,
      defaultRow: {
        serviceId: "",
        name: "",
      },
      onSave: handleServiceTableSave,
      tableSchema: serviceRowSchema,
      mappingConfig: {
        serviceId: {
          keyField: "serviceId",
          data: serviceData,
          mappedFields: ["name"]
        },
      },
    },
    {
      type: "table",
      title: "Product",
      dynamicRows: true,
      showActions: true,
      columns: productColumns,
      defaultRow: {
        productId: "",
        name: "",
      },
      onSave: handleProductTableSave,
      tableSchema: productRowSchema,
      mappingConfig: {
        productId: {
          keyField: "productId",
          data: productData,
          mappedFields: ["name"]
        },
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Rate Preference</h1>
      <BillingForm sections={sections.filter(section => 
        ['General Info', 'Source', 'Destination'].includes(section.title)
      )} useAccordion={true} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {sections.filter(section => 
          ['Reference Type', 'Order Type', 'Service', 'Product'].includes(section.title)
        ).map((section, index) => (
          <div key={section.title}>
            <BillingForm sections={[section]} useAccordion={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
