"use client";

import { useEffect, useState } from "react";
import ReportsList from "@/components/ui/reusableComponent/reportsList";
import { v4 as uuidv4 } from "uuid";

export default function KmReportsPage() {
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState("dayWise");


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/reports/kmReports.json");
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
        console.error("Error fetching KM reports data:", err);
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