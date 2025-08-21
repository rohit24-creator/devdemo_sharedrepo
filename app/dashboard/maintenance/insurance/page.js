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

// Validation schema for Vehicle Insurance form
const vehicleInsuranceSchema = z.object({
  vehicleId: z.string().min(1, "Vehicle is required"),
  insuranceCompany: z.string().min(1, "Insurance company is required"),
  insuranceCompanyContact: z.string().optional(),
  insuranceCompanyAddress: z.string().optional(),
  insuranceType: z.string().min(1, "Insurance type is required"),
  agent: z.string().min(1, "Agent is required"),
  policyNumber: z.string().min(1, "Policy number is required"),
  insurerName: z.string().min(1, "Insurer name is required"),
  insurerAddress: z.string().optional(),
  insuranceAmount: z.string().min(1, "Insurance amount is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z.string().optional(),
});

export default function VehicleInsurancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);

  // Form instances
  const vehicleInsuranceForm = useForm({
    resolver: zodResolver(vehicleInsuranceSchema),
    defaultValues: {
      vehicleId: "",
      insuranceCompany: "",
      insuranceCompanyContact: "",
      insuranceCompanyAddress: "",
      insuranceType: "",
      agent: "",
      policyNumber: "",
      insurerName: "",
      insurerAddress: "",
      insuranceAmount: "",
      startDate: "",
      endDate: "",
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

  const [insuranceTypeOptions, setInsuranceTypeOptions] = useState([
    "Comprehensive Insurance",
    "Third Party Insurance",
    "Liability Insurance",
    "Collision Insurance",
    "Theft Insurance",
    "Natural Disaster Insurance"
  ]);

  const [agentOptions, setAgentOptions] = useState([
    "John Smith",
    "Sarah Johnson",
    "Mike Wilson",
    "Lisa Davis",
    "David Brown",
    "Emma Wilson"
  ]);

  // Form submission handlers
  const handleVehicleInsuranceSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Vehicle Insurance Data:", data);
      // Here you would typically make an API call to save the data
      alert("Vehicle Insurance details saved successfully!");
      vehicleInsuranceForm.reset();
    } catch (error) {
      console.error("Error saving vehicle insurance:", error);
      alert("Error saving vehicle insurance details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    vehicleInsuranceForm.reset();
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      vehicleInsuranceForm.reset();
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
    if (modalField && data) {
      if (modalField === "vehicleId") {
        setVehicleOptions((prev) => [...prev, data.name]);
      } else if (modalField === "insuranceType") {
        if (data.financeCompanyName) {
          setInsuranceTypeOptions((prev) => [...prev, data.financeCompanyName]);
        }
      } else if (modalField === "agent") {
        if (data.name) {
          setAgentOptions((prev) => [...prev, data.name]);
        }
      }
    }
    setModalOpen(false);
    setModalField(null);
  };

  const fieldConfig = [
    {
      name: "vehicleId",
      label: "Choose Vehicle *",
      type: "select",
      options: vehicleOptions
    },
    {
      name: "insuranceCompany",
      label: "Insurance Company *",
      type: "text"
    },
    {
      name: "insuranceCompanyContact",
      label: "Insurance Company Contact",
      type: "text"
    },
    {
      name: "insuranceCompanyAddress",
      label: "Insurance Company Address",
      type: "text"
    },
    {
      name: "insuranceType",
      label: "Choose Insurance Type *",
      type: "select",
      options: insuranceTypeOptions,
      plusAction: handlePlus("insuranceType")
    },
    {
      name: "agent",
      label: "Choose Agent *",
      type: "select",
      options: agentOptions,
      plusAction: handlePlus("agent")
    },
    {
      name: "policyNumber",
      label: "Policy Number *",
      type: "text"
    },
    {
      name: "insurerName",
      label: "Insurer Name *",
      type: "text"
    },
    {
      name: "insurerAddress",
      label: "Insurer Address",
      type: "text"
    },
    {
      name: "insuranceAmount",
      label: "Insurance Amount *",
      type: "text"
    },
    {
      name: "startDate",
      label: "Start Date *",
      type: "date"
    },
    {
      name: "endDate",
      label: "End Date *",
      type: "date"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      wide: true
    }
  ];

  const sections = [
    {
      type: "form",
      title: "Vehicle Insurance",
      form: vehicleInsuranceForm,
      fields: fieldConfig,
      onSubmit: handleVehicleInsuranceSubmit,
      disableAccordionToggle: true,
    }
  ];

  return (
    <div className="">
      <div className="p-6">
                    <BillingForm
          sections={sections}
          disableAccordion={true}
        />
      </div>

      {/* Modal for adding new options */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalField ? 
          modalField === "vehicleId" ? "Add New Vehicle" : 
          modalField === "insuranceType" ? "Add Insurance Type" : 
          modalField === "agent" ? "Add Insurance Agent" : 
          ""
          : ""
        }
        formFields={
          modalField === "insuranceType" ? [
            {
              name: "financeCompanyName",
              label: "Finance Company Name *",
              type: "text",
              labelClassName: "whitespace-nowrap text-xs font-medium",
              className: "col-span-1"
            },
            {
              name: "description",
              label: "Description *",
              type: "text",
              labelClassName: "whitespace-nowrap text-xs font-medium",
              className: "col-span-1"
            }
          ] : modalField === "agent" ? [
            {
              name: "userName",
              label: "User Name *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "password",
              label: "Password *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "name",
              label: "Name *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "email",
              label: "Email *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "phone",
              label: "Phone",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "country",
              label: "Country *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "state",
              label: "State",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "city",
              label: "City *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "divisionName",
              label: "Division Name",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "street",
              label: "Street *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "zipCode",
              label: "Zip Code *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "street2",
              label: "Street 2",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "street3",
              label: "Street 3",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "houseNumber",
              label: "House Number",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "building",
              label: "Building",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "latitude",
              label: "Latitude *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            },
            {
              name: "longitude",
              label: "Longitude *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            }
          ] : [
            {
              name: "name",
              label: modalField === "vehicleId" ? "Enter Vehicle Name *" : "Enter Name *",
              type: "text",
              labelClassName: "whitespace-nowrap text-sm font-medium"
            }
          ]
        }
        onSubmit={handleModalSubmit}
        footerType={modalField === "insuranceType" || modalField === "agent" ? "default" : "submitOnly"}
        submitLabel="Save"
        closeLabel="Cancel"
        dialogClassName={modalField === "agent" ? "lg:max-w-[60rem] p-0" : modalField === "insuranceType" ? "lg:max-w-[40rem] p-0" : "max-w-md p-0"}
      />
    </div>
  );
}