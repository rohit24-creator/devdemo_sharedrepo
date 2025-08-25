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
  Car,
  Zap,
  Shield,
  Target
} from "lucide-react";

// Enhanced KPI fields with better visual hierarchy
const kpiFields = [
  {
    id: "activeBookings",
    icon: Truck,
    value: "38",
    label: "Active Bookings",
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    borderColor: "border-blue-500",
    iconBg: "bg-white/20",
    score: 85,
    maxScore: 100,
    trend: "+12%",
    trendColor: "text-green-400"
  },
  {
    id: "pendingBookings", 
    icon: Clock,
    value: "2",
    label: "Pending Bookings",
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    borderColor: "border-orange-500",
    iconBg: "bg-white/20",
    score: 45,
    maxScore: 100,
    trend: "-5%",
    trendColor: "text-red-400"
  },
  {
    id: "completedBookings",
    icon: CheckCircle,
    value: "4", 
    label: "Completed",
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    borderColor: "border-green-500",
    iconBg: "bg-white/20",
    score: 92,
    maxScore: 100,
    trend: "+8%",
    trendColor: "text-green-400"
  }
];

// Enhanced filter fields
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

// Enhanced dashboard widgets
const dashboardWidgets = [
  {
    id: "onTimeDelivery",
    title: "On Time Delivery",
    subtitle: "Performance tracking",
    type: "metric",
    size: "col-span-1",
    icon: Target,
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive"
  },
  {
    id: "epodNotAvailable",
    title: "ePOD Status",
    subtitle: "Electronic proof of delivery",
    type: "gauge",
    size: "col-span-1",
    gaugeData: {
      min: 0,
      max: 500,
      current: 127,
      scale: [100, 200, 300, 400, 500]
    }
  },
  {
    id: "orderMix",
    title: "Order Distribution",
    subtitle: "Current order status",
    type: "chart",
    size: "col-span-1",
    chartData: [
      { label: "Pending", value: 12, percentage: "24%", color: "bg-orange-500" },
      { label: "Active", value: 38, percentage: "76%", color: "bg-blue-500" }
    ]
  },
  {
    id: "menu",
    title: "Quick Actions",
    subtitle: "Navigate to sections",
    type: "navigation",
    size: "col-span-1",
    menuItems: [
      { label: "Bookings", icon: FileText, action: "navigateToBookings", description: "Manage bookings", color: "bg-blue-100" },
      { label: "Reports", icon: BarChart3, action: "navigateToReports", description: "View analytics", color: "bg-green-100" }
    ]
  }
];

const fleetViewConfig = {
  title: "Fleet Overview",
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
    const circumference = 2 * Math.PI * 18; // radius = 18
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <Card key={kpi.id} className={`${kpi.bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`${kpi.iconBg} p-3 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent size={24} />
              </div>
              <div className="ml-4">
                <div className="text-3xl font-bold text-white mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm font-medium text-white/90">
                  {kpi.label}
                </div>
                <div className={`text-xs font-semibold ${kpi.trendColor} mt-1`}>
                  {kpi.trend} from last month
                </div>
              </div>
            </div>
            {/* Enhanced Circular Progress Indicator */}
            <div className="relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: 'stroke-dashoffset 0.8s ease-in-out'
                  }}
                />
              </svg>
              {/* Score text in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
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
            <SelectTrigger className="w-40 h-11 bg-white border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm">
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
      case "metric":
        return (
          <Card key={widget.id} className={`${widget.size} bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300 group`}>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconComponent size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{widget.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{widget.subtitle}</p>
              <div className="text-3xl font-bold text-blue-600 mb-1">{widget.value}</div>
              <div className={`text-sm font-medium ${widget.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {widget.change}
              </div>
            </CardContent>
          </Card>
        );

      case "gauge":
        return (
          <Card key={widget.id} className={`${widget.size} shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <IconComponent size={20} className="text-indigo-600" />
                {widget.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{widget.subtitle}</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-28 h-28 mx-auto mb-4">
                {/* Enhanced Gauge visualization */}
                <div className="w-full h-full rounded-full border-8 border-gray-200 relative shadow-inner bg-white">
                  <div className="absolute inset-0 rounded-full border-8 border-indigo-500 transform rotate-45 shadow-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold text-indigo-600">
                      {widget.gaugeData.current}
                    </div>
                  </div>
                </div>
                {/* Scale markers */}
                <div className="absolute inset-0 flex justify-between items-center px-2">
                  {widget.gaugeData.scale.map((value, index) => (
                    <div key={index} className="text-xs text-gray-600 font-medium">
                      {value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">Scale: 0 - 500</div>
            </CardContent>
          </Card>
        );

      case "chart":
        return (
          <Card key={widget.id} className={`${widget.size} shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-emerald-100`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <BarChart3 size={20} className="text-emerald-600" />
                {widget.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{widget.subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {widget.chartData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">{item.label}:</span>
                      <span className="text-sm font-bold text-gray-800">{item.percentage}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full transition-all duration-700 shadow-sm`} style={{ width: item.percentage }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "navigation":
        return (
          <Card key={widget.id} className={`${widget.size} shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Navigation size={20} className="text-purple-600" />
                {widget.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{widget.subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {widget.menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start gap-3 h-auto p-3 hover:bg-white/50 hover:text-purple-700 transition-all duration-200 rounded-xl border border-transparent hover:border-purple-200 shadow-sm"
                      onClick={() => handleMenuAction(item.action)}
                    >
                      <div className={`p-2 ${item.color} rounded-lg`}>
                        <IconComponent size={18} className="text-purple-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold text-left">{item.label}</span>
                        <span className="text-xs text-gray-600">{item.description}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header with gradient */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-b border-blue-500 px-8 py-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Truck size={24} className="text-white" />
            </div>
            <div>
              <Badge variant="secondary" className="text-sm font-bold bg-white/20 text-white border-white/30">
                Customer Dashboard
              </Badge>
              <p className="text-white/80 text-sm mt-1">Welcome back! Here's your fleet overview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-white/20 text-white">
              <HelpCircle size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/20 text-white">
              <Mic size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/20 text-white">
              <User size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiFields.map(renderKPI)}
        </div>

        {/* Enhanced Filter Controls */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity size={20} className="text-blue-600" />
                </div>
                <span className="text-lg font-bold text-gray-800">Filters</span>
              </div>
              {filterFields.map(renderFilterField)}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {dashboardWidgets.map(renderWidget)}
        </div>

        {/* Enhanced Fleet View */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin size={24} className="text-blue-600" />
                  </div>
                  {fleetViewConfig.title}
                </CardTitle>
                <p className="text-base text-gray-600 mt-2">{fleetViewConfig.subtitle}</p>
              </div>
              <div className="flex items-center gap-3">
                {fleetViewConfig.mapControls.map((control) => (
                  <Button
                    key={control.id}
                    variant={control.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleMapViewChange(control.id)}
                    className={`${control.active ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' : 'hover:bg-gray-50 border-gray-300'} transition-all duration-200 px-4 py-2`}
                  >
                    {control.label}
                  </Button>
                ))}
                <Button variant="outline" size="icon" className="hover:bg-gray-50 border-gray-300 shadow-sm">
                  <RefreshCw size={16} />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-gray-50 border-gray-300 shadow-sm">
                  <Maximize2 size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl border-2 border-dashed border-blue-300 h-96 overflow-hidden shadow-inner">
              {/* Enhanced Map placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="text-7xl mb-4">🗺️</div>
                  <div className="text-xl font-bold mb-2 text-gray-700">Interactive Map View</div>
                  <div className="text-base mb-4">Currently displaying: <span className="font-bold text-blue-600">{mapView}</span></div>
                  <div className="text-sm text-gray-500">Map integration ready</div>
                </div>
              </div>
              
              {/* Enhanced Map regions overlay */}
              <div className="absolute top-6 left-6 space-y-2">
                {fleetViewConfig.mapRegions.map((region, index) => (
                  <Badge key={index} variant="secondary" className="text-sm font-semibold bg-white/95 border border-blue-200 shadow-lg px-3 py-2">
                    {region}
                  </Badge>
                ))}
              </div>

              {/* Enhanced Search bar */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder={fleetViewConfig.searchPlaceholder}
                    className="pl-12 h-12 bg-white/95 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-xl text-base"
                  />
                </div>
              </div>

              {/* Enhanced Map controls */}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                <Button variant="ghost" size="icon" className="bg-white/95 hover:bg-white shadow-lg border border-gray-200">
                  <Zap size={18} className="text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-white/95 hover:bg-white shadow-lg border border-gray-200">
                  <Shield size={18} className="text-gray-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
