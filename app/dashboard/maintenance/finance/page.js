"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/dashboardform";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, RotateCcw, X, Save } from "lucide-react";

// Validation schema for Vehicle Finance form
const vehicleFinanceSchema = z.object({
  vehicleId: z.string().min(1, "Vehicle is required"),
  loanType: z.string().min(1, "Loan type is required"),
  financeCompanyName: z.string().min(1, "Finance company name is required"),
  financeStartDate: z.string().min(1, "Finance start date is required"),
  financeDueDate: z.string().min(1, "Finance due date is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  totalFinanceAmount: z.string().min(1, "Total finance amount is required"),
  paidAmount: z.string().min(1, "Paid amount is required"),
  emiRate: z.string().optional(),
  numberOfMonths: z.string().optional(),
  dueAmount: z.string().optional(),
  otherCharges: z.string().optional(),
  description: z.string().optional(),
});

export default function VehicleFinancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form instances
  const vehicleFinanceForm = useForm({
    resolver: zodResolver(vehicleFinanceSchema),
    defaultValues: {
      vehicleId: "",
      loanType: "",
      financeCompanyName: "",
      financeStartDate: "",
      financeDueDate: "",
      contactPerson: "",
      contactNumber: "",
      totalFinanceAmount: "",
      paidAmount: "",
      emiRate: "",
      numberOfMonths: "",
      dueAmount: "",
      otherCharges: "",
      description: "",
    },
  });

  // Mock data for dropdowns
  const vehicleOptions = [
    "BHC 246",
    "586 5GX", 
    "DMC 4583",
    "AB4-195",
    "TRK 789",
    "FLE 456",
    "CAR 321",
    "VAN 654",
    "TRK 987",
    "FLE 123"
  ];

  const loanTypeOptions = [
    "Vehicle Loan",
    "Equipment Finance",
    "Lease Purchase",
    "Hire Purchase",
    "Operating Lease",
    "Finance Lease"
  ];

  // Form submission handlers
  const handleVehicleFinanceSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Vehicle Finance Data:", data);
      // Here you would typically make an API call to save the data
      alert("Vehicle Finance details saved successfully!");
      vehicleFinanceForm.reset();
    } catch (error) {
      console.error("Error saving vehicle finance:", error);
      alert("Error saving vehicle finance details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    vehicleFinanceForm.reset();
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      vehicleFinanceForm.reset();
      // Navigate back or close form
    }
  };

  // Plus action handlers for adding new options
  const handleAddVehicle = () => {
    // Open modal or navigate to add vehicle page
    alert("Add Vehicle functionality - Navigate to vehicle management");
  };

  const handleAddLoanType = () => {
    // Open modal to add new loan type
    alert("Add Loan Type functionality - Open loan type modal");
  };

  // Form sections configuration
  const sections = [
    {
      title: "Vehicle Finance",
      form: vehicleFinanceForm,
      onSubmit: handleVehicleFinanceSubmit,
      fields: [
        {
          name: "vehicleId",
          label: "Choose Vehicle *",
          type: "select",
          options: vehicleOptions,
          // plusAction: handleAddVehicle,
        },
        {
          name: "loanType",
          label: "Choose Loan Type *",
          type: "select",
          options: loanTypeOptions,
          plusAction: handleAddLoanType,
        },
        {
          name: "financeCompanyName",
          label: "Finance Company Name *",
          type: "text",
          placeholder: "Finance Company Name",
        },
        {
          name: "financeStartDate",
          label: "Finance Start Date *",
          type: "text",
          placeholder: "yyyy-mm-dd hh:mm:ss",
        },
        {
          name: "financeDueDate",
          label: "Finance Due Date *",
          type: "text",
          placeholder: "yyyy-mm-dd hh:mm:ss",
        },
        {
          name: "contactPerson",
          label: "Contact Person *",
          type: "text",
          placeholder: "Contact Person",
        },
        {
          name: "contactNumber",
          label: "Contact Number *",
          type: "text",
          placeholder: "Contact Number",
        },
        {
          name: "totalFinanceAmount",
          label: "Total Finance Amount *",
          type: "text",
          placeholder: "Total Finance Amount",
        },
        {
          name: "paidAmount",
          label: "Paid Amount *",
          type: "text",
          placeholder: "Paid Amount",
        },
        {
          name: "emiRate",
          label: "EMI Rate (%)",
          type: "text",
          placeholder: "EMI Rate (%)",
        },
        {
          name: "numberOfMonths",
          label: "Number of Months",
          type: "text",
          placeholder: "Number of Months",
        },
        {
          name: "dueAmount",
          label: "Due Amount",
          type: "text",
          placeholder: "Due Amount",
        },
        {
          name: "otherCharges",
          label: "Other Charges",
          type: "text",
          placeholder: "Other Charges",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Enter Description",
          wide: true,
        },
      ],
    },
  ];

  return (
      <div className="p-6">
            <OrdersForm
              sections={sections}
              disableAccordion={true}
            />
      </div>
  );
}
