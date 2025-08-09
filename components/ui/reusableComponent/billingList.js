"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Search, LayoutGrid, FileText } from "lucide-react";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

// --- Constants ---
const CONSTANTS = {
  DEFAULT_DISPLAY_COUNT: 30,
  DEFAULT_PAGE: 1,
  DEFAULT_SORT_DIRECTION: "asc",
  DEBOUNCE_DELAY: 300,
};

// --- Custom Hooks ---

// Debounce hook for search functionality
const useDebounce = (value, delay = CONSTANTS.DEBOUNCE_DELAY) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

// --- Sub-Components ---

// Debounced combobox component
const FilterCombobox = React.memo(({ value, onChange, options, placeholder = "Select option" }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, CONSTANTS.DEBOUNCE_DELAY);

  const filteredOptions = useMemo(() => {
    if (!debouncedSearch) return options;
    return options.filter((option) =>
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
          {value ? options.find((option) => option === value) || value : placeholder}
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
});

// Filter field renderer component
const FilterField = React.memo(({ field, formValues, setFormValues }) => {
  const { name, label, type = "text", options = [] } = field;

  const handleChange = useCallback(
    (name, value) => {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    },
    [setFormValues]
  );

  const renderFieldContent = useCallback(() => {
    if (type === "date") {
      return (
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
      );
    }

    if (type === "select") {
      return (
        <Select value={formValues[name]} onValueChange={(value) => handleChange(name, value)}>
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
      );
    }

    if (type === "filterSelect") {
      return (
        <FilterCombobox
          value={formValues[name] || ""}
          onChange={(value) => handleChange(name, value)}
          options={options}
          placeholder={label}
        />
      );
    }

    return (
      <Input
        type={type}
        id={name}
        value={formValues[name] || ""}
        onChange={(e) => handleChange(name, e.target.value)}
        className="w-full border border-gray-300"
      />
    );
  }, [type, formValues, name, label, options, handleChange]);

  return (
    <div key={name} className="flex flex-col gap-1 w-50">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {renderFieldContent()}
    </div>
  );
});

export default function BillingList({
  title = "Billing List",
  columns = [],
  rows = [],
  filterFields = [],
  onSearch = () => {},
  showActions = false,
  showFirstIcon = true,
  showSecondIcon = true,
  showThirdIcon = true,
  secondIconMenu = [],
  thirdIconMenu = [],
  enabledActions = ["edit", "view", "delete"],
  onActionClick = () => {},
  hasTabs = false,
}) {
  // State management
  const [formValues, setFormValues] = useState({});
  const [displayCount, setDisplayCount] = useState(CONSTANTS.DEFAULT_DISPLAY_COUNT);
  const [currentPage, setCurrentPage] = useState(CONSTANTS.DEFAULT_PAGE);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(CONSTANTS.DEFAULT_SORT_DIRECTION);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  // Extract tab data and config from hasTabs prop
  const tabData = useMemo(
    () => (hasTabs && typeof hasTabs === "object" ? hasTabs.data || {} : {}),
    [hasTabs]
  );
  const tabConfig = useMemo(
    () => (hasTabs && typeof hasTabs === "object" ? hasTabs.config || {} : {}),
    [hasTabs]
  );
  const activeTab = useMemo(
    () =>
      hasTabs && typeof hasTabs === "object"
        ? hasTabs.activeTab || Object.keys(tabData)[0] || "summary"
        : "summary",
    [hasTabs, tabData]
  );

  // Available actions configuration
  const allAvailableActions = useMemo(
    () => ({
      edit: {
        label: "Edit",
        icon: <Edit size={18} className="mr-2" />,
      },
      view: {
        label: "View",
        icon: <Eye size={18} className="mr-2" />,
      },
      delete: {
        label: "Delete",
        icon: <Trash2 size={18} className="mr-2" />,
      },
    }),
    []
  );

  // Effective actions based on enabled actions
  const effectiveActions = useMemo(
    () =>
      enabledActions
        .map((key) => {
          const action = allAvailableActions[key];
          return action
            ? {
                ...action,
                key,
                onClick: (row) => {
                  if (key === "delete") {
                    setRowToDelete(row);
                    setDeleteDialogOpen(true);
                  } else {
                    onActionClick(key, row);
                  }
                },
              }
            : null;
        })
        .filter(Boolean),
    [enabledActions, allAvailableActions, onActionClick, setRowToDelete, setDeleteDialogOpen]
  );

  // Delete handlers
  const handleDeleteConfirm = useCallback(() => {
    if (rowToDelete) {
      onActionClick("delete", rowToDelete);
    }
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  }, [rowToDelete, onActionClick, setDeleteDialogOpen, setRowToDelete]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  }, [setDeleteDialogOpen, setRowToDelete]);

  // Get current data based on tabs or single table
  const getCurrentData = useCallback(() => {
    if (hasTabs && tabData[activeTab]) {
      return {
        columns: tabData[activeTab].headers.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
        })),
        rows: tabData[activeTab].rows,
      };
    }
    return { columns, rows };
  }, [hasTabs, tabData, activeTab, columns, rows]);

  const { columns: currentColumns, rows: currentRows } = getCurrentData();

  // Sorting logic
  const sortedRows = useMemo(() => {
    if (!sortColumn) return currentRows;
    return [...currentRows].sort((a, b) => {
      const aVal = a[sortColumn] || "";
      const bVal = b[sortColumn] || "";
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [currentRows, sortColumn, sortDirection]);

  const totalPages = useMemo(
    () => Math.ceil(sortedRows.length / displayCount),
    [sortedRows.length, displayCount]
  );
  const paginatedRows = useMemo(
    () => sortedRows.slice((currentPage - 1) * displayCount, currentPage * displayCount),
    [sortedRows, currentPage, displayCount]
  );

  // Sort handler
  const handleSort = useCallback(
    (accessorKey) => {
      if (sortColumn === accessorKey) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortColumn(accessorKey);
        setSortDirection("asc");
      }
    },
    [sortColumn, setSortColumn, setSortDirection]
  );

  // Checkbox selection logic
  const isAllSelected = useMemo(
    () => paginatedRows.length > 0 && paginatedRows.every((row) => selectedRows.includes(row.id)),
    [paginatedRows, selectedRows]
  );

  const toggleSelectAll = useCallback(() => {
    const pageRowIds = paginatedRows.map((row) => row.id);
    if (isAllSelected) {
      setSelectedRows((prev) => prev.filter((id) => !pageRowIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...pageRowIds])]);
    }
  }, [isAllSelected, paginatedRows, setSelectedRows]);

  const toggleRow = useCallback(
    (row) => {
      setSelectedRows((prev) =>
        prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]
      );
    },
    [setSelectedRows]
  );

  // Table renderer
  const renderTable = useCallback(
    (tableColumns, tableRows) => (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#006397] hover:bg-[#02abf5] text-white px-3 py-1 rounded-sm text-sm">
                  Toggle Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="start">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center space-x-2">
              <label htmlFor="display" className="text-sm">
                Display
              </label>
              <Select
                value={displayCount.toString()}
                onValueChange={(value) => {
                  setDisplayCount(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[70px] h-[32px] text-sm px-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 50].map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm">records</span>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                {"<"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                {">"}
              </Button>
            </div>
          </div>

          <hr className="border-t border-gray-300 mb-4" />

          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-12 px-6 py-3">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    className="border-[#003366] data-[state=checked]:bg-[#006397] data-[state=checked]:border-[#006397]"
                  />
                </TableHead>
                {showActions && tableRows.length > 0 && (
                  <TableHead className="w-12 px-6 py-3" />
                )}
                {tableColumns.map((col, index) => {
                  const isSortable = col.sortable !== false;
                  return (
                    <TableHead
                      key={col.accessorKey}
                      onClick={() => isSortable && handleSort(col.accessorKey)}
                      className={`text-[#006397] text-left text-sm font-semibold px-6 py-3 ${
                        isSortable ? "cursor-pointer select-none" : ""
                      } ${index !== 0 ? "border-l border-gray-300" : ""}`}
                    >
                      <div className="flex items-center gap-1">
                        {col.header}
                        {isSortable && <ArrowUpDown size={16} />}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="px-6 py-3">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRow(row)}
                        className="border-[#003366] data-[state=checked]:bg-[#006397] data-[state=checked]:border-[#006397]"
                      />
                    </TableCell>

                    {showActions && (
                      <TableCell className="px-6 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-xl px-2">
                              ☰
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right">
                            {effectiveActions.map((action, idx) => (
                              <DropdownMenuItem
                                key={idx}
                                onClick={() => action.onClick(row)}
                                className="flex items-center gap-2"
                              >
                                {action.icon}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}

                    {tableColumns.map((col) => (
                      <TableCell key={col.accessorKey} className="text-sm px-6 py-3">
                        {row[col.accessorKey] ?? ""}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={tableColumns.length + (showActions ? 2 : 1)} className="text-center py-6">
                    No billing reports available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    ),
    [
      displayCount,
      setDisplayCount,
      currentPage,
      setCurrentPage,
      totalPages,
      isAllSelected,
      toggleSelectAll,
      selectedRows,
      toggleRow,
      showActions,
      effectiveActions,
      handleSort,
    ]
  );

  // Main content based on whether tabs are enabled
  const mainContent =
    hasTabs && typeof hasTabs === "object" ? (
      <div className="mt-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (hasTabs.onTabChange) {
              hasTabs.onTabChange(value);
            }
          }}
          className="w-full"
        >
          <TabsList
            className={`grid w/full mb-6`}
            style={{ gridTemplateColumns: `repeat(${Object.keys(tabData).length}, 1fr)` }}
          >
            {Object.keys(tabData).map((tabKey) => (
              <TabsTrigger key={tabKey} value={tabKey} className="text-sm font-medium">
                {tabConfig[tabKey] || tabKey}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(tabData).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey}>
              {renderTable(
                tabData[tabKey].headers.map((header) => ({
                  accessorKey: header.accessorKey,
                  header: header.header,
                })),
                tabData[tabKey].rows
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    ) : (
      <div className="mt-4">{renderTable(currentColumns, currentRows)}</div>
    );

  return (
    <>
      <Card>
        <CardContent className="p-4 flex justify-between flex-wrap gap-4">
          <div className="flex flex-wrap items-end gap-3 w-full lg:w-auto">
            {filterFields.map((field) => (
              <FilterField key={field.name} field={field} formValues={formValues} setFormValues={setFormValues} />
            ))}
            {/* Search and Action buttons grouped together */}
            <div className="flex items-end gap-2">
              <Button className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 rounded-full" onClick={() => onSearch(formValues)}>
                Search
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex items-end gap-6 pr-2">
            {filterFields.length <= 5 && (
              <>
                <Search size={18} className="cursor-pointer text-gray-600 mb-1" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <LayoutGrid size={18} className="cursor-pointer text-gray-600 mb-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent></DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <FileText size={18} className="cursor-pointer text-gray-600 mb-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent></DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      {mainContent}
      {/* Single Delete Confirmation Dialog - works for both tabs and single table */}
      <Dialog open={deleteDialogOpen} onOpenChange={() => {}}>
        <DialogContent className="top-20 left-1/2 transform -translate-x-1/2 [&>button]:hidden" style={{ position: "fixed", top: "20%" }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Confirm Delete</DialogTitle>
            <DialogDescription className="text-lg">Are you sure you want to delete this record?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}


