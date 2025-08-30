"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";
import { formatRowsWithId } from "@/lib/utils";

const locationFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "street", label: "Street", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "zipCode", label: "Zip Code", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "fax", label: "Fax", type: "text" },
  { name: "email", label: "Email", type: "email" },
];

const locationFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "Zip Code is required"),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
});

export default function AdditionalLocationForm() {
  const form = useForm({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phone: "",
      fax: "",
      email: "",
    },
  });

  const [entries, setEntries] = useState([]);

  const onSubmit = (data) => {
    setEntries((prev) => formatRowsWithId([...prev, data]));
    form.reset();
  };

  const sections = [
    {
      type: "form",
      title: "Additional Location",
      form,
      fields: locationFields,
      disableAccordionToggle: true,
      onSubmit,
      children: (
        <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
          Add Additional Location
        </Button>
      ),
      customTable: {
        schema: locationFormSchema,
        entries,
        onEdit: (entry, index) => form.reset(entry),
        onDelete: (row) => {
          const updated = entries.filter((r) => r.id !== row.id);
          setEntries(updated);
        },
        renderOutsideForm: true,
      },
    },
  ];

  return (
    <ReusableForm sections={sections} />
  );
}