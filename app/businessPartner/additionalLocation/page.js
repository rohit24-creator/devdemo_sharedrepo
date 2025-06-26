"use client";

import React, { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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

// 🧾 Field configuration array
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

// ✅ Validation schema using Zod
const formSchema = z.object({
  name: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  zipCode: z.string().min(1),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email().optional(),
});

export default function AdditionalLocationForm() {
  const [locations, setLocations] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (data) => {
    setLocations((prev) => [...prev, data]);
    form.reset();
  };

  return (
    <div className="p-6 space-y-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Additional Location
          </AccordionTrigger>

          <AccordionContent>
            <div className="bg-[#ffffff] p-6 rounded-b-md">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-4 gap-4">
                    {locationFields.map(({ name, label, type }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input  className="border-2 border-[#E7ECFD]" type={type} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  <Button
                    type="submit"
                    className="bg-[#006397] hover:bg-[#00517a] text-white rounded-lg"
                  >
                    Add Additional Location
                  </Button>
                </form>
              </Form>
            </div>

            {/* Table */}
            {locations.length > 0 && (
              <Card className="mt-6">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead className="w-16"></TableHead>
                        {locationFields.map((field) => (
                          <TableHead key={field.name}>{field.label}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {locations.map((loc, index) => (
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
                                <DropdownMenuItem
                                  onClick={() => form.reset(loc)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    const updated = [...locations];
                                    updated.splice(index, 1);
                                    setLocations(updated);
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          {locationFields.map((field) => (
                            <TableCell key={field.name}>
                              {loc[field.name]}
                            </TableCell>
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