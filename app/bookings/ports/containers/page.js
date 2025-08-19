"use client";

import { useState } from "react";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/ui/reusableComponent/formmodal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod validation schema
const containerFormSchema = z.object({
  // Primary Details
  loadType: z.string().min(1, "Load type is required"),
  loadStatus: z.string().optional(),
  referenceNumber: z.string().optional()
    .refine((val) => !val || /^[A-Z0-9]{6,12}$/.test(val), "Reference number must be 6-12 alphanumeric characters"),
  customerName: z.string().min(1, "Customer name is required"),
  containerNumber: z.string().min(1, "Container number is required")
    .regex(/^[A-Z]{4}\d{7}$/, "Container number must be in format: 4 letters + 7 digits (e.g., ABCD1234567)"),
  containerType: z.string().optional(),
  weight: z.string().min(1, "Weight is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num <= 30000; // Max weight 30 tons
  }, "Weight must be a positive number between 0 and 30,000 kg"),
  cargoDescription: z.string().optional()
    .refine((val) => !val || val.length <= 500, "Cargo description must be 500 characters or less"),
  
  // Trip Details
  pickupLocation: z.string().min(1, "Pickup location is required"),
  pickupTime: z.string().min(1, "Pickup time is required").refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Pickup time must be a valid date"),
  dropOffLocation: z.string().min(1, "Drop-off location is required"),
  dropTime: z.string().min(1, "Drop time is required").refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Drop time must be a valid date"),
  customInstructions: z.string().optional()
    .refine((val) => !val || val.length <= 300, "Custom instructions must be 300 characters or less"),
  
  // Appointment Details
  scheduleTime: z.string().optional().refine((val) => {
    if (!val) return true; // Optional field
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Schedule time must be a valid date"),
  confirmNumber: z.string().optional()
    .refine((val) => !val || /^[A-Z0-9]{8,15}$/.test(val), "Confirm number must be 8-15 alphanumeric characters"),
  appointmentType: z.string().min(1, "Appointment type is required"),
  portTerminal: z.string().min(1, "Port terminal is required"),
  appointmentStatus: z.string().min(1, "Appointment status is required"),
  
  // Billing Details
  billingType: z.string().min(1, "Billing type is required"),
  billingStatus: z.string().min(1, "Billing status is required")
});

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
    resolver: zodResolver(containerFormSchema),
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
    try {
      // Validate modal data
      const validatedData = modalFormSchema.parse(data);
      
      if (modalField && validatedData && validatedData.name) {
        setDropdownOptions((prev) => ({
          ...prev,
          [modalField]: [...(prev[modalField] || []), validatedData.name]
        }));
      }
      setModalOpen(false);
      setModalField(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Modal validation errors:", error.errors);
        alert("Please check the input. " + error.errors[0].message);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    
    // Validate file types and sizes
    const validFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    
    const validFiles = selectedFiles.filter(file => {
      if (!validFileTypes.includes(file.type)) {
        alert(`File ${file.name} has an invalid type. Only PDF, JPEG, PNG, DOC, and DOCX files are allowed.`);
        return false;
      }
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum file size is 5MB.`);
        return false;
      }
      return true;
    });
    
    setFiles(validFiles);
  };

  const handleSubmit = (data) => {
    console.log("Form Submitted", data);
    alert("Container details saved successfully!");
    form.reset();
  };

  const onSubmit = async (data) => {
    try {
      // Additional business logic validation
      if (data.pickupTime && data.dropTime) {
        const pickupDate = new Date(data.pickupTime);
        const dropDate = new Date(data.dropTime);
        if (dropDate <= pickupDate) {
          form.setError("dropTime", {
            type: "manual",
            message: "Drop time must be after pickup time"
          });
          return;
        }
      }

      // Validate the data against the schema
      const validatedData = containerFormSchema.parse(data);
      console.log("Validated Form Data:", validatedData);
      
      // Additional business logic checks
      if (validatedData.weight && parseFloat(validatedData.weight) > 25000) {
        alert("Warning: Weight exceeds 25 tons. Please verify the weight value.");
      }
      
      // Check if container number already exists (simulate API call)
      if (validatedData.containerNumber) {
        // This would typically be an API call to check for duplicates
        console.log("Checking container number uniqueness...");
      }
      
      alert("Container details saved successfully!");
      form.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
        // Display validation errors to user
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
        alert("Please fix the following validation errors:\n\n" + errorMessages);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Helper function to check if form is valid
  const isFormValid = () => {
    return form.formState.isValid;
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
    onSubmit: onSubmit,
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
    onSubmit: onSubmit,
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

  // Modal validation schema
  const modalFormSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters").max(50, "Name must be 50 characters or less")
  });

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
