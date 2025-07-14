
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
import { Search, FileText, FileSearch } from "lucide-react";
import ReusableModal from "./bussinessParnterModal";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Add modal columns and data for company and branch (copied from profilesForm.js)
const companyModalColumns = ["Company Name", "Company Code", "Description"];
const branchModalColumns = ["Branch Name", "Branch Code", "companyCode", "Description"];
const customerIdModalColumns = [
  "Customer ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
];

const companyFindData = [
  { "Company Name": "THKN", "Company Code": "THKN", Description: "THKN" },
  { "Company Name": "TCS", "Company Code": "TCS01", Description: "Tata Consultancy Services" },
  { "Company Name": "Wipro", "Company Code": "WPR02", Description: "Wipro Ltd" },
];

const companyListData = [
  { "Company Name": "Infosys", "Company Code": "INFY", Description: "Infosys Ltd" },
  { "Company Name": "HCL", "Company Code": "HCL01", Description: "HCL Technologies" },
  { "Company Name": "IBM", "Company Code": "IBM02", Description: "IBM India" },
];

const companySearchData = [
  { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
  { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
  { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
];

const branchListData = [
  { "Branch Name": "Bangkok", "Branch Code": "THBKK", Description: "Bangkok Branch", companyCode: "THKN" },
  { "Branch Name": "Chennai", "Branch Code": "INCHN", Description: "Chennai Branch", companyCode: "TCS01" },
  { "Branch Name": "Pune", "Branch Code": "INPUN", Description: "Pune Branch", companyCode: "WPR02" },
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

// Dummy data for shipperId
const shipperIdData = [
  {
    "Shipper ID": "SHIP001",
    Name: "Acme Shipping",
    Street: "789 Ocean Ave",
    City: "Mumbai",
    Country: "India",
    Email: "acme@ship.com",
    "Company Code": "INFY",
    "Branch Code": "INPUN"
  },
  {
    "Shipper ID": "SHIP002",
    Name: "Global Freight",
    Street: "101 River Rd",
    City: "Bangkok",
    Country: "Thailand",
    Email: "global@freight.com",
    "Company Code": "THKN",
    "Branch Code": "THBKK"
  },
];

// Dummy data for consigneeId
const consigneeIdData = [
  {
    "Consignee ID": "CON001",
    Name: "Best Consignee",
    Street: "202 Main Plaza",
    City: "Chennai",
    Country: "India",
    Email: "best@consignee.com",
    "Company Code": "TCS01",
    "Branch Code": "INCHN"
  },
  {
    "Consignee ID": "CON002",
    Name: "Quick Delivery",
    Street: "303 Fast Lane",
    City: "Pune",
    Country: "India",
    Email: "quick@delivery.com",
    "Company Code": "WPR02",
    "Branch Code": "INPUN"
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
    setFilteredBranchData,
    setFilteredCustomerIdData,
    branchListData,
    customerIdData
  } = param;
  const { name, label, type = "text", disabled = false, options = [], wide = false, placeholder, unitOptions } = fieldConfig;

  // Select correct data for each ID field
  let idData = customerIdData;
  let idColumns = customerIdModalColumns;
  if (name === "shipperId") {
    idData = shipperIdData;
    idColumns = [
      "Shipper ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
    ];
  } else if (name === "consigneeId") {
    idData = consigneeIdData;
    idColumns = [
      "Consignee ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
    ];
  }

  return (
    <div key={name} className={wide ? "md:col-span-2" : "md:col-span-1"}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                {["companyCode", "branchCode"].includes(name) ? (
                  <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md bg-gray-100">
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      disabled
                      className="w-full px-3 py-2 pr-24 bg-gray-100 rounded-md focus:outline-none focus:border-[#0088d2]"
                    />
                    <div className="absolute right-2 flex items-center space-x-2">
                      {["find", "list", "search"].map((actionType) => (
                        <button
                          key={actionType}
                          type="button"
                          onClick={() => {
                            setModalField && setModalField({ name, sectionIndex, form });
                            setModalType && setModalType(actionType);
                            if (name === "branchCode") {
                              const selectedCompany = form.getValues("companyCode");
                              const filtered = branchListData.filter((b) => b.companyCode === selectedCompany);
                              setFilteredBranchData && setFilteredBranchData(filtered);
                            }
                          }}
                        >
                          {actionType === "find" ? (
                            <FileSearch size={18} className="text-[#0088d2]" />
                          ) : actionType === "list" ? (
                            <FileText size={18} className="text-[#0088d2]" />
                          ) : (
                            <Search size={18} className="text-[#0088d2]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : ["customerId", "shipperId", "consigneeId"].includes(name) ? (
                  <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md overflow-hidden">
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={e => {
                        field.onChange(e);
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
                          const id = typeof form.getValues === "function" ? form.getValues(name) : "";
                          const match = idData.filter((x) => x[idColumns[0]].trim().toLowerCase() === id.trim().toLowerCase());
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
                          setFilteredCustomerIdData && setFilteredCustomerIdData(idData);
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

export function OrdersForm({ sections = [], useAccordion = true }) {
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

  if (useAccordion) {
    const allSectionValues = sections.map(section => 
      section.title.toLowerCase().replace(/\s+/g, "-")
    );

    return (
      <>
        <Accordion type="multiple" defaultValue={allSectionValues}>
          {sections.map((section, index) => {
            const accordionValue = section.title.toLowerCase().replace(/\s+/g, "-");
            const isDisabled = section.disableAccordionToggle;
            
            return (
              <AccordionItem key={index} value={accordionValue}>
                <AccordionTrigger 
                  className={`text-white px-4 py-2 rounded-md mt-2 ${
                    isDisabled 
                      ? "bg-[#02abf5] cursor-default [&>svg]:hidden" 
                      : "bg-[#006397] data-[state=open]:bg-[#02abf5]"
                  }`}
                  onClick={isDisabled ? (e) => e.preventDefault() : undefined}
                >
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                  {/* FORM */}
                  <div className="pt-6">
                    {section.renderLayout
                      ? section.renderLayout({ renderField })
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
            );
          })}
        </Accordion>
        {/* Modal logic for companyCode, branchCode, customerId, shipperId, consigneeId */}
        {modalField && (
          <ReusableModal
            open={modalField !== null}
            onClose={() => {
              setModalField(null)
              setModalType(null)
            }}
            title={
              modalField.name === "companyCode"
                ? modalType === "list"
                  ? "List of Companies"
                  : modalType === "search"
                  ? "Search Company Details"
                  : "Select Company"
                : modalField.name === "branchCode"
                ? modalType === "list"
                  ? "List of Branches"
                  : modalType === "search"
                  ? "Search Branch Details"
                  : "Select Branch"
                : modalField.name === "customerId"
                ? modalType === "list"
                  ? "List of Customers"
                  : modalType === "search"
                  ? "Search Customer Details"
                  : "Select Customer"
                : modalField.name === "shipperId"
                ? modalType === "list"
                  ? "List of Shippers"
                  : modalType === "search"
                  ? "Search Shipper Details"
                  : "Select Shipper"
                : modalField.name === "consigneeId"
                ? modalType === "list"
                  ? "List of Consignees"
                  : modalType === "search"
                  ? "Search Consignee Details"
                  : "Select Consignee"
                : ""
            }
            columns={
              modalField.name === "companyCode"
                ? companyModalColumns
                : modalField.name === "branchCode"
                ? branchModalColumns
                : modalField.name === "customerId"
                ? customerIdModalColumns
                : modalField.name === "shipperId"
                ? [
                    "Shipper ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
                  ]
                : modalField.name === "consigneeId"
                ? [
                    "Consignee ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
                  ]
                : []
            }
            data={
              modalField.name === "companyCode"
                ? modalType === "list"
                  ? companyListData
                  : modalType === "search"
                  ? companySearchData
                  : companyFindData
                : modalField.name === "branchCode"
                ? branchListData.filter((b) => b.companyCode === (modalField.form?.getValues("companyCode") || ""))
                : modalField.name === "customerId"
                ? filteredCustomerIdData
                : modalField.name === "shipperId"
                ? filteredCustomerIdData
                : modalField.name === "consigneeId"
                ? filteredCustomerIdData
                : []
            }
            onSelect={(row) => {
              if (modalField.name === "companyCode") {
                modalField.form.setValue("companyCode", row["Company Code"]);
                modalField.form.setValue("branchCode", "");
              } else if (modalField.name === "branchCode") {
                modalField.form.setValue("branchCode", row["Branch Code"]);
              } else if (modalField.name === "customerId") {
                if (modalField.form) {
                  modalField.form.setValue("customerId", row["Customer ID"]);
                }
              } else if (modalField.name === "shipperId") {
                if (modalField.form) {
                  modalField.form.setValue("shipperId", row["Shipper ID"]);
                }
              } else if (modalField.name === "consigneeId") {
                if (modalField.form) {
                  modalField.form.setValue("consigneeId", row["Consignee ID"]);
                }
              }
              setModalField(null);
              setModalType(null);
            }}
          />
        )}
      </>
    );
  } else {
    // Render sections directly, no accordion
    return (
      <>
        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <div className="text-xl font-semibold mb-4 text-[#006397]">{section.title}</div>
            <div className="bg-[#ffffff] p-6 rounded-md shadow">
              {section.renderLayout
                ? section.renderLayout({ renderField })
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
          </div>
        ))}
        {/* Modal logic for companyCode, branchCode, customerId, shipperId, consigneeId */}
        {modalField && (
          <ReusableModal
            open={modalField !== null}
            onClose={() => {
              setModalField(null)
              setModalType(null)
            }}
            title={
              modalField.name === "companyCode"
                ? modalType === "list"
                  ? "List of Companies"
                  : modalType === "search"
                  ? "Search Company Details"
                  : "Select Company"
                : modalField.name === "branchCode"
                ? modalType === "list"
                  ? "List of Branches"
                  : modalType === "search"
                  ? "Search Branch Details"
                  : "Select Branch"
                : modalField.name === "customerId"
                ? modalType === "list"
                  ? "List of Customers"
                  : modalType === "search"
                  ? "Search Customer Details"
                  : "Select Customer"
                : modalField.name === "shipperId"
                ? modalType === "list"
                  ? "List of Shippers"
                  : modalType === "search"
                  ? "Search Shipper Details"
                  : "Select Shipper"
                : modalField.name === "consigneeId"
                ? modalType === "list"
                  ? "List of Consignees"
                  : modalType === "search"
                  ? "Search Consignee Details"
                  : "Select Consignee"
                : ""
            }
            columns={
              modalField.name === "companyCode"
                ? companyModalColumns
                : modalField.name === "branchCode"
                ? branchModalColumns
                : modalField.name === "customerId"
                ? customerIdModalColumns
                : modalField.name === "shipperId"
                ? [
                    "Shipper ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
                  ]
                : modalField.name === "consigneeId"
                ? [
                    "Consignee ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
                  ]
                : []
            }
            data={
              modalField.name === "companyCode"
                ? modalType === "list"
                  ? companyListData
                  : modalType === "search"
                  ? companySearchData
                  : companyFindData
                : modalField.name === "branchCode"
                ? branchListData.filter((b) => b.companyCode === (modalField.form?.getValues("companyCode") || ""))
                : modalField.name === "customerId"
                ? filteredCustomerIdData
                : modalField.name === "shipperId"
                ? filteredCustomerIdData
                : modalField.name === "consigneeId"
                ? filteredCustomerIdData
                : []
            }
            onSelect={(row) => {
              if (modalField.name === "companyCode") {
                modalField.form.setValue("companyCode", row["Company Code"]);
                modalField.form.setValue("branchCode", "");
              } else if (modalField.name === "branchCode") {
                modalField.form.setValue("branchCode", row["Branch Code"]);
              } else if (modalField.name === "customerId") {
                if (modalField.form) {
                  modalField.form.setValue("customerId", row["Customer ID"]);
                }
              } else if (modalField.name === "shipperId") {
                if (modalField.form) {
                  modalField.form.setValue("shipperId", row["Shipper ID"]);
                }
              } else if (modalField.name === "consigneeId") {
                if (modalField.form) {
                  modalField.form.setValue("consigneeId", row["Consignee ID"]);
                }
              }
              setModalField(null);
              setModalType(null);
            }}
          />
        )}
      </>
    );
  }
}
