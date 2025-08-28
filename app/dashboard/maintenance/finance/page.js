"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/dashboardForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, RotateCcw, X, Save } from "lucide-react";
import FormModal from "@/components/ui/reusableComponent/formmodal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);

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

  // Mock data for dropdowns with state management
  const [vehicleOptions, setVehicleOptions] = useState([
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
  ]);

  const [loanTypeOptions, setLoanTypeOptions] = useState([
    "Vehicle Loan",
    "Equipment Finance",
    "Lease Purchase",
    "Hire Purchase",
    "Operating Lease",
    "Finance Lease"
  ]);

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

  // Modal handlers
  const handlePlus = (field) => () => {
    setModalField(field);
    setModalOpen(true);
  };

  // Handle modal submit
  const handleModalSubmit = (data) => {
    if (modalField && data && data.name) {
      if (modalField === "vehicleId") {
        setVehicleOptions((prev) => [...prev, data.name]);
      } else if (modalField === "loanType") {
        setLoanTypeOptions((prev) => [...prev, data.name]);
      }
    }
    setModalOpen(false);
    setModalField(null);
  };

  // Form sections configuration
  const sections = [
    {
      title: "Vehicle Finance",
      form: vehicleFinanceForm,
      onSubmit: handleVehicleFinanceSubmit,
      disableAccordionToggle: true,
      fields: [
        {
          name: "vehicleId",
          label: "Choose Vehicle *",
          type: "select",
          options: vehicleOptions,
        },
        {
          name: "loanType",
          label: "Choose Loan Type *",
          type: "select",
          options: loanTypeOptions,
          plusAction: handlePlus("loanType"),
        },
        {
          name: "financeCompanyName",
          label: "Finance Company Name *",
          type: "text",
          // placeholder: "Finance Company Name",
        },
        {
          name: "financeStartDate",
          label: "Finance Start Date *",
          type: "date",
        },
        {
          name: "financeDueDate",
          label: "Finance Due Date *",
          type: "date",
        },
        {
          name: "contactPerson",
          label: "Contact Person *",
          type: "text",
          // placeholder: "Contact Person",
        },
        {
          name: "contactNumber",
          label: "Contact Number *",
          type: "text",
          // placeholder: "Contact Number",
        },
        {
          name: "totalFinanceAmount",
          label: "Total Finance Amount *",
          type: "text",
          // placeholder: "Total Finance Amount",
        },
        {
          name: "paidAmount",
          label: "Paid Amount *",
          type: "text",
          // placeholder: "Paid Amount",
        },
        {
          name: "emiRate",
          label: "EMI Rate (%)",
          type: "text",
          // placeholder: "EMI Rate (%)",
        },
        {
          name: "numberOfMonths",
          label: "Number of Months",
          type: "text",
          // placeholder: "Number of Months",
        },
        {
          name: "dueAmount",
          label: "Due Amount",
          type: "text",
          // placeholder: "Due Amount",
        },
        {
          name: "otherCharges",
          label: "Other Charges",
          type: "text",
          // placeholder: "Other Charges",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          // placeholder: "Enter Description",
          wide: true,
        },
      ],
    },
  ];

  return (
    <div className="">

            <div className="p-6">

        {/* Form Content */}
            <BillingForm
              sections={sections}
              useAccordion={true}
            />

      </div>

      {/* Modal for adding new options */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalField ? 
          modalField === "vehicleId" ? "Add New Vehicle" : 
          modalField === "loanType" ? "Add New Loan Type" : 
          ""
          : ""
        }
        formFields={[
          {
            name: "name",
            label: modalField === "vehicleId" ? "Enter Vehicle Name *" : "Enter Loan Type *",
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
