"use client";

import { useState } from "react";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { useForm } from "react-hook-form";

export default function TripDetailsFormPage() {
  const form = useForm({
    defaultValues: {
      pickupLocation: "",
      pickupTime: "",
      dropOffLocation: "",
      dropTime: "",
      customInstructions: ""
    }
  });

  const sections = [
    {
      title: "Trip Details",
      type: "form",
      form,
      fields: [
        {
          name: "pickupLocation",
          label: "Pickup location *",
          type: "text",
        //   placeholder: "Origin place"
        },
        {
          name: "pickupTime",
          label: "Pickup time *",
          type: "date",
          placeholder: "Pickup time"
        },
        {
          name: "dropOffLocation",
          label: "Drop-off location *",
          type: "text",
        //   placeholder: "Delivery place"
        },
        {
          name: "dropTime",
          label: "Drop time *",
          type: "date",
          placeholder: "Drop time"
        },
        {
          name: "customInstructions",
          label: "Custom instructions",
          type: "textarea",
        //   wide: true,
        //   placeholder: "Enter custom instructions..."
        }
      ]
    }
  ];

  return (
    <div className="p-4">
      <OrdersForm sections={sections} useAccordion={true} />
    </div>
  );
}
