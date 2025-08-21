"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";

const claimSchema = z.object({
  claimNumber: z.string(),
  claimType: z.string().min(1),
  incidentDate: z.string().min(1),
  orderId: z.string().min(1),
  carrierVendor: z.string().min(1),
  claimAmount: z.string().min(1),
  location: z.string().optional(),
  referencePolicy: z.string().optional(),
  priorityLevel: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  claimStatus: z.string().min(1),
  enableNotifications: z.boolean().optional(),
  description: z.string().optional(),
  supportingDocuments: z.any().optional(),
});

const claimTypes = ["Lost Shipment", "Damaged Goods", "Delay", "Other"];
const carrierVendors = ["ANTHONY", "DHL", "FedEx", "Other"];
const priorityLevels = ["Low", "Medium", "High"];
const claimStatuses = ["Started", "In Review", "Approved", "Rejected"];

// Separate field configuration array
const claimFields = [
  {
    name: "claimNumber",
    label: "Claim Number",
    type: "text",
    disabled: true,
    placeholder: "",
    subLabel: "Auto-generated unique claim number"
  },
  {
    name: "claimType",
    label: "Claim Type:*",
    type: "select",
    options: claimTypes
  },
  {
    name: "incidentDate",
    label: "Incident Date:*",
    type: "date",
    placeholder: "Incident Date"
  },
  {
    name: "orderId",
    label: "Order ID:*",
    type: "text",
    // placeholder: "Start typing Order ID..."
  },
  {
    name: "carrierVendor",
    label: "Carrier/Vendor Name:",
    type: "select",
    options: carrierVendors
  },
  {
    name: "claimAmount",
    label: "Claim Amount *",
    type: "text",
    // placeholder: "Claim Amount"
  },
  {
    name: "location",
    label: "Location of Incident",
    type: "text",
    placeholder: ""
  },
  {
    name: "referencePolicy",
    label: "Reference/Policy Number",
    type: "text",
    placeholder: ""
  },
  {
    name: "priorityLevel",
    label: "Priority Level",
    type: "select",
    options: priorityLevels
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    // placeholder: "Email" 
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: ""
  },
  {
    name: "claimStatus",
    label: "Claim Status",
    type: "select",
    options: claimStatuses
  },
  {
    name: "enableNotifications",
    label: "Enable Notifications",
    type: "checkbox",
    placeholder: "Opt to send updates via SMS",
    subLabel: "Opt to send updates via SMS"
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: ""
  },
  {
    name: "supportingDocuments",
    label: "Supporting Documents",
    type: "file",
  }
];

export default function ClaimFormPage() {
  const form = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      claimNumber: "CLAIM42",
      claimType: "Lost Shipment",
      incidentDate: "",
      orderId: "",
      carrierVendor: "ANTHONY",
      claimAmount: "",
      location: "",
      referencePolicy: "",
      priorityLevel: "Low",
      email: "",
      phone: "",
      claimStatus: "Started",
      enableNotifications: false,
      description: "",
      supportingDocuments: undefined,
    },
  });

  const onSubmit = (data) => {
    console.log("Claim submitted:", data);
  };

  const sections = [
    {
      title: "Claim",
      type: "form",
      form: form,
      onSubmit: onSubmit,
      fields: claimFields,
    }
  ];

  return (
    <div className="p-6">
          <OrdersForm sections={sections}  useAccordion={true} disableAccordion={true}/>
          </div>
        );
}
