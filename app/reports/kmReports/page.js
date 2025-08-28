"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { formatRowsWithId } from "@/lib/utils";

export default function KmReportsPage() {
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState("dayWise");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { 
      name: "vehicle", 
      label: "Vehicle", 
      type: "filterSelect",
      options: ["Truck-001", "Truck-002", "Truck-003", "Truck-004", "Truck-005", "Truck-006", "Truck-007", "Truck-008"]
    }
  ];

  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updatedTabData = { ...tabData };
      Object.keys(updatedTabData).forEach((tabKey) => {
        updatedTabData[tabKey].rows = updatedTabData[tabKey].rows.filter((r) => r.id !== row.id);
      });
      setTabData(updatedTabData);
    } else if (action === "edit") {
      console.log("Edit row", row);
    } else if (action === "view") {
      console.log("View row", row);
    } 
  };


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
        
        const { data } = await api.get("/reports/kmReports.json");

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


  const hasTabs = {
    data: tabData,
    config: {
      dayWise: "Day Wise",
      weekWise: "Week Wise", 
      monthWise: "Month Wise"
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
        title="KM Reports"
        filterFields={filterFields}
        onSearch={(data) => {
          console.log("Search Triggered with values:", data);
        }}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
        showActions={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
        hasTabs={hasTabs}
      />
    </div>
  );
} 