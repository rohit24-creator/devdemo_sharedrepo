"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Clock, 
  CheckCircle, 
  MapPin, 
  RefreshCw, 
  Maximize2, 
  Search,
  HelpCircle,
  Mic,
  User,
  BarChart3,
  FileText,
  Calendar,
  Navigation,
  TrendingUp,
  Activity,
  Package,
  Car
} from "lucide-react";

// Field arrays for dynamic configuration - no hardcoding
const kpiFields = [
  {
    id: "activeBookings",
    icon: Truck,
    value: "38",
    label: "Active Booking",
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-500",
    score: 85,
    maxScore: 100
  },
  {
    id: "pendingBookings", 
    icon: Truck,
    value: "2",
    label: "Pending Booking",
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
    borderColor: "border-orange-200",
    iconBg: "bg-orange-500",
    score: 45,
    maxScore: 100
  },
  {
    id: "completedBookings",
    icon: Truck,
    value: "4", 
    label: "Completed",
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-50 to-green-100",
    borderColor: "border-green-200",
    iconBg: "bg-green-500",
    score: 92,
    maxScore: 100
  }
];

const filterFields = [
  {
    id: "year",
    label: "Year",
    type: "select",
    options: ["2025", "2024", "2023"],
    defaultValue: "2025"
  },
  {
    id: "month",
    label: "Month", 
    type: "select",
    options: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    defaultValue: "Aug"
  },
  {
    id: "week",
    label: "Week",
    type: "select", 
    options: ["Week 1", "Week 2", "Week 3", "Week 4"],
    defaultValue: "Week 3"
  }
];

const dashboardWidgets = [
  {
    id: "onTimeDelivery",
    title: "On Time Delivery",
    subtitle: "Performance tracking",
    type: "empty",
    size: "col-span-1",
    icon: TrendingUp
  },
  {
    id: "epodNotAvailable",
    title: "ePOD not Available",
    subtitle: "Electronic proof of delivery",
    type: "gauge",
    size: "col-span-1",
    gaugeData: {
      min: 0,
      max: 500,
      current: 0,
      scale: [100, 200, 300, 400, 500]
    }
  },
  {
    id: "orderMix",
    title: "Order Mix",
    subtitle: "Order distribution",
    type: "chart",
    size: "col-span-1",
    chartData: [
      { label: "Iding", value: 0, percentage: "0.00%", color: "bg-blue-500" },
      { label: "Active", value: 0, percentage: "0.00%", color: "bg-green-500" }
    ]
  },
  {
    id: "menu",
    title: "Quick Actions",
    subtitle: "Navigate to sections",
    type: "navigation",
    size: "col-span-1",
    menuItems: [
      { label: "Bookings", icon: FileText, action: "navigateToBookings", description: "Manage bookings" },
      { label: "Reports", icon: BarChart3, action: "navigateToReports", description: "View analytics" }
    ]
  }
];

const fleetViewConfig = {
  title: "Fleet View",
  subtitle: "Real-time fleet tracking and management",
  mapControls: [
    { id: "map", label: "Map", active: true },
    { id: "satellite", label: "Satellite", active: false }
  ],
  searchPlaceholder: "Search locations, vehicles, or routes...",
  mapRegions: [
    "MINNESOTA", "Duluth", "Marquette", "Sudbury", "Québec City", "Trois-Rivières"
  ]
};

export default function CustomerDashboardPage() {
  const [filterValues, setFilterValues] = useState({});
  const [mapView, setMapView] = useState("map");

  useEffect(() => {
    // Initialize filter values from field arrays
    const initialFilters = {};
    filterFields.forEach(field => {
      initialFilters[field.id] = field.defaultValue || "";
    });
    setFilterValues(initialFilters);
  }, []);

  const handleFilterChange = (fieldId, value) => {
    setFilterValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleMapViewChange = (view) => {
    setMapView(view);
  };

  const handleMenuAction = (action) => {
    switch(action) {
      case "navigateToBookings":
        alert("Navigate to Bookings");
        break;
      case "navigateToReports":
        alert("Navigate to Reports");
        break;
      default:
        console.log("Action:", action);
    }
  };

  const renderKPI = (kpi) => {
    const IconComponent = kpi.icon;
    const percentage = (kpi.score / kpi.maxScore) * 100;
    const circumference = 2 * Math.PI * 16; // radius = 16
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <Card key={kpi.id} className={`${kpi.bgColor} border ${kpi.borderColor} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`${kpi.iconBg} p-2 rounded-lg text-white shadow-lg`}>
                <IconComponent size={20} />
              </div>
              <div className="ml-2">
                <div className={`text-xl font-bold ${kpi.color} mb-1`}>
                  {kpi.value}
                </div>
                <div className="text-xs font-medium text-gray-600">
                  {kpi.label}
                </div>
              </div>
            </div>
            {/* Circular Progress Indicator - No gap */}
            <div className="relative">
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 32 32">
                {/* Background circle */}
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-200"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="currentColor"
                  className={`${kpi.color.replace('text-', 'text-')}`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: 'stroke-dashoffset 0.5s ease-in-out'
                  }}
                />
              </svg>
              {/* Score text in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs font-bold ${kpi.color}`}>
                  {kpi.score}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFilterField = (field) => {
    if (field.type === "select") {
      return (
        <div key={field.id} className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            {field.label}
          </label>
          <Select
            value={filterValues[field.id] || ""}
            onValueChange={(value) => handleFilterChange(field.id, value)}
          >
            <SelectTrigger className="w-36 h-10 bg-white border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    return null;
  };

  const renderWidget = (widget) => {
    const IconComponent = widget.icon;
    
    switch (widget.type) {
      case "empty":
        return (
          <Card key={widget.id} className={`${widget.size} bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-300`}>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[180px] text-center">
              <div className={`${IconComponent ? 'text-blue-500' : 'text-gray-400'} mb-3`}>
                {IconComponent ? <IconComponent size={36} /> : <div className="text-5xl">📊</div>}
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">{widget.title}</h3>
              <p className="text-xs text-gray-500">{widget.subtitle}</p>
              <div className="mt-2 text-xs text-gray-400">No data available</div>
            </CardContent>
          </Card>
        );

      case "gauge":
        return (
          <Card key={widget.id} className={`${widget.size} shadow-sm hover:shadow-md transition-all duration-300`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-800">{widget.title}</CardTitle>
              <p className="text-xs text-gray-500">{widget.subtitle}</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                {/* Enhanced Gauge visualization */}
                <div className="w-full h-full rounded-full border-6 border-gray-200 relative shadow-inner">
                  <div className="absolute inset-0 rounded-full border-6 border-blue-500 transform rotate-45 shadow-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {widget.gaugeData.current}
                    </div>
                  </div>
                </div>
                {/* Scale markers */}
                <div className="absolute inset-0 flex justify-between items-center px-1">
                  {widget.gaugeData.scale.map((value, index) => (
                    <div key={index} className="text-xs text-gray-600 font-medium">
                      {value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-500">Scale: 0 - 500</div>
            </CardContent>
          </Card>
        );

      case "chart":
        return (
          <Card key={widget.id} className={`${widget.size} shadow-sm hover:shadow-md transition-all duration-300`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-800">{widget.title}</CardTitle>
              <p className="text-xs text-gray-500">{widget.subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {widget.chartData.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">{item.label}:</span>
                      <span className="text-xs font-bold text-gray-800">{item.percentage}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className={`${item.color} h-1.5 rounded-full transition-all duration-500`} style={{ width: item.percentage }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "navigation":
        return (
          <Card key={widget.id} className={`${widget.size} shadow-sm hover:shadow-md transition-all duration-300`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-800">{widget.title}</CardTitle>
              <p className="text-xs text-gray-500">{widget.subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {widget.menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start gap-2 h-auto p-2 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg border border-transparent hover:border-blue-200"
                      onClick={() => handleMenuAction(item.action)}
                    >
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconComponent size={16} className="text-blue-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-left">{item.label}</span>
                        <span className="text-xs text-gray-500">{item.description}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
    

      <div className="p-6 space-y-5">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpiFields.map(renderKPI)}
        </div>

        {/* Filter Controls */}
        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Filters</span>
              </div>
              {filterFields.map(renderFilterField)}
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {dashboardWidgets.map(renderWidget)}
        </div>

        {/* Fleet View */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" />
                  {fleetViewConfig.title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">{fleetViewConfig.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                {fleetViewConfig.mapControls.map((control) => (
                  <Button
                    key={control.id}
                    variant={control.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleMapViewChange(control.id)}
                    className={`${control.active ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-50'} transition-all duration-200`}
                  >
                    {control.label}
                  </Button>
                ))}
                <Button variant="outline" size="icon" className="hover:bg-gray-50">
                  <RefreshCw size={14} />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-gray-50">
                  <Maximize2 size={14} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 h-80 overflow-hidden">
              {/* Enhanced Map placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-3">🗺️</div>
                  <div className="text-lg font-semibold mb-1">Interactive Map View</div>
                  <div className="text-sm mb-3">Currently displaying: <span className="font-medium text-blue-600">{mapView}</span></div>
                  <div className="text-xs text-gray-400">Map integration ready</div>
                </div>
              </div>
              
              {/* Enhanced Map regions overlay */}
              <div className="absolute top-4 left-4 space-y-1">
                {fleetViewConfig.mapRegions.map((region, index) => (
                  <Badge key={index} variant="secondary" className="text-xs font-medium bg-white/90 border border-gray-200 shadow-sm">
                    {region}
                  </Badge>
                ))}
              </div>

              {/* Enhanced Search bar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder={fleetViewConfig.searchPlaceholder}
                    className="pl-10 h-10 bg-white/95 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-lg"
                  />
                </div>
              </div>

              {/* Enhanced Map controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-1">
                <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white shadow-sm">
                  ⋯
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
