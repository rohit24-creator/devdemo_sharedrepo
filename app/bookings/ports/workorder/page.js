"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, RotateCcw, X, Save } from "lucide-react";
import FormModal from "@/components/ui/reusableComponent/formmodal";

// Validation schema for Work Order form
const workOrderSchema = z.object({
  workOrderId: z.string().min(1, "Work Order ID is required"),
  customerId: z.string().min(1, "Customer ID is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  branchCode: z.string().optional(),
  departmentCode: z.string().optional(),
  loadingPoint: z.string().optional(),
  unloadingPoint: z.string().optional(),
  noOfTrips: z.string().optional(),
  totalAmount: z.string().optional(),
  consignmentNote: z.string().optional(),
});

export default function WorkOrderFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);

  // Form instance
  const workOrderForm = useForm({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      workOrderId: "3",
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

  // Mock data for dropdowns with state management
  const [departmentOptions, setDepartmentOptions] = useState([
    "Sales",
    "Operations", 
    "Finance",
    "HR"
  ]);

  // Form submission handlers
  const handleWorkOrderSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Work Order Data:", data);
      // Here you would typically make an API call to save the data
      alert("Work Order details saved successfully!");
      workOrderForm.reset();
    } catch (error) {
      console.error("Error saving work order:", error);
      alert("Error saving work order details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    workOrderForm.reset();
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log("Cancel action");
  };

  // Open modal for a specific field
  const handlePlus = (field) => () => {
    setModalField(field);
    setModalOpen(true);
  };

  // Handle modal submit
  const handleModalSubmit = (data) => {
    if (modalField && data && data.name) {
      if (modalField === "departmentCode") {
        setDepartmentOptions((prev) => [...prev, data.name]);
      }
    }
    setModalOpen(false);
    setModalField(null);
  };

  // Field configuration
  const fieldConfig = [
    {
      name: "workOrderId",
      label: "Work Order ID",
      type: "text",
      disabled: true
    },
    {
      name: "customerId",
      label: "Customer ID *",
      type: "text"
    },
    {
      name: "companyCode",
      label: "Company Code *",
      type: "text"
    },
    {
      name: "branchCode",
      label: "Branch Code",
      type: "text"
    },
    {
      name: "departmentCode",
      label: "Department Code",
      type: "select",
      options: departmentOptions,
      plusAction: handlePlus("departmentCode")
    },
    {
      name: "loadingPoint",
      label: "Loading Point",
      type: "text"
    },
    {
      name: "unloadingPoint",
      label: "Unloading Point",
      type: "text"
    },
    {
      name: "noOfTrips",
      label: "No. Of Trips",
      type: "text"
    },
    {
      name: "totalAmount",
      label: "Total Amount",
      type: "text"
    },
    {
      name: "consignmentNote",
      label: "Consignment Note",
      type: "textarea",
      wide: true
    }
  ];

  const sections = [
    {
      title: "Work Orders",
      form: workOrderForm,
      onSubmit: handleWorkOrderSubmit,
      disableAccordionToggle: true,
      fields: fieldConfig
    }
  ];

  return (
    <div className="">
      <div className="p-6">
        {/* Form Content */}
        <OrdersForm
          sections={sections}
          useAccordion={true}
        />
      </div>

      {/* Modal for adding new options */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalField ? 
          modalField === "departmentCode" ? "Add New Department" : 
          ""
          : ""
        }
        formFields={[
          {
            name: "name",
            label: modalField === "departmentCode" ? "Enter Department Name *" : "Enter Name *",
            type: "text"
          }
        ]}
        onSubmit={handleModalSubmit}
        footerType="submitOnly"
        submitLabel="Save"
        dialogClassName="max-w-md p-0"
      />
    </div>
  );
}
