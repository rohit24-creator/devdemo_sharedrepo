"use client"

import React, { useState } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { FileSearch, FileText, Search } from "lucide-react"
import ReusableModal from "./bussinessParnterModal"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox";

const companyModalColumns = ["Company Name", "Company Code", "Description"]
const branchModalColumns = ["Branch Name", "Branch Code", "companyCode", "Description"]
const customerIdModalColumns = [
  "Customer ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"
];

const companyFindData = [
  { "Company Name": "THKN", "Company Code": "THKN", Description: "THKN" },
  { "Company Name": "TCS", "Company Code": "TCS01", Description: "Tata Consultancy Services" },
  { "Company Name": "Wipro", "Company Code": "WPR02", Description: "Wipro Ltd" },
]

const companyListData = [
  { "Company Name": "Infosys", "Company Code": "INFY", Description: "Infosys Ltd" },
  { "Company Name": "HCL", "Company Code": "HCL01", Description: "HCL Technologies" },
  { "Company Name": "IBM", "Company Code": "IBM02", Description: "IBM India" },
]

const companySearchData = [
  { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
  { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
  { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
]

const branchListData = [
  { "Branch Name": "Bangkok", "Branch Code": "THBKK", Description: "Bangkok Branch", companyCode: "THKN" },
  { "Branch Name": "Chennai", "Branch Code": "INCHN", Description: "Chennai Branch", companyCode: "TCS01" },
  { "Branch Name": "Pune", "Branch Code": "INPUN", Description: "Pune Branch", companyCode: "WPR02" },
]

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

export function ReusableForm({ sections = [], tableAccordion = true }) {
  const [modalField, setModalField] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [filteredBranchData, setFilteredBranchData] = useState([])
  const [filteredCustomerIdData, setFilteredCustomerIdData] = useState([]);

  const renderFieldWithModals = (fieldConfig, form, sectionIndex) => {
    const { name, label, type = "text", disabled = false, options = [], wide = false, placeholder, unitOptions } = fieldConfig

    return (
      <div key={name} className={wide ? "md:col-span-2" : "md:col-span-1"}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                {["companyCode", "branchCode"].includes(name) ? (
                  <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md bg-gray-100">
                    <Input
                      {...field}
                      disabled
                      className="w-full px-3 py-2 pr-24 bg-gray-100 rounded-md focus:outline-none focus:border-[#0088d2]"
                    />
                    <div className="absolute right-2 flex items-center space-x-2">
                      {["find", "list", "search"].map((actionType) => (
                        <button
                          key={actionType}
                          type="button"
                          onClick={() => {
                            setModalField({ name, sectionIndex });
                            setModalType(actionType);
                            if (name === "branchCode") {
                              const selectedCompany = form.getValues("companyCode");
                              const filtered = branchListData.filter((b) => b.companyCode === selectedCompany);
                              setFilteredBranchData(filtered);
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
                ) : name === "customerId" ? (
                  <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md overflow-hidden">
                    <Input
                      {...field}
                      className="w-full px-3 py-2 bg-white rounded-md border-none focus:outline-none focus:ring-0 focus:border-none"
                    />
                    <div className="absolute right-0 h-full bg-gray-100 flex items-center px-2 space-x-2">
                      <button
                        title="Search"
                        type="button"
                        onClick={() => {
                          setModalField({ name, sectionIndex });
                          setModalType("search");
                          const id = form.getValues("customerId");
                          const match = customerIdData.filter((x) => x["Customer ID"] === id);
                          setFilteredCustomerIdData(match.length > 0 ? match : []);
                        }}
                      >
                        <Search size={18} className="text-[#0088d2]" />
                      </button>
                      <button
                        title="List"
                        type="button"
                        onClick={() => {
                          setModalField({ name, sectionIndex });
                          setModalType("list");
                          setFilteredCustomerIdData(customerIdData);
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
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ) : (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
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
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ) : (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
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
          )}
        />
      </div>
    )
  }

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
          {section.type === "form" && (
            <div className="pt-6">
            <Form {...section.form}>
              <form
                onSubmit={section.form.handleSubmit(section.onSubmit, section.onInvalid)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {section.fields.map((fieldConfig) =>
                    renderFieldWithModals(fieldConfig, section.form, index)
                  )}
                </div>
                {section.children}
              </form>                

              {/* Custom table inside the form (if renderOutsideForm is false) */}
              {section.customTable &&
                !section.customTable.renderOutsideForm &&
                section.customTable.entries.length > 0 &&
                renderCustomTable(section.customTable)}
            </Form>
            </div>
          )}

          {/* non-form custom-tables */}
          {section.type === "custom-table" && section.schema &&
            renderCustomTable(section)}

          {/* Standard table inside accordion */}
          {section.type === "table" && renderTable(section)}
        </AccordionContent>
      </AccordionItem>
    ) : (
      // Table rendered outside accordion
      section.type === "table" && (
        <div key={index} className="mt-4">
          {renderTable(section)}
        </div>
      )
    );
  })}
</Accordion>

{/* Custom tables rendered outside the accordion/form */}
{sections
  .filter(
    (section) =>
      section.type === "form" &&
      section.customTable &&
      section.customTable.renderOutsideForm &&
      section.customTable.entries.length > 0
  )
  .map((section, index) => (
    <div key={`custom-table-${index}`} className="mt-4">
      {renderCustomTable(section.customTable)}
    </div>
  ))}


      {/* Reusable Modal */}
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
              : ""
          }
          columns={
            modalField.name === "companyCode"
              ? companyModalColumns
              : modalField.name === "branchCode"
              ? branchModalColumns
              : customerIdModalColumns
          }
          data={
            modalField.name === "companyCode"
              ? modalType === "list"
                ? companyListData
                : modalType === "search"
                ? companySearchData
                : companyFindData
              : modalField.name === "branchCode"
              ? filteredBranchData
              : filteredCustomerIdData
          }
          onSelect={(row) => {
            const section = sections[modalField.sectionIndex];
            if (modalField.name === "companyCode") {
              section.form.setValue("companyCode", row["Company Code"]);
              section.form.setValue("branchCode", "");
            } else if (modalField.name === "branchCode") {
              section.form.setValue("branchCode", row["Branch Code"]);
            } else if (modalField.name === "customerId") {
              section.form.setValue("customerId", row["Customer ID"]);
            }
            setModalField(null);
            setModalType(null);
          }}
        />
      )}
    </>
  )

  function renderTable(section) {
    return (
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                {section.columns.map((col) => (
                  <TableHead key={col.accessorKey} className="text-[#006397] text-left text-sm font-semibold">
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(section.rows.length > 0 ? section.rows : [{}]).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="w-12 align-top pt-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-xl px-2 py-0">
                          ☰
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right">
                        <DropdownMenuItem>
                          ➕ Add Profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  {section.columns.map((col) => (
                    <TableCell key={col.accessorKey} className="text-sm">
                      {row[col.accessorKey] ?? ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}
function renderCustomTable(section) {
  return (
    <Card className="mt-6">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-[#162d56] text-sm font-semibold px-3 py-2">
                <Checkbox className="border-[#003366] data-[state=checked]:bg-[#006397] data-[state=checked]:border-[#006397]" />
              </TableHead>
              <TableHead className="w-16 px-3 py-2" />
              {Object.keys(section.schema.shape).map((field) => (
                <TableHead
                  key={field}
                  className="text-[#162d56] text-sm font-semibold px-3 py-2"
                >
                  {field}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {section.entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="px-3 py-2">
                  <Checkbox className="border-[#003366] data-[state=checked]:bg-[#006397] data-[state=checked]:border-[#006397]" />
                </TableCell>
                <TableCell className="px-3 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <span className="text-xl">☰</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => section.onEdit(entry, index)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => section.onDelete(entry)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                {Object.keys(section.schema.shape).map((key) => (
                  <TableCell key={key} className="text-sm px-3 py-2">
                    {key === "xsdFile" ? entry[key]?.name || "" : entry[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
