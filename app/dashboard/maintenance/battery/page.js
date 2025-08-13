"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/dashboardform";
import FormModal from "@/components/ui/reusableComponent/formmodal";

// Schema for validation
const vehicleBatterySchema = z.object({
  vehicle: z.string().min(1, "Vehicle is required"),
  batteryName: z.string().min(1, "Battery name is required"),
  batteryNumber: z.string().min(1, "Battery number is required"),
  batterySize: z.string().optional(),
  amount: z.string().optional(),
  batteryBrand: z.string().min(1, "Battery brand is required"),
  vendor: z.string().min(1, "Vendor is required"),
  batteryQuantity: z.string().optional(),
  purchasedDate: z.string().optional(),
  warrantyFrom: z.string().optional(),
  warrantyTo: z.string().optional(),
  warrantyInformation: z.string().optional(),
  batteryDocument: z.any().optional(),
});

export default function AddVehicleBatteryPage() {
  const [modalField, setModalField] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [vehicleOptions, setVehicleOptions] = useState(["BHC 246", "586 5GX", "DMC 4583", "TRK 789", "FLE 456"]);
  const [batteryBrandOptions, setBatteryBrandOptions] = useState(["Amaron", "Exide", "Luminous", "Livguard"]);
  const [vendorOptions, setVendorOptions] = useState(["ABC Battery Suppliers", "PowerCell Corp", "GreenVolt Traders"]);

  const batteryForm = useForm({
    resolver: zodResolver(vehicleBatterySchema),
    defaultValues: {
      vehicle: "",
      batteryName: "",
      batteryNumber: "",
      batterySize: "",
      amount: "",
      batteryBrand: "",
      vendor: "",
      batteryQuantity: "",
      purchasedDate: "",
      warrantyFrom: "",
      warrantyTo: "",
      warrantyInformation: "",
      batteryDocument: null,
    },
  });

  const handleBatterySubmit = async (data) => {
    console.log("Battery Data:", data);
    alert("Battery saved successfully!");
    batteryForm.reset();
  };

  const handlePlus = (field) => () => {
    setModalField(field);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (!data?.name) return;

    switch (modalField) {
      case "vehicle":
        setVehicleOptions((prev) => [...prev, data.name]);
        break;
      case "batteryBrand":
        setBatteryBrandOptions((prev) => [...prev, data.name]);
        break;
      case "vendor":
        setVendorOptions((prev) => [...prev, data.name]);
        break;
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
      plusAction: handlePlus("vehicle")
    },
    { name: "batteryName", label: "Battery Name *", type: "text" },
    { name: "batteryNumber", label: "Battery Number *", type: "text" },
    { name: "batterySize", label: "Battery Size", type: "text" },
    { name: "amount", label: "Amount", type: "text" },
    { 
      name: "batteryBrand", 
      label: "Choose Battery Brand *", 
      type: "select", 
      options: batteryBrandOptions,
      plusAction: handlePlus("batteryBrand")
    },
    { 
      name: "vendor", 
      label: "Choose Vendor *", 
      type: "select", 
      options: vendorOptions,
      plusAction: handlePlus("vendor")
    },
    { name: "batteryQuantity", label: "Battery Quantity", type: "text" },
    { name: "purchasedDate", label: "Purchased Date", type: "date" },
    { name: "warrantyFrom", label: "Warranty From", type: "date" },
    { name: "warrantyTo", label: "Warranty To", type: "date" },
    { name: "warrantyInformation", label: "Warranty Information", type: "textarea" },
    { name: "batteryDocument", label: "Battery Document", type: "file" },
  ];

  const sections = [
    {
      title: "Vehicle Battery",
      form: batteryForm,
      fields: fieldConfig,
      onSubmit: handleBatterySubmit,
      disableAccordionToggle: true
    }
  ];

  return (
    <div className="p-6">
      <BillingForm sections={sections} />
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalField === "vehicle"
            ? "Add New Vehicle"
            : modalField === "batteryBrand"
            ? "Add New Battery Brand"
            : modalField === "vendor"
            ? "Add Vendor"
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
          ]
            : [
                {
                  name: "name",
                  label:
                    modalField === "vehicle"
                      ? "Enter Vehicle Number *"
                      : modalField === "batteryBrand"
                      ? "Enter Battery Brand *"
                      : "Enter Name *",
                  type: "text",
                },
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
