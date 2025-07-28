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
  {
    bookingId: "6525190017",
    from: "Mumbai",
    to: "Delhi",
    date: "10 May 2025",
    etaLabel: "ETA",
    eta: "16 May 2025 2:00 PM",
    shipmentId: "SX1746698681",
    statusHistory: [],
    attachedDocuments: [],
    drivers: [],
    distance: "900 mi",
    duration: "18 hours",
    documents: [
      { location: "Mumbai Port", docType: "DEL", stopId: "487874", stopType: "D", createdBy: "RAHUL KUMAR", time: "10 May,25 10:00 AM" },
    ],
  },
  {
    bookingId: "6525190018",
    from: "Chennai",
    to: "Hyderabad",
    date: "12 May 2025",
    etaLabel: "ETA",
    eta: "17 May 2025 11:00 AM",
    shipmentId: "SX1746698682",
    statusHistory: [],
    attachedDocuments: [],
    drivers: [],
    distance: "400 mi",
    duration: "8 hours",
    documents: [
      { location: "Chennai Central", docType: "PUP", stopId: "487875", stopType: "P", createdBy: "SITA RAM", time: "12 May,25 08:00 AM" },
    ],
  },
  {
    bookingId: "6525190019",
    from: "Pune",
    to: "Bangalore",
    date: "14 May 2025",
    etaLabel: "ETA",
    eta: "18 May 2025 6:00 PM",
    shipmentId: "SX1746698683",
    statusHistory: [],
    attachedDocuments: [],
    drivers: [],
    distance: "600 mi",
    duration: "12 hours",
    documents: [
      { location: "Pune Station", docType: "DEL", stopId: "487876", stopType: "D", createdBy: "AMIT SHAH", time: "14 May,25 09:00 AM" },
    ],
  },
  {
    bookingId: "6525190020",
    from: "Surat",
    to: "Ahmedabad",
    date: "16 May 2025",
    etaLabel: "ETA",
    eta: "19 May 2025 3:00 PM",
    shipmentId: "SX1746698684",
    statusHistory: [],
    attachedDocuments: [],
    drivers: [],
    distance: "170 mi",
    duration: "3 hours",
    documents: [
      { location: "Surat City", docType: "PUP", stopId: "487877", stopType: "P", createdBy: "PRIYA SINGH", time: "16 May,25 07:00 AM" },
    ],
  },
  {
    bookingId: "6525190021",
    from: "Kolkata",
    to: "Patna",
    date: "18 May 2025",
    etaLabel: "ETA",
    eta: "20 May 2025 5:00 PM",
    shipmentId: "SX1746698685",
    statusHistory: [],
    attachedDocuments: [],
    drivers: [],
    distance: "350 mi",
    duration: "7 hours",
    documents: [
      { location: "Kolkata Dock", docType: "DEL", stopId: "487878", stopType: "D", createdBy: "RAVI VERMA", time: "18 May,25 11:00 AM" },
    ],
  },
  {
    bookingId: "6525190022",
    from: "Jaipur",
    to: "Lucknow",
    date: "20 May 2025",
    etaLabel: "ETA",
    eta: "22 May 2025 8:00 AM",
    shipmentId: "SX1746698686",
    statusHistory: [],
    attachedDocuments: [],
    drivers: [],
    distance: "500 mi",
    duration: "10 hours",
    documents: [
      { location: "Jaipur Yard", docType: "PUP", stopId: "487879", stopType: "P", createdBy: "ANITA JAIN", time: "20 May,25 06:00 AM" },
    ],
  },
  {
    bookingId: "6525190023",
    from: "Nagpur",
    to: "Indore",
    date: "22 May 2025",
    etaLabel: "deliveryorder",
    eta: "24 May 2025 4:00 PM",
    shipmentId: "SX1746698687",
    statusHistory: [],
    attachedDocuments: [],
    drivers: [],
    distance: "400 mi",
    duration: "8 hours",
    documents: [
      { location: "Nagpur Central", docType: "DEL", stopId: "487880", stopType: "D", createdBy: "VIKAS PATIL", time: "22 May,25 10:00 AM" },
    ],
  },
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
      <h1 className="text-2xl font-bold mb-4 ml-38">Active Orders</h1>
      <OrderListWithActions
        orders={orders}
        etaLabelDefault="Delivery Date" // or "ETA" or whatever you want

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