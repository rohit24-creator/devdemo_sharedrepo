"use client"

import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
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
import ReusableModal from "./bussinessPartnerModal"
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

// Data for different profile types
const profileData = {
  customer: [
    {
      name: "Alice Brown",
      email: "alice@example.com",
      mobile: "+91-111-222-333",
      street: "111 Oak Street",
      pincode: "110001"
    },
    {
      name: "Bob Wilson",
      email: "bob@example.com",
      mobile: "+91-444-555-666",
      street: "222 Pine Avenue",
      pincode: "560001"
    },
    {
      name: "Carol Davis",
      email: "carol@example.com",
      mobile: "+91-777-888-999",
      street: "333 Maple Road",
      pincode: "500001"
    },
    {
      name: "David Miller",
      email: "david@example.com",
      mobile: "+91-000-111-222",
      street: "444 Cedar Lane",
      pincode: "700001"
    },
    {
      name: "Emma Taylor",
      email: "emma@example.com",
      mobile: "+91-333-444-555",
      street: "555 Elm Court",
      pincode: "380001"
    },
  ],
  vendor: [
    {
      name: "Acme Supplies",
      mobile: "+91-111-222-333",
      address: "123 Business Park",
      pincode: "110001"
    },
    {
      name: "Global Vendors",
      mobile: "+91-444-555-666",
      address: "456 Industrial Area",
      pincode: "560001"
    },
    {
      name: "Premium Suppliers",
      mobile: "+91-777-888-999",
      address: "789 Commercial Street",
      pincode: "500001"
    },
    {
      name: "Elite Partners",
      mobile: "+91-000-111-222",
      address: "101 Corporate Plaza",
      pincode: "700001"
    },
    {
      name: "Top Tier Services",
      mobile: "+91-333-444-555",
      address: "555 Enterprise Road",
      pincode: "380001"
    },
  ],
  vehicle: [
    {
      vehicleType: "Truck",
      description: "Heavy duty transport truck",
      icon: "truck.png"
    },
    {
      vehicleType: "Van",
      description: "Delivery van for small packages",
      icon: "van.png"
    },
    {
      vehicleType: "Car",
      description: "Passenger car for light transport",
      icon: "car.png"
    },
    {
      vehicleType: "Motorcycle",
      description: "Two-wheeler for quick delivery",
      icon: "motorcycle.png"
    },
    {
      vehicleType: "Bicycle",
      description: "Eco-friendly delivery option",
      icon: "bicycle.png"
    },
  ]
};

export function renderFieldWithModals(
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
              {[
                "companyCode",
                "branchCode"
              ].includes(name) ? (
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
                ) : name === "customerId" ? (
                  <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md overflow-hidden">
                    <Input
                      {...field}
                    value={field.value ?? ""}
                      className="w-full px-3 py-2 bg-white rounded-md border-none focus:outline-none focus:ring-0 focus:border-none"
                    />
                    <div className="absolute right-0 h-full bg-gray-100 flex items-center px-2 space-x-2">
                      <button
                        title="Search"
                        type="button"
                        onClick={() => {
                        setModalField && setModalField({ name, sectionIndex, form });
                        setModalType && setModalType("search");
                          const id = form.getValues("customerId");
                          const match = customerIdData.filter((x) => x["Customer ID"] === id);
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
          )}
        />
      </div>
    )
  }

export function ReusableForm({ sections = [], tableAccordion = true }) {
  const [modalField, setModalField] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [filteredBranchData, setFilteredBranchData] = useState([])
  const [filteredCustomerIdData, setFilteredCustomerIdData] = useState([])

  // Helper to render a field with all modal state/data
  const renderField = (fieldConfig, form, sectionIndex) =>
    renderFieldWithModals(
      fieldConfig,
      form,
      sectionIndex,
      {
        setModalField,
        setModalType,
        setFilteredBranchData,
        setFilteredCustomerIdData,
        branchListData,
        customerIdData
      }
    );

  // Get all section values for default open state
  const allSectionValues = sections.map(section => 
    section.title.toLowerCase().replace(/\s+/g, "-")
  );

  return (
    <>
<Accordion type="multiple" defaultValue={allSectionValues}>
  {sections.map((section, index) => {
    const accordionValue = section.title.toLowerCase().replace(/\s+/g, "-");
    const shouldRenderAccordion = section.type === "form" || tableAccordion;
    const isDisabled = section.disableAccordionToggle;

    return shouldRenderAccordion ? (
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

          {section.type === "form" && (
            <div className="pt-6">
            <Form {...section.form}>
              <form
                  onSubmit={section.form.handleSubmit && section.form.handleSubmit(section.onSubmit, section.onInvalid)}
                className="space-y-4"
              >
                  {section.renderLayout
                    ? section.renderLayout({ renderField: (field, secIdx = index) => renderField(field, section.form, secIdx) })
                    : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {section.fields.map((fieldConfig) =>
                          renderField(fieldConfig, section.form, index)
                  )}
                </div>
                    )}
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
              if (modalField.form) {
                modalField.form.setValue("customerId", row["Customer ID"]);
              }
            }
            setModalField(null);
            setModalType(null);
          }}
        />
      )}
    </>
  )

  function renderTable(section) {
    // Check if this is a dynamic table (has dynamicRows property)
    if (section.dynamicRows) {
      return <DynamicTable section={section} />;
    }
    
    // Original static table rendering
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

  // Dynamic table component for different profile types
  function DynamicTable({ section }) {
    // Determine profile type from section title or configuration
    const getProfileType = () => {
      const title = section.title?.toLowerCase() || "";
      if (title.includes("customer")) return "customer";
      if (title.includes("vendor")) return "vendor";
      if (title.includes("vehicle")) return "vehicle";
      return "customer"; // default
    };

    const profileType = getProfileType();
    const profileConfig = {
      customer: {
        searchField: "name",
        searchPlaceholder: "name",
        modalTitle: "Search Customer",
        modalSearchPlaceholder: "Search by customer name...",
        modalColumns: ["name", "email", "mobile", "street", "pincode"],
        defaultRow: { name: "", email: "", mobile: "", street: "", pincode: "" },
        mapFields: (item) => ({
          name: item.name,
          email: item.email,
          mobile: item.mobile,
          street: item.street,
          pincode: item.pincode
        })
      },
      vendor: {
        searchField: "name",
        searchPlaceholder: "name",
        modalTitle: "Search Vendor",
        modalSearchPlaceholder: "Search by vendor name...",
        modalColumns: ["name", "mobile", "address", "pincode"],
        defaultRow: { name: "", mobile: "", address: "", pincode: "" },
        mapFields: (item) => ({
          name: item.name,
          mobile: item.mobile,
          address: item.address,
          pincode: item.pincode
        })
      },
      vehicle: {
        searchField: "vehicleType",
        searchPlaceholder: "vehicle type",
        modalTitle: "Search Vehicle",
        modalSearchPlaceholder: "Search by vehicle type...",
        modalColumns: ["vehicleType", "description", "icon"],
        defaultRow: { vehicleType: "", description: "", icon: "" },
        mapFields: (item) => ({
          vehicleType: item.vehicleType,
          description: item.description,
          icon: item.icon
        })
      }
    };

    const config = profileConfig[profileType];
    const modalData = profileData[profileType];

    const form = useForm({
      defaultValues: {
        rows: section.initialRows?.length > 0 ? section.initialRows : [config.defaultRow],
      },
    });
    
    const { fields, append, remove, update } = useFieldArray({
      control: form.control,
      name: "rows",
    });

    // Modal state for profile selection
    const [modalOpen, setModalOpen] = useState(false);
    const [modalRowIndex, setModalRowIndex] = useState(null);
    const [modalSearch, setModalSearch] = useState("");
    const [filteredModalData, setFilteredModalData] = useState(modalData);

    // Open modal for profile selection
    const openModal = (rowIndex) => {
      setModalRowIndex(rowIndex);
      setModalOpen(true);
      setModalSearch("");
      setFilteredModalData(modalData);
    };

    // Handle modal search
    const handleModalSearch = (e) => {
      const value = e.target.value;
      setModalSearch(value);
      setFilteredModalData(
        modalData.filter((item) =>
          item[config.searchField]?.toLowerCase().includes(value.toLowerCase())
        )
      );
    };

    // Handle modal select
    const handleModalSelect = (item) => {
      const newRow = { ...fields[modalRowIndex] };
      const mappedFields = config.mapFields(item);
      Object.assign(newRow, mappedFields);
      
      update(modalRowIndex, newRow);
      setModalOpen(false);
    };

    return (
      <div className="bg-white shadow rounded-lg border border-[#E7ECFD]">
        <form onSubmit={form.handleSubmit(() => {})}>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6 text-[#006397] text-left text-sm font-semibold px-3 py-2 bg-[#f8fafc]">Action</TableHead>
                {section.columns.map((col, idx) => (
                  <TableHead
                    key={col.accessorKey}
                    className={
                      `w-1/6 text-[#006397] text-left text-sm font-semibold px-3 py-2 bg-[#f8fafc]` +
                      (idx === 0 || idx > 0 ? " border-l border-[#E7ECFD]" : "")
                    }
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((row, rowIndex) => (
                <TableRow key={row.id}>
                  <TableCell className="w-1/6 px-2">
                    <div className="flex gap-2 items-center">
                      <Button type="button" size="sm" variant="outline" className="px-3 py-1 rounded-full text-[#006397] border-[#006397] hover:bg-[#e7ecfd]" tabIndex={-1}>
                        Save
                      </Button>
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="destructive" 
                        className="px-3 py-1 rounded-full" 
                        onClick={() => remove(rowIndex)} 
                        tabIndex={-1}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                  {section.columns.map((col) => {
                    // Check if this is the search field for the current profile type
                    if (col.accessorKey === config.searchField) {
                      return (
                        <TableCell key={col.accessorKey} className="relative w-1/6 px-2">
                          <div className="flex items-center">
                            <Input
                              value={row[col.accessorKey] || ""}
                              onChange={e => form.setValue(`rows.${rowIndex}.${col.accessorKey}`, e.target.value)}
                              className="pr-10 w-full"
                              placeholder={config.searchPlaceholder}
                            />
                            <button
                              type="button"
                              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 flex items-center justify-center"
                              onClick={() => openModal(rowIndex)}
                              tabIndex={-1}
                            >
                              <FileText size={18} className="text-[#0088d2]" />
                            </button>
                          </div>
                        </TableCell>
                      );
                    }
                    // For auto-filled columns, disable if search field is present
                    const autoFillFields = config.modalColumns.filter(field => field !== config.searchField);
                    if (autoFillFields.includes(col.accessorKey)) {
                      return (
                        <TableCell key={col.accessorKey} className="w-1/6 px-2">
                          <Input
                            value={row[col.accessorKey] || ""}
                            onChange={e => form.setValue(`rows.${rowIndex}.${col.accessorKey}`, e.target.value)}
                            disabled={!!row[config.searchField]}
                            className="w-full"
                          />
                        </TableCell>
                      );
                    }
                    // Default editable cell
                    return (
                      <TableCell key={col.accessorKey} className="w-1/6 px-2">
                        <Input
                          value={row[col.accessorKey] || ""}
                          onChange={e => form.setValue(`rows.${rowIndex}.${col.accessorKey}`, e.target.value)}
                          className="w-full"
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="pl-3 mt-4 mb-6">
            <Button type="button" onClick={() => append(config.defaultRow)} className="rounded-full px-6 bg-[#006397] text-white">
              Add Profile
            </Button>
          </div>

          <ReusableModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title={config.modalTitle}
            columns={config.modalColumns}
            data={filteredModalData}
            onSelect={handleModalSelect}
          >
            <Input
              placeholder={config.modalSearchPlaceholder}
              value={modalSearch}
              onChange={handleModalSearch}
              className="mb-2 w-full"
            />
          </ReusableModal>
        </form>
      </div>
    );
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
