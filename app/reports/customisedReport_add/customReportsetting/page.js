"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema for validation
const formSchema = z.object({
  reportName: z.string().min(1, "Report Name is required"),
});

export default function StatusForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportName: "",
    },
  });

  function onSubmit(values) {
    console.log("Form Submitted:", values);
  }

  return (
    <div className="w-full p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion type="single" collapsible defaultValue="status">
            <AccordionItem value="status">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-t-md font-semibold">
                Status
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-6 mt-4">
                  {/* Report Name */}
                  <FormField
                    control={form.control}
                    name="reportName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Report Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Report Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Company Code */}
                  <div>
                    <Label>Company Code *</Label>
                    <Input value="SXUSA" disabled />
                  </div>

                  {/* Branch Code */}
                  <div>
                    <Label>Branch Code *</Label>
                    <Input value="SXUSAWD" disabled />
                  </div>

                  {/* All other fields */}
                  {[
                    { label: "Order ID", number: "1", value: "Yes" },
                    { label: "Delivery Order No.", number: "2", value: "Yes" },
                    { label: "Purchase Order No.", number: "3", value: "Yes" },
                    { label: "Order Creation Date And Time", number: "4", value: "No" },
                    { label: "Order Pickup Date And Time", number: "5", value: "No" },
                    { label: "Order Delivery Date And Time", number: "6", value: "No" },
                    { label: "Shipper ID", number: "7", value: "No" },
                    { label: "Shipper CID", number: "8", value: "No" },
                    { label: "Shipper ACON Debitor Code", number: "9", value: "No" },
                    { label: "Shipper KN Login Account", number: "10", value: "No" },
                    { label: "Shipper VAT Registration Number", number: "11", value: "No" },
                    { label: "Shipper Tax Payer ID", number: "12", value: "No" },
                    { label: "Shipper Name", number: "13", value: "Yes" },
                    { label: "Shipper Street and House Number", number: "14", value: "Yes" },
                    { label: "Shipper City", number: "15", value: "Yes" },
                    { label: "Shipper Postal Code", number: "16", value: "Yes" },
                    { label: "Shipper Country Name", number: "17", value: "No" },
                    { label: "Shipper Phone", number: "18", value: "No" },
                    { label: "Shipper Email", number: "19", value: "No" },
                    { label: "Consignee ID", number: "20", value: "No" },
                    { label: "Consignee CID", number: "21", value: "No" },
                    { label: "Consignee ACON Debitor Code", number: "22", value: "No" },
                    { label: "Consignee KN Login Account", number: "23", value: "No" },
                    { label: "Consignee VAT Registration Number", number: "24", value: "No" },
                  ].map((f, idx) => (
                    <Field key={idx} label={f.label} number={f.number} defaultValue={f.value} />
                  ))}
                </div>

                <div className="mt-6">
                  <Button type="submit">Save</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
}

// Field component for Yes/No rows
function Field({ label, number, defaultValue }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input value={number} className="w-16" readOnly />
        <Select defaultValue={defaultValue}>
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
