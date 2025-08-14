"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm} from "@/components/ui/reusableComponent/customerViewReusable/masterform";
import { Info } from "lucide-react";

// Validation schema for Customer Address form
const customerAddressSchema = z.object({
  cid: z.string().min(1, "CID Number is required"),
  customerName: z.string().min(1, "Customer Name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phone: z.string().min(1, "Phone Number is required"),
  houseNumber: z.string().min(1, "House Number is required"),
  street: z.string().min(1, "Street is required"),
  country: z.string().min(1, "Country is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  zipcode: z.string().min(1, "Pincode is required"),
});

export default function CustomerAddressBookPage() {
  // Form instances
  const customerAddressForm = useForm({
    resolver: zodResolver(customerAddressSchema),
    defaultValues: {
      cid: "",
      customerName: "",
      email: "",
      phone: "",
      houseNumber: "",
      street: "",
      country: "",
      province: "",
      city: "",
      zipcode: "",
    },
  });

  // Mock data for dropdowns
  const [countryOptions] = useState([
    "India",
    "Thailand",
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "Canada",
    "Brazil"
  ]);

  const [provinceOptions] = useState([
    "Maharashtra",
    "Tamil Nadu",
    "West Bengal",
    "Andhra Pradesh",
    "Gujarat",
    "Karnataka",
    "Uttar Pradesh",
    "Delhi",
    "Telangana",
    "Kerala"
  ]);

  const [cityOptions] = useState([
    "Mumbai",
    "Chennai",
    "Kolkata",
    "Visakhapatnam",
    "Kandla",
    "Navi Mumbai",
    "Mundra",
    "Pipavav",
    "Bangalore",
    "Hyderabad"
  ]);

  // Form submission handlers
  const handleCustomerAddressSubmit = async (data) => {
    try {
      console.log("Customer Address Data:", data);
      // Here you would typically make an API call to save the data
      alert("Customer Address details saved successfully!");
      customerAddressForm.reset();
    } catch (error) {
      console.error("Error saving customer address:", error);
      alert("Error saving customer address details");
    }
  };

  const fieldConfig = [
    {
      name: "cid",
      label: "CID*",
      type: "text",
      placeholder: "CID Number"
    },
    {
      name: "customerName",
      label: "Customer Name*",
      type: "text",
      placeholder: "Customer Name"
    },
    {
      name: "email",
      label: "Email*",
      type: "text",
      placeholder: "Email"
    },
    {
      name: "phone",
      label: "Phone*",
      type: "text",
      placeholder: "Phone Number"
    },
    {
      name: "houseNumber",
      label: "House Number*",
      type: "text",
      placeholder: "House Number"
    },
    {
      name: "street",
      label: "Street*",
      type: "text",
      placeholder: "Street"
    },
    {
      name: "country",
      label: "Country*",
      type: "select",
      options: countryOptions,
      placeholder: "Country"
    },
    {
      name: "province",
      label: "Province*",
      type: "select",
      options: provinceOptions,
      placeholder: "Province"
    },
    {
      name: "city",
      label: "City*",
      type: "select",
      options: cityOptions,
      placeholder: "City"
    },
    {
      name: "zipcode",
      label: "Zipcode / Pincode*",
      type: "text",
      placeholder: "Pincode"
    }
  ];

  const sections = [
    {
      type: "form",
      title: "ADDRESSES",
      form: customerAddressForm,
      fields: fieldConfig,
      onSubmit: handleCustomerAddressSubmit,
      disableAccordionToggle: true
    }
  ];

  return (
    <div className="p-6">
      <BillingForm
        sections={sections}
        useAccordion={true}
      />
    </div>
  );
}
