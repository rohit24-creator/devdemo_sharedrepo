"use client";

import { useState, useEffect } from "react";
import FilterWithCharts from "@/components/ui/reusableComponent/filterWithCharts";

export default function KmReportsAnalyticsPage() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterFields = [
    { name: "fromDate", label: "From Date", type: "date" },
    { name: "toDate", label: "To Date", type: "date" },
    { 
      name: "vehicle", 
      label: "Vehicle", 
      type: "filterSelect",
      options: ["All Vehicles", "Truck-001", "Truck-002", "Truck-003", "Truck-004", "Truck-005", "Truck-006", "Truck-007", "Truck-008"]
    },
    { 
      name: "driver", 
      label: "Driver", 
      type: "filterSelect",
      options: ["All Drivers", "John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"]
    },
    { 
      name: "route", 
      label: "Route", 
      type: "select",
      options: ["All Routes", "Mumbai-Delhi", "Delhi-Bangalore", "Bangalore-Chennai", "Chennai-Hyderabad"]
    }
  ];

  // Sample KM data for different time periods
  const dayWiseData = [
    { name: 'Day 1', km: 450, fuel: 45, efficiency: 85 },
    { name: 'Day 2', km: 380, fuel: 38, efficiency: 88 },
    { name: 'Day 3', km: 520, fuel: 52, efficiency: 82 },
    { name: 'Day 4', km: 410, fuel: 41, efficiency: 87 },
    { name: 'Day 5', km: 480, fuel: 48, efficiency: 84 },
    { name: 'Day 6', km: 360, fuel: 36, efficiency: 89 },
    { name: 'Day 7', km: 440, fuel: 44, efficiency: 86 },
  ];

  const weekWiseData = [
    { name: 'Week 1', km: 3200, fuel: 320, efficiency: 86 },
    { name: 'Week 2', km: 2800, fuel: 280, efficiency: 88 },
    { name: 'Week 3', km: 3500, fuel: 350, efficiency: 84 },
    { name: 'Week 4', km: 3100, fuel: 310, efficiency: 87 },
  ];

  const monthWiseData = [
    { name: 'Jan', km: 12500, fuel: 1250, efficiency: 85 },
    { name: 'Feb', km: 11800, fuel: 1180, efficiency: 87 },
    { name: 'Mar', km: 13200, fuel: 1320, efficiency: 83 },
    { name: 'Apr', km: 12800, fuel: 1280, efficiency: 86 },
    { name: 'May', km: 14100, fuel: 1410, efficiency: 82 },
    { name: 'Jun', km: 13500, fuel: 1350, efficiency: 85 },
  ];

  const efficiencyData = [
    { name: 'Excellent', value: 35, fill: '#006397' },
    { name: 'Good', value: 45, fill: '#02abf5' },
    { name: 'Average', value: 15, fill: '#003366' },
    { name: 'Poor', value: 5, fill: '#ff6b6b' },
  ];

  const charts = [
    {
      type: 'line',
      title: 'Daily KM Coverage',
      dataKey: ['km', 'fuel'],
      data: dayWiseData,
      colors: ['#006397', '#02abf5']
    },
    {
      type: 'bar',
      title: 'Weekly KM Performance',
      dataKey: 'km',
      data: weekWiseData,
      colors: ['#006397']
    },
    {
      type: 'area',
      title: 'Monthly Fuel Efficiency',
      dataKey: 'efficiency',
      data: monthWiseData,
      colors: ['#003366']
    },
    {
      type: 'pie',
      title: 'Efficiency Distribution',
      dataKey: 'value',
      data: efficiencyData,
      colors: ['#006397', '#02abf5', '#003366', '#ff6b6b']
    }
  ];

  const secondIconMenu = [
    { label: "Export KM Report", onClick: () => console.log("Export KM Report") },
    { label: "Save Analytics", onClick: () => console.log("Save Analytics") },
  ];

  const thirdIconMenu = [
    { label: "Download PDF", onClick: () => console.log("Download PDF") },
    { label: "Download Excel", onClick: () => console.log("Download Excel") },
  ];

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChartData(dayWiseData); // Default to day-wise data
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSearch = (formValues) => {
    console.log("KM Analytics search triggered with:", formValues);
    
    // Simulate data filtering based on search criteria
    let newData = dayWiseData; // Default
    
    if (formValues.vehicle && formValues.vehicle !== "All Vehicles") {
      // Filter by vehicle
      newData = dayWiseData.map(item => ({
        ...item,
        km: Math.floor(item.km * (0.8 + Math.random() * 0.4)), // Simulate different vehicle data
        fuel: Math.floor(item.fuel * (0.8 + Math.random() * 0.4))
      }));
    }
    
    if (formValues.fromDate && formValues.toDate) {
      // Filter by date range
      newData = newData.slice(0, Math.min(7, Math.floor(Math.random() * 7) + 3));
    }
    
    setChartData(newData);
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading KM Analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <FilterWithCharts
      title="KM Reports Analytics"
      filterFields={filterFields}
      onSearch={handleSearch}
      showFirstIcon={true}
      showSecondIcon={true}
      showThirdIcon={true}
      secondIconMenu={secondIconMenu}
      thirdIconMenu={thirdIconMenu}
      charts={charts}
      chartData={chartData}
    />
  );
} 