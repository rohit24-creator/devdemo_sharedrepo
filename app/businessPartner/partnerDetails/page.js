"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileSearch, FileText, Search } from "lucide-react";
import { toast } from "sonner";

import PartnerDetailsForm from "../partner/page";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";
const addressSchema = z.object({
  name: z.string().min(1, "Name is required").regex(/^[a-zA-Z\s]+$/, "Only letters allowed"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z.string().min(10, "Phone must be at least 10 digits").regex(/^\d+$/, "Only digits allowed"),
  street: z.string().min(1, "Street is required").regex(/^[a-zA-Z0-9\s]+$/, "Only alphanumeric allowed"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(4, "Zip Code must be at least 4 digits").regex(/^\d+$/, "Only digits allowed"),
  street2: z.string().optional(),
  street3: z.string().optional(),
  houseNumber: z.string().optional(),
  building: z.string().optional(),
  divisionName: z.string().optional(),
  subDistrict: z.string().optional(),
  locality: z.string().min(1, "Locality is required"),
  province: z.string().min(1, "Province is required"),
  extension: z.string().optional(),
  latitude: z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid latitude").optional(),
  longitude: z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid longitude").optional(),
  mainHomepage: z.string().optional().refine(val => !val || /^https?:\/\/[^\s]+$/.test(val), {
    message: "Invalid URL"
  }),
  timeZoneCity: z.string().optional(),
  timeZoneCode: z.string().optional(),
  timeZoneName: z.string().optional(),
  vatRegistrationIdNumber: z.string().optional(),
  taxPayerId: z.string().optional(),
  contractNumber: z.string().optional(),
  contractDate: z.string().optional().refine(val => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Invalid date format (YYYY-MM-DD)"
  }),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub Category is required"),
  geoFenceRadius: z.string().regex(/^\d+$/, "Must be a number").transform((val) => parseInt(val, 10))
})


const referenceTypes = [
  { id: "type-a", label: "Type A" },
  { id: "type-b", label: "Type B" },
  { id: "type-c", label: "Type C" },
];

const referenceSchema = z.object({
  referenceType: z.string().min(1, "Reference Type is required"),
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
  description: z.string().optional(),
  gstin: z.string().optional(),
});

const addressFields = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
  { name: "street", label: "Street" },
  { name: "country", label: "Country" },
  { name: "zipCode", label: "Zip Code" },
  { name: "street2", label: "Street 2" },
  { name: "street3", label: "Street 3" },
  { name: "houseNumber", label: "House Number" },
  { name: "building", label: "Building" },
  { name: "divisionName", label: "Division Name" },
  { name: "subDistrict", label: "Sub District" },
  { name: "locality", label: "Locality (City)" },
  { name: "province", label: "Province" },
  { name: "extension", label: "Extension" },
  { name: "latitude", label: "Latitude" },
  { name: "longitude", label: "Longitude" },
  { name: "mainHomepage", label: "Main Homepage" },
  { name: "timeZoneCity", label: "Time Zone City" },
  { name: "timeZoneCode", label: "Time Zone Code" },
  { name: "timeZoneName", label: "Time Zone Name" },
  { name: "vatRegistrationIdNumber", label: "Vat Registration Id Number" },
  { name: "taxPayerId", label: "Tax Payer ID" },
  { name: "contractNumber", label: "Contract Number" },
  {
    name: "contractDate",
    label: "Contract Date",
    type: "date"
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { label: "Transport", value: "Transport" },
      { label: "Warehouse", value: "Warehouse" },
      { label: "Retail", value: "Retail" }
    ]
  },
  {
    name: "subCategory",
    label: "Sub Category",
    type: "select",
    options: [
      { label: "Air", value: "Air" },
      { label: "Sea", value: "Sea" },
      { label: "Road", value: "Road" }
    ]
  },
  {
    name: "geoFenceRadius",
    label: "Geo Fence Radius (meters)",
    type: "number"
  }
]



export default function PartnerDetailsForms() {
  const [rows, setRows] = useState([]);
    const [date, setDate] = useState();

   const refForm = useForm({
    resolver: zodResolver(referenceSchema),
    defaultValues: {
      referenceType: "",
      name: "",
      value: "",
      description: "",
      gstin: "",
    },
  });


  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      country: "",
      zipCode: "",
      street2: "",
      street3: "",
      houseNumber: "",
      building: "",
      divisionName: "",
      subDistrict: "",
      locality: "",
      province: "",
      extension: "",
      latitude: "",
      longitude: "",
      mainHomepage: "",
      timeZoneCity: "",
      timeZoneCode: "",
      timeZoneName: "",
      vatRegistrationIdNumber: "",
      taxPayerId: "",
      contractNumber: "",
      contractDate: "",
      category: "",
      subCategory: "",
      geoFenceRadius: ""
    }
  })

  const handleSubmit = (data) => {
    console.log("Submitted Address:", data)
  }
const addressSection = {
  type: "form",
  title: "Address",
  form,
  fields: addressFields,
  onSubmit: handleSubmit,
  children: (
    <Button
      type="submit"
      className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
    >
      Save Address
    </Button>
  ),
};
  
  const onValid = (values) => {
    setRows((prev) => [...prev, values]);
    toast.success("Reference added successfully");
    refForm.reset();
  };

  const onInvalid = (errors) => {
    if (errors.referenceType) toast.error("Please fill in Reference Type");
    else if (errors.name) toast.error("Please fill in Name");
    else if (errors.value) toast.error("Please fill in Value");
  };

  const fields = [
    { name: "referenceType", label: "Reference Type *", type: "select" },
    { name: "name", label: "Name *", type: "text" },
    { name: "value", label: "Value *", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "gstin", label: "GSTIN", type: "text" },
  ];

  return (

    <div className="p-4 sm:p-6">
      <PartnerDetailsForm />
          {/* Address Accordion */}

<ReusableForm sections={[addressSection]} />


      {/* Add Reference Accordion */}
      <Accordion type="single" collapsible className="mt-2">
        <AccordionItem value="addReference">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Add Reference
          </AccordionTrigger>
          <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
            <Form {...refForm}>
              <form onSubmit={refForm.handleSubmit(onValid, onInvalid)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {fields.map((fieldDef) => (
                    <FormField
                      key={fieldDef.name}
                      control={refForm.control}
                      name={fieldDef.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{fieldDef.label}</FormLabel>
                          <FormControl>
                            {fieldDef.type === "select" ? (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  {referenceTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.label}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input className="border-2 border-[#E7ECFD]"
                                {...field}
                                placeholder={
                                  fieldDef.name === "name"
                                    ? refForm.watch("referenceType") || "Enter name"
                                    : fieldDef.label.replace(" *", "")
                                }
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  
                </div>

                <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
                  Add Reference
                </Button>
              </form>
            </Form>
                  {rows.length > 0 && (
        <Card className="mt-6 border-[#E7ECFD] shadow-none">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-16"></TableHead>
                  {fields.map((field) => (
                    <TableHead key={field.name}>{field.label.replace(" *", "")}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell></TableCell>
                    {fields.map((field) => (
                      <TableCell key={field.name}>{row[field.name]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  );
}