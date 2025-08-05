"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ReusableModal({
  open,
  onClose,
  onSelect,
  data = [],
  columns = [],
  title = "Company Details",
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when rowsPerPage or searchValue changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, searchValue, data]);

  // Filtered data
  const filteredData = data.filter((row) =>
    columns.some((col) =>
      String(row[col] ?? "")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
  );

  const totalRows = filteredData.length;
  const rowsPerPageNum = Number(rowsPerPage);
  const totalPages = Math.ceil(totalRows / rowsPerPageNum);

  // Paginated data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPageNum,
    currentPage * rowsPerPageNum
  );

  const handleSelect = () => {
    if (selectedIndex !== null && paginatedData[selectedIndex]) {
      onSelect(paginatedData[selectedIndex]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" lg:max-w-[60rem]  p-0">
        {/* Title */}
        <div className="bg-blue-600 text-white  px-6 py-4 flex justify-between items-center rounded-md">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </div>

        {/* 1st row: Dropdown left, Pagination right */}
        <div className="flex items-center justify-between px-5">
          {/* Dropdown left */}
          <Select
            value={rowsPerPage}
            onValueChange={(val) => {
              setRowsPerPage(val);
              setCurrentPage(1);
              setSelectedIndex(null);
            }}
          >
            <SelectTrigger className="w-20 h-8 text-sm">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          {/* Pagination arrows right */}
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 p-0"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {/* <span className="text-xs px-2">
              {currentPage} / {totalPages || 1}
            </span> */}
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 p-0"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalRows === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* 2nd row: Search bar */}
        <div className="flex items-center justify-end px-4 ">
          <span className="text-sm font-medium mr-2">Search:</span>
          <Input
            className="h-8 w-40 text-sm"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        
        {/* Table */}
        <div className="px-6 max-h-[400px] overflow-auto mt-2">
          <RadioGroup
            value={selectedIndex !== null ? String(selectedIndex) : undefined}
            onValueChange={(val) => {
              if (selectedIndex === Number(val)) {
                setSelectedIndex(null);
              } else {
                setSelectedIndex(Number(val));
              }
            }}
          >
            <Table>
              <TableHeader>
                <TableRow className="py-3">
                  <TableHead className="w-8 px-4 py-3">#</TableHead>
                  {columns.map((col) => (
                    <TableHead key={col} className="px-4 py-3">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index} className="py-3 border-b">
                    <TableCell className="px-4 py-3">
                      <RadioGroupItem value={String(index)} id={`row-${index}`} />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col} className="px-4 py-3">{row[col]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </RadioGroup>
        </div>

        {/* Footer */}
        <DialogFooter className="bg-blue-50 px-6 py-4 flex justify-end space-x-2 rounded-md">
          <DialogClose asChild>
            <Button variant="destructive" className="px-6 rounded-full">
              Close
            </Button>
          </DialogClose>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full"
            onClick={handleSelect}
            disabled={selectedIndex === null}
          >
            Select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}