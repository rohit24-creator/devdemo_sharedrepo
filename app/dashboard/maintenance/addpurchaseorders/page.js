"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { BillingForm } from "@/components/ui/reusableComponent/dashboardForm";
import { Button } from "@/components/ui/button";
import { Info, RotateCcw, X, Save } from "lucide-react";
import FormModal from "@/components/ui/reusableComponent/formmodal";

// Zod validation schema
const purchaseOrderSchema = z.object({
  poId: z.string().min(1, "PO ID is required"),
  purchasedDate: z.string().min(1, "Purchased date is required"),
  vendor: z.string().min(1, "Vendor is required"),
  productName: z.string().optional(),
  quantity: z.string().optional(),
  uom: z.string().optional(),
  rate: z.string().optional(),
  per: z.string().optional(),
  taxPercent: z.string().optional(),
  taxType: z.string().optional(),
  taxAmount: z.string().optional(),
  amount: z.string().optional(),
  total: z.string().optional(),
  date: z.string().optional(),
  vehicleNumber: z.string().optional(),
  deliveryAddress: z.string().optional(),
  remarks: z.string().optional(),
});

export default function AddPurchaseOrderPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);

  const purchaseOrderForm = useForm({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      poId: "SHX431",
      purchasedDate: "",
      vendor: "",
      productName: "",
      quantity: "",
      uom: "NOS",
      rate: "",
      per: "",
      taxPercent: "",
      taxType: "",
      taxAmount: "",
      amount: "",
      total: "",
      date: "",
      vehicleNumber: "",
      deliveryAddress: "",
      remarks: "",
    },
  });

  const [vendorOptions, setVendorOptions] = useState([
    "ABC Suppliers",
    "XYZ Corporation",
    "Global Parts Ltd",
  ]);

  const [productNameOptions, setProductNameOptions] = useState([
    "Engine Oil",
    "Brake Pads",
    "Air Filter",
    "Battery",
  ]);

  const [vehicleNumberOptions, setVehicleNumberOptions] = useState([
    "BHC 246",
    "586 5GX",
    "DMC 4583",
  ]);

  const handlePlus = (field) => () => {
    setModalField(field);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (!data?.name) return;

    switch (modalField) {
      case "vendor":
        setVendorOptions((prev) => [...prev, data.name]);
        break;
      case "productName":
        setProductNameOptions((prev) => [...prev, data.name]);
        break;
      case "vehicleNumber":
        setVehicleNumberOptions((prev) => [...prev, data.name]);
        break;
    }

    setModalOpen(false);
    setModalField(null);
  };

  const handleSubmit = (data) => {
    console.log("Form Submitted", data);
    alert("Purchase Order Saved!");
    purchaseOrderForm.reset();
  };

  const advanceCMSColumns = [
    {
      accessorKey: "productName",
      header: "Product Name",
      type: "select",
      options: productNameOptions,
    },
    { accessorKey: "quantity", header: "Quantity", type: "text" },
    { accessorKey: "uom", header: "UOM", type: "text" },
    { accessorKey: "rate", header: "Rate", type: "text" },
    { accessorKey: "per", header: "Per", type: "text" },
    { accessorKey: "taxPercent", header: "Tax%", type: "text" },
    { accessorKey: "taxType", header: "Tax Type", type: "text" },
    { accessorKey: "taxAmount", header: "Tax Amount", type: "text" },
    { accessorKey: "amount", header: "Amount", type: "text" },
    { accessorKey: "total", header: "Total", type: "text" },
    { accessorKey: "date", header: "Date", type: "date" },
    {
      accessorKey: "vehicleNumber",
      header: "Vehicle Number",
      type: "select",
      options: vehicleNumberOptions,
    },
  ];

  const sections = [
    {
      title: "Purchase Order",
      form: purchaseOrderForm,
      onSubmit: handleSubmit,
      fields: [
        {
          name: "poId",
          label: "PO ID *",
          type: "text",
        },
        {
          name: "purchasedDate",
          label: "Purchased Date *",
          type: "date",
        },
        {
          name: "vendor",
          label: "Choose Vendor *",
          type: "select",
          options: vendorOptions,
          plusAction: handlePlus("vendor"),
        },
      ],
    },
    {
      title: "Advance CMS / Drivers Amount",
      form: purchaseOrderForm,
      onSubmit: handleSubmit,
      dynamicTable: {
        columns: advanceCMSColumns,
        defaultRow: {
          productName: "",
          quantity: "",
          uom: "NOS",
          rate: "",
          per: "",
          taxPercent: "",
          taxType: "",
          taxAmount: "",
          amount: "",
          total: "",
          date: "",
          vehicleNumber: "",
        },
        dynamicRows: true,
        showActions: true,
        onSave: (rowData, rowIndex) => {
          console.log("Saved Row", rowIndex, rowData);
        },
      },
    },
    {
      title: "Document Details",
      form: purchaseOrderForm,
      onSubmit: handleSubmit,
      fields: [
        {
          name: "deliveryAddress",
          label: "Delivery Address",
          type: "textarea",
          wide: true,
        },
        {
          name: "remarks",
          label: "Remarks",
          type: "textarea",
          wide: true,
        },
      ],
    },
  ];

  return (
    <div>
      {/* Header */}
   

      <div className="p-6">
        <BillingForm sections={sections} useAccordion={true} />
      </div>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalField === "vendor"
            ? "Add Vendor"
            : modalField === "productName"
            ? "Add Product"
            : modalField === "vehicleNumber"
            ? "Add Vehicle"
            : "Add Option"
        }
        formFields={
          modalField === "vendor" ? [
            {
              name: "shLoginAccount",
              label: "Sh Login Account *",
              type: "text"
            },
            {
              name: "password",
              label: "Password *",
              type: "text"
            },
            {
              name: "name",
              label: "Name *",
              type: "text"
            },
            {
              name: "email",
              label: "Email *",
              type: "text"
            },
            {
              name: "phone",
              label: "Phone",
              type: "text"
            },
            {
              name: "country",
              label: "Country *",
              type: "text"
            },
            {
              name: "state",
              label: "State",
              type: "text"
            },
            {
              name: "locality",
              label: "Locality(City) *",
              type: "text"
            },
            {
              name: "divisionName",
              label: "Division Name",
              type: "text"
            },
            {
              name: "street",
              label: "Street *",
              type: "text"
            },
            {
              name: "zipCode",
              label: "Zip Code *",
              type: "text"
            },
            {
              name: "street2",
              label: "Street 2",
              type: "text"
            },
            {
              name: "street3",
              label: "Street 3",
              type: "text"
            },
            {
              name: "houseNumber",
              label: "House Number",
              type: "text"
            },
            {
              name: "building",
              label: "Building",
              type: "text"
            },
            {
              name: "latitude",
              label: "Latitude *",
              type: "text"
            },
            {
              name: "longitude",
              label: "Longitude *",
              type: "text"
            }
          ]
          : [
          {
            name: "name",
            label:
              modalField === "vendor"
                ? "Vendor Name *"
                : modalField === "productName"
                ? "Product Name *"
                : modalField === "vehicleNumber"
                ? "Vehicle Number *"
                : "Name *",
            type: "text",
          },
        ]}
        onSubmit={handleModalSubmit}
        footerType="submitOnly"
        submitLabel="Save"
        dialogClassName={modalField === "vendor" ? "lg:max-w-[60rem] p-0" : "max-w-md p-0"}
      />
    </div>
  );
}
