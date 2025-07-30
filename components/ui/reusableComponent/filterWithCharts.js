"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Search, LayoutGrid, FileText, MoreVertical } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";


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

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

function FilterCombobox({ value, onChange, options, placeholder = "Select option" }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredOptions = useMemo(() => {
    if (!debouncedSearch) return options;
    return options.filter(option =>
      String(option).toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [options, debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option === value) || value
            : placeholder}
          <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            className="h-9"
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>No options found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function FilterWithCharts({
  title = "Analytics Dashboard",
  filterFields = [],
  onSearch = () => {},
  showFirstIcon = false,
  showSecondIcon = false,
  showThirdIcon = false,
  secondIconMenu = [],
  thirdIconMenu = [],
  charts = [],
  chartData = [],
}) {
  const [formValues, setFormValues] = useState({});

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (field) => {
    const { name, label, type = "text", options = [] } = field;

    return (
      <div key={name} className="flex flex-col gap-1 w-50">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>

        {type === "date" ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300",
                  !formValues[name] && "text-muted-foreground"
                )}
              >
                {formValues[name]
                  ? format(new Date(formValues[name]), "yyyy-MM-dd")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formValues[name] ? new Date(formValues[name]) : undefined}
                onSelect={(date) =>
                  handleChange(name, date ? format(date, "yyyy-MM-dd") : "")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : type === "select" ? (
          <Select
            value={formValues[name]}
            onValueChange={(value) => handleChange(name, value)}
          >
            <SelectTrigger className="w-full border border-gray-300">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) =>
                typeof option === "string" ? (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ) : (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        ) : type === "filterSelect" ? (
          <FilterCombobox
            value={formValues[name] || ""}
            onChange={(value) => handleChange(name, value)}
            options={options}
            placeholder={label}
          />
        ) : (
          <Input
            type={type}
            id={name}
            value={formValues[name] || ""}
            onChange={(e) => handleChange(name, e.target.value)}
            className="w-full border border-gray-300"
          />
        )}
      </div>
    );
  };

  const renderChart = (chart, index) => {
    const { type, title, dataKey, data, colors = ['#006397', '#02abf5', '#003366', '#ff6b6b', '#4ecdc4'] } = chart;

    const chartProps = {
      width: '100%',
      height: 300,
      data: data || chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'line':
        return (
          <Card key={index} className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#006397]">{title}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart {...chartProps}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Array.isArray(dataKey) ? 
                    dataKey.map((key, idx) => (
                      <Line 
                        key={key} 
                        type="monotone" 
                        dataKey={key} 
                        stroke={colors[idx % colors.length]} 
                        strokeWidth={2}
                      />
                    )) : 
                    <Line 
                      type="monotone" 
                      dataKey={dataKey} 
                      stroke={colors[0]} 
                      strokeWidth={2}
                    />
                  }
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );

      case 'area':
        return (
          <Card key={index} className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#006397]">{title}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart {...chartProps}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Array.isArray(dataKey) ? 
                    dataKey.map((key, idx) => (
                      <Area 
                        key={key} 
                        type="monotone" 
                        dataKey={key} 
                        fill={colors[idx % colors.length]} 
                        stroke={colors[idx % colors.length]}
                        fillOpacity={0.6}
                      />
                    )) : 
                    <Area 
                      type="monotone" 
                      dataKey={dataKey} 
                      fill={colors[0]} 
                      stroke={colors[0]}
                      fillOpacity={0.6}
                    />
                  }
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );

      case 'bar':
        return (
          <Card key={index} className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#006397]">{title}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart {...chartProps}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Array.isArray(dataKey) ? 
                    dataKey.map((key, idx) => (
                      <Bar 
                        key={key} 
                        dataKey={key} 
                        fill={colors[idx % colors.length]} 
                      />
                    )) : 
                    <Bar 
                      dataKey={dataKey} 
                      fill={colors[0]} 
                    />
                  }
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );

      case 'pie':
        return (
          <Card key={index} className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#006397]">{title}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data || chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey={dataKey}
                  >
                    {(data || chartData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const filterTab = (
    <Card>
      <CardContent className="p-4 flex justify-between flex-wrap gap-4">
        <div className="flex flex-wrap items-end gap-3">
          {filterFields.map(renderField)}
          <Button
            className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 rounded-full"
            onClick={() => onSearch(formValues)}
          >
            Search
          </Button>
        </div>

        <div className="flex items-end gap-6 pr-2">
          {filterFields.length > 5 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 p-2 rounded-lg transition-colors font-medium"
                  style={{ fontSize: 13 }}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {showFirstIcon && (
                  <DropdownMenuItem onClick={() => console.log("Search action")}>
                    <Search size={16} className="mr-2" />
                    Search
                  </DropdownMenuItem>
                )}
                {secondIconMenu.map((item, idx) => (
                  <DropdownMenuItem key={idx} onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
                {thirdIconMenu.map((item, idx) => (
                  <DropdownMenuItem key={idx} onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {showFirstIcon && (
                <Search size={18} className="cursor-pointer text-gray-600 mb-1" />
              )}
              {showSecondIcon && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <LayoutGrid size={18} className="cursor-pointer text-gray-600 mb-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {secondIconMenu.map((item, idx) => (
                      <DropdownMenuItem key={idx} onClick={item.onClick}>
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {showThirdIcon && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <FileText size={18} className="cursor-pointer text-gray-600 mb-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {thirdIconMenu.map((item, idx) => (
                      <DropdownMenuItem key={idx} onClick={item.onClick}>
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#006397] mb-2">{title}</h1>
        <p className="text-gray-600">Filter and analyze your data</p>
      </div>
      
      {filterTab}
      
      <div className="mt-6">
        {charts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts.map((chart, index) => renderChart(chart, index))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No charts configured. Add charts to see visualizations.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 