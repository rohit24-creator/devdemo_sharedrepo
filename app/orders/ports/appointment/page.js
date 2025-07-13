"use client";

import { useState } from "react";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { useForm } from "react-hook-form";
import FormModal from "@/components/ui/reusableComponent/formmodal";

export default function AppointmentFormPage() {
  // State for dropdown options
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState({
    appointmentType: ["Gate In", "Gate Out"],
    portTerminal: ["Terminal 1", "Terminal 2"],
    appointmentStatus: ["Scheduled", "Completed", "Cancelled"]
  });

  // Form instance
  const form = useForm({
    defaultValues: {
      scheduleTime: "",
      confirmNumber: "",
      appointmentType: "",
      portTerminal: "",
      appointmentStatus: ""
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

  // Appointment Details section config
  const sections = [
    {
      title: "Appointment Details",
      type: "form",
      form,
      fields: [
        {
          name: "scheduleTime",
          label: "Schedule time",
          type: "text",
          placeholder: "Enter schedule time"
        },
        {
          name: "confirmNumber",
          label: "Confirm number",
          type: "text",
          placeholder: "Enter confirm number"
        },
        {
          name: "appointmentType",
          label: "Appointment type *",
          type: "select",
          options: dropdownOptions.appointmentType,
          plusAction: handlePlus("appointmentType")
        },
        {
          name: "portTerminal",
          label: "Port terminal *",
          type: "select",
          options: dropdownOptions.portTerminal,
          plusAction: handlePlus("portTerminal")
        },
        {
          name: "appointmentStatus",
          label: "Appointment status *",
          type: "select",
          options: dropdownOptions.appointmentStatus,
          plusAction: handlePlus("appointmentStatus")
        }
      ]
    }
  ];

  // Modal form fields (for adding new dropdown options)
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
        title={modalField ?
          modalField === "appointmentType" ? "Appointment Type" :
          modalField === "portTerminal" ? "Port Terminal" :
          modalField === "appointmentStatus" ? "Appointment Status" :
          ""
          : ""
        }
        formFields={modalFormFields}
        onSubmit={handleModalSubmit}
        footerType="submitOnly"
        submitLabel="Submit"
        dialogClassName="max-w-md p-0"
      />
    </div>
  );
}
