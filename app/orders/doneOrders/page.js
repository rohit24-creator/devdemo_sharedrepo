"use client"
import React, { useState } from "react";
import OrderListWithActions from "@/components/ui/reusableComponent/OrderListWithActions";

const sampleDoneOrders = [
  {
    bookingId: "9125170004",
    from: "Ankleshwar",
    to: "Rotterdam",
    date: "23 Apr 2025",
    etaLabel: "ETA",
    eta: "15 May 2025 7:25 PM",
    shipmentId: "SX1745439858",
    documents: [
      { location: "Baroi, Gujarat", docType: "POD", stopId: "487874", stopType: "D", createdBy: "SHIVA MUNI", time: "08 May,25 09:32 PM" },
    ],
  },
  // ...more orders
];

const filterFields = [
  { name: "fromDate", label: "From Date", type: "date" },
  { name: "toDate", label: "To Date", type: "date" },
  { name: "bookingId", label: "Booking ID" },
  { name: "referenceNo", label: "Reference No." },
];

export default function DoneOrdersPage() {
  const [orders, setOrders] = useState(sampleDoneOrders);
  const handleSearch = (filters) => {
    // Implement search logic here
    // For now, just log
    console.log("Search filters:", filters);
  };
  const handleDownload = (order) => {
    alert(`Download ePOD for ${order.bookingId}`);
  };
  const handleDownloadLR = (order) => {
    alert(`Download LR Report for ${order.bookingId}`);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Done Orders</h1>
      <OrderListWithActions
        orders={orders}
        filterFields={filterFields}
        actionsConfig={{
          view: true,
          status: true,
          liveTrack: true,
          manageDocs: true,
          download: true,
          lrReport: true,
          checkbox: true,
        }}
        onSearch={handleSearch}
        onDownload={handleDownload}
        onDownloadLR={handleDownloadLR}
      />
    </div>
  );
} 