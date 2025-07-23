"use client"
import React, { useState } from "react";
import OrderListWithActions from "@/components/ui/reusableComponent/OrderListWithActions";

const samplePendingOrders = [
  {
    bookingId: "9125180002",
    from: "Ankleshwar",
    to: "Rotterdam",
    date: "23 Apr 2025",
    etaLabel: "ETA",
    eta: "15 May 2025 7:25 PM",
    shipmentId: "SX1745919917",
    documents: [
      { location: "Baroi, Gujarat", docType: "Others", stopId: "487874", stopType: "D", createdBy: "SHIVA MUNI", time: "08 May,25 09:32 PM" },
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

export default function PendingOrdersPage() {
  const [orders, setOrders] = useState(samplePendingOrders);
  const handleSearch = (filters) => {
    // Implement search logic here
    // For now, just log
    console.log("Search filters:", filters);
  };
  const handleDownload = (order) => {
    alert(`Download ePOD for ${order.bookingId}`);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
      <OrderListWithActions
        orders={orders}
        filterFields={filterFields}
        actionsConfig={{
          view: true,
          status: false,
          liveTrack: false,
          manageDocs: true,
          download: true,
          lrReport: false,
          checkbox: false,
        }}
        onSearch={handleSearch}
        onDownload={handleDownload}
      />
    </div>
  );
} 