"use client";

import { useEffect, useState } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";

export default function ShipmentStopLevelPage() {
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState("summary");


  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { name: "tripVehicle", label: "Trip Vehicle" },
    { 
      name: "zone", 
      label: "Zone", 
      type: "select",
      options: ["North Zone", "South Zone", "East Zone", "West Zone", "Central Zone"]
    },
    { 
      name: "orderId", 
      label: "Order ID", 
      type: "select",
      options: ["ORD-001", "ORD-002", "ORD-003", "ORD-004", "ORD-005"]
    },
    { 
      name: "regularDropdown", 
      label: "Regular Dropdown", 
      type: "select",
      options: ["Option A", "Option B", "Option C", "Option D"]
    },
    { 
      name: "shipmentType", 
      label: "Shipment Type", 
      type: "select",
      options: ["Express", "Standard", "Economy", "Premium"]
    }
  ];


  // Icon menu items
  const secondIconMenu = [
    { label: "View as Grid", onClick: () => console.log("Grid View") },
    { label: "View as Table", onClick: () => console.log("Table View") },
  ];

  const thirdIconMenu = [
    { label: "Export PDF", onClick: () => console.log("PDF Export") },
    { label: "Export Excel", onClick: () => console.log("Excel Export") },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/reports/shipmentStopLevel.json");
        const data = await res.json();

        const processedData = {};
        Object.keys(data).forEach((tabKey) => {
          processedData[tabKey] = {
            headers: data[tabKey].headers,
            rows: formatRowsWithId(data[tabKey].rows),
          };
        });

        setTabData(processedData);
      } catch (err) {
        console.error("Error fetching shipment stop level data:", err);
      }
    };
    fetchData();
  }, []);


  const hasTabs = {
    data: tabData,
    config: {
      summary: "Summary",
      reportDetails: "Report Details"
    },
    activeTab: activeTab,
    onTabChange: setActiveTab
  };

  return (
    <div className="p-4">
      <ReportsList
        title="Shipment Stop Level Reports"
        filterFields={filterFields}
        onSearch={(data) => {
          console.log("Search Triggered with values:", data);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
        hasTabs={hasTabs}
      />
    </div>
  );
} 