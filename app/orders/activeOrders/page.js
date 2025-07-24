"use client"
import React, { useState } from "react";
import OrderListWithActions from "@/components/ui/reusableComponent/OrderListWithActions";

const sampleActiveOrders = [
  {
    id: "ORD-001",
    bookingId: "BKG-001",
    from: "Ankleshwar",
    to: "Kutch",
    fromDate: "2024-01-15",
    toDate: "2024-01-18",
    date: "2024-01-15",
    eta: "2024-01-18 14:30",
    shipmentId: "SHP-001",
    status: "In Transit",
    distance: "334.71 miles",
    duration: "9 hours 26 mins",

    statusHistory: [
      {
        status: "Accepted by Driver",
        location: "GIDC, Timber Market, Ankleshwar GIDC, Ankleshwar, Gujarat 393001, India",
        stopId: "0",
        stopType: "",
        comments: "",
        time: "08 May,25"
      },
      {
        status: "Gate In",
        location: "GIDC, Timber Market, Ankleshwar GIDC, Ankleshwar, Gujarat 393001, India",
        stopId: "487873",
        stopType: "P",
        comments: "",
        time: "08 May,25"
      },
      {
        status: "Pickup Or Drop",
        location: "GIDC, Timber Market, Ankleshwar GIDC, Ankleshwar, Gujarat 393001, India",
        stopId: "487873",
        stopType: "P",
        comments: "PickUp",
        time: "08 May,25"
      },
      {
        status: "Gate Out",
        location: "GIDC, Timber Market, Ankleshwar GIDC, Ankleshwar, Gujarat 393001, India",
        stopId: "487873",
        stopType: "P",
        comments: "",
        time: "08 May,25"
      },
      {
        status: "Gate In",
        location: "Baroi, Gujarat 370421, India",
        stopId: "487874",
        stopType: "D",
        comments: "",
        time: "08 May,25"
      },
      {
        status: "Pickup Or Drop",
        location: "Baroi, Gujarat 370421, India",
        stopId: "487874",
        stopType: "D",
        comments: "Deliver",
        time: "08 May,25"
      }
    ],
    // Data for OrderViewModal - Booking Info (3 columns)
    bookingInfo: {
      "Company": "SXIN",
      "Branch": "SXINHYD",
      "Total Weight": "0 kg",
      "Mode Of Transport": "FTL",
      "Freight Terms": "FOB",
      "Service Type": "FTL",
      "Total Volume": "0 m³",
      "Type Name": "Xpress",
      "Product": "AsiaDirect",
      "No of Packages": "0.00",
      "Customer Name": "cohizon"
    },
    // Reference Details (table format)
    referenceDetails: [
      {
        "Reference ID": "DQ",
        "Reference Name": "Delivery Note",
        "Value": "SX1746698680"
      },
      {
        "Reference ID": "CTR",
        "Reference Name": "Container Number",
        "Value": "MSCU3408414"
      }
    ],
    // Routing Details (Pickup and Delivery sections)
    routingDetails: {
      "Pickup": {
        "Party Identifier": "SX317524",
        "Name": "Ankleshwar",
        "City": "Ankleshwar",
        "Zipcode": "393002",
        "Pickup Date": "08 May, 2025",
        "Customer Identifier": "SX317524",
        "Street": "Plot No - 6102/03, 6117-19 & 5809/10, GIDC",
        "Country": "India",
        "Province": "Gujarat",
        "Pickup Time": "16:00 PM"
      },
      "Delivery": {
        "Party Identifier": "SX317525",
        "Name": "MundraPort",
        "City": "Kutch",
        "Zipcode": "370421",
        "Delivery Date": "15 May, 2025",
        "Customer Identifier": "SX317525",
        "Street": "C Wing, 4th Floor, Port User Building, Adani Port and Special Economic Zone",
        "Country": "India",
        "Province": "Gujarat",
        "Delivery Time": "16:00 PM"
      }
    },
    // Cargo Details (table format)
    cargoDetails: [
      {
        "Number": "0.00",
        "Type": "FTL",
        "Description": "AsiaDirect",
        "Weight": "0 kg",
        "Volume": "0 m³",
        "Length": "",
        "Width": "",
        "Height": ""
      }
    ],
    // Involved Parties (table format)
    involvedParties: [
      {
        "Party Type": "Shipper",
        "Party Identifier": "SX317524",
        "Customer Identifier": "",
        "Name": "Ankleshwar",
        "Street": "Plot No - 6102/03, 6117-19 & 5809/10, GIDC",
        "City": "Ankleshwar",
        "State": "Gujarat",
        "Country Code": "India",
        "Zipcode": "393002"
      },
      {
        "Party Type": "Consignee",
        "Party Identifier": "SX317525",
        "Customer Identifier": "",
        "Name": "MundraPort",
        "Street": "C Wing, 4th Floor, Port User Building, Adani Port and",
        "City": "Kutch",
        "State": "Gujarat",
        "Country Code": "India",
        "Zipcode": "370421"
      }
    ]
  },
  {
    id: "ORD-002",
    bookingId: "BKG-002",
    from: "Mumbai",
    to: "Delhi",
    fromDate: "2024-01-16",
    toDate: "2024-01-19",
    date: "2024-01-16",
    eta: "2024-01-19 16:00",
    shipmentId: "SHP-002",
    status: "In Transit",
    distance: "1,420.5 miles",
    duration: "22 hours 10 mins",
    // Status history for timeline modal
    statusHistory: [
      {
        status: "Accepted by Driver",
        location: "Mumbai Warehouse, 123 Industrial Area, Andheri East, Mumbai, Maharashtra 400001, India",
        stopId: "0",
        stopType: "",
        comments: "",
        time: "16 Jan,24"
      },
      {
        status: "Gate In",
        location: "Mumbai Warehouse, 123 Industrial Area, Andheri East, Mumbai, Maharashtra 400001, India",
        stopId: "123456",
        stopType: "P",
        comments: "",
        time: "16 Jan,24"
      },
      {
        status: "Pickup Or Drop",
        location: "Mumbai Warehouse, 123 Industrial Area, Andheri East, Mumbai, Maharashtra 400001, India",
        stopId: "123456",
        stopType: "P",
        comments: "PickUp",
        time: "16 Jan,24"
      },
      {
        status: "Gate Out",
        location: "Mumbai Warehouse, 123 Industrial Area, Andheri East, Mumbai, Maharashtra 400001, India",
        stopId: "123456",
        stopType: "P",
        comments: "",
        time: "16 Jan,24"
      },
      {
        status: "Gate In",
        location: "Delhi Distribution Center, 456 Logistics Park, Gurgaon, Delhi 110001, India",
        stopId: "654321",
        stopType: "D",
        comments: "",
        time: "19 Jan,24"
      },
      {
        status: "Pickup Or Drop",
        location: "Delhi Distribution Center, 456 Logistics Park, Gurgaon, Delhi 110001, India",
        stopId: "654321",
        stopType: "D",
        comments: "Deliver",
        time: "19 Jan,24"
      }
    ],
    // Data for OrderViewModal - Booking Info (3 columns)
    bookingInfo: {
      "Company": "SXIN",
      "Branch": "SXINMUM",
      "Total Weight": "500 kg",
      "Mode Of Transport": "FTL",
      "Freight Terms": "CIF",
      "Service Type": "FTL",
      "Total Volume": "2.5 m³",
      "Type Name": "Express",
      "Product": "Electronics",
      "No of Packages": "25.00",
      "Customer Name": "techcorp"
    },
    // Reference Details (table format)
    referenceDetails: [
      {
        "Reference ID": "PO",
        "Reference Name": "Purchase Order",
        "Value": "PO-12345"
      },
      {
        "Reference ID": "INV",
        "Reference Name": "Invoice",
        "Value": "INV-67890"
      }
    ],
    // Routing Details (Pickup and Delivery sections)
    routingDetails: {
      "Pickup": {
        "Party Identifier": "SX317526",
        "Name": "Mumbai Warehouse",
        "City": "Mumbai",
        "Zipcode": "400001",
        "Pickup Date": "16 Jan, 2024",
        "Customer Identifier": "SX317526",
        "Street": "123 Industrial Area, Andheri East",
        "Country": "India",
        "Province": "Maharashtra",
        "Pickup Time": "09:00 AM"
      },
      "Delivery": {
        "Party Identifier": "SX317527",
        "Name": "Delhi Distribution Center",
        "City": "Delhi",
        "Zipcode": "110001",
        "Delivery Date": "19 Jan, 2024",
        "Customer Identifier": "SX317527",
        "Street": "456 Logistics Park, Gurgaon",
        "Country": "India",
        "Province": "Delhi",
        "Delivery Time": "02:00 PM"
      }
    },
    // Cargo Details (table format)
    cargoDetails: [
      {
        "Number": "1.00",
        "Type": "FTL",
        "Description": "Electronics Components",
        "Weight": "500 kg",
        "Volume": "2.5 m³",
        "Length": "2.0 m",
        "Width": "1.5 m",
        "Height": "1.0 m"
      }
    ],
    // Involved Parties (table format)
    involvedParties: [
      {
        "Party Type": "Shipper",
        "Party Identifier": "SX317526",
        "Customer Identifier": "",
        "Name": "Mumbai Warehouse",
        "Street": "123 Industrial Area, Andheri East",
        "City": "Mumbai",
        "State": "Maharashtra",
        "Country Code": "India",
        "Zipcode": "400001"
      },
      {
        "Party Type": "Consignee",
        "Party Identifier": "SX317527",
        "Customer Identifier": "",
        "Name": "Delhi Distribution Center",
        "Street": "456 Logistics Park, Gurgaon",
        "City": "Delhi",
        "State": "Delhi",
        "Country Code": "India",
        "Zipcode": "110001"
      }
    ]
  }
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
    console.log("Search filters:", filters);
    // Implement search logic here
  };
  
  const handleDownload = (order) => {
    console.log("Download ePOD for order:", order.id);
    // Implement download logic here
  };
  
  const handleDownloadLR = (order) => {
    console.log("Download LR Report for order:", order.id);
    // Implement download logic here
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