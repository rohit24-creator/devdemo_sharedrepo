"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { FileSearch, FileText, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import ReusableModal from "@/components/ui/reusableComponent/bussinessParnterModal";

const formatLabel = (label) =>
  label.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const accountSchema = z.object({
  accountNumber: z.string().min(1, "Account Number is required"),
  aconEnvironment: z.string().min(1, "Acon Environment is required"),
  sourceSystem: z.string().min(1, "Source System is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  billable: z.enum(["yes", "no"]),
  prePayment: z.enum(["yes", "no"]),
  multipleInvoices: z.enum(["yes", "no"]),
});

const tariffSchema = z.object({
  companyCode: z.string().min(1, "Company Code is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  contractId: z.string().min(1, "Contract ID is required"),
  rateDerivation: z.enum(["specific", "generic"]),
});

export default function AccountAndTariffForms() {
  const [accountRows, setAccountRows] = useState([]);
  const [tariffRows, setTariffRows] = useState([]);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [companyModalType, setCompanyModalType] = useState(null); // null | "find" | "list" | "search"
  const [isTariffModalOpen, setIsTariffModalOpen] = useState(false);
  const [tariffModalType, setTariffModalType] = useState(null); // "find" | "list" | "search"
  const [tariffModalField, setTariffModalField] = useState(null); // "companyCode" | "branchCode"

  const companyModalColumns = ["Company Name", "Company Code", "Description"];
  
  const companyFindData = [
    { "Company Name": "THKN", "Company Code": "THKN", Description: "THKN" },
    { "Company Name": "TCS", "Company Code": "TCS01", Description: "Tata Consultancy Services" },
    { "Company Name": "Wipro", "Company Code": "WPR02", Description: "Wipro Ltd" },
    { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
    { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
    { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
  ];

  const companyListData = [
    { "Company Name": "Infosys", "Company Code": "INFY", Description: "Infosys Ltd" },
    { "Company Name": "HCL", "Company Code": "HCL01", Description: "HCL Technologies" },
    { "Company Name": "IBM", "Company Code": "IBM02", Description: "IBM India" },
    { "Company Name": "THKN", "Company Code": "THKN", Description: "THKN" },
    { "Company Name": "TCS", "Company Code": "TCS01", Description: "Tata Consultancy Services" },
    { "Company Name": "Wipro", "Company Code": "WPR02", Description: "Wipro Ltd" },
    { "Company Name": "THKN", "Company Code": "THKN", Description: "THKN" },
    { "Company Name": "TCS", "Company Code": "TCS01", Description: "Tata Consultancy Services" },
    { "Company Name": "Wipro", "Company Code": "WPR02", Description: "Wipro Ltd" },
    { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
    { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
    { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
    { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
    { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
    { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
  ];

  // Add a new dataset for search (can be a mix or different)
  const companySearchData = [
    { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
    { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
    { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
    { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
    { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
    { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
    { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
    { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
    { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
    { "Company Name": "Capgemini", "Company Code": "CAP01", Description: "Capgemini India" },
    { "Company Name": "Accenture", "Company Code": "ACC02", Description: "Accenture Solutions" },
    { "Company Name": "Cognizant", "Company Code": "COG03", Description: "Cognizant Tech" },
  ];

  const branchListData = [
  { "Branch Name": "Bangkok", "Branch Code": "THBKK", Description: "Bangkok Branch", companyCode: "THKN" },
  { "Branch Name": "Chennai", "Branch Code": "INCHN", Description: "Chennai Branch", companyCode: "TCS01" },
  { "Branch Name": "Pune", "Branch Code": "INPUN", Description: "Pune Branch", companyCode: "WPR02" },
  { "Branch Name": "London", "Branch Code": "UKLON", Description: "London Branch", companyCode: "CAP01" },
];

  const handleCompanySelect = (row) => {
    accountForm.setValue("companyCode", row["Company Code"]);
    setCompanyModalType(false);
    setIsCompanyModalOpen(false);
  };

  const handleTariffModalSelect = (row) => {
    if (tariffModalField === "companyCode") {
      tariffForm.setValue("companyCode", row["Company Code"]);
    } else if (tariffModalField === "branchCode") {
      tariffForm.setValue("branchCode", row["Branch Code"]);
    }
    setIsTariffModalOpen(false);
    setTariffModalType(null);
    setTariffModalField(null);
  };

  const accountForm = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountNumber: "",
      aconEnvironment: "",
      sourceSystem: "",
      companyCode: "THKN",
      billable: "no",
      prePayment: "yes",
      multipleInvoices: "yes",
    },
  });

  const tariffForm = useForm({
    resolver: zodResolver(tariffSchema),
    defaultValues: {
      companyCode: "THKN",
      branchCode: "THBKK",
      contractId: "",
      rateDerivation: "generic",
    },
  });

  const onAccountSubmit = (data) => {
    setAccountRows([...accountRows, data]);
    toast.success("Account added successfully");
    accountForm.reset();
  };

  const onTariffSubmit = (data) => {
    setTariffRows([...tariffRows, data]);
    toast.success("Tariff/Contract added successfully");
    tariffForm.reset();
  };

  return (
    <div className="p-4 sm:p-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="account">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mb-2">
            Accounts
          </AccordionTrigger>
          <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
            <Form {...accountForm}>
              <form
                onSubmit={accountForm.handleSubmit(onAccountSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {["accountNumber", "aconEnvironment", "sourceSystem"].map(
                    (name) => (
                      <FormField
                        key={name}
                        control={accountForm.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">
                              {formatLabel(name)} *
                            </FormLabel>
                            <FormControl>
                              <Input className="border-2 border-[#E7ECFD]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  )}

                  <FormField
                    control={accountForm.control}
                    name="companyCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#162d56] mb-1 block font-semibold">
                          Company Code *
                        </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md bg-gray-100">
                            <input
                              {...field}
                              disabled
                              className="w-full px-3 py-2 pr-24 bg-gray-100 rounded-md focus:outline-none focus:border-[#0088d2]"
                            />
                            <div className="absolute right-2 flex items-center space-x-2">
                              <button
                                title="Find"
                                aria-label="Find Company"
                                type="button"
                                onClick={() => {
                                  setCompanyModalType("find");
                                  setIsCompanyModalOpen(true);
                                }}
                              >
                                <FileSearch size={18} className="text-[#0088d2]" />
                              </button>
                              <button
                                title="List"
                                aria-label="List Company"
                                type="button"
                                onClick={() => {
                                  setCompanyModalType("list");
                                  setIsCompanyModalOpen(true);
                                }}
                              >
                                <FileText size={18} className="text-[#0088d2]" />
                              </button>
                              <button
                                title="Search"
                                aria-label="Search Company"
                                type="button"
                                onClick={() => {
                                  setCompanyModalType("search");
                                  setIsCompanyModalOpen(true);
                                }}
                              >
                                <Search size={18} className="text-[#0088d2]" />
                              </button>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {["billable", "prePayment", "multipleInvoices"].map((field) => (
                    <FormField
                      key={field}
                      control={accountForm.control}
                      name={field}
                      render={({ field: radio }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {formatLabel(field)}
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-6">
                              {["yes", "no"].map((val) => (
                                <label key={val} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={field}
                                    value={val}
                                    checked={radio.value === val}
                                    onChange={() => radio.onChange(val)}
                                  />
                                  {val.toUpperCase()}
                                </label>
                              ))}
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                >
                  Add Account
                </Button>
              </form>
            </Form>

            {accountRows.length > 0 && (
              <Card className="mt-6">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead className="w-16"></TableHead>
                        {Object.keys(accountSchema.shape).map((field) => (
                          <TableHead key={field}>{formatLabel(field)}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accountRows.map((entry, index) => (
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
                                <DropdownMenuItem onClick={() => accountForm.reset(entry)}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    if (confirm("Are you sure you want to delete this entry?")) {
                                      const updated = [...accountRows];
                                      updated.splice(index, 1);
                                      setAccountRows(updated);
                                    }
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          {Object.keys(accountSchema.shape).map((key) => (
                            <TableCell key={key}>{entry[key]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            <ReusableModal
              open={isCompanyModalOpen}
              onClose={() => {
                setIsCompanyModalOpen(false);
                setCompanyModalType(null);
              }}
              title={
                companyModalType === "list"
                  ? "List of Companies"
                  : companyModalType === "search"
                  ? "Search Companie Details"
                  : "Select Company"
              }
              columns={companyModalColumns}
              data={
                companyModalType === "list"
                  ? companyListData
                  : companyModalType === "search"
                  ? companySearchData
                  : companyFindData
              }
              onSelect={handleCompanySelect}
            />
          </AccordionContent>
        </AccordionItem>
  


        <AccordionItem value="tariff">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">Tariff/Contract</AccordionTrigger>
          <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
            <Form {...tariffForm}>
              <form onSubmit={tariffForm.handleSubmit(onTariffSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {["companyCode", "branchCode"].map((name) => (
                    <FormField
                      key={name}
                      control={tariffForm.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{name.replace(/([A-Z])/g, ' $1')} *</FormLabel>
                          <FormControl>
                            <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md bg-gray-100">
                              <input
                                {...field}
                                disabled
                                className="w-full px-3 py-2 pr-24 bg-gray-100 rounded-md focus:outline-none focus:border-[#0088d2]"
                              />
                              <div className="absolute right-2 flex items-center space-x-2">
                                <button
                                  title="Find"
                                  type="button"
                                  onClick={() => {
                                    setTariffModalField(name);
                                    setTariffModalType("find");
                                    setIsTariffModalOpen(true);
                                  }}
                                >
                                  <FileSearch size={18} className="text-[#0088d2]" />
                                </button>
                                <button
                                  title="List"
                                  type="button"
                                  onClick={() => {
                                    setTariffModalField(name);
                                    setTariffModalType("list");
                                    setIsTariffModalOpen(true);
                                  }}
                                >
                                  <FileText size={18} className="text-[#0088d2]" />
                                </button>
                                <button
                                  title="Search"
                                  type="button"
                                  onClick={() => {
                                    setTariffModalField(name);
                                    setTariffModalType("search");
                                    setIsTariffModalOpen(true);
                                  }}
                                >
                                  <Search size={18} className="text-[#0088d2]" />
                                </button>
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}

                  <FormField
                    control={tariffForm.control}
                    name="contractId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract ID *</FormLabel>
                        <FormControl><Input className="border-2 border-[#E7ECFD]" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={tariffForm.control}
                    name="rateDerivation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Derivation</FormLabel>
                        <FormControl>
                          <div className="flex gap-6 mt-2">
                            {["specific", "generic"].map((val) => (
                              <label key={val} className="flex items-center gap-2">
                                <input type="radio" value={val} checked={field.value === val} onChange={() => field.onChange(val)} />
                                {val.toUpperCase()}
                              </label>
                            ))}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">Add Tariff/Contract</Button>
              </form>
            </Form>

            {tariffRows.length > 0 && (
              <Card className="mt-6">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"><Checkbox /></TableHead>
                        <TableHead className="w-16"></TableHead>
                        {Object.keys(tariffSchema.shape).map((field) => (
                          <TableHead key={field}>{field}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tariffRows.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell><Checkbox /></TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><span className="text-xl">☰</span></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => tariffForm.reset(entry)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => {
                                  const updated = [...tariffRows];
                                  updated.splice(index, 1);
                                  setTariffRows(updated);
                                }}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          {Object.keys(tariffSchema.shape).map((key) => (
                            <TableCell key={key}>{entry[key]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            <ReusableModal
              open={isTariffModalOpen}
              onClose={() => {
                setIsTariffModalOpen(false);
                setTariffModalType(null);
                setTariffModalField(null);
              }}
              title={
                tariffModalField === "companyCode"
                  ? (tariffModalType === "list"
                      ? "List of Companies"
                      : tariffModalType === "search"
                      ? "Search Company Details"
                      : "Select Company")
                  : (tariffModalType === "list"
                      ? "List of Branches"
                      : tariffModalType === "search"
                      ? "Search Branch Details"
                      : "Select Branch")
              }
              columns={
                tariffModalField === "companyCode"
                  ? companyModalColumns
                  : ["Branch Name", "Branch Code","companyCode" ,"Description"]
              }
              data={
                tariffModalField === "companyCode"
                  ? (tariffModalType === "list"
                      ? companyListData
                      : tariffModalType === "search"
                      ? companySearchData
                      : companyFindData)
                  : branchListData.filter(
                    (b) => b.companyCode === tariffForm.getValues("companyCode")
                  )
              }
              onSelect={handleTariffModalSelect}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}