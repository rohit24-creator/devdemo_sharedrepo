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
import { ArrowUpDown, Search, LayoutGrid, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Edit, Eye, Trash2, History } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ReusableTable({
  title = "Table",
  columns = [],
  rows = [],
  actions = [],
  showActions = true,
  filterFields = [],
  onSearch = () => {},
  showFirstIcon = true,
  showSecondIcon = true,
  showThirdIcon = true,
  secondIconMenu = [],
  thirdIconMenu = [],
  enabledActions = ["edit", "view", "delete", "tripHistory"], // <-- use prop, not hardcoded
  onActionClick = () => {},                   // <-- use prop, not hardcoded
}) {
  const [formValues, setFormValues] = useState({});
  const [displayCount, setDisplayCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

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
    <div key={name} className="flex flex-col gap-1 w-40">
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
              disabled={(date) => date > new Date()}
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

  const sortedRows = useMemo(() => {
    if (!sortColumn) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[sortColumn] || "";
      const bVal = b[sortColumn] || "";
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortColumn, sortDirection]);

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

  // ✅ Checkbox logic
  const isAllSelected =
    paginatedRows.length > 0 &&
    paginatedRows.every((row) => selectedRows.includes(row));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows((prev) =>
        prev.filter((row) => !paginatedRows.includes(row))
      );
    } else {
      setSelectedRows((prev) => [
        ...prev,
        ...paginatedRows.filter((row) => !prev.includes(row)),
      ]);
    }
  };

  const toggleRow = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row)
        ? prev.filter((r) => r !== row)
        : [...prev, row]
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
      </div>
    </CardContent>
  </Card>
);


  const tableContent = (
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
              {showActions && rows.length > 0 && (
                <TableHead className="w-12 px-6 py-3" />
              )}
              {columns.map((col, index) => {
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
                      checked={selectedRows.includes(row)}
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

                  {columns.map((col) => (
                    <TableCell key={col.accessorKey} className="text-sm px-6 py-3">
                      {row[col.accessorKey] ?? ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showActions ? 2 : 1)}
                  className="text-center py-6"
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <>
      {filterTab}
      <div className="mt-4">{tableContent}</div>
      
      {/* Delete Confirmation Dialog */}
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