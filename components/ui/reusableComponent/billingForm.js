import React, { useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search, FileText, FileSearch, Plus } from "lucide-react";
import ReusableModal from "./bussinessPartnerModal";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Modal configuration system for billing
const MODAL_CONFIG = {
  companyCode: {
    columns: ["Company Name", "Company Code", "Description"],
    data: {
      find: [
        { "Company Name": "THKN", "Company Code": "THKN", Description: "THKN" },
        { "Company Name": "TCS", "Company Code": "TCS01", Description: "Tata Consultancy Services" },
        { "Company Name": "Wipro", "Company Code": "WPR02", Description: "Wipro Ltd" },
      ],
      list: [
        { "Company Name": "Infosys", "Company Code": "INFY", Description: "Infosys Ltd" },
        { "Company Name": "HCL", "Company Code": "HCL01", Description: "HCL Technologies" },
        { "Company Name": "IBM", "Company Code": "IBM02", Description: "IBM India" },
      ],
      search: [
        { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
        { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
        { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
      ]
    },
    titles: {
      list: "List of Companies",
      search: "Search Company Details",
      find: "Select Company"
    },
    valueKey: "Company Code"
  },
  branchCode: {
    columns: ["Branch Name", "Branch Code", "companyCode", "Description"],
    data: [
      { "Branch Name": "Bangkok", "Branch Code": "THBKK", Description: "Bangkok Branch", companyCode: "THKN" },
      { "Branch Name": "Chennai", "Branch Code": "INCHN", Description: "Chennai Branch", companyCode: "TCS01" },
      { "Branch Name": "Pune", "Branch Code": "INPUN", Description: "Pune Branch", companyCode: "WPR02" },
    ],
    titles: {
      list: "List of Branches",
      search: "Search Branch Details", 
      find: "Select Branch"
    },
    valueKey: "Branch Code",
    filterBy: "companyCode"
  },
  customerId: {
    columns: ["Customer ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"],
    data: [
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
    ],
    titles: {
      list: "List of Customers",
      search: "Search Customer Details",
      find: "Select Customer"
    },
    valueKey: "Customer ID"
  },
  shipperId: {
    columns: ["Shipper ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"],
    data: [
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
    ],
    titles: {
      list: "List of Shippers",
      search: "Search Shipper Details",
      find: "Select Shipper"
    },
    valueKey: "Shipper ID"
  },
  consigneeId: {
    columns: ["Consignee ID", "Name", "Street", "City", "Country", "Email", "Company Code", "Branch Code"],
    data: [
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
    ],
    titles: {
      list: "List of Consignees",
      search: "Search Consignee Details",
      find: "Select Consignee"
    },
    valueKey: "Consignee ID"
  },
  originLocation: {
    columns: ["Location Name", "Address", "City", "State", "Country", "Pincode"],
    data: [
      {
        "Location Name": "Mumbai Port",
        Address: "Mumbai Port Trust, Mumbai",
        City: "Mumbai",
        State: "Maharashtra",
        Country: "India",
        Pincode: "400001"
      },
      {
        "Location Name": "Chennai Port",
        Address: "Chennai Port Trust, Chennai",
        City: "Chennai",
        State: "Tamil Nadu",
        Country: "India",
        Pincode: "600001"
      },
      {
        "Location Name": "Kolkata Port",
        Address: "Kolkata Port Trust, Kolkata",
        City: "Kolkata",
        State: "West Bengal",
        Country: "India",
        Pincode: "700001"
      },
      {
        "Location Name": "Vizag Port",
        Address: "Visakhapatnam Port Trust, Vizag",
        City: "Visakhapatnam",
        State: "Andhra Pradesh",
        Country: "India",
        Pincode: "530001"
      },
      {
        "Location Name": "Kandla Port",
        Address: "Kandla Port Trust, Kandla",
        City: "Kandla",
        State: "Gujarat",
        Country: "India",
        Pincode: "370210"
      },
      {
        "Location Name": "JNPT",
        Address: "Jawaharlal Nehru Port Trust, Navi Mumbai",
        City: "Navi Mumbai",
        State: "Maharashtra",
        Country: "India",
        Pincode: "400707"
      },
      {
        "Location Name": "Mundra Port",
        Address: "Mundra Port, Mundra",
        City: "Mundra",
        State: "Gujarat",
        Country: "India",
        Pincode: "370421"
      },
      {
        "Location Name": "Pipavav Port",
        Address: "Pipavav Port, Pipavav",
        City: "Pipavav",
        State: "Gujarat",
        Country: "India",
        Pincode: "364265"
      }
    ],
    titles: {
      list: "List of Origin Locations",
      search: "Search Origin Locations",
      find: "Select Origin Location"
    },
    valueKey: "Location Name"
  },
  dropLocation: {
    columns: ["Location Name", "Address", "City", "State", "Country", "Pincode"],
    data: [
      {
        "Location Name": "Mumbai Port",
        Address: "Mumbai Port Trust, Mumbai",
        City: "Mumbai",
        State: "Maharashtra",
        Country: "India",
        Pincode: "400001"
      },
      {
        "Location Name": "Chennai Port",
        Address: "Chennai Port Trust, Chennai",
        City: "Chennai",
        State: "Tamil Nadu",
        Country: "India",
        Pincode: "600001"
      },
      {
        "Location Name": "Kolkata Port",
        Address: "Kolkata Port Trust, Kolkata",
        City: "Kolkata",
        State: "West Bengal",
        Country: "India",
        Pincode: "700001"
      },
      {
        "Location Name": "Vizag Port",
        Address: "Visakhapatnam Port Trust, Vizag",
        City: "Visakhapatnam",
        State: "Andhra Pradesh",
        Country: "India",
        Pincode: "530001"
      },
      {
        "Location Name": "Kandla Port",
        Address: "Kandla Port Trust, Kandla",
        City: "Kandla",
        State: "Gujarat",
        Country: "India",
        Pincode: "370210"
      },
      {
        "Location Name": "JNPT",
        Address: "Jawaharlal Nehru Port Trust, Navi Mumbai",
        City: "Navi Mumbai",
        State: "Maharashtra",
        Country: "India",
        Pincode: "400707"
      },
      {
        "Location Name": "Mundra Port",
        Address: "Mundra Port, Mundra",
        City: "Mundra",
        State: "Gujarat",
        Country: "India",
        Pincode: "370421"
      },
      {
        "Location Name": "Pipavav Port",
        Address: "Pipavav Port, Pipavav",
        City: "Pipavav",
        State: "Gujarat",
        Country: "India",
        Pincode: "364265"
      }
    ],
    titles: {
      list: "List of Drop Locations",
      search: "Search Drop Locations", 
      find: "Select Drop Location"
    },
    valueKey: "Location Name"
  }
};

// Dynamic Table Component for billing forms (following trip template pattern)
function DynamicBillingTable({ section, renderField }) {
  const form = useForm({
    defaultValues: {
      rows: section.initialRows?.length > 0 ? section.initialRows : [section.defaultRow || {}], // Start with 1 default row
    },
    resolver: section.tableSchema ? zodResolver(z.object({ rows: z.array(section.tableSchema) })) : undefined,
    mode: "onChange", // Enable real-time validation
  });


  React.useImperativeHandle(section.ref, () => ({
    getData: () => form.getValues().rows,
    validate: () => {
      const data = form.getValues().rows;
      if (section.tableSchema) {
        const arraySchema = z.array(section.tableSchema);
        return arraySchema.safeParse(data);
      }
      return { success: true, data };
    }
  }));
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  // Watch rows to trigger re-render when any row value changes (for dynamic disabled states)
  const watchedRows = form.watch("rows");

  const columns = section.columns || [];
  const showActions = section.showActions !== false; 
  const mappingConfig = section.mappingConfig || null;

  const handleAddRow = () => append(section.defaultRow || {});
  const handleRemoveRow = (index) => remove(index);

  const handleSave = async (rowIndex) => {
    try {
      // Trigger validation and wait for it to complete
      const isValid = await form.trigger();
      
      // Get current data
      const formData = form.getValues();
      const rowData = formData.rows[rowIndex];
      
      // Manual validation for this specific row to ensure we get errors
      let rowErrors = {};
      if (section.tableSchema) {
        const rowValidation = section.tableSchema.safeParse(rowData);
        if (!rowValidation.success) {
          // Convert Zod errors to the format React Hook Form uses
          rowValidation.error.issues.forEach(issue => {
            const fieldName = issue.path[0];
            if (fieldName) {
              rowErrors[fieldName] = {
                type: issue.code,
                message: issue.message
              };
            }
          });
        }
      }
      
      if (section.onSave) {
        section.onSave(rowData, rowIndex, rowErrors);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };

  const handleMappingChange = (rowIndex, fieldName, value) => {
    if (mappingConfig && mappingConfig[fieldName]) {
      const mapping = mappingConfig[fieldName];
      const selectedData = mapping.data.find(item => item[mapping.keyField] === value);
      if (selectedData) {
        mapping.mappedFields.forEach(mappedField => {
          form.setValue(`rows.${rowIndex}.${mappedField}`, selectedData[mappedField]);
        });
      }
    }
  };

      return (
      <div className="relative bg-white shadow-lg rounded-xl border border-gray-200 overflow-x-auto dynamic-table-scroll">
      <FormProvider {...form}>
        <Table className="min-w-[1100px] border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="bg-[#f8fafc]">
              {showActions && (
                <TableHead className="sticky left-0 bg-[#f8fafc] text-[#006397] font-semibold px-4 py-3 w-[130px] border-r border-gray-200 shadow-sm z-10">
                  Action
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.accessorKey}
                  className="text-[#006397] font-medium px-4 py-3 min-w-[160px] border-b border-gray-200"
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                className="hover:bg-[#f9fbfd] transition-colors"
              >
                {showActions && (
                  <TableCell className="sticky left-0 bg-white px-3 w-[130px] border-r border-gray-200 z-10">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="px-3 py-1 rounded-full text-[#006397] border-[#006397] hover:bg-[#e7ecfd]"
                        onClick={() => handleSave(rowIndex)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="px-3 py-1 rounded-full"
                        onClick={() => handleRemoveRow(rowIndex)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.accessorKey} className="px-3 min-w-[160px] border-b border-gray-200">
                    {renderField(
                      {
                        ...col,
                        name: `rows.${rowIndex}.${col.accessorKey}`,
                        modalFieldName: col.modalFieldName || col.accessorKey,
                        disabled: typeof col.getDisabled === "function" ? col.getDisabled(watchedRows?.[rowIndex]) : col.disabled,
                        onValueChange: (value) => {
                          if (col.onValueChange) col.onValueChange(value);
                          handleMappingChange(rowIndex, col.accessorKey, value);
                        }
                      },
                      form,
                      0
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FormProvider>
      <div className="pl-3 mt-4 mb-6">
        <Button 
          type="button" 
          onClick={handleAddRow} 
          className="rounded-full px-6 bg-[#006397] text-white"
        >
          Add Row
        </Button>
      </div>
    </div>
  );
}

// Centralized modal renderer
function renderModal(modalField, modalType, onClose, onSelect, filteredData = null) {
  if (!modalField) return null;
  
  const baseFieldName = modalField.baseFieldName || modalField.name;
  const config = MODAL_CONFIG[baseFieldName];
  
  if (!config) return null;

  let modalData = config.data;
  if (Array.isArray(config.data)) {
    modalData = filteredData || config.data;
  } else {
    modalData = config.data[modalType] || config.data.list || [];
  }

  // Special handling for branchCode - use filtered data if available
  if (baseFieldName === "branchCode") {
    modalData = filteredData || config.data;
  }

  return (
    <ReusableModal
      open={modalField !== null}
      onClose={onClose}
      title={config.titles[modalType] || config.titles.list}
      columns={config.columns}
      data={modalData}
      onSelect={(row) => {
        const fieldName = modalField.name;
        const value = row[config.valueKey];
        
        if (baseFieldName === "companyCode") {
          modalField.form.setValue("companyCode", value);
          modalField.form.setValue("branchCode", "");
        } else if (baseFieldName === "branchCode") {
          modalField.form.setValue("branchCode", value);
        } else {
          modalField.form.setValue(fieldName, value);
        }
        
        onSelect();
      }}
    />
  );
}

export function renderBillingFieldWithModals(
  fieldConfig,
  form,
  sectionIndex,
  param = {}
) {
  const {
    setModalField,
    setModalType,
    setFilteredCustomerIdData,
  } = param;
  const { name, label, type = "text", disabled = false, options = [], wide = false, placeholder, unitOptions, modalFieldName, plusAction, onValueChange } = fieldConfig;

  const baseFieldName = modalFieldName || name;

  const actualFieldName = name; // This is the full field name like "routeLegs.0.originLocation"
  const isTableField = name.includes('.') && modalFieldName; // Check if this is a table field

  const modalConfig = MODAL_CONFIG[baseFieldName];

  return (
    <div key={name} className={wide ? "md:col-span-2" : "md:col-span-1"}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                {["companyCode", "branchCode"].includes(baseFieldName) ? (
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
                              if (baseFieldName === "branchCode") {
                                const selectedCompany = form.getValues("companyCode");
                                const branchConfig = MODAL_CONFIG.branchCode;
                                const filtered = branchConfig.data.filter((b) => b.companyCode === selectedCompany);
                                setFilteredCustomerIdData && setFilteredCustomerIdData(filtered);
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
                ) : ["customerId", "shipperId", "consigneeId", "originLocation", "dropLocation"].includes(baseFieldName) ? (
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
                      {baseFieldName !== "originLocation" && baseFieldName !== "dropLocation" && (
                        <button
                          title="Search"
                          type="button"
                          onClick={() => {
                            setModalField && setModalField({ name, sectionIndex, form });
                            setModalType && setModalType("search");
                            if (modalConfig) {
                              const currentValue = form.getValues(name);
                              const match = modalConfig.data.filter((x) => 
                                x[modalConfig.columns[0]].trim().toLowerCase() === currentValue?.trim().toLowerCase()
                              );
                              setFilteredCustomerIdData && setFilteredCustomerIdData(match.length > 0 ? match : []);
                            }
                          }}
                        >
                          <Search size={18} className="text-[#0088d2]" />
                        </button>
                      )}
                      <button
                        title="List"
                        type="button"
                        onClick={() => {
                          setModalField && setModalField({ 
                            name: actualFieldName, 
                            baseFieldName: baseFieldName,
                            sectionIndex, 
                            form 
                          });
                          setModalType && setModalType("list");
                          setFilteredCustomerIdData && setFilteredCustomerIdData(modalConfig?.data || []);
                        }}
                      >
                        <FileText size={18} className="text-[#0088d2]" />
                      </button>
                    </div>
                  </div>
                ) : type === "select" ? (
                  (() => {
                    const selectComponent = (
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (onValueChange) {
                            onValueChange(value);
                          }
                        }} 
                        value={field.value}
                        disabled={disabled}
                      >
                        <SelectTrigger className="border-2 border-[#E7ECFD] bg-white w-full" disabled={disabled}>
                          <SelectValue placeholder={placeholder || `Select ${label}`} />
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
                    );

                    return plusAction ? (
                      <div className="flex items-center gap-2">
                        {selectComponent}
                        <button type="button" onClick={plusAction} className="p-1 rounded border-2 border-[#E7ECFD] bg-white hover:bg-gray-100">
                          <Plus size={25} className="text-[#006397]" />
                        </button>
                      </div>
                    ) : selectComponent;
                  })()
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

// Table rendering function (following profilesForm pattern)
function renderTable(section, renderField) {
  // Check if this is a dynamic table (has dynamicRows property)
  if (section.dynamicRows) {
    return <DynamicBillingTable section={section} renderField={renderField} />;
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
            {(section.rows?.length > 0 ? section.rows : [{}]).map((row, rowIndex) => (
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
                        ➕ Add Row
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

export function BillingForm({ sections = [], useAccordion = true }) {
  const [modalField, setModalField] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [filteredCustomerIdData, setFilteredCustomerIdData] = useState([])

  // Helper to render a field with all modal state/data
  const renderField = (fieldConfig, form, sectionIndex) =>
    renderBillingFieldWithModals(
      fieldConfig,
      form,
      sectionIndex,
      {
        setModalField,
        setModalType,
        setFilteredCustomerIdData,
      }
    );

  const handleModalClose = () => {
    setModalField(null);
    setModalType(null);
  };

  const handleModalSelect = () => {
    setModalField(null);
    setModalType(null);
  };

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
                      : section.form ? (
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
                            
                            {/* Dynamic Table inside form */}
                            {section.dynamicTable && (
                              <DynamicBillingTable 
                                section={section.dynamicTable}
                                form={section.form}
                                renderField={renderField}
                              />
                            )}
                          </form>
                        </Form>
                      ) : null}
                    
                    {/* Render table if section type is table */}
                    {section.type === "table" && renderTable(section, renderField)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        {/* Centralized modal rendering */}
        {renderModal(modalField, modalType, handleModalClose, handleModalSelect, filteredCustomerIdData)}
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
                : section.form ? (
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
                      
                      {/* Dynamic Table inside form */}
                      {section.dynamicTable && (
                        <DynamicBillingTable 
                          section={section.dynamicTable}
                          form={section.form}
                          renderField={renderField}
                        />
                      )}
                    </form>
                  </Form>
                ) : null}
                
                {/* Render table if section type is table */}
                {section.type === "table" && renderTable(section, renderField)}
              </div>
          </div>
        ))}
        {/* Centralized modal rendering */}
        {renderModal(modalField, modalType, handleModalClose, handleModalSelect, filteredCustomerIdData)}
      </>
    );
  }
}

export function useBillingFields() {
  const [modalField, setModalField] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [filteredCustomerIdData, setFilteredCustomerIdData] = useState([]);

  // Helper to render a field with modal functionality
  const renderField = (fieldConfig, form, sectionIndex = 0) => {
    return renderBillingFieldWithModals(
      fieldConfig,
      form,
      sectionIndex,
      {
        setModalField,
        setModalType,
        setFilteredCustomerIdData,
      }
    );
  };

  const handleModalClose = () => {
    setModalField(null);
    setModalType(null);
  };

  const handleModalSelect = () => {
    setModalField(null);
    setModalType(null);
  };

  const renderModalComponent = () => {
    return renderModal(modalField, modalType, handleModalClose, handleModalSelect, filteredCustomerIdData);
  };

  return {
    renderField,
    renderModal: renderModalComponent,
    modalField,
    setModalField,
    modalType,
    setModalType
  };
}
