"use client";

import { useState, useMemo } from "react";
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
import { ArrowUpDown, Search, LayoutGrid, FileText, MoreVertical } from "lucide-react";
import { Edit, Eye, Trash2, History } from "lucide-react";
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

export default function ReportsList({
  title = "Reports",
  columns = [],
  rows = [],
  filterFields = [],
  onSearch = () => {},
  showActions = true,
  showFirstIcon = true,
  showSecondIcon = true,
  showThirdIcon = true,
  secondIconMenu = [],
  thirdIconMenu = [],
  enabledActions = ["edit", "view", "delete", "tripHistory"],
  onActionClick = () => {},
  // Single prop for tabs - contains all tab data and config
  hasTabs = false,
}) {
  const [formValues, setFormValues] = useState({});
  const [displayCount, setDisplayCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  
  // Extract tab data and config from hasTabs prop
  const tabData = hasTabs && typeof hasTabs === 'object' ? hasTabs.data || {} : {};
  const tabConfig = hasTabs && typeof hasTabs === 'object' ? hasTabs.config || {} : {};
  const activeTab = hasTabs && typeof hasTabs === 'object' ? hasTabs.activeTab || Object.keys(tabData)[0] || "summary" : "summary";

  const allAvailableActions = {
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
    tripHistory: {
      label: "Trip History",
      icon: <History size={18} className="mr-2" />,
    },
  };

  const effectiveActions = enabledActions
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
    .filter(Boolean);

  const handleDeleteConfirm = () => {
    if (rowToDelete) {
      onActionClick("delete", rowToDelete);
    }
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

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

  // Get current data based on tabs or single table
  const getCurrentData = () => {
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
  };

  const { columns: currentColumns, rows: currentRows } = getCurrentData();

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

  const totalPages = Math.ceil(sortedRows.length / displayCount);
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * displayCount,
    currentPage * displayCount
  );

  const handleSort = (accessorKey) => {
    if (sortColumn === accessorKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(accessorKey);
      setSortDirection("asc");
    }
  };

  // Fix checkbox functionality
  const isAllSelected =
    paginatedRows.length > 0 &&
    paginatedRows.every((row) => selectedRows.includes(row.id || row));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows((prev) =>
        prev.filter((rowId) => !paginatedRows.some(row => (row.id || row) === rowId))
      );
    } else {
      setSelectedRows((prev) => [
        ...prev,
        ...paginatedRows.map(row => row.id || row).filter(rowId => !prev.includes(rowId)),
      ]);
    }
  };

  const toggleRow = (row) => {
    const rowId = row.id || row;
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((r) => r !== rowId)
        : [...prev, rowId]
    );
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
            // Show 3-dots action button when more than 5 filter fields
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
            // Show individual icons when 5 or fewer filter fields
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

  const renderTable = (tableColumns, tableRows) => (
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
                      checked={selectedRows.includes(row.id || row)}
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
                <TableCell
                  colSpan={tableColumns.length + (showActions ? 2 : 1)}
                  className="text-center py-6"
                >
                  No reports available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Main content based on whether tabs are enabled
  const mainContent = hasTabs && typeof hasTabs === 'object' ? (
    <div className="mt-4">
      <Tabs value={activeTab} onValueChange={(value) => {
        if (hasTabs.onTabChange) {
          hasTabs.onTabChange(value);
        }
      }} className="w-full">
        <TabsList className={`grid w-full mb-6`} style={{ 
          gridTemplateColumns: `repeat(${Object.keys(tabData).length}, 1fr)` 
        }}>
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
      {filterTab}
      {mainContent}
      {/* Single Delete Confirmation Dialog - works for both tabs and single table */}
      <Dialog open={deleteDialogOpen} onOpenChange={() => {}}>
        <DialogContent 
          className="top-20 left-1/2 transform -translate-x-1/2 [&>button]:hidden" 
          style={{ position: 'fixed', top: '20%' }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Confirm Delete</DialogTitle>
            <DialogDescription className="text-lg">
              Are you sure you want to delete this record?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 