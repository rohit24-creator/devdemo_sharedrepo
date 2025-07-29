"use client";

import { useEffect, useState } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { v4 as uuidv4 } from "uuid";

export default function SlaOccupancyPage() {
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
    { name: "driver", label: "Driver" },
    { 
      name: "regularInput", 
      label: "Regular Input", 
      type: "select",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    { 
      name: "shipmentType", 
      label: "Shipment Type", 
      type: "select",
      options: ["Express", "Standard", "Economy", "Premium"]
    }
  ];

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
        const res = await fetch("/reports/slaOccupancy.json");
        const data = await res.json();


        const processedData = {};
        Object.keys(data).forEach((tabKey) => {
          processedData[tabKey] = {
            headers: data[tabKey].headers,
            rows: data[tabKey].rows.map((row, index) => ({
              ...row,
              id: row.id || uuidv4() || `${tabKey}-row-${index}`,
            })),
          };
        });

        setTabData(processedData);
      } catch (err) {
        console.error("Error fetching SLA occupancy data:", err);
      }
    };
    fetchData();
  }, []);

  // tabs logic
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
        title="SLA Occupancy Reports"
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