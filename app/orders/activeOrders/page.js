"use client"
import React, { useState, useMemo } from "react";
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
    customerName: "cohizon",

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
    customerName: "techcorp",
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
  },
  // Add 9 more orders for pagination testing
  {
    id: "ORD-003",
    bookingId: "BKG-003",
    from: "Chennai",
    to: "Hyderabad",
    fromDate: "2024-01-17",
    toDate: "2024-01-20",
    date: "2024-01-17",
    eta: "2024-01-20 10:00",
    shipmentId: "SHP-003",
    status: "In Transit",
    distance: "400 miles",
    duration: "8 hours",
    customerName: "Customer 3",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
  },
  {
    id: "ORD-004",
    bookingId: "BKG-004",
    from: "Bangalore",
    to: "Pune",
    fromDate: "2024-01-18",
    toDate: "2024-01-21",
    date: "2024-01-18",
    eta: "2024-01-21 12:00",
    shipmentId: "SHP-004",
    status: "In Transit",
    distance: "600 miles",
    duration: "10 hours",
    customerName: "Customer 4",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
  },
  {
    id: "ORD-005",
    bookingId: "BKG-005",
    from: "Ahmedabad",
    to: "Surat",
    fromDate: "2024-01-19",
    toDate: "2024-01-22",
    date: "2024-01-19",
    eta: "2024-01-22 09:00",
    shipmentId: "SHP-005",
    status: "In Transit",
    distance: "300 miles",
    duration: "6 hours",
    customerName: "Customer 5",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
  },
  {
    id: "ORD-006",
    bookingId: "BKG-006",
    from: "Kolkata",
    to: "Patna",
    fromDate: "2024-01-20",
    toDate: "2024-01-23",
    date: "2024-01-20",
    eta: "2024-01-23 15:00",
    shipmentId: "SHP-006",
    status: "In Transit",
    distance: "500 miles",
    duration: "9 hours",
    customerName: "Customer 6",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
  },
  {
    id: "ORD-007",
    bookingId: "BKG-007",
    from: "Lucknow",
    to: "Kanpur",
    fromDate: "2024-01-21",
    toDate: "2024-01-24",
    date: "2024-01-21",
    eta: "2024-01-24 11:00",
    shipmentId: "SHP-007",
    status: "In Transit",
    distance: "100 miles",
    duration: "2 hours",
    customerName: "Customer 7",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
  },
  {
    id: "ORD-008",
    bookingId: "BKG-008",
    from: "Nagpur",
    to: "Bhopal",
    fromDate: "2024-01-22",
    toDate: "2024-01-25",
    date: "2024-01-22",
    eta: "2024-01-25 13:00",
    shipmentId: "SHP-008",
    status: "In Transit",
    distance: "350 miles",
    duration: "7 hours",
    customerName: "Customer 8",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
  },
  {
    id: "ORD-009",
    bookingId: "BKG-009",
    from: "Indore",
    to: "Jaipur",
    fromDate: "2024-01-23",
    toDate: "2024-01-26",
    date: "2024-01-23",
    eta: "2024-01-26 17:00",
    shipmentId: "SHP-009",
    status: "In Transit",
    distance: "700 miles",
    duration: "12 hours",
    customerName: "Customer 9",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
  },
  {
    id: "ORD-010",
    bookingId: "BKG-010",
    from: "Coimbatore",
    to: "Trichy",
    fromDate: "2024-01-24",
    toDate: "2024-01-27",
    date: "2024-01-24",
    eta: "2024-01-27 08:00",
    shipmentId: "SHP-010",
    status: "In Transit",
    distance: "250 miles",
    duration: "5 hours",
    customerName: "Customer 10",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
  },
  {
    id: "ORD-011",
    bookingId: "BKG-011",
    from: "Vijayawada",
    to: "Visakhapatnam",
    fromDate: "2024-01-25",
    toDate: "2024-01-28",
    date: "2024-01-25",
    eta: "2024-01-28 18:00",
    shipmentId: "SHP-011",
    status: "In Transit",
    distance: "450 miles",
    duration: "8 hours",
    customerName: "Customer 11",
    statusHistory: [], bookingInfo: {}, referenceDetails: [], routingDetails: {}, cargoDetails: [], involvedParties: []
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
  const [filteredOrders, setFilteredOrders] = useState(sampleActiveOrders);
  const [searchFilters, setSearchFilters] = useState({});
  
  // Real search functionality
  const handleSearch = (filters) => {
    console.log("Search filters:", filters);
    setSearchFilters(filters);
    
    // Apply filters to orders
    let filtered = [...sampleActiveOrders];
    
    // Filter by Booking ID
    if (filters.bookingId) {
      filtered = filtered.filter(order => 
        order.bookingId.toLowerCase().includes(filters.bookingId.toLowerCase())
      );
    }
    
    // Filter by Reference No (Shipment ID)
    if (filters.referenceNo) {
      filtered = filtered.filter(order => 
        order.shipmentId.toLowerCase().includes(filters.referenceNo.toLowerCase())
      );
    }
    
    // Filter by From Date
    if (filters.fromDate) {
      filtered = filtered.filter(order => 
        new Date(order.fromDate) >= new Date(filters.fromDate)
      );
    }
    
    // Filter by To Date
    if (filters.toDate) {
      filtered = filtered.filter(order => 
        new Date(order.toDate) <= new Date(filters.toDate)
      );
    }
    
    setFilteredOrders(filtered);
    console.log(`Filtered ${sampleActiveOrders.length} orders to ${filtered.length} orders`);
  };
  
  const handleDownload = (order) => {
    console.log("Download ePOD for order:", order.id);
    // In real app, this would trigger file download
    alert(`Downloading ePOD for ${order.bookingId}`);
  };
  
  const handleDownloadLR = (order) => {
    console.log("Download LR Report for order:", order.id);
    // In real app, this would trigger file download
    alert(`Downloading LR Report for ${order.bookingId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Active Orders</h1>
      <OrderListWithActions
        orders={filteredOrders}
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