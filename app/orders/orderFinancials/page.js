"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Hourglass, Handshake, DollarSign } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FinancialsTable } from "@/components/ui/reusableComponent/financialsTable";

const filterFields = [
  { name: "rateService", label: "Rate Service", options: ["Service1", "Service2"] },
  { name: "lane", label: "Lane", options: ["Lane1", "Lane2"] },
  { name: "rateOffering", label: "Rate Offering", options: ["Offering1", "Offering2"] },
  { name: "rateRecord", label: "Rate Record", options: ["Record1", "Record2"] },
];

const tableHeaders = [
  { key: "role", label: "Role" },
  { key: "code", label: "Code" },
  { key: "name", label: "Name" },
  { key: "amount", label: "Amount" },
  { key: "bu", label: "BU" },
  { key: "flightRecorder", label: "Flight Recorder" },
  { key: "foreignCurrency", label: "Foreign Currency" },
  { key: "currencyExchange", label: "currency_exchange" },
  { key: "exchangeRate", label: "Exchange Rate" },
  { key: "invoiceNumber", label: "Invoice Number" },
  { key: "idCard", label: "id_card" },
  { key: "creditNoteNumber", label: "Credit Note Number" },
  { key: "invoiceDate", label: "Invoice Date" },
  { key: "invoiceCreationDate", label: "Invoice Creation Date" },
  { key: "invoiceReceivedDate", label: "Invoice Received Date" },
  { key: "status", label: "status" },
];

const customerModalData = [
  {
    Code: "CUST001",
    Name: "John Doe",
    Amount: "1000",
    BU: "BU1",
    "Flight Recorder": "Yes",
    "Foreign Currency": "USD",
    currency_exchange: "USD/EUR",
    "Exchange Rate": "1.1",
    "Invoice Number": "INV001",
    id_card: "ID123",
    "Credit Note Number": "CN001",
    "Invoice Date": "2024-06-01",
    "Invoice Creation Date": "2024-06-02",
    "Invoice Received Date": "2024-06-03",
    status: "Paid"
  },
  {
    Code: "CUST002",
    Name: "Jane Smith",
    Amount: "2000",
    BU: "BU2",
    "Flight Recorder": "No",
    "Foreign Currency": "EUR",
    currency_exchange: "EUR/USD",
    "Exchange Rate": "0.9",
    "Invoice Number": "INV002",
    id_card: "ID456",
    "Credit Note Number": "CN002",
    "Invoice Date": "2024-06-04",
    "Invoice Creation Date": "2024-06-05",
    "Invoice Received Date": "2024-06-06",
    status: "Unpaid"
  },
];

export default function OrderFinancialsPage() {
  return (
    <div className="px-4 md:px-8 py-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#162d56] mb-4">Order Financials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
        {/* Gross Profit Card */}
        <Card className="flex flex-col h-full">
          <CardContent className="flex flex-col h-full p-6">
            <div className="flex items-center mb-2">
              <Hourglass className="text-[#006397] mr-2" size={20} />
              <span className="text-lg font-semibold text-[#006397]">Gross Profit</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 text-[#162d56] text-sm">
              <div>Total revenue</div>
              <div>Total Cost</div>
              <div>Gross Profit</div>
            </div>
          </CardContent>
        </Card>
        {/* Revenue Breakup Card */}
        <Card className="flex flex-col h-full">
          <CardContent className="flex flex-col h-full p-6">
            <div className="flex items-center mb-2">
              <Handshake className="text-[#006397] mr-2" size={20} />
              <span className="text-lg font-semibold text-[#006397]">Revenue Breakup -</span>
            </div>
            <div className="flex-1 flex flex-row justify-between text-[#162d56] text-sm">
              <span>Party</span>
              <span>Charges</span>
            </div>
          </CardContent>
        </Card>
        {/* Cost Breakup Card */}
        <Card className="flex flex-col h-full">
          <CardContent className="flex flex-col h-full p-6">
            <div className="flex items-center mb-2">
              <DollarSign className="text-[#006397] mr-2" size={20} />
              <span className="text-lg font-semibold text-[#006397]">Cost Breakup -</span>
            </div>
            <div className="flex-1 flex flex-row justify-between text-[#162d56] text-sm">
              <span>Cost</span>
              <span>Charges</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs and tables section */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="mb-4 border-b border-[#E7ECFD] bg-transparent">
          <TabsTrigger
            value="revenue"
            className="rounded-full px-6 py-2 text-[#006397] font-semibold data-[state=active]:border-b-2 data-[state=active]:border-[#006397] data-[state=active]:bg-white border-b-2 border-transparent"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="cost"
            className="rounded-full px-6 py-2 text-[#006397] font-semibold data-[state=active]:border-b-2 data-[state=active]:border-[#006397] data-[state=active]:bg-white border-b-2 border-transparent"
          >
            Cost
          </TabsTrigger>
        </TabsList>
        <TabsContent value="revenue">
          <div className="bg-white rounded-lg shadow px-6 pb-6 mb-6">
            {/* Filter row */}
            <div className="flex flex-wrap gap-4 mb-4 items-end pt-6">
              {filterFields.map((field) => (
                <div key={field.name} className="min-w-[180px]">
                  <label className="block text-sm font-medium text-[#162d56] mb-1">{field.label}</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button className="rounded-full px-6 bg-[#006397] text-white">Apply</Button>
            </div>
            {/* Table */}
            <FinancialsTable headers={tableHeaders} modalData={customerModalData} />
          </div>
        </TabsContent>
        <TabsContent value="cost">
          <div className="bg-white rounded-lg shadow px-6 pb-6 mb-6 pt-6">
            <FinancialsTable headers={tableHeaders} modalData={customerModalData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 