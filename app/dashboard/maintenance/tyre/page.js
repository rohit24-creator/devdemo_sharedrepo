"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/dashboardForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, RotateCcw, X, Save, Plus } from "lucide-react";
import FormModal from "@/components/ui/reusableComponent/formmodal";

// Validation schema for Vehicle Tyre form
const vehicleTyreSchema = z.object({
  vehicle: z.string().min(1, "Vehicle is required"),
  tyreNumber: z.string().min(1, "Tyre number is required"),
  tyreSize: z.string().optional(),
  nsd: z.string().optional(),
  amount: z.string().optional(),
  tyreCategory: z.string().min(1, "Tyre category is required"),
  tyreCompany: z.string().min(1, "Tyre company is required"),
  tyreType: z.string().min(1, "Tyre type is required"),
  tyrePattern: z.string().min(1, "Tyre pattern is required"),
  vendor: z.string().min(1, "Vendor is required"),
  quantity: z.string().min(1, "Quantity is required"),
  purchasedDate: z.string().optional(),
  warrantyFrom: z.string().optional(),
  warrantyTo: z.string().optional(),
  warrantyInformation: z.string().optional(),
  tyreDocument: z.any().optional(),
});

export default function AddVehicleTyrePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);

  // Form instances
  const vehicleTyreForm = useForm({
    resolver: zodResolver(vehicleTyreSchema),
    defaultValues: {
      vehicle: "",
      tyreNumber: "",
      tyreSize: "",
      nsd: "",
      amount: "",
      tyreCategory: "",
      tyreCompany: "",
      tyreType: "",
      tyrePattern: "",
      vendor: "",
      quantity: "",
      purchasedDate: "",
      warrantyFrom: "",
      warrantyTo: "",
      warrantyInformation: "",
      tyreDocument: null,
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

  const [tyreCategoryOptions, setTyreCategoryOptions] = useState([
    "All Season",
    "Summer",
    "Winter",
    "Performance",
    "Touring",
    "Off-Road",
    "Mud Terrain",
    "Highway"
  ]);

  const [tyreCompanyOptions, setTyreCompanyOptions] = useState([
    "Michelin",
    "Bridgestone",
    "Goodyear",
    "Continental",
    "Pirelli",
    "Dunlop",
    "Yokohama",
    "Hankook"
  ]);

  const [tyreTypeOptions, setTyreTypeOptions] = useState([
    "Radial",
    "Bias",
    "Tubeless",
    "Tubed",
    "Run Flat",
    "All Terrain",
    "Mud Terrain"
  ]);

  const [tyrePatternOptions, setTyrePatternOptions] = useState([
    "Symmetrical",
    "Asymmetrical",
    "Directional",
    "All Season",
    "Performance",
    "Touring",
    "Off-Road"
  ]);

  const [vendorOptions, setVendorOptions] = useState([
    "ABC Tyre Suppliers",
    "XYZ Auto Parts",
    "Premium Tyre Co",
    "Quality Tyre Ltd",
    "Reliable Tyre Solutions",
    "Best Tyre Dealers",
    "Top Tyre Services",
    "Global Tyre Corp"
  ]);

  // Form submission handlers
  const handleVehicleTyreSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Vehicle Tyre Data:", data);
      // Here you would typically make an API call to save the data
      alert("Vehicle Tyre details saved successfully!");
      vehicleTyreForm.reset();
    } catch (error) {
      console.error("Error saving vehicle tyre:", error);
      alert("Error saving vehicle tyre details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    vehicleTyreForm.reset();
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      vehicleTyreForm.reset();
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
      if (modalField === "vehicle") {
        setVehicleOptions((prev) => [...prev, data.name]);
      } else if (modalField === "tyreCategory") {
        setTyreCategoryOptions((prev) => [...prev, data.name]);
      } else if (modalField === "tyreCompany") {
        setTyreCompanyOptions((prev) => [...prev, data.name]);
      } else if (modalField === "tyreType") {
        setTyreTypeOptions((prev) => [...prev, data.name]);
      } else if (modalField === "tyrePattern") {
        setTyrePatternOptions((prev) => [...prev, data.name]);
      } else if (modalField === "vendor") {
        setVendorOptions((prev) => [...prev, data.name]);
      }
    }
    setModalOpen(false);
    setModalField(null);
  };

  const fieldConfig = [
    {
      name: "vehicle",
      label: "Choose Vehicle *",
      type: "select",
      options: vehicleOptions,
    },
    {
      name: "tyreNumber",
      label: "Tyre Number *",
      type: "text"
    },
    {
      name: "tyreSize",
      label: "Tyre Size",
      type: "text"
    },
    {
      name: "nsd",
      label: "NSD",
      type: "text"
    },
    {
      name: "amount",
      label: "Amount",
      type: "text"
    },
    {
      name: "tyreCategory",
      label: "Choose Tyre Category *",
      type: "select",
      options: tyreCategoryOptions,
      plusAction: handlePlus("tyreCategory")
    },
    {
      name: "tyreCompany",
      label: "Choose Tyre Company *",
      type: "select",
      options: tyreCompanyOptions,
      plusAction: handlePlus("tyreCompany")
    },
    {
      name: "tyreType",
      label: "Choose Tyre Type *",
      type: "select",
      options: tyreTypeOptions,
      plusAction: handlePlus("tyreType")
    },
    {
      name: "tyrePattern",
      label: "Choose Tyre Pattern *",
      type: "select",
      options: tyrePatternOptions,
      plusAction: handlePlus("tyrePattern")
    },
    {
      name: "vendor",
      label: "Choose Vendor *",
      type: "select",
      options: vendorOptions,
      plusAction: handlePlus("vendor")
    },
    {
      name: "quantity",
      label: "Quantity *",
      type: "text"
    },
    {
      name: "purchasedDate",
      label: "Purchased Date",
      type: "date"
    },
    {
      name: "warrantyFrom",
      label: "Warranty From",
      type: "date"
    },
    {
      name: "warrantyTo",
      label: "Warranty To",
      type: "date"
    },
    {
      name: "warrantyInformation",
      label: "Warranty Information",
      type: "textarea",
      wide: true
    },
    {
      name: "tyreDocument",
      label: "Tyre Document",
      type: "file"
    }
  ];

  const sections = [
    {
      title: "Vehicle Tyre",
      form: vehicleTyreForm,
      fields: fieldConfig,
      onSubmit: handleVehicleTyreSubmit,
      disableAccordionToggle: true
    }
  ];

  return (
    <div className="">

      <div className="p-6">
        {/* Form Content */}
                <BillingForm
          sections={sections}
        />
      </div>

      {/* Modal for adding new options */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalField ? 
          modalField === "tyreCategory" ? "Add New Tyre Category" :
          modalField === "tyreCompany" ? "Add New Tyre Company" :
          modalField === "tyreType" ? "Add New Tyre Type" :
          modalField === "tyrePattern" ? "Add New Tyre Pattern" :
          modalField === "vendor" ? "Add Vendor" :
          ""
          : ""
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
          ] : [
            {
              name: "name",
              label: modalField === "vehicle" ? "Enter Vehicle Number *" : 
                     modalField === "tyreCategory" ? "Enter Tyre Category *" :
                     modalField === "tyreCompany" ? "Enter Tyre Company *" :
                     modalField === "tyreType" ? "Enter Tyre Type *" :
                     modalField === "tyrePattern" ? "Enter Tyre Pattern *" :
                     "Enter Name *",
              type: "text"
            }
          ]
        }
        onSubmit={handleModalSubmit}
        footerType="submitOnly"
        submitLabel="Save"
        dialogClassName={modalField === "vendor" ? "lg:max-w-[60rem] p-0" : "max-w-md p-0"}
      />
    </div>
  );
}
