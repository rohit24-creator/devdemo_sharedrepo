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

// Validation schema for Regular Maintenance form
const regularMaintenanceSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle is required"),
  maintenanceType: z.string().min(1, "Maintenance type is required"),
  daysKm: z.string().min(1, "Days/KM is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.string().optional(),
  description: z.string().optional(),
  remarks: z.string().optional(),
  document: z.any().optional(),
});

export default function RegularMaintenancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);

  // Form instances
  const regularMaintenanceForm = useForm({
    resolver: zodResolver(regularMaintenanceSchema),
    defaultValues: {
      vehicleNumber: "",
      maintenanceType: "",
      daysKm: "",
      startDate: "",
      endDate: "",
      status: "",
      description: "",
      remarks: "",
      document: null,
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

  const [maintenanceTypeOptions, setMaintenanceTypeOptions] = useState([
    "Oil Change",
    "Tire Rotation",
    "Brake Service",
    "Engine Tune-up",
    "Transmission Service",
    "Air Filter Replacement",
    "Battery Replacement",
    "Coolant Flush"
  ]);

  const [daysKmOptions, setDaysKmOptions] = useState([
    "30 Days",
    "60 Days", 
    "90 Days",
    "5000 KM",
    "10000 KM",
    "15000 KM",
    "20000 KM",
    "25000 KM"
  ]);

  const [statusOptions, setStatusOptions] = useState([
    "Scheduled",
    "In Progress",
    "Completed",
    "Cancelled",
    "Overdue"
  ]);

  // Form submission handlers
  const handleRegularMaintenanceSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Regular Maintenance Data:", data);
      // Here you would typically make an API call to save the data
      alert("Regular Maintenance details saved successfully!");
      regularMaintenanceForm.reset();
    } catch (error) {
      console.error("Error saving regular maintenance:", error);
      alert("Error saving regular maintenance details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    regularMaintenanceForm.reset();
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      regularMaintenanceForm.reset();
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
    if (modalField && data && data.maintenanceType) {
      if (modalField === "maintenanceType") {
        setMaintenanceTypeOptions((prev) => [...prev, data.maintenanceType]);
      }
    }
    setModalOpen(false);
    setModalField(null);
  };

  // Form sections configuration
  const sections = [
    {
      title: "Regular Maintenance",
      form: regularMaintenanceForm,
      onSubmit: handleRegularMaintenanceSubmit,
      fields: [
        {
          name: "vehicleNumber",
          label: "Vehicle Number *",
          type: "select",
          options: vehicleOptions,
        },
        {
          name: "maintenanceType",
          label: "Maintenance Type *",
          type: "select",
          options: maintenanceTypeOptions,
          plusAction: handlePlus("maintenanceType"),
        },
        {
          name: "daysKm",
          label: "Days/KM *",
          type: "select",
          options: daysKmOptions,
        },
        {
          name: "startDate",
          label: "Start Date *",
          type: "date",
        },
        {
          name: "endDate",
          label: "End Date *",
          type: "date",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: statusOptions,
        },
        {
          name: "description",
          label: "Description",
          type: "text",
        },
        {
          name: "remarks",
          label: "Remarks",
          type: "text",
        },
        {
          name: "document",
          label: "Document",
          type: "file",
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
          disableAccordion={true}
        />
      </div>

      {/* Modal for adding new options */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Maintenance Type"
        formFields={[
          {
            name: "maintenanceType",
            label: "Maintenance Type *",
            type: "text"
          },
          {
            name: "description",
            label: "Description",
            type: "text"
          }
        ]}
        onSubmit={handleModalSubmit}
        footerType="default"
        submitLabel="Save"
        closeLabel="Close"
        dialogClassName="max-w-md p-0"
      />
    </div>
  );
}
