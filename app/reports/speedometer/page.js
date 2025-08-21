"use client";

import { useState } from "react";
import FilterWithCharts from "@/components/ui/reusableComponent/filterWithCharts";

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState([
    { name: 'Jan', speed: 65, hours: 8.5, minutes: 30 },
    { name: 'Feb', speed: 72, hours: 7.8, minutes: 45 },
    { name: 'Mar', speed: 58, hours: 9.2, minutes: 15 },
    { name: 'Apr', speed: 80, hours: 6.5, minutes: 20 },
    { name: 'May', speed: 69, hours: 8.1, minutes: 35 },
    { name: 'Jun', speed: 75, hours: 7.3, minutes: 50 },
    { name: 'Jul', speed: 63, hours: 8.8, minutes: 25 },
  ]);

  const [distanceData] = useState([
    { name: 'Jan', km: 12500, distance: 12500 },
    { name: 'Feb', km: 11800, distance: 11800 },
    { name: 'Mar', km: 13200, distance: 13200 },
    { name: 'Apr', km: 12800, distance: 12800 },
    { name: 'May', km: 14100, distance: 14100 },
    { name: 'Jun', km: 13500, distance: 13500 },
    { name: 'Jul', km: 12900, distance: 12900 },
  ]);

  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { 
      name: "vehicle", 
      label: "Vehicle", 
      type: "filterSelect",
      options: ["All Vehicles", "Truck-001", "Truck-002", "Truck-003", "Truck-004", "Truck-005"]
    },
    { 
      name: "carrier", 
      label: "Carriers", 
      type: "filterSelect",
      options: ["All Carriers", "Carrier-001", "Carrier-002", "Carrier-003", "Carrier-004", "Carrier-005"]
    },
    { 
      name: "status", 
      label: "Status", 
      type: "select",
      options: ["All Status", "Delivered", "In Transit", "Pending", "Cancelled"]
    }
  ];

  const charts = [
    {
      type: 'line',
      title: 'Speedometer Graph',
      dataKey: ['speed', 'hours'],
      data: chartData,
      colors: ['#006397', '#02abf5']
    },
    {
      type: 'area',
      title: 'Distance Covered (KM)',
      dataKey: 'km',
      data: distanceData,
      colors: ['#003366']
    }
  ];


  const handleSearch = (formValues) => {
    console.log("Search triggered with:", formValues);

  };

  return (
    <FilterWithCharts
      title="Shipment Speedometer Dashboard"
      filterFields={filterFields}
      onSearch={handleSearch}
      charts={charts}
      chartData={chartData}
    />
  );
} 