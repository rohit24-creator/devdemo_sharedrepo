// OrdersForm: A reusable order form component supporting both accordion and non-accordion layouts.
// Usage:
// <OrdersForm sections={sections} useAccordion={true} /> // Accordion (default)
// <OrdersForm sections={sections} useAccordion={false} /> // Vertical stack

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search, FileText } from "lucide-react";
import ReusableModal from "./bussinessParnterModal";

const customerIdModalColumns = [
  "Customer ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
];

const customerIdData = [
  {
    "Customer ID": "CUST001",
    Name: "John Doe",
    Street: "123 Main St",
    City: "Bangkok",
    Country: "Thailand",
    Email: "john@example.com",
    "Company Code": "THKN",
    "Branch Code": "THBKK"
  },
  {
    "Customer ID": "CUST002",
    Name: "Jane Smith",
    Street: "456 Second Ave",
    City: "Chennai",
    Country: "India",
    Email: "jane@example.com",
    "Company Code": "TCS01",
    "Branch Code": "INCHN"
  },
];

export function renderOrderFieldWithModals(
  fieldConfig,
  form,
  sectionIndex,
  param = {}
) {
  const {
    setModalField,
    setModalType,
    setFilteredCustomerIdData,
    customerIdData
  } = param;
  const { name, label, type = "text", disabled = false, options = [], wide = false, placeholder, unitOptions } = fieldConfig;

  return (
    <div key={name} className={wide ? "md:col-span-2" : "md:col-span-1"}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          console.log("FormField value for", name, ":", field.value);
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                {name === "customerId" ? (
                  <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md overflow-hidden">
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={e => {
                        field.onChange(e);
                        console.log("Input changed to:", e.target.value);
                      }}
                      className="w-full px-3 py-2 bg-white rounded-md border-none focus:outline-none focus:ring-0 focus:border-none"
                    />
                    <div className="absolute right-0 h-full bg-gray-100 flex items-center px-2 space-x-2">
                      <button
                        title="Search"
                        type="button"
                        onClick={() => {
                          setModalField && setModalField({ name, sectionIndex, form });
                          setModalType && setModalType("search");
                          const id = typeof form.getValues === "function" ? form.getValues("customerId") : "";
                          console.log("Input value:", id);
                          console.log("customerIdData:", customerIdData);
                          const match = customerIdData.filter((x) => x["Customer ID"].trim().toLowerCase() === id.trim().toLowerCase());
                          console.log("Match result:", match);
                          setFilteredCustomerIdData && setFilteredCustomerIdData(match.length > 0 ? match : []);
                        }}
                      >
                        <Search size={18} className="text-[#0088d2]" />
                      </button>
                      <button
                        title="List"
                        type="button"
                        onClick={() => {
                          setModalField && setModalField({ name, sectionIndex, form });
                          setModalType && setModalType("list");
                          setFilteredCustomerIdData && setFilteredCustomerIdData(customerIdData);
                        }}
                      >
                        <FileText size={18} className="text-[#0088d2]" />
                      </button>
                    </div>
                  </div>
                ) : type === "select" ? (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border-2 border-[#E7ECFD] bg-white w-full">
                      <SelectValue placeholder={`Select ${label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) =>
                        typeof option === "string" ? (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ) : (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                ) : type === "date" ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-2 border-[#E7ECFD] focus:border-[#0088d2]",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(new Date(field.value), "yyyy-MM-dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : type === "file" ? (
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className="border border-[#0088d2] px-2 py-1 rounded file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:mr-2"
                  />
                ) : unitOptions ? (
                  <div className="flex gap-2 items-center">
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      disabled={disabled}
                      placeholder={placeholder || label}
                      type={type}
                      className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]"
                    />
                    <Select>
                      <SelectTrigger className="w-36 border-2 border-[#E7ECFD]">
                        <SelectValue
                          placeholder={
                            typeof unitOptions[0] === "string"
                              ? unitOptions[0]
                              : unitOptions[0]?.label || "Select Unit"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {unitOptions.map((option) =>
                          typeof option === "string" ? (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ) : (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                ) : type === "textarea" ? (
                  <textarea
                    {...field}
                    rows={2}
                    className="w-full border-2 border-[#E7ECFD] rounded-md p-2"
                  />
                ) : type === "checkbox" ? (
                  <div className="flex items-end h-full pb-1">
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-semibold m-0">
                        {placeholder || label}
                      </FormLabel>
                    </FormItem>
                  </div>
                ) : type === "radio" ? (
                  <div className="mt-4 flex gap-6 items-center">
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-6"
                    >
                      {options.map((option) =>
                        typeof option === "string" ? (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${name}-${option}`} />
                            <label htmlFor={`${name}-${option}`} className="text-sm">
                              {option}
                            </label>
                          </div>
                        ) : (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                            <label htmlFor={`${name}-${option.value}`} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                  </div>
                ) : (
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD] ${
                      disabled ? "bg-gray-100" : ""
                    }`}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  )
}

export function OrdersForm({ sections = [], tableAccordion = true }) {
  const [modalField, setModalField] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [filteredCustomerIdData, setFilteredCustomerIdData] = useState([])

  // Helper to render a field with all modal state/data
  const renderField = (fieldConfig, form, sectionIndex) =>
    renderOrderFieldWithModals(
      fieldConfig,
      form,
      sectionIndex,
      {
        setModalField,
        setModalType,
        setFilteredCustomerIdData,
        customerIdData
      }
    );

  return (
    <>
<Accordion type="multiple">
  {sections.map((section, index) => {
    const accordionValue = section.title.toLowerCase().replace(/\s+/g, "-");
    const shouldRenderAccordion = section.type === "form" || tableAccordion;

    return shouldRenderAccordion ? (
      <AccordionItem key={index} value={accordionValue}>
        <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
          {section.title}
        </AccordionTrigger>
        <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
          {/* FORM */}
          <div className="pt-6">
            {section.renderLayout
              ? section.renderLayout({ renderField: (field, secIdx = index) => renderField(field, section.form, secIdx) })
              : (
                <Form {...section.form}>
                  <form
                    onSubmit={section.form.handleSubmit && section.form.handleSubmit(section.onSubmit, section.onInvalid)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {section.fields.map((fieldConfig) =>
                        renderField(fieldConfig, section.form, index)
                      )}
                    </div>
                    {section.children}
                  </form>
                </Form>
              )}
          </div>
        </AccordionContent>
      </AccordionItem>
    ) : null;
  })}
</Accordion>

      {/* Customer ID Modal */}
      {modalField && (
        <ReusableModal
          open={modalField !== null}
          onClose={() => {
            setModalField(null)
            setModalType(null)
          }}
          title={modalType === "list"
            ? "List of Customers"
            : modalType === "search"
            ? "Search Customer Details"
            : "Select Customer"
          }
          columns={customerIdModalColumns}
          data={filteredCustomerIdData}
          onSelect={(row) => {
            if (modalField.form) {
              modalField.form.setValue("customerId", row["Customer ID"]);
            }
            setModalField(null);
            setModalType(null);
          }}
        />
      )}
    </>
  )
}
