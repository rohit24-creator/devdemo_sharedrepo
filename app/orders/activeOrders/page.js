"use client"
import React, { useState } from "react";
import OrderListWithActions from "@/components/ui/reusableComponent/OrderListWithActions";

const sampleActiveOrders = [
  {
    bookingId: "6525190016",
    from: "Ankleshwar",
    to: "Kutch",
    date: "08 May 2025",
    etaLabel: "ETA",
    eta: "15 May 2025 4:00 PM",
    shipmentId: "SX1746698680",
    statusHistory: [],
    attachedDocuments: [],
    drivers: [],
    distance: "100 mi",
    duration: "2 hours",
    documents: [
      { location: "GIDC, Ankleshwar", docType: "PUP", stopId: "487873", stopType: "P", createdBy: "SHIVA MUNI", time: "08 May,25 09:31 PM" },
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

export default function ActiveOrdersPage() {
  const [orders, setOrders] = useState(sampleActiveOrders);
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
      <h1 className="text-2xl font-bold mb-4">Active Orders</h1>
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
          checkbox: false,
        }}
        onSearch={handleSearch}
        onDownload={handleDownload}
        onDownloadLR={handleDownloadLR}
      />
    </div>
  );
} 