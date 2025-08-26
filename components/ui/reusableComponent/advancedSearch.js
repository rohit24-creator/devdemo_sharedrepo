"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function AdvancedSearch({
  pageTitle = "Page Title",
  searchFields = [],
  searchButtonText = "Search",
  resetButtonText = "Reset",
  onSearch = () => {},
  onReset = () => {},
  onClose = () => {},
  isOpen = false,
}) {
  const [formValues, setFormValues] = useState({});

  // Lock/unlock body scroll when panel opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSearch = () => {
    onSearch(formValues);
  };

  const handleReset = () => {
    setFormValues({});
    onReset();
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  const renderField = (field) => {
    const { 
      name, 
      label, 
      type = "text", 
      placeholder = "", 
      options = [], 
      required = false,
      className: fieldClassName = ""
    } = field;

    const commonProps = {
      id: name,
      className: cn("w-full", fieldClassName),
      placeholder: placeholder || `Enter ${label}`,
      value: formValues[name] || "",
      onChange: (e) => handleFieldChange(name, e.target.value),
    };

    switch (type) {
      case "select":
        return (
          <Select
            value={formValues[name] || ""}
            onValueChange={(value) => handleFieldChange(name, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                typeof option === "string" ? (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ) : (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                )
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formValues[name] && "text-muted-foreground"
                )}
              >
                {formValues[name] 
                  ? format(new Date(formValues[name]), "yyyy-MM-dd")
                  : "Select date"
                }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formValues[name] ? new Date(formValues[name]) : undefined}
                onSelect={(date) => 
                  handleFieldChange(name, date ? format(date, "yyyy-MM-dd") : "")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case "textarea":
        return (
          <textarea
            {...commonProps}
            rows={3}
            className={cn("w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", fieldClassName)}
          />
        );

      case "number":
        return (
          <Input
            {...commonProps}
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );

      case "email":
        return (
          <Input
            {...commonProps}
            type="email"
          />
        );

      case "tel":
        return (
          <Input
            {...commonProps}
            type="tel"
          />
        );

      default:
        return (
          <Input
            {...commonProps}
            type="text"
          />
        );
    }
  };

  const renderFieldWithLabel = (field) => {
    const { name, label, required = false, className: fieldClassName = "" } = field;

    return (
      <div key={name} className={cn("flex flex-col gap-2", fieldClassName)}>
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {renderField(field)}
      </div>
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-80 md:w-96 lg:w-[24rem] xl:w-[26rem] bg-background border-l border-border shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-3 sm:p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {pageTitle}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X size={16} />
          </Button>
        </div>
        <div className="text-base text-blue-600 font-medium">
          Advanced Search
        </div>
      </div>

      {/* Search Fields */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {searchFields.map(renderFieldWithLabel)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 p-3 sm:p-4 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          <Button
            onClick={handleSearch}
            className="px-4 rounded-full"
          >
            {searchButtonText}
          </Button>
          
          <Button
            onClick={handleReset}
            variant="destructive"
            className="px-4 rounded-full"
          >
            {resetButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
