"use client";

import { useState } from "react";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { useForm } from "react-hook-form";
import FormModal from "@/components/ui/reusableComponent/formmodal";

export default function ContainerFormPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState({
    loadType: ["Type 1", "Type 2"],
    loadStatus: ["Status 1", "Status 2"],
    containerType: ["Type A", "Type B"]
  });

  const form = useForm({
    defaultValues: {
      loadType: "",
      loadStatus: "",
      referenceNumber: "",
      customerName: "",
      containerNumber: "",
      containerType: "",
      weight: "",
      cargoDescription: ""
    }
  });

  // Open modal for a specific field
  const handlePlus = (field) => () => {
    setModalField(field);
    setModalOpen(true);
  };

  // Handle modal submit
  const handleModalSubmit = (data) => {
    if (modalField && data && data.name) {
      setDropdownOptions((prev) => ({
        ...prev,
        [modalField]: [...(prev[modalField] || []), data.name]
      }));
    }
    setModalOpen(false);
    setModalField(null);
  };

  const sections = [
    {
      title: "Primary Details",
      type: "form",
      form,
      fields: [
        {
          name: "loadType",
          label: "Load type *",
          type: "select",
          options: dropdownOptions.loadType,
          plusAction: handlePlus("loadType")
        },
        {
          name: "loadStatus",
          label: "Load status",
          type: "select",
          options: dropdownOptions.loadStatus,
          plusAction: handlePlus("loadStatus")
        },
        {
          name: "referenceNumber",
          label: "Reference number",
          type: "text"
        },
        {
          name: "customerName",
          label: "Customer name *",
          type: "select",
          options: ["Customer 1", "Customer 2"]
        },
        {
          name: "containerNumber",
          label: "Container number *",
          type: "text"
        },
        {
          name: "containerType",
          label: "Container type",
          type: "select",
          options: dropdownOptions.containerType,
          plusAction: handlePlus("containerType")
        },
        {
          name: "weight",
          label: "Weight *",
          type: "text"
        },
        {
          name: "cargoDescription",
          label: "Cargo description",
          type: "textarea"
        }
      ]
    }
  ];

  // Modal form fields (can be dynamic per field)
  const modalFormFields = [
    {
      name: "name",
      label: "Enter Name *",
      type: "text"
    }
  ];

  return (
    <div className="p-4">
      <OrdersForm sections={sections} useAccordion={true} />
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalField ? (modalField === "loadType" ? "Load Type" : modalField === "loadStatus" ? "Load Status" : modalField === "containerType" ? "Container Type" : "") : ""}
        formFields={modalFormFields}
        onSubmit={handleModalSubmit}
        footerType="submitOnly"
        submitLabel="Submit"
        dialogClassName="max-w-md p-0"
      />
    </div>
  );
}
