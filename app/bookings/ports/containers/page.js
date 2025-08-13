"use client";

import { useState } from "react";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/ui/reusableComponent/formmodal";

export default function ContainerFormPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState({
    loadType: ["Type 1", "Type 2"],
    loadStatus: ["Status 1", "Status 2"],
    containerType: ["Type A", "Type B"],
    appointmentType: ["Gate In", "Gate Out"],
    portTerminal: ["Terminal 1", "Terminal 2"],
    appointmentStatus: ["Scheduled", "Completed", "Cancelled"],
    billingType: ["Prepaid", "Collect"],
    billingStatus: ["Pending", "Paid"]
  });
  const [files, setFiles] = useState([]);
  
  const form = useForm({
    defaultValues: {
      // Primary Details
      loadType: "",
      loadStatus: "",
      referenceNumber: "",
      customerName: "",
      containerNumber: "",
      containerType: "",
      weight: "",
      cargoDescription: "",
      // Trip Details
      pickupLocation: "",
      pickupTime: "",
      dropOffLocation: "",
      dropTime: "",
      customInstructions: "",
      // Appointment Details
      scheduleTime: "",
      confirmNumber: "",
      appointmentType: "",
      portTerminal: "",
      appointmentStatus: "",
      // Billing Details
      billingType: "",
      billingStatus: ""
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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);
  };

  const handleSubmit = (data) => {
    console.log("Form Submitted", data);
    alert("Container details saved successfully!");
    form.reset();
  };

  const primaryDetailsFields = [
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
  ];

  const tripDetailsFields = [
    {
      name: "pickupLocation",
      label: "Pickup location *",
      type: "text"
    },
    {
      name: "pickupTime",
      label: "Pickup time *",
      type: "date"
    },
    {
      name: "dropOffLocation",
      label: "Drop-off location *",
      type: "text"
    },
    {
      name: "dropTime",
      label: "Drop time *",
      type: "date"
    },
    {
      name: "customInstructions",
      label: "Custom instructions",
      type: "textarea"
    }
  ];

  const appointmentDetailsFields = [
    {
      name: "scheduleTime",
      label: "Schedule time",
      type: "text"
    },
    {
      name: "confirmNumber",
      label: "Confirm number",
      type: "text"
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
  ];

  const billingDetailsFields = [
    {
      name: "billingType",
      label: "Billing type *",
      type: "select",
      options: dropdownOptions.billingType,
      plusAction: handlePlus("billingType")
    },
    {
      name: "billingStatus",
      label: "Billing status *",
      type: "select",
      options: dropdownOptions.billingStatus,
      plusAction: handlePlus("billingStatus")
    },
    {
      name: "supportingDocuments",
      label: "Upload Documents",
      type: "file"
    }
  ];

  const primaryDetailsSection = {
    type: "form",
    title: "Primary Details",
    form,
    fields: primaryDetailsFields,
    onSubmit: handleSubmit,
    // children: (
    //   <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
    //     Save Primary Details
    //   </Button>
    // )
  };

  const tripDetailsSection = {
    type: "form",
    title: "Trip Details",
    form,
    fields: tripDetailsFields,
    onSubmit: handleSubmit,
    // children: (
    //   <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
    //     Save Trip Details
    //   </Button>
    // )
  };

  const appointmentDetailsSection = {
    type: "form",
    title: "Appointment Details",
    form,
    fields: appointmentDetailsFields,
    onSubmit: handleSubmit,
    // children: (
    //   <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
    //     Save Appointment Details
    //   </Button>
    // )
  };

  const billingDetailsSection = {
    type: "form",
    title: "Billing Details",
    form,
    fields: billingDetailsFields,
    onSubmit: handleSubmit,
    // children: (
    //   <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
    //     Save Billing Details
    //   </Button>
    // )
  };

  // Modal form fields (for adding new dropdown options)
  const modalFormFields = [
    {
      name: "name",
      label: "Enter Name *",
      type: "text"
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      <OrdersForm sections={[primaryDetailsSection, tripDetailsSection, appointmentDetailsSection, billingDetailsSection]} useAccordion={true} />
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalField ? 
          modalField === "loadType" ? "Load Type" : 
          modalField === "loadStatus" ? "Load Status" : 
          modalField === "containerType" ? "Container Type" :
          modalField === "appointmentType" ? "Appointment Type" :
          modalField === "portTerminal" ? "Port Terminal" :
          modalField === "appointmentStatus" ? "Appointment Status" :
          modalField === "billingType" ? "Billing Type" :
          modalField === "billingStatus" ? "Billing Status" :
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
