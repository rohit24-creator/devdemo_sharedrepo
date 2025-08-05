"use client";

import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { useForm } from "react-hook-form";

export default function WorkOrderFormPage() {
  // Ensure all field names in defaultValues match the fields array
  const form = useForm({
    defaultValues: {
      workOrderId: "3", // Example, should be auto-generated or fetched
      customerId: "",
      companyCode: "SXUSA",
      branchCode: "",
      departmentCode: "",
      loadingPoint: "",
      unloadingPoint: "",
      noOfTrips: "",
      totalAmount: "",
      consignmentNote: ""
    }
  });

  const sections = [
    {
      title: "Work Orders",
      type: "form",
      form,
      fields: [
        { name: "workOrderId", label: "Work OrderId", type: "text", disabled: true },
        { name: "customerId", label: "Customer ID *" },
        { name: "companyCode", label: "Company Code *" },
        { name: "branchCode", label: "Branch Code" },
        { name: "departmentCode", label: "Department Code", type: "select", options: ["Sales", "Operations", "Finance", "HR"] },
        { name: "loadingPoint", label: "Loading Point", type: "text" },
        { name: "unloadingPoint", label: "Unloading Point", type: "text" },
        { name: "noOfTrips", label: "No. Of Trips", type: "text" },
        { name: "totalAmount", label: "Total amount", type: "text", placeholder: "Amount" },
        { name: "consignmentNote", label: "Consignment Note", type: "textarea" }
      ]
    }
  ];

  return (
    <div className="p-4">
      <OrdersForm sections={sections} disableAccordion={true} />
    </div>
  );
}
