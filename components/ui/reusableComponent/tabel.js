"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Search,
  LayoutGrid,
  FileText,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function ReusableTabFilter({
  fields = [],
  onSearch = () => {},
  showFirstIcon = true,
  showSecondIcon = true,
  showThirdIcon = true,
  secondIconMenu = [],
  thirdIconMenu = [],
  formValues = {},
  setFormValues = () => {},
}) {
  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderField = (field) => {
    const { name, label, type = "text", options = [] } = field;

    if (type === "date") {
      return (
        <Popover key={name}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[160px] justify-start text-left font-normal border border-gray-300",
                !formValues[name] && "text-muted-foreground"
              )}
            >
              {formValues[name]
                ? format(new Date(formValues[name]), "yyyy-MM-dd")
                : label}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formValues[name] ? new Date(formValues[name]) : undefined}
              onSelect={(date) => {
                handleChange(name, date ? format(date, "yyyy-MM-dd") : "");
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    }

    if (type === "select") {
      return (
        <Select
          key={name}
          onValueChange={(value) => handleChange(name, value)}
          value={formValues[name]}
        >
          <SelectTrigger className="w-[160px] border border-gray-300">
            <SelectValue placeholder={label} />
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
      );
    }

    return (
      <Input
        key={name}
        placeholder={label}
        value={formValues[name] || ""}
        onChange={(e) => handleChange(name, e.target.value)}
        className="w-[160px] border border-gray-300"
      />
    );
  };

  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex flex-wrap gap-3">
          {fields.map(renderField)}
          <Button
            className="bg-[#006397] text-white px-4 rounded-full"
            onClick={() => onSearch(formValues)}
          >
            Search
          </Button>
        </div>

        <div className="flex items-center gap-3 pr-2">
          {showFirstIcon && <Search size={18} className="cursor-pointer text-gray-600" />}
          {showSecondIcon && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <LayoutGrid size={18} className="cursor-pointer text-gray-600" />
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
                <FileText size={18} className="cursor-pointer text-gray-600" />
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
        </div>
      </CardContent>
    </Card>
  );
}
