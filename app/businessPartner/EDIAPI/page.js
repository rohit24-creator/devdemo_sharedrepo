"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useState } from "react";

const dropdownFields = {
  transactionAction: ["Shipment", "Return"],
  incoTerms: ["CIP", "FOB"],
  triggeredAt: ["Order Booked", "Dispatched"],
  retrigger: ["Updated", "Not Updated"],
  orderType: ["Urgent", "Normal"],
  orderStatus: ["ACTIVE", "INACTIVE"],
  product: ["AsiaDirect", "EuroExpress"],
  service: ["FTL Oil&Gas", "LTL Pharma"],
  modeOfTransport: ["FCL-FCL", "Air"],
  type: ["EDI", "API"]
};

const formSchema = z.object({
  transactionAction: z.string().min(1),
  incoTerms: z.string().min(1),
  triggeredAt: z.string().min(1),
  retrigger: z.string().min(1),
  orderType: z.string().min(1),
  orderStatus: z.string().min(1),
  product: z.string().min(1),
  service: z.string().min(1),
  modeOfTransport: z.string().min(1),
  type: z.string().min(1),
  pickUp: z.string(),
  destination: z.string(),
  commodity: z.string(),
  userName: z.string(),
  password: z.string(),
  ediUrl: z.string(),
  xsdFile: z.any().optional(),
});

export default function EditAccordionForm() {
  const [entries, setEntries] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionAction: "",
      incoTerms: "",
      triggeredAt: "",
      retrigger: "",
      orderType: "",
      orderStatus: "",
      product: "",
      service: "",
      modeOfTransport: "",
      type: "",
      pickUp: "",
      destination: "",
      commodity: "",
      userName: "",
      password: "",
      ediUrl: "",
      xsdFile: undefined,
    },
  });

  const onSubmit = (data) => {
    setEntries([...entries, data]);
    form.reset();
  };

  const renderInputField = (name, label) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className="border-2 border-[#E7ECFD]" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderDropdownField = (name, label) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#162d56] mb-1 block font-semibold">{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full border-2 border-[#E7ECFD]">
                <SelectValue placeholder={Select} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {dropdownFields[name].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="p-6 space-y-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            EDI-API
          </AccordionTrigger>
          <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
            {/* <Card className="mt-4"> */}
              <div className="pt-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      {renderDropdownField("transactionAction", "Transaction Action")}
                      {renderDropdownField("incoTerms", "Inco Terms")}
                      {renderDropdownField("triggeredAt", "Triggered At")}
                      {renderDropdownField("retrigger", "Retrigger")}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {renderDropdownField("orderType", "Order Type")}
                      {renderDropdownField("orderStatus", "Order Status")}
                      {renderDropdownField("product", "Product")}
                      {renderDropdownField("service", "Service")}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {renderDropdownField("modeOfTransport", "Mode Of Transport")}
                      {renderInputField("pickUp", "Pick Up")}
                      {renderInputField("destination", "Destination")}
                      {renderInputField("commodity", "Commodity")}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {renderDropdownField("type", "Type")}
                      {renderInputField("userName", "User Name")}
                      {renderInputField("password", "Password")}
                      {renderInputField("ediUrl", "EDI URL")}
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-end">
                      <FormField
                        control={form.control}
                        name="xsdFile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#162d56] mb-1 block font-semibold">Upload XSD File</FormLabel>
                            <FormControl>
                              <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-[#006397] hover:bg-[#00517a] text-white rounded-lg"
                    >
                      Add EDI/API
                    </Button>
                  </form>
                </Form>
              </div>
            {/* </Card> */}
          </AccordionContent>

          {entries.length > 0 && (
            <Card className="mt-6">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-[#162d56] mb-1 block font-semibold">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="w-16"></TableHead>
                      {Object.keys(formSchema.shape).map((field) => (
                        <TableHead key={field}>{field}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <span className="text-xl">☰</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => form.reset(entry)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  const updated = [...entries];
                                  updated.splice(index, 1);
                                  setEntries(updated);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        {Object.keys(formSchema.shape).map((key) => (
                          <TableCell key={key}>{
                            key === "xsdFile"
                              ? entry[key]?.name || ""
                              : entry[key]
                          }</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

