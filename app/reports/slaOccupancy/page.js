"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";

export default function SlaOccupancyPage() {
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/reports/slaOccupancy.json");

        const processedData = {};
        Object.keys(data).forEach((tabKey) => {
          processedData[tabKey] = {
            headers: data[tabKey].headers,
            rows: formatRowsWithId(data[tabKey].rows),
          };
        });

        setTabData(processedData);
      } catch (error) {
        setError(error.message || "Failed to fetch data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Object.keys(tabData).length) return <div>No data available</div>;

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