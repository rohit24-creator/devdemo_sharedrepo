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

export default function EBookingModal({
  open,
  onClose,
  onSelect,
  data = [],
  columns = [],
  title = "Select Item",
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);


  React.useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, searchValue, data]);


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
      <DialogContent 
        className="lg:max-w-[70rem] max-h-[90vh] overflow-hidden p-0 bg-gray-100"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="bg-[#006397] text-white px-6 py-4 flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </div>

        <div className="bg-white px-6 py-4 border-b border-gray-200">

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Show:</span>
              <Select
                value={rowsPerPage}
                onValueChange={(val) => {
                  setRowsPerPage(val);
                  setCurrentPage(1);
                  setSelectedIndex(null);
                }}
              >
                <SelectTrigger className="w-20 h-9 text-sm border-2 border-[#E7ECFD]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
            
            {/* Pagination arrows right */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 p-0 border-2 border-[#E7ECFD] hover:bg-[#006397] hover:text-white"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm px-3 py-1 bg-gray-100 rounded-md">
                {currentPage} / {totalPages || 1}
              </span>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 p-0 border-2 border-[#E7ECFD] hover:bg-[#006397] hover:text-white"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalRows === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center justify-end">
            <span className="text-sm font-medium mr-2 text-gray-700">Search:</span>
            <Input
              className="h-9 w-48 text-sm border-2 border-[#E7ECFD] focus:border-[#006397]"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        
        {/* Table */}
        <div className="bg-white mx-6 mb-6 rounded-lg border border-gray-200 overflow-hidden">
          <div className="max-h-[400px] overflow-auto">
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
                  <TableRow className="bg-[#f8fafc]">
                    <TableHead className="w-12 px-4 py-3 text-[#006397] font-semibold">#</TableHead>
                    {columns.map((col) => (
                      <TableHead key={col} className="px-4 py-3 text-[#006397] font-semibold">{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow 
                      key={index} 
                      className={`py-3 border-b hover:bg-[#f9fbfd] transition-colors ${
                        selectedIndex === index ? 'bg-[#e7ecfd]' : ''
                      }`}
                    >
                      <TableCell className="px-4 py-3">
                        <RadioGroupItem value={String(index)} id={`row-${index}`} />
                      </TableCell>
                      {columns.map((col) => (
                        <TableCell key={col} className="px-4 py-3 text-sm">{row[col]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </RadioGroup>
          </div>
        </div>


        <div className="bg-white px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 border-2 border-[#E7ECFD] hover:bg-gray-100"
          >
            Close
          </Button>
          <Button
            className="bg-[#006397] hover:bg-[#02abf5] text-white px-6 py-2 rounded-md"
            onClick={handleSelect}
            disabled={selectedIndex === null}
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
