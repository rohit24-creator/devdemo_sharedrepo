"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Home, Package, Users } from "lucide-react";
import ReusableTable from "@/components/ui/reusableComponent/ordersReusableTable";
import { TabsNavbar } from "@/components/ui/reusableComponent/tabsNavbar";

// Import the orderFinancials page as component
import OrderFinancialsPage from "./orderFinancials/page";

const generalInfoSchema = z.object({
  bookingId: z.string(),
  product: z.string().min(1, { message: "Product is required" }),
  orderStatus: z.string().optional(),
  companyCode: z.string().min(1, { message: "Company Code is required" }),
  externalOrderId: z.string().optional(),
  deliveryTerms: z.string().optional(),
  service: z.string().min(1, { message: "Service is required" }),
  branchCode: z.string().min(1, { message: "Branch Code is required" }),
  incoTerms: z.string().optional(),
  orderType: z.string().min(1, { message: "Order Type is required" }),
  modeOfTransport: z.string().min(1, { message: "Mode Of Transport is required" }),
  departmentCode: z.string().min(1, { message: "Department Code is required" }),
  customerId: z.string().min(1, { message: "Customer ID is required" }),
  custDo: z.string().optional(),
  custRefPo: z.string().optional(),
  goodsValue: z.string().optional(),
  originalDocumentSent: z.string().optional(),
  originalDocumentReceived: z.string().optional(),
  shipmentType: z.string().optional(),
  region: z.string().optional(),
  driverPickupInstructions: z.string().optional(),
  driverDeliveryInstructions: z.string().optional(),
  loadBoard123: z.boolean().default(false),
  truckStop: z.boolean().default(false),
  dat: z.boolean().default(false),
});

const shipperSchema = z.object({
  shipperId: z.string().min(1, { message: "Shipper ID is required" }),
  shipperName: z.string().min(1, { message: "Shipper Name is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  estimatedEarlyPickup: z.string().min(1, { message: "Estimated Early Pickup is required" }),
  city: z.string().min(1, { message: "City is required" }),
  estimatedLatePickup: z.string().min(1, { message: "Estimated Late Pickup is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  zipcode: z.string().min(1, { message: "Zipcode is required" }),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
});

const consigneeSchema = z.object({
  consigneeId: z.string().min(1, { message: "Consignee ID is required" }),
  consigneeName: z.string().min(1, { message: "Consignee Name is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  estimatedEarlyDelivery: z.string().min(1, { message: "Estimated Early Delivery is required" }),
  city: z.string().min(1, { message: "City is required" }),
  estimatedLateDelivery: z.string().min(1, { message: "Estimated Late Delivery is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  zipcode: z.string().min(1, { message: "Zipcode is required" }),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
});

const shipperFields = [
  { name: "shipperId", label: "Shipper ID *" },
  { name: "shipperName", label: "Shipper Name *" },
  { name: "street", label: "Street *" },
  { name: "estimatedEarlyPickup", label: "Estimated Early Pickup *", type: "date" },
  { name: "city", label: "City *" },
  { name: "estimatedLatePickup", label: "Estimated Late Pickup *", type: "date" },
  { name: "province", label: "Province *" },
  { name: "country", label: "Country *" },
  { name: "zipcode", label: "Zipcode *" },
  { name: "phone", label: "Phone" },
  { name: "fax", label: "Fax" },
  { name: "email", label: "Email" },
];

const consigneeFields = [
  { name: "consigneeId", label: "Consignee ID *" },
  { name: "consigneeName", label: "Consignee Name *" },
  { name: "estimatedEarlyDelivery", label: "Estimated Early Delivery *", type: "date" },
  { name: "street", label: "Street *" },
  { name: "city", label: "City *" },
  { name: "estimatedLateDelivery", label: "Estimated Late Delivery *", type: "date" },
  { name: "province", label: "Province *" },
  { name: "country", label: "Country *" },
  { name: "zipcode", label: "Zipcode *" },
  { name: "phone", label: "Phone" },
  { name: "fax", label: "Fax" },
  { name: "email", label: "Email" },
];

const generalInfoFields = [
  { name: "bookingId", label: "Booking ID", disabled: true },
  { name: "product", label: "Product *", type: "select", options: ["Mobile", "Laptop", "Tablet"] },
  { name: "orderStatus", label: "Order Status", type: "select", options: ["PENDING", "CONFIRMED", "CANCELLED"] },
  { name: "companyCode", label: "Company Code *" },
  { name: "externalOrderId", label: "External Order ID" },
  { name: "deliveryTerms", label: "Delivery Terms", type: "select", options: ["FOB", "CIF", "EXW"] },
  { name: "service", label: "Service *", type: "select", options: ["Air", "Sea", "Road"] },
  { name: "branchCode", label: "Branch Code *" },
  { name: "incoTerms", label: "Inco Terms", type: "select", options: ["FOB", "CIF", "EXW"] },
  { name: "orderType", label: "Order Type *", type: "select", options: ["Bulk", "Single"] },
  { name: "modeOfTransport", label: "Mode Of Transport *", type: "select", options: ["Truck", "Rail", "Ship"] },
  { name: "departmentCode", label: "Department Code *", type: "select", options: ["Sales", "Logistics"] },
  { name: "customerId", label: "Customer ID *" },
  { name: "custDo", label: "# Cust-DO" },
  { name: "custRefPo", label: "# Custref-PO" },
  { name: "goodsValue", label: "Goods Value", unitOptions: ["USD"] },
  { name: "originalDocumentSent", label: "Original Document Sent", type: "date" },
  { name: "originalDocumentReceived", label: "Original Document Received", type: "date" },
  { name: "shipmentType", label: "Shipment Type", type: "select", options: ["Type1", "Type2"] },
  { name: "region", label: "Region", type: "select", options: ["North", "South", "East", "West"] },
  { name: "driverPickupInstructions", label: "Driver Pickup Instructions", type: "textarea", wide: true },
  { name: "driverDeliveryInstructions", label: "Driver Delivery Instructions", type: "textarea", wide: true },
  { name: "loadBoard123", placeholder: "123 Load Board", type: "checkbox" },
  { name: "truckStop", placeholder: "Truck Stop", type: "checkbox" },
  { name: "dat", placeholder: "DAT", type: "checkbox" },
];

// Cargo Details Fields
const cargoFields = [
  { key: 'packageType', label: 'Package Type', type: 'text+icons', icon: Truck },
  { key: 'goodsDescription', label: 'Goods Description', type: 'text', icon: Package },
  { key: 'quantity', label: 'Quantity', type: 'number', icon: Package },
  { key: 'itemId', label: 'Item ID', type: 'text', icon: Package },
  { key: 'scannedQuantity', label: 'Scanned Quantity', type: 'number', icon: Package },
  { key: 'length', label: 'Length', type: 'number+unit', icon: Package, unitKey: 'lengthUnit',  unitOptions: ['M', 'CM', 'MM'] },
  { key: 'width', label: 'Width', type: 'number+unit', icon: Package, unitKey: 'widthUnit', unitOptions: ['M', 'CM', 'MM'] },
  { key: 'height', label: 'Height', type: 'number+unit', icon: Package, unitKey: 'heightUnit', unitOptions: ['M', 'CM', 'MM'] },
  { key: 'actualWeight', label: 'Actual Weight', type: 'number+unit', icon: Package, unitKey: 'actualWeightUnit', unitOptions: ['Kg', 'Lb'] },
  { key: 'weight', label: 'Weight', type: 'number+unit', icon: Package, unitKey: 'weightUnit', unitOptions: ['Kg', 'Lb'] },
  { key: 'volumetricWeight', label: 'Volumetric Weight', type: 'number+unit', icon: Package, unitKey: 'volumetricWeightUnit', unitOptions: ['Kg', 'Lb'] },
  { key: 'actualVolume', label: 'Actual Volume', type: 'number+unit', icon: Package, unitKey: 'actualVolumeUnit', unitOptions: ['cbm', 'l'] },
  { key: 'volume', label: 'Volume', type: 'number+unit', icon: Package, unitKey: 'volumeUnit', unitOptions: ['cbm', 'l'] },
  { key: 'ldm', label: 'LDM', type: 'text', icon: Package },
  { key: 'stackable', label: 'Stackable', type: 'checkbox'},
  { key: 'grounded', label: 'Grounded', type: 'checkbox' },
  { key: 'split', label: 'Split', type: 'checkbox' },
  { key: 'dgGoods', label: 'DG Goods', type: 'checkbox' },
];

// Involved Parties Fields
const partyFields = [
  { key: "partyId", label: "Party ID", type: "text+icons", icon: Users, showPlus: false },
  { key: "partyName", label: "Party Name", type: "text", icon: Users },
  { key: "role", label: "Role", type: "select", icon: Users, options: ["Shipper", "Consignee", "Notify", "Carrier", "Agent", "Other"] },
  { key: "street", label: "Street", type: "text", icon: Users },
  { key: "city", label: "City", type: "text", icon: Users },
  { key: "province", label: "Province", type: "text", icon: Users },
  { key: "country", label: "Country", type: "text", icon: Users },
  { key: "zipcode", label: "Zipcode", type: "text", icon: Users },
  { key: "mobile", label: "Mobile", type: "text", icon: Users },
  { key: "fax", label: "Fax", type: "text", icon: Users },
  { key: "email", label: "Email", type: "text", icon: Users },
];

// Form Fields for Modals
const itemFormFields = [
  { name: "packageType", label: "Package Type", type: "text", required: true },
  { name: "itemName", label: "Item Name", type: "text", required: true },
  { name: "description", label: "Description", type: "text" },
  { name: "length", label: "Length", type: "number+unit", unitName: "lengthUnit", unitOptions: ["M", "CM", "MM"], required: true },
  { name: "width", label: "Width", type: "number+unit", unitName: "widthUnit", unitOptions: ["M", "CM", "MM"], required: true },
  { name: "height", label: "Height", type: "number+unit", unitName: "heightUnit", unitOptions: ["M", "CM", "MM"], required: true },
  { name: "actualWeight", label: "Actual Weight", type: "number+unit", unitName: "actualWeightUnit", unitOptions: ["kg", "g", "lb"], required: true },
  { name: "weight", label: "Weight", type: "number+unit", unitName: "weightUnit", unitOptions: ["kg", "g", "lb"], required: true },
  { name: "volumetricWeight", label: "Volumetric Weight", type: "number+unit", unitName: "volumetricWeightUnit", unitOptions: ["kg", "g", "lb"], required: true },
  { name: "actualVolume", label: "Actual Volume", type: "number+unit", unitName: "actualVolumeUnit", unitOptions: ["cbm", "l", "CM3"], required: true },
  { name: "volume", label: "Volume", type: "number+unit", unitName: "volumeUnit", unitOptions: ["cbm", "l", "CM3"], required: true },
  { name: "itemNumber", label: "Item Number", type: "text" },
  { name: "hsnCode", label: "HSN Code", type: "text" },
  { name: "colorCode", label: "Color Code", type: "text" },
  { name: "colorCodeName", label: "Color Code Name", type: "text" },
  { name: "sizeCode", label: "Size Code", type: "text" },
  { name: "sizeCodeName", label: "Size Code Name", type: "text" },
  { name: "unitPrice", label: "Unit Price", type: "text" },
];

const partyFormFields = [
  { name: "partyId", label: "Party ID", type: "text", required: true },
  { name: "partyName", label: "Party Name", type: "text", required: true },
  { name: "role", label: "Role", type: "select", options: ["Shipper", "Consignee", "Notify", "Carrier", "Agent", "Other"] },
  { name: "street", label: "Street", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "province", label: "Province", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "zipcode", label: "Zipcode", type: "text" },
  { name: "mobile", label: "Mobile", type: "text" },
  { name: "fax", label: "Fax", type: "text" },
  { name: "email", label: "Email", type: "text" },
];

// Modal Data
const packageTypeList = [
  { "Package Type": "item-1", Length: "1111.00m", Width: "111.00m", Height: "1111.00m", "Actual Weight": "11.00kg", Weight: "11.000kg", "Volumetric Weight": "111.00kg", "Actual Volume": "11.000cbm", Volume: "11.000", "Description": "Sample item 1" },
  { "Package Type": "METALS", Length: "22.00m", Width: "22.00m", Height: "45.00m", "Actual Weight": "200.00kg", Weight: "700.000kg", "Volumetric Weight": "46.00kg", "Actual Volume": "0.000cbm", Volume: "0.000", "Description": "Metal goods" },
  { "Package Type": "BX", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Box type cargo" },
  { "Package Type": "CNT", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Container cargo" },
  { "Package Type": "CTN", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Carton cargo" },
  { "Package Type": "PCS", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Pieces" },
  { "Package Type": "PKG", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Package" },
  { "Package Type": "PLT", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Pallet" },
  { "Package Type": "BOXES TEST AKL FNT", Length: "0.00m", Width: "0.00m", Height: "0.00m", "Actual Weight": "0.00kg", Weight: "10.000kg", "Volumetric Weight": "0.00", "Actual Volume": "0.000cbm", Volume: "0.000", "Description": "Test boxes" },
  { "Package Type": "Cotton Relaxed Ankle Pants", Length: "58.00CM", Width: "37.00CM", Height: "24.00CM", "Actual Weight": "20000.00G", Weight: "0", "Volumetric Weight": "0", "Actual Volume": "51504.000CM3", Volume: "0", "Description": "Garment item" },
];

const partyList = [
  { "Party ID": "P001", "Party Name": "Acme Corp", Role: "Shipper", City: "New York", Country: "USA" },
  { "Party ID": "P002", "Party Name": "Beta Ltd", Role: "Consignee", City: "London", Country: "UK" },
  { "Party ID": "P003", "Party Name": "Gamma LLC", Role: "Notify", City: "Berlin", Country: "Germany" },
];

const packageTypeColumns = ["Package Type", "Length", "Width", "Height", "Actual Weight", "Weight", "Volumetric Weight", "Actual Volume", "Volume","Description"];
const partyColumns = ["Party ID", "Party Name", "Role", "City", "Country"];

function OrdersContent() {
  const [cargoData, setCargoData] = useState([]);
  const [partyData, setPartyData] = useState([]);

  const generalInfoForm = useForm({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      bookingId: "Auto-generated",
      product: "",
      orderStatus: "",
      companyCode: "",
      externalOrderId: "",
      deliveryTerms: "",
      service: "",
      branchCode: "",
      incoTerms: "",
      orderType: "",
      modeOfTransport: "",
      departmentCode: "",
      customerId: "",
      custDo: "",
      custRefPo: "",
      goodsValue: "",
      originalDocumentSent: "",
      originalDocumentReceived: "",
      shipmentType: "",
      region: "",
      driverPickupInstructions: "",
      driverDeliveryInstructions: "",
      loadBoard123: false,
      truckStop: false,
      dat: false,
    },
  });

  const shipperForm = useForm({
    resolver: zodResolver(shipperSchema),
    defaultValues: {
      shipperId: "",
      shipperName: "",
      street: "",
      estimatedEarlyPickup: "",
      city: "",
      estimatedLatePickup: "",
      province: "",
      country: "",
      zipcode: "",
      phone: "",
      fax: "",
      email: "",
    },
  });

  const consigneeForm = useForm({
    resolver: zodResolver(consigneeSchema),
    defaultValues: {
      consigneeId: "",
      consigneeName: "",
      estimatedEarlyDelivery: "",
      street: "",
      city: "",
      estimatedLateDelivery: "",
      province: "",
      country: "",
      zipcode: "",
      phone: "",
      fax: "",
      email: "",
    },
  });

  const dummyForm = useForm();

  const handleCargoDataChange = (newData) => {
    setCargoData(newData);
    console.log('Cargo data updated:', newData);
  };

  const handlePartyDataChange = (newData) => {
    setPartyData(newData);
    console.log('Party data updated:', newData);
  };

  const sections = [
    {
      title: "General Info",
      type: "form",
      form: generalInfoForm,
      fields: generalInfoFields,
    },
    {
      title: "Routing Details",
      type: "form",
      form: dummyForm,
      onSubmit: () => {},
      onInvalid: () => {},
      fields: [],
      renderLayout: ({ renderField }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipper Card */}
          <Card className="shadow-lg border-t-4 border-[#0088d2]">
            <CardContent className="pt-8">
              <FormProvider {...shipperForm}>
                <form>
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-[#0088d2] rounded-full p-4 mb-2">
                      <Truck size={32} color="white" />
                    </div>
                    <div className="text-[#0088d2] text-lg font-semibold">Shipper</div>
                    <label className="flex items-center mt-2 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Save to Party Master
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {shipperFields.map(field =>
                      renderField(field, shipperForm, 0)
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
          {/* Consignee Card */}
          <Card className="shadow-lg border-t-4 border-[#0088d2]">
            <CardContent className="pt-8">
              <FormProvider {...consigneeForm}>
                <form>
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-[#0088d2] rounded-full p-4 mb-2">
                      <Home size={32} color="white" />
                    </div>
                    <div className="text-[#0088d2] text-lg font-semibold">Consignee</div>
                    <label className="flex items-center mt-2 text-sm">
                      <input type="checkbox" className="mr-2" />
                      Save to Party Master
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {consigneeFields.map(field =>
                      renderField(field, consigneeForm, 1)
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Cargo Details",
      type: "custom",
      renderLayout: () => (
        <ReusableTable
          fields={cargoFields}
          defaultValues={cargoData}
          modalData={{
            data: packageTypeList,
            columns: packageTypeColumns,
            title: "List of Items"
          }}
          formFields={itemFormFields}
          onDataChange={handleCargoDataChange}
        />
      )
    },
    {
      title: "Involved Parties",
      type: "custom",
      renderLayout: () => (
        <ReusableTable
          fields={partyFields}
          defaultValues={partyData}
          formFields={partyFormFields}
          modalData={{
            data: partyList,
            columns: partyColumns,
            title: "List of Parties"
          }}
          onDataChange={handlePartyDataChange}
        />
      )
    }
  ];

  return (
    <OrdersForm sections={sections} useAccordion={true} />
  );
}

// Main Orders Page with Tabs
export default function OrdersPage() {
  // Define tabs configuration
  const tabs = [
    {
      value: "orders",
      label: "Orders",
      component: OrdersContent,
    },
    {
      value: "orderFinancials",
      label: "Order Financials",
      component: OrderFinancialsPage,
    },
  ];

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#006397]">Orders</h2>
      </div>

      {/* Tabs Navigation */}
      <TabsNavbar tabs={tabs} defaultTab="orders" />
    </div>
  );
}