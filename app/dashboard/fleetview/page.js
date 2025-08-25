"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  Navigation, 
  RefreshCw, 
  Maximize2,
  Search,
  Filter,
  Eye,
  X,
  Battery,
  BatteryCharging,
  BatteryWarning
} from "lucide-react";

// Import Recharts components for distance chart
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Battery color configuration
const batteryColorConfig = [
  { min: 90, max: 100, label: "Excellent", bgColor: "bg-green-100", textColor: "text-green-800", borderColor: "border-green-300", hoverColor: "hover:bg-green-200" },
  { min: 80, max: 89, label: "Good", bgColor: "bg-emerald-100", textColor: "text-emerald-800", borderColor: "border-emerald-300", hoverColor: "hover:bg-emerald-200" },
  { min: 70, max: 79, label: "Fair", bgColor: "bg-yellow-100", textColor: "text-yellow-800", borderColor: "border-yellow-300", hoverColor: "hover:bg-yellow-200" },
  { min: 60, max: 69, label: "Low", bgColor: "bg-orange-100", textColor: "text-orange-800", borderColor: "border-orange-300", hoverColor: "hover:bg-orange-200" },
  { min: 50, max: 59, label: "Critical", bgColor: "bg-red-100", textColor: "text-red-800", borderColor: "border-red-300", hoverColor: "hover:bg-red-200" },
  { min: 0, max: 49, label: "Danger", bgColor: "bg-red-600", textColor: "text-white", borderColor: "border-red-700", hoverColor: "hover:bg-red-700" }
];

// Centralized data structure - can be replaced with API calls
const dashboardData = {
  metrics: [
    {
      id: "sla",
      title: "SLA",
      value: "100%",
      icon: "BarChart3",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "liveTrucks",
      title: "LIVE TRUCKS",
      value: "100",
      icon: "Truck",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "delayedTrips",
      title: "DELAYED TRIPS",
      value: "9 / 9",
      icon: "Clock",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: "occupancy",
      title: "OCCUPANCY",
      value: "W: 6.18% V: 9.89%",
      icon: "Package",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: "distance",
      title: "DISTANCE",
      value: "0 MILES",
      icon: "Navigation",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ],
  vehicles: [
    {
      id: 1,
      driver: "Raymond",
      vehicle: "BHC 246",
      place: "Nashville, TN",
      coordinates: { lat: 36.1627, lng: -86.7816 },
      speed: "65 mph",
      battery: "85%",
      shipment: "286154)Boxes (weight: 0 lb, volume: 88.29 cu ft) (P)",
      updatedOn: "2025-01-31 15:20",
      status: "in-shipment"
    },
    {
      id: 2,
      driver: "AUSTIN",
      vehicle: "586 5GX",
      place: "Knoxville, TN",
      coordinates: { lat: 35.9606, lng: -83.9207 },
      speed: "72 mph",
      battery: "92%",
      shipment: "285281)Boxes (weight: 17.64 lb, volume: 282.52 cu ft) (P)",
      updatedOn: "2025-01-31 15:18",
      status: "in-shipment"
    },
    {
      id: 3,
      driver: "AUSTIN",
      vehicle: "DMC 4583",
      place: "Greensboro, NC",
      coordinates: { lat: 36.0726, lng: -79.7920 },
      speed: "58 mph",
      battery: "78%",
      shipment: "285281)Boxes (weight: 17.64 lb, volume: 282.52 cu ft) (P)",
      updatedOn: "2025-01-31 15:15",
      status: "no-shipment"
    },
    {
      id: 4,
      driver: "CHRISTOPHER",
      vehicle: "AB4-195",
      place: "Durham, NC",
      coordinates: { lat: 35.9940, lng: -78.8986 },
      speed: "63 mph",
      battery: "89%",
      shipment: "285303)Boxes (weight: 440.92 lb, volume: 0 cu ft) (P)",
      updatedOn: "2025-01-31 15:12",
      status: "in-shipment"
    },
    {
      id: 5,
      driver: "CHRISTOPHER",
      vehicle: "AB4-195",
      place: "Charlotte, NC",
      coordinates: { lat: 35.2271, lng: -80.8431 },
      speed: "70 mph",
      battery: "91%",
      shipment: "285303)Boxes (weight: 440.92 lb, volume: 0 cu ft) (P)",
      updatedOn: "2025-01-31 15:10",
      status: "in-shipment"
    },
    {
      id: 6,
      driver: "LUCAS",
      vehicle: "TRK 789",
      place: "Atlanta, GA",
      coordinates: { lat: 33.7490, lng: -84.3880 },
      speed: "68 mph",
      battery: "94%",
      shipment: "285304)Electronics (weight: 250 lb, volume: 45.2 cu ft) (P)",
      updatedOn: "2025-01-31 15:08",
      status: "in-shipment"
    },
    {
      id: 7,
      driver: "RUSSELL",
      vehicle: "FLE 456",
      place: "Birmingham, AL",
      coordinates: { lat: 33.5207, lng: -86.8025 },
      speed: "55 mph",
      battery: "76%",
      shipment: "285305)Furniture (weight: 800 lb, volume: 120.5 cu ft) (P)",
      updatedOn: "2025-01-31 15:05",
      status: "in-shipment"
    },
    {
      id: 8,
      driver: "ROBERT",
      vehicle: "CAR 321",
      place: "Jacksonville, FL",
      coordinates: { lat: 30.3322, lng: -81.6557 },
      speed: "62 mph",
      battery: "88%",
      shipment: "285306)Clothing (weight: 150 lb, volume: 25.8 cu ft) (P)",
      updatedOn: "2025-01-31 15:02",
      status: "in-shipment"
    },
    {
      id: 9,
      driver: "JUSTIN",
      vehicle: "VAN 654",
      place: "Tampa, FL",
      coordinates: { lat: 27.9506, lng: -82.4572 },
      speed: "59 mph",
      battery: "82%",
      shipment: "285307)Food Items (weight: 300 lb, volume: 35.6 cu ft) (P)",
      updatedOn: "2025-01-31 14:58",
      status: "in-shipment"
    },
    {
      id: 10,
      driver: "MICHAEL",
      vehicle: "TRK 987",
      place: "Orlando, FL",
      coordinates: { lat: 28.5383, lng: -81.3792 },
      speed: "64 mph",
      battery: "90%",
      shipment: "285308)Machinery (weight: 1200 lb, volume: 200.3 cu ft) (P)",
      updatedOn: "2025-01-31 14:55",
      status: "in-shipment"
    },
    {
      id: 11,
      driver: "DAVID",
      vehicle: "FLE 123",
      place: "Miami, FL",
      coordinates: { lat: 25.7617, lng: -80.1918 },
      speed: "71 mph",
      battery: "96%",
      shipment: "285309)Pharmaceuticals (weight: 75 lb, volume: 12.4 cu ft) (P)",
      updatedOn: "2025-01-31 14:52",
      status: "in-shipment"
    },
    {
      id: 12,
      driver: "JAMES",
      vehicle: "CAR 555",
      place: "Savannah, GA",
      coordinates: { lat: 32.0809, lng: -81.0912 },
      speed: "66 mph",
      battery: "87%",
      shipment: "285310)Automotive Parts (weight: 450 lb, volume: 65.7 cu ft) (P)",
      updatedOn: "2025-01-31 14:48",
      status: "in-shipment"
    },
    {
      id: 13,
      driver: "LUCAS",
      vehicle: "TRK 222",
      place: "Columbia, SC",
      coordinates: { lat: 34.0007, lng: -81.0348 },
      speed: "57 mph",
      battery: "79%",
      shipment: "285311)Building Materials (weight: 1800 lb, volume: 280.9 cu ft) (P)",
      updatedOn: "2025-01-31 14:45",
      status: "in-shipment"
    },
    {
      id: 14,
      driver: "RUSSELL",
      vehicle: "FLE 888",
      place: "Charleston, SC",
      coordinates: { lat: 32.7765, lng: -79.9311 },
      speed: "61 mph",
      battery: "83%",
      shipment: "285312)Textiles (weight: 200 lb, volume: 30.1 cu ft) (P)",
      updatedOn: "2025-01-31 14:42",
      status: "in-shipment"
    },
    {
      id: 15,
      driver: "ROBERT",
      vehicle: "CAR 777",
      place: "Wilmington, NC",
      coordinates: { lat: 34.2257, lng: -77.9447 },
      speed: "69 mph",
      battery: "93%",
      shipment: "285313)Chemicals (weight: 350 lb, volume: 55.3 cu ft) (P)",
      updatedOn: "2025-01-31 14:39",
      status: "in-shipment"
    },
    {
      id: 16,
      driver: "JUSTIN",
      vehicle: "VAN 444",
      place: "Richmond, VA",
      coordinates: { lat: 37.5407, lng: -77.4360 },
      speed: "58 mph",
      battery: "81%",
      shipment: "285314)Plastics (weight: 180 lb, volume: 28.7 cu ft) (P)",
      updatedOn: "2025-01-31 14:36",
      status: "in-shipment"
    },
    {
      id: 17,
      driver: "MICHAEL",
      vehicle: "TRK 666",
      place: "Norfolk, VA",
      coordinates: { lat: 36.8508, lng: -76.2859 },
      speed: "63 mph",
      battery: "89%",
      shipment: "285315)Paper Products (weight: 400 lb, volume: 75.2 cu ft) (P)",
      updatedOn: "2025-01-31 14:33",
      status: "in-shipment"
    },
    {
      id: 18,
      driver: "DAVID",
      vehicle: "FLE 999",
      place: "Virginia Beach, VA",
      coordinates: { lat: 36.8529, lng: -75.9780 },
      speed: "67 mph",
      battery: "95%",
      shipment: "285316)Glass Products (weight: 600 lb, volume: 95.8 cu ft) (P)",
      updatedOn: "2025-01-31 14:30",
      status: "in-shipment"
    },
    {
      id: 19,
      driver: "JAMES",
      vehicle: "CAR 111",
      place: "Raleigh, NC",
      coordinates: { lat: 35.7796, lng: -78.6382 },
      speed: "60 mph",
      battery: "84%",
      shipment: "285317)Metal Products (weight: 750 lb, volume: 110.4 cu ft) (P)",
      updatedOn: "2025-01-31 14:27",
      status: "in-shipment"
    },
    {
      id: 20,
      driver: "AUSTIN",
      vehicle: "TRK 333",
      place: "Fayetteville, NC",
      coordinates: { lat: 35.0527, lng: -78.8784 },
      speed: "54 mph",
      battery: "77%",
      shipment: "285318)Wood Products (weight: 950 lb, volume: 145.6 cu ft) (P)",
      updatedOn: "2025-01-31 14:24",
      status: "in-shipment"
    }
  ],
  drivers: ["LUCAS", "RUSSELL", "ROBERT", "JUSTIN", "AUSTIN", "CHRISTOPHER", "RAYMOND", "MICHAEL", "DAVID", "JAMES"],
  carriers: ["All Carriers", "Carrier A", "Carrier B", "Carrier C", "Carrier D"],
  distanceChart: [
    { name: 'Vendor A', distance: 1250, color: '#3B82F6' },
    { name: 'Vendor B', distance: 980, color: '#10B981' },
    { name: 'Vendor C', distance: 750, color: '#F59E0B' },
    { name: 'Vendor D', distance: 520, color: '#8B5CF6' },
    { name: 'Vendor E', distance: 320, color: '#EF4444' },
    { name: 'Vendor F', distance: 890, color: '#06B6D4' },
    { name: 'Vendor G', distance: 650, color: '#84CC16' },
    { name: 'Vendor H', distance: 420, color: '#F97316' }
  ],
  driverOrders: {
    "LUCAS": [
      { id: "T-175243", origin: "CHENNAI", destination: "HYDERABAD", status: "In Transit", weight: "500 kg", volume: "2.5 m³" },
      { id: "T-175244", origin: "BANGALORE", destination: "MUMBAI", status: "Pickup", weight: "300 kg", volume: "1.8 m³" },
      { id: "T-175253", origin: "DELHI", destination: "KOLKATA", status: "Delivered", weight: "750 kg", volume: "3.2 m³" }
    ],
    "RUSSELL": [
      { id: "T-175748", origin: "HYDERABAD", destination: "NAGPUR", status: "In Transit", weight: "400 kg", volume: "2.1 m³" },
      { id: "T-175554", origin: "PUNE", destination: "AHMEDABAD", status: "Pickup", weight: "600 kg", volume: "2.8 m³" }
    ],
    "ROBERT": [
      { id: "T-175789", origin: "MUMBAI", destination: "DELHI", status: "In Transit", weight: "800 kg", volume: "4.0 m³" }
    ],
    "JUSTIN": [
      { id: "T-175890", origin: "KOLKATA", destination: "CHENNAI", status: "Pickup", weight: "350 kg", volume: "1.9 m³" },
      { id: "T-175891", origin: "BANGALORE", destination: "HYDERABAD", status: "In Transit", weight: "450 kg", volume: "2.3 m³" },
      { id: "T-175892", origin: "PUNE", destination: "MUMBAI", status: "Delivered", weight: "200 kg", volume: "1.2 m³" }
    ],
    "AUSTIN": [],
    "CHRISTOPHER": [],
    "RAYMOND": [],
    "MICHAEL": [],
    "DAVID": [],
    "JAMES": []
  }
};

// Icon mapping for dynamic rendering
const iconMap = {
  BarChart3,
  Truck,
  MapPin,
  Clock,
  Package,
  Navigation,
  RefreshCw,
  Maximize2,
  Search,
  Filter,
  Eye,
  X
};

// Helper function to get battery color configuration
const getBatteryColorConfig = (batteryLevel) => {
  const level = parseInt(batteryLevel);
  return batteryColorConfig.find(config => level >= config.min && level <= config.max) || batteryColorConfig[batteryColorConfig.length - 1];
};

// Table column configuration
const tableColumns = [
  { key: 'driver', label: 'Driver', sortable: true },
  { key: 'vehicle', label: 'Vehicle', sortable: true },
  { key: 'place', label: 'Place', sortable: true },
  { key: 'speed', label: 'Speed', sortable: true },
  { key: 'battery', label: 'Battery', sortable: true },
  { key: 'shipment', label: 'Shipment', sortable: true },
  { key: 'updatedOn', label: 'Updated On', sortable: true }
];

// Entries per page options
const entriesPerPageOptions = [
  { value: 10, label: '10 entries' },
  { value: 25, label: '25 entries' },
  { value: 50, label: '50 entries' }
];



export default function FleetView() {
  const [selectedCarrier, setSelectedCarrier] = useState("All Carriers");
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapView, setMapView] = useState("map");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // New state for driver orders functionality
  const [selectedDriverForOrders, setSelectedDriverForOrders] = useState("Total Driver");
  const [availableOrders, setAvailableOrders] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [currentView, setCurrentView] = useState("table"); // "table", "driver-orders", "order-details"

  // Dynamic data from centralized structure
  const { metrics, vehicles, drivers, carriers, distanceChart, driverOrders } = dashboardData;

  // Generate static map URL
  const generateStaticMapUrl = () => {
    const center = "36.1627,-86.7816"; // Nashville
    const zoom = 7;
    const size = "600x400";
    const mapType = mapView === 'satellite' ? 'satellite' : 'roadmap';
    
    // Create markers for vehicles
    const markers = vehicles.map(vehicle => {
      const color = vehicle.status === 'in-shipment' ? 'blue' : 'red';
      return `markers=color:${color}|label:${vehicle.driver.charAt(0)}|${vehicle.coordinates.lat},${vehicle.coordinates.lng}`;
    }).join('&');
    
    const apiKey = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg";
    const baseUrl = "https://maps.google.com/maps?q=usa&t=k&z=4&ie=UTF8&iwloc=&output=embed";
    
    return `${baseUrl}?center=${center}&zoom=${zoom}&size=${size}&maptype=${mapType}&${markers}&key=${apiKey}`;
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCarrier, selectedDrivers]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort data
  const sortData = (data) => {
    if (!sortField) return data;
    
    return [...data].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle special cases
      if (sortField === 'speed') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      } else if (sortField === 'battery') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Filtered vehicle data based on search and filters
  const filteredVehicleData = sortData(vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.place.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCarrier = selectedCarrier === "All Carriers" || true; // Add carrier logic
    const matchesDriver = selectedDrivers.length === 0 || selectedDrivers.includes(vehicle.driver);
    
    return matchesSearch && matchesCarrier && matchesDriver;
  }));

  // Pagination calculations
  const totalPages = Math.ceil(filteredVehicleData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredVehicleData.slice(startIndex, endIndex);



  // Handle driver selection for orders
  const handleDriverOrderSelection = (driverName) => {
    setSelectedDriverForOrders(driverName);
    if (driverName === "Total Driver") {
      setCurrentView("table");
      setAvailableOrders([]);
    } else {
      const orders = driverOrders[driverName] || [];
      setAvailableOrders(orders);
      setCurrentView("driver-orders");
    }
  };

  // Handle order selection
  const handleOrderSelection = (order) => {
    setSelectedOrder(order);
    setOrderDetails({
      ...order,
      driver: selectedDriverForOrders,
      currentLocation: "CHENNAI, TAMIL NADU",
      expectedDelivery: "2025-01-31 18:00",
      route: `${order.origin} → ${order.destination}`,
      coordinates: { lat: 13.0827, lng: 80.2707 } // Chennai coordinates
    });
    setCurrentView("order-details");
  };

  // Close order modal and go back to table
  const closeOrderModal = () => {
    setCurrentView("table");
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  // Go back to driver orders
  const goBackToDriverOrders = () => {
    setCurrentView("driver-orders");
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  // Cell renderer function
  const renderTableCell = (vehicle, column, handleDriverOrderSelection) => {
    switch (column.key) {
      case 'driver':
        return (
          <TableCell key={column.key} className="font-medium cursor-pointer hover:text-blue-600" onClick={() => handleDriverOrderSelection(vehicle.driver)}>
            {vehicle[column.key]}
          </TableCell>
        );
      case 'speed':
        return (
          <TableCell key={column.key}>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {vehicle[column.key]}
            </Badge>
          </TableCell>
        );
      case 'battery':
        return (
          <TableCell key={column.key}>
            <Badge 
              className={`${(() => {
                const config = getBatteryColorConfig(vehicle[column.key]);
                return `${config.bgColor} ${config.textColor} ${config.borderColor} ${config.hoverColor}`;
              })()}`}
            >
              {vehicle[column.key]}
            </Badge>
          </TableCell>
        );
      case 'shipment':
        return (
          <TableCell key={column.key} className="max-w-xs truncate">
            {vehicle[column.key]}
          </TableCell>
        );
      case 'updatedOn':
        return (
          <TableCell key={column.key} className="text-sm text-gray-500">
            {vehicle[column.key]}
          </TableCell>
        );
      default:
        return <TableCell key={column.key}>{vehicle[column.key]}</TableCell>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Fleet Management Dashboard</h1>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg border-r">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
            
            {/* Metric Cards */}
            <div className="space-y-3 mb-6">
              {metrics.map((metric) => {
                const IconComponent = iconMap[metric.icon];
                return (
                  <div key={metric.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                          <IconComponent className={cn("w-5 h-5", metric.color)} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-600">{metric.title}</p>
                          <p className="text-sm font-medium text-gray-600">{metric.value}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Driver Filters Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600 shadow-md">
                    <Truck className="w-4 h-4 text-white"/>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">Select Driver</p>
                  </div>
                </div>
                    <div className="flex items-center gap-2">
                   <div className="bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-medium text-green-600">ACTIVE</span>
                 </div>
              </div>
              
              <div className="space-y-4">
                {/* Carrier Selection */}
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    Carrier Selection
                  </label>
                  <Select value={selectedCarrier} onValueChange={setSelectedCarrier}>
                    <SelectTrigger className="w-full bg-gray-50 border-blue-200 focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {carriers.map((carrier) => (
                        <SelectItem key={carrier} value={carrier}>
                          {carrier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Driver Selection */}
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <label className="text-sm font-semibold text-gray-600 mb-3 block flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    Driver Selection
                    <span className="text-xs font-normal text-gray-500 ml-auto">({drivers.length} drivers)</span>
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
                                         <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                       <input
                         type="radio"
                         id="total-drivers"
                         name="driver-selection"
                         checked={selectedDriverForOrders === "Total Driver"}
                         onChange={() => handleDriverOrderSelection("Total Driver")}
                         className="text-blue-600 w-3 h-3"
                       />
                       <label htmlFor="total-drivers" className="text-sm font-semibold text-blue-800 cursor-pointer flex-1">
                         Total Driver
                       </label>
                       <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                         {drivers.length} total
                       </Badge>
                     </div>
                     {drivers.map((driver, index) => (
                       <div key={driver} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors">
                         <input
                           type="radio"
                           id={driver}
                           name="driver-selection"
                           checked={selectedDriverForOrders === driver}
                           onChange={() => handleDriverOrderSelection(driver)}
                           className="text-blue-600 w-3 h-3"
                         />
                         <label htmlFor={driver} className="text-sm text-gray-700 cursor-pointer flex-1">
                           {driver}
                         </label>
                       </div>
                     ))}
                  </div>
                </div>

                

              </div>
            </div>

            {/* Distance Chart Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-blue-600 shadow-md">
                     <BarChart3 className="w-4 h-4 text-white"/>
                   </div>
                   <div>
                     <p className="text-xl font-bold text-gray-900">Vendor Performance</p>
                   </div>
                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-600">LIVE</span>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distanceChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} km`, 'Distance']}
                    />
                    <Bar 
                      dataKey="distance" 
                      radius={[4, 4, 0, 0]}
                      fill="#3B82F6"
                    >
                      {distanceChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-indigo-200">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-600">Total Distance</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {distanceChart.reduce((sum, item) => sum + item.distance, 0).toLocaleString()} km
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-600">Avg Distance</p>
                  <p className="text-lg font-bold text-green-600">
                    {Math.round(distanceChart.reduce((sum, item) => sum + item.distance, 0) / distanceChart.length)} km
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Live Vehicle Map
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => setMapView("map")}
                      className={`px-3 py-1 text-sm font-medium transition-colors ${
                        mapView === "map"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Map
                    </button>
                    <button
                      onClick={() => setMapView("satellite")}
                      className={`px-3 py-1 text-sm font-medium transition-colors ${
                        mapView === "satellite"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Satellite
                    </button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="relative rounded-lg h-96 overflow-hidden border">
                <iframe
                  src="https://maps.google.com/maps?q=usa&t=k&z=4&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '384px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">In Shipment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">No Shipment</span>
                    </div>
                  </div>
                </div>
                
                {/* Vehicle Info Overlay */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900 mb-2">Vehicle Locations</div>
                    <div className="space-y-1">
                      {vehicles.slice(0, 3).map((vehicle) => (
                        <div key={vehicle.id} className="flex items-center gap-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${vehicle.status === 'in-shipment' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                          <span className="font-medium">{vehicle.driver}</span>
                          <span className="text-gray-600">- {vehicle.place}</span>
                        </div>
                      ))}
                      {vehicles.length > 3 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{vehicles.length - 3} more vehicles
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  {currentView === "table" && "Vehicle Status"}
                  {currentView === "driver-orders" && `Driver Orders - ${selectedDriverForOrders}`}
                  {currentView === "order-details" && `Order Details - ${selectedOrder?.id}`}
                </h2>
                <div className="flex items-center gap-4">
                  {currentView === "table" && (
                    <>
                                             <div className="flex items-center gap-2">
                         <span className="text-sm text-gray-700">Show:</span>
                         <Select value={entriesPerPage.toString()} onValueChange={(value) => {
                           setEntriesPerPage(parseInt(value));
                           setCurrentPage(1);
                         }}>
                           <SelectTrigger className="w-32">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             {entriesPerPageOptions.map((option) => (
                               <SelectItem key={option.value} value={option.value.toString()}>
                                 {option.label}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search vehicles..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-64"
                        />
                      </div>
                    </>
                  )}
                  {(currentView === "driver-orders" || currentView === "order-details") && (
                    <Button variant="outline" onClick={closeOrderModal}>
                      Back to Table
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              {currentView === "table" && (
                <div className="rounded-lg border overflow-hidden">
                  <div className="max-h-96 overflow-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-gray-50 z-10">
                        <TableRow>
                          {tableColumns.map((column) => (
                            <TableHead
                              key={column.key}
                              className={`font-semibold bg-gray-50 ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                              onClick={column.sortable ? () => handleSort(column.key) : undefined}
                            >
                              <div className="flex items-center gap-1">
                                {column.label}
                                {sortField === column.key && (
                                  <span className="text-xs">
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                  </span>
                                )}
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                                             <TableBody>
                         {currentData.map((vehicle) => (
                           <TableRow key={vehicle.id} className="hover:bg-gray-50">
                             {tableColumns.map((column) => (
                               <React.Fragment key={column.key}>
                                 {renderTableCell(vehicle, column, handleDriverOrderSelection)}
                               </React.Fragment>
                             ))}
                           </TableRow>
                         ))}
                       </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {currentView === "driver-orders" && (
                <div className="space-y-4">
                  {availableOrders.length > 0 ? (
                    <div className="grid gap-4">
                      {availableOrders.map((order) => (
                        <div 
                          key={order.id} 
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors bg-gray-50"
                          onClick={() => handleOrderSelection(order)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-blue-800">{order.id}</h3>
                                                         <Button 
                               size="sm"
                               variant="outline"
                               className={`text-xs font-medium ${
                                 order.status === 'In Transit' 
                                   ? 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200' 
                                   : order.status === 'Pickup' 
                                   ? 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200'
                                   : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                               }`}
                             >
                               {order.status}
                             </Button>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Route: {order.origin} → {order.destination}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Weight: {order.weight}</span>
                            <span>Volume: {order.volume}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No available order</h3>
                      <p className="text-gray-600">This driver has no assigned orders at the moment.</p>
                    </div>
                  )}
                </div>
              )}

              {currentView === "order-details" && orderDetails && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                    <Button variant="outline" onClick={goBackToDriverOrders}>
                      Back to Orders
                    </Button>
                  </div>
                  
                  {/* Map Section */}
                  <div className="h-96 rounded-lg border overflow-hidden">
                    <iframe
                      src={`https://maps.google.com/maps?q=${orderDetails.coordinates.lat},${orderDetails.coordinates.lng}&z=10&t=k&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  {/* Trip Details */}
                  <div className="grid grid-cols-2 gap-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Order ID:</span>
                        <span className="text-sm font-semibold text-gray-900">{orderDetails.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Driver:</span>
                        <span className="text-sm font-semibold text-gray-900">{orderDetails.driver}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Route:</span>
                        <span className="text-sm font-semibold text-gray-900">{orderDetails.route}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Status:</span>
                                                 <Button 
                           size="sm"
                           variant="outline"
                           className={`text-xs font-medium ${
                             orderDetails.status === 'In Transit' 
                               ? 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200' 
                               : orderDetails.status === 'Pickup' 
                               ? 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200'
                               : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                           }`}
                         >
                           {orderDetails.status}
                         </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Weight:</span>
                        <span className="text-sm font-semibold text-gray-900">{orderDetails.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Volume:</span>
                        <span className="text-sm font-semibold text-gray-900">{orderDetails.volume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Current Location:</span>
                        <span className="text-sm font-semibold text-gray-900">{orderDetails.currentLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Expected Delivery:</span>
                        <span className="text-sm font-semibold text-gray-900">{orderDetails.expectedDelivery}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination - Only show for table view */}
              {currentView === "table" && totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredVehicleData.length)} of {filteredVehicleData.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
