"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const tabs = [
  { label: "General Info", key: "general" },
  { label: "Order Financials", key: "financials" },
];

export default function BookingViewPage() {
  const params = useParams();
  const id = params.id;
  const [booking, setBooking] = useState({});
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    fetch("/bookingData.json")
      .then(res => res.json())
      .then(data => setBooking(data[id] || {}));
  }, [id]);

  return (
    <div className="px-8"> {/* Add padding to match forms */}
      <nav className="flex border-b border-gray-200 mb-6 px-8"> {/* Add px-8 for tab bar */}
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-[#006397] text-[#006397] bg-white"
                : "border-transparent text-gray-500 hover:text-[#006397]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {activeTab === "general" && (
        <Accordion type="multiple" className="mb-6">
          {booking.generalInfo &&
            Object.entries(booking.generalInfo).map(([section, fields]) => {
              if (section === "Routing Details") {
                return (
                  <AccordionItem value={section} key={section}>
                    <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
                      {section}
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(fields).map(([cardTitle, cardFields]) => (
                          <Card key={cardTitle} className="border-t-4 border-[#0088d2]">
                            <CardHeader className="pt-8 pb-4">
                              <CardTitle className="text-[#0088d2] text-lg font-semibold mb-4">{cardTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(cardFields).map(([label, value]) => (
                                  <div key={label} className="md:col-span-1">
                                    <div className="text-sm font-semibold text-[#162d56] mb-1">{label}</div>
                                    <div className="text-base text-gray-500">{value}</div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              } else if (section === "Shipping Info") {
                // Render a single accordion for Cargo Details & Involved Parties
                return (
                  <AccordionItem value="CargoAndParties" key="CargoAndParties">
                    <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
                      Cargo Details & Involved Parties
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cargo Details Card */}
                        <div className="bg-white rounded-xl shadow border p-6">
                          <div className="text-lg font-semibold mb-4 border-b pb-2">Cargo Details</div>
                          <div>
                            {Object.entries(booking.generalInfo["Shipping Info"] || {}).map(([label, value]) => (
                              <div key={label} className="flex mb-2">
                                <div className="w-1/2 font-semibold text-[#162d56]">{label}</div>
                                <div className="w-1/2 text-gray-700">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Involved Parties Card */}
                        <div className="bg-white rounded-xl shadow border p-6">
                          <div className="text-lg font-semibold mb-4 border-b pb-2">Involved Parties</div>
                          <div>
                            {Object.entries(booking.generalInfo["Other"] || {}).map(([label, value]) => (
                              <div key={label} className="flex mb-2">
                                <div className="w-1/2 font-semibold text-[#162d56]">{label}</div>
                                <div className="w-1/2 text-gray-700">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              } else if (section === "Other") {
                // Don't render a separate Other accordion
                return null;
              } else {
                // ...existing General Info and other accordions...
                return (
                  <AccordionItem value={section} key={section}>
                    <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
                      {section}
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {Object.entries(fields).map(([label, value]) => (
                          <div key={label} className="md:col-span-1">
                            <div className="text-sm font-semibold text-[#162d56] mb-1">{label}</div>
                            <div className="text-base text-gray-500">{value}</div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              }
            })}
        </Accordion>
      )}
      {activeTab === "financials" && (
        <Accordion type="multiple" className="mb-6">
          <AccordionItem value="financials">
            <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
              Order Financials
            </AccordionTrigger>
            <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {booking.financials &&
                  Object.entries(booking.financials).map(([label, value]) => (
                    <div key={label} className="md:col-span-1">
                      <div className="text-sm font-semibold text-[#162d56] mb-1">{label}</div>
                      <div className="text-base text-gray-500">{value}</div>
                    </div>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
} 