"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FileSearch, FileText, Search, UserCircle, FileCog, Cog } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import ReusableModal from '@/components/ui/reusableComponent/bussinessPartnerModal'


// is_customer
const departmentOptions = [
{ value: 'Transport', label: 'Transport' },
{ value: 'Warehouse', label: 'Warehouse' },
]

const sendToShLoginOptions = [
{ value: 'shadmin', label: 'shadmin' },
{ value: 'logistics', label: 'logistics' },
]

const customerFields = [
  {
    name: "customerProfile",
    label: "Customer Profile",
    type: "input",
    placeholder: "Customer Profile",
  },
  {
    name: "invoiceType",
    label: "Invoice Type",
    type: "select",
    placeholder: "Invoice Type",
    options: [
      { value: "Monthly", label: "Monthly" },
      { value: "Weekly", label: "Weekly" },
    ],
  },
];

const currencies = [
  { value: "THB", label: "THB" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];
// is_carrier data
const carrierFields = [
  {
    name: "modeOfTransport",
    label: "Mode of Transport",
    type: "select",
    options: [
      { value: "Air", label: "Air" },
      { value: "Sea", label: "Sea" },
      { value: "Road", label: "Road" },
    ],
  },
  {
    name: "carrierGrade",
    label: "Carrier Grade",
    type: "input",
  },
  {
    name: "invoiceType",
    label: "Invoice Type",
    type: "select",
    options: [
      { value: "Monthly", label: "Monthly" },
      { value: "Weekly", label: "Weekly" },
    ],
  },
  {
    name: "vendorProfile",
    label: "Vendor Profile",
    type: "input",
  },
  {
    name: "maxCapacity",
    label: "Max. Capacity",
    type: "input",
  },
  {
    name: "rating",
    label: "Rating",
    type: "input",
  },
  {
    name: "costEfficiency",
    label: "Cost Efficiency",
    type: "input",
  },
  {
    name: "groupType",
    label: "Group Type",
    type: "select",
    options: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
    ],
  },
  {
    name: "region",
    label: "Region",
    type: "select",
    options: [
      { value: "North", label: "North" },
      { value: "South", label: "South" },
    ],
  },
  {
    name: "certificationLevel",
    label: "Certification Level",
    type: "input",
  },
];

const carrierCheckboxes = [
  { name: "autoAward", label: "Auto Accept Direct Awards" },
  { name: "autoTrip", label: "Auto Accept Trip" },
  { name: "autoTms", label: "TMS Auto Trip Accept" },
];


// const partyTypes = [
//   "Border", "Carrier", "Consignee", "Customer", "Delivery",
//   "In transit", "Notify_party", "Pickup", "Port", "Shipper",
//   "Xdock", "Yard",
// ]
const partyTypes = [
  "Carrier", "Consignee", "Customer",
 "Notify_party","Shipper",
]

const formSchema = z.object({
  cid: z.string().min(1, "CID is required"),
  customerCode: z.string().optional(),
  debitorCode: z.string().min(1, "Debitor Code is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  shLogin: z.string().min(1, "SH Login is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  branchCode: z.string().optional(),
  departmentCode: z.string().optional(),
  sendToShLogin: z.string().min(1, "Send To SH Login is required"),
  invoiceType: z.string().optional(),
  limitAmount: z.string().optional(),
  creditLimitAmount: z.string().optional(),
  carrierGrade: z.string().optional(),
  vendorProfile: z.string().optional(),
  maxCapacity: z.string().optional(),
  rating: z.string().optional(),
  costEfficiency: z.string().optional(),
  groupType: z.string().optional(),
  region: z.string().optional(),
  certificationLevel: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
})


export default function PartnerDetailsForm() {
const companyModalColumns = ["Company Name", "Company Code", "Description"];
const branchModalColumns = ["Branch Name", "Branch Code", "companyCode", "Description"];
const [filteredVendorProfiles, setFilteredVendorProfiles] = useState([]);
const [filteredCustomerProfiles, setFilteredCustomerProfiles] = useState([]);
const [filteredBranchData, setFilteredBranchData] = useState([]);
const [modalField, setModalField] = useState(null); // "companyCode", "branchCode", "customerProfile", "vendorProfile"
const [modalType, setModalType] = useState(null);   // "list" | "search" | "find"


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

const vendorProfileData = [
  { "Vendor Profile Id": "VNSX24360005", Name: "VENDOR PROFILE5", "Branch Code": "SXUSA", "Company Code": "SXUSAWD" },
  { "Vendor Profile Id": "VNSX24360004", Name: "VENDOR PROFILE4", "Branch Code": "SXUSA", "Company Code": "SXUSAWD" },
  { "Vendor Profile Id": "VNSX24360003", Name: "VENDOR PROFILE2", "Branch Code": "SXUSA", "Company Code": "SXUSAWD" },
  { "Vendor Profile Id": "VNSX24360002", Name: "VENDOR PROFILE1", "Branch Code": "SXUSA", "Company Code": "SXUSAWD" },
  { "Vendor Profile Id": "VNSX24360001", Name: "NEW VENDOR PROFILE", "Branch Code": "SXUSA", "Company Code": "SXUSAWD" },
];

// customerProfileData
const customerProfileData = [
  {
    "Customer Profile Id": "CPSX24360001",
    Name: "CUSTOMER PROFILE1",
    "Branch Code": "SXUSA",
    "Company Code": "SXUSAWD",
  },
  {
    "Customer Profile Id": "CPSX24360002",
    Name: "NEW CUSTOMER PROFILE",
    "Branch Code": "SXUSA",
    "Company Code": "SXUSAWD",
  },
  {
    "Customer Profile Id": "CPSX24360003",
    Name: "CUSTOMER PROFILE3",
    "Branch Code": "SXUSA",
    "Company Code": "SXUSAWD",
  },
];


// end of resuble modal code

  const [selectedPartyTypes, setSelectedPartyTypes] = useState([])
  const [cargoLimit, setCargoLimit] = useState(false)
  const [creditLimit, setCreditLimit] = useState(false)
  const [pendingPartyType, setPendingPartyType] = useState(null);
const [showConfirmation, setShowConfirmation] = useState(false);
const [dialogMessage, setDialogMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cid: "",
      customerCode: "",
      debitorCode: "",
      companyCode: "THKN",
      shLogin: "",
      password: "",
      confirmPassword: "",
      branchCode: "THKN",
      departmentCode: "",
      sendToShLogin: "",
    },
  })


const handleCheckboxChange = (type) => {
  if (type === "Carrier") {
    if (selectedPartyTypes.includes("Carrier")) return;
    if (selectedPartyTypes.length > 0) {
      setDialogMessage("Switching to Carrier will reset other party types data. Proceed?");
      setPendingPartyType("Carrier");
      setShowConfirmation(true);
    } else {
      setSelectedPartyTypes(["Carrier"]);
    }
  } else {
    if (selectedPartyTypes.includes("Carrier")) {
      setDialogMessage(`Switching to ${type} will reset Carrier data. Proceed?`);
      setPendingPartyType(type);
      setShowConfirmation(true);
    } else if (selectedPartyTypes.includes(type)) {
      setSelectedPartyTypes((prev) => prev.filter((t) => t !== type));
    } else {
      const attaching = selectedPartyTypes.length > 0;
      setPendingPartyType(type);
      if (attaching) {
        setDialogMessage(
          `You're already in ${selectedPartyTypes.join(", ")}. Do you also want to add ${type} party type?`
        );
        setShowConfirmation(true);
      } else {
        setSelectedPartyTypes((prev) => [...prev, type]);
      }
    }
  }
};

const resetPartySpecificFields = () => {
  const resetFields = ["customerProfile", "vendorProfile", ...customerFields.map(f => f.name), ...carrierFields.map(f => f.name)];
  resetFields.forEach(field => form.setValue(field, ""));
  setCargoLimit(false);
  setCreditLimit(false);
};

  const onSubmit = (data) => {
    console.log({ ...data, selectedPartyTypes })
  }

const confirmPartyTypeChange = () => {
  if (pendingPartyType === "Carrier") {
    resetPartySpecificFields();
    setSelectedPartyTypes(["Carrier"]);
  } else {
    resetPartySpecificFields();
    setSelectedPartyTypes((prev) => [...prev.filter((t) => t !== "Carrier"), pendingPartyType]);
  }
  setPendingPartyType(null);
  setShowConfirmation(false);
};

const cancelPartyTypeChange = () => {
  setPendingPartyType(null);
  setShowConfirmation(false);
};

const isConsigneeOrShipper = selectedPartyTypes.some(type => ["Consignee", "Shipper", "Customer", "Carrier"].includes(type));
const isCustomer = selectedPartyTypes.includes("Customer");
const isCarrier = selectedPartyTypes.includes("Carrier");

// to not render sendToShLogin if Carrier, Consignee, Shipper, Notify_party is selected
const hideSendToShLogin = selectedPartyTypes.some((t) =>
  ["Carrier", "Shipper", "Consignee", "Notify_party"].includes(t)
);
const shouldShowSendToShLogin =
  !hideSendToShLogin || selectedPartyTypes.includes("Customer");

  return (
    // <div className="p-4 sm:p-6">
      <div> 
      <Accordion type="single" collapsible>
        <AccordionItem value="partnerDetails">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Partner Details
          </AccordionTrigger>
          <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 p-6">
              <div className="xl:col-span-3 space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        
                        { name: "cid", label: "CID" },
                        { name: "debitorCode", label: "Debitor Code" },
                        { name: "companyCode", label: "Company Code", disabled: true },
                        { name: "shLogin", label: "SH Login Account" },
                        { name: "password", label: "Password", type: "password" },
                        { name: "confirmPassword", label: "Confirm Password", type: "password" },
                        { name: "branchCode", label: "Branch Code", disabled: true },
                        { name: 'departmentCode', label: 'Department Code', type: 'select', options: departmentOptions },                        
                      ].map(({ name, label, type = "text", disabled = false, options = [] }) => (
  <FormField
    key={name}
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          {label}
          {isConsigneeOrShipper && <span className="text-red-500"> *</span>}
        </FormLabel>
        <FormControl>
          {type === "select" ? (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="border-2 border-[#E7ECFD] bg-white w-full">
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : name === "companyCode" || name === "branchCode" ? (
          <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md bg-gray-100">
            <Input
              {...field}
              disabled
              className="w-full px-3 py-2 pr-24 bg-gray-100 rounded-md focus:outline-none focus:border-[#0088d2]"
            />
            <div className="absolute right-2 flex items-center space-x-2">
              {["find", "list", "search"].map((type) => (
                <button
                  key={type}
                  title={type[0].toUpperCase() + type.slice(1)}
                  type="button"
                  onClick={() => {
                      setModalField("companyCode"); // or "branchCode"
                      setModalType("list");
                      setModalType(type); // or "search" or "find"
                      if (name === "branchCode") {
                        const selectedCompany = form.getValues("companyCode");
                        const filtered = branchListData.filter((b) => b.companyCode === selectedCompany);
                        setFilteredBranchData(filtered);
                        setModalField("branchCode");
                        setModalType(type);
                      }
                    }}
                >
                  {type === "find" ? (
                    <FileSearch size={18} className="text-[#0088d2]" />
                  ) : type === "list" ? (
                    <FileText size={18} className="text-[#0088d2]" />
                  ) : (
                    <Search size={18} className="text-[#0088d2]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <Input
            {...field}
            type={type}
            disabled={disabled}
            className={`border-2 border-[#E7ECFD] ${disabled ? "bg-gray-100" : ""}`}
          />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
))}
{shouldShowSendToShLogin && (
  <FormField
    control={form.control}
    name="sendToShLogin"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Send To SH Login
          <span className="text-red-500"> *</span>
        </FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="border-2 border-[#E7ECFD] bg-white w-full">
              <SelectValue placeholder="Select Send To SH Login" />
            </SelectTrigger>
            <SelectContent>
              {sendToShLoginOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)}

{isCustomer && (
  <>
    {customerFields.map((field) => (
<FormField
  key={field.name}
  control={form.control}
  name={field.name}
  render={({ field: controllerField }) => (
    <FormItem className="col-span-1">
      <FormLabel>{field.label}</FormLabel>
      <FormControl>
        {field.type === "input" ? (
          field.name === "customerProfile" ? (
            <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md overflow-hidden">
              <Input
                {...controllerField}
                className="w-full px-3 py-2 bg-white rounded-md border-none focus:outline-none focus:ring-0 focus:border-none"
                placeholder={field.placeholder}
              />
              <div className="absolute right-0 h-full bg-gray-100 flex items-center px-2 space-x-2">
                <button
                  title="List"
                  type="button"
                  onClick={() => {
                    setModalField("customerProfile");
                    setModalType("list");
                    setFilteredCustomerProfiles(customerProfileData);
                  }}
                >
                  <FileText size={18} className="text-[#0088d2]" />
                </button>
                <button
                  title="Search"
                  type="button"
                  onClick={() => {
                    const id = form.getValues("customerProfile");
                    const match = customerProfileData.filter((x) => x["Customer Profile Id"] === id);
                    setModalField("customerProfile");
                    setModalType("search");
                    setFilteredCustomerProfiles(match.length > 0 ? match : []);
                  }}
                >
                  <Search size={18} className="text-[#0088d2]" />
                </button>
              </div>
            </div>
          ) : (
            <Input
              {...controllerField}
              className="border-2 border-[#E7ECFD]"
              placeholder={field.placeholder}
            />
          )
        ) : (
          <Select
            onValueChange={controllerField.onChange}
            defaultValue={controllerField.value}
          >
            <SelectTrigger className="border-2 border-[#E7ECFD] bg-white w-full">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

))}

    <div className="col-span-4 grid grid-cols-4 gap-4 items-start mt-4">
      <div className="col-span-1 flex items-center gap-2">
        <Checkbox id="cargoLimit" checked={cargoLimit} onCheckedChange={setCargoLimit} />
        <label htmlFor="cargoLimit" className="text-sm font-semibold">Cargo Limit</label>
      </div>

      {cargoLimit && (
        <div className="col-span-1 space-y-2">
          <FormLabel>Limit Amount</FormLabel>
          <div className="flex gap-2">
            <Input placeholder="Amount" className="border-2 border-[#E7ECFD] w-[60%]" />
            <Select>
              <SelectTrigger className="border-2 border-[#E7ECFD] bg-white w-[40%]">
                <SelectValue placeholder="THB" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormLabel>Limit</FormLabel>
          <Input className="border-2 border-[#E7ECFD] bg-gray-200" value="Limit Utilized" disabled />
        </div>
      )}

      <div className="col-span-1 flex items-center gap-2">
        <Checkbox id="creditLimit" checked={creditLimit} onCheckedChange={setCreditLimit} />
        <label htmlFor="creditLimit" className="text-sm font-semibold">Credit Limit</label>
      </div>

      {creditLimit && (
        <div className="col-span-1 space-y-2">
          <FormLabel>Credit Limit Amount</FormLabel>
          <div className="flex gap-2">
            <Input placeholder="Amount" className="border-2 border-[#E7ECFD] w-[60%]" />
            <Select>
              <SelectTrigger className="border-2 border-[#E7ECFD] bg-white w-[40%]">
                <SelectValue placeholder="THB" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormLabel>Limit</FormLabel>
          <Input value="Limit Utilized" className="border-2 border-[#E7ECFD] bg-gray-200" disabled />
        </div>
      )}

      <div className="col-span-1 flex items-center gap-2">
        <Checkbox id="tariffValidation" />
        <Label htmlFor="tariffValidation" className="text-sm font-semibold">
          Tariff Validation
        </Label>
      </div>
    </div>
  </>
)}



          {isCarrier && (
  <>
      {carrierFields.map((field) => (
      <FormField
  key={field.name}
  control={form.control}
  name={field.name}
  render={({ field: controllerField }) => (
    <FormItem>
      <FormLabel>{field.label}</FormLabel>
      <FormControl>
        {field.type === "input" ? (
          field.name === "vendorProfile" ? (
            <div className="relative flex items-center border-2 border-[#E7ECFD] rounded-md overflow-hidden">
              <Input
                {...controllerField}
                className="w-full px-3 py-2 bg-white rounded-md border-none focus:outline-none focus:ring-0 focus:border-none"
              />
              <div className="absolute right-0 h-full bg-gray-100 flex items-center px-2 space-x-2">
                <Button
                  title="List"
                  type="button"
                  className="p-0"
                  variant={"ghost"}
                  onClick={() => {
                    setModalField("vendorProfile");
                    setModalType("list");
                    setFilteredVendorProfiles(vendorProfileData);
                  }}
                >
                  <FileText size={18} className="text-[#0088d2] [&_svg]:size-6" />
                </Button>
                <button
                  title="Search"
                  type="button"
                  onClick={() => {
                    const id = form.getValues("vendorProfile");
                    const match = vendorProfileData.filter((x) => x["Vendor Profile Id"] === id);
                    setModalField("vendorProfile");
                    setModalType("search");
                    setFilteredVendorProfiles(match.length > 0 ? match : []);
                  }}
                >
                  <Search size={18} className="text-[#0088d2]" />
                </button>
              </div>
            </div>
          ) : (
            <Input {...controllerField} className="border-2 border-[#E7ECFD]" />
          )
        ) : (
          <Select onValueChange={controllerField.onChange} defaultValue={controllerField.value}>
            <SelectTrigger className="border-2 border-[#E7ECFD] bg-white w-full">
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormControl>
    </FormItem>
  )}
/>
    ))}

    <div className="col-span-4 grid grid-cols-4 gap-4 mt-4">
      {carrierCheckboxes.map((cb) => (
        <FormField
          key={cb.name}
          control={form.control}
          name={cb.name}
          render={({ field: controllerField }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  id={cb.name}
                  checked={controllerField.value}
                  onCheckedChange={controllerField.onChange}
                />
              </FormControl>
              <FormLabel htmlFor={cb.name} className="text-sm font-semibold">
                {cb.label}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>
  </>
)}

                    </div>
                    <div className="mt-6">
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </Form>
              </div>

              <div className="xl:col-span-1 relative">
                <div className="border-2 border-[#E7ECFD] rounded-md bg-white p-4">
                  <span className="absolute -top-2 left-4 bg-white px-1 text-sm font-semibold text-[#333]">
                    Party Types
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                      {partyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={selectedPartyTypes.includes(type)}
                            onCheckedChange={() => handleCheckboxChange(type)}
                          />
                          <label htmlFor={type} className="text-sm font-semibold">
                            {type}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            
{/* resubale modal code */}

<ReusableModal
  open={modalField !== null}
  onClose={() => {
    setModalField(null);
    setModalType(null);
React.useEffect(() => {
  if (open) {
    setSelectedIndex(null);
  }
}, [open, title]); // `title` changes on modalField change
  }}
  
  title={
    modalField === "companyCode"
      ? modalType === "list"
        ? "List of Companies"
        : modalType === "search"
        ? "Search Company Details"
        : "Select Company"
      : modalField === "branchCode"
      ? modalType === "list"
        ? "List of Branches"
        : modalType === "search"
        ? "Search Branch Details"
        : "Select Branch"
      : modalField === "customerProfile"
      ? modalType === "list"
        ? "List of Customer Profiles"
        : "Search Customer Profile"
      : modalType === "list"
        ? "List of Vendor Profiles"
        : "Search Vendor Profile Details"
  }
  columns={
    modalField === "companyCode"
      ? companyModalColumns
      : modalField === "branchCode"
      ? branchModalColumns
      : modalField === "customerProfile"
      ? ["Customer Profile Id", "Name", "Branch Code", "Company Code"]
      : ["Vendor Profile Id", "Name", "Branch Code", "Company Code"]
  }
  data={
    modalField === "companyCode"
      ? modalType === "list"
        ? companyListData
        : modalType === "search"
        ? companySearchData
        : companyFindData
      : modalField === "branchCode"
      ? filteredBranchData
      : modalField === "customerProfile"
      ? filteredCustomerProfiles
      : filteredVendorProfiles
  }
  onSelect={(row) => {
    if (modalField === "companyCode") {
      form.setValue("companyCode", row["Company Code"]);
      form.setValue("branchCode", ""); // reset branch
    } else if (modalField === "branchCode") {
      form.setValue("branchCode", row["Branch Code"]);
    } else if (modalField === "customerProfile") {
      form.setValue("customerProfile", row["Customer Profile Id"]);
    } else if (modalField === "vendorProfile") {
      form.setValue("vendorProfile", row["Vendor Profile Id"]);
    }
    setModalField(null);
    setModalType(null);
  }}
/>

<Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Party Type Change</DialogTitle>
    </DialogHeader>
    <div className="text-sm text-gray-700">
      {dialogMessage}
    </div>
    <DialogFooter className="mt-4">
      <Button variant="outline" onClick={cancelPartyTypeChange}>Cancel</Button>
      <Button onClick={confirmPartyTypeChange}>Yes, Proceed</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}