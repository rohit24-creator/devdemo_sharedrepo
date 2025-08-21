"use client"

import React, { useState, useMemo } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  Truck, FileText, ShoppingCart, UserSquare, ScanLine, Ruler,
  ArrowLeftRight, ArrowUpDown, Weight, BarChart2, List, Layers, Square, SplitSquare,
} from "lucide-react"

export default function ReusableViewTable({ fields = [], data = [], accordionTitle = "View Details" }) {
  const iconMap = {
    packageType: Truck,
    goodsDescription: FileText,
    quantity: ShoppingCart,
    itemId: UserSquare,
    scannedQuantity: ScanLine,
    length: Ruler,
    width: ArrowLeftRight,
    height: ArrowUpDown,
    actualWeight: Weight,
    weight: Weight,
    volumetricWeight: Weight,
    actualVolume: BarChart2,
    volume: BarChart2,
    ldm: List,
    stackable: Layers,
    grounded: Square,
    split: SplitSquare,
  }

  // --- Add these states ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- Filtered and paginated data ---
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(row =>
      fields.some(field =>
        String(row[field.key] ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, fields]);

  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // --- Handlers ---
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on change
  };

  return (
    <div className="p-4">
      <Accordion type="single" collapsible defaultValue="view-accordion">
        <AccordionItem value="view-accordion">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
            {accordionTitle}
          </AccordionTrigger>
          <AccordionContent>
            {/* --- Search and Pagination Controls (right aligned, single row) --- */}
            <div className="flex justify-end mt-4 mb-4 px-2">
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Search:</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="shadcn-input w-40 h-8 px-2 py-1 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Search..."
                  />
                </div>
                {/* Rows per page dropdown and pagination */}
                <div className="flex items-center gap-2">
                  <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPage}
                    className="shadcn-select h-8 w-20 px-2 py-1 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    {[10, 20, 50].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="shadcn-button h-8 w-8 border rounded-md disabled:opacity-50 flex items-center justify-center"
                  >
                    <span className="sr-only">Previous</span>
                    {"<"}
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalRows === 0}
                    className="shadcn-button h-8 w-8 border rounded-md disabled:opacity-50 flex items-center justify-center"
                  >
                    <span className="sr-only">Next</span>
                    {">"}
                  </button>
                </div>
              </div>
            </div>
            {/* --- Table --- */}
            <div className="overflow-x-auto border rounded-md">
              <Table className="min-w-max w-full bg-white">
                <TableHeader>
                  <TableRow>
                    {fields.map(field => {
                      if (!field.label) return null;
                      const Icon = field.icon || iconMap[field.key];
                      return (
                        <TableHead
                          key={field.key}
                          className="px-6 py-3 text-xs font-semibold text-center border-r border-[#e5e7eb] whitespace-nowrap"
                        >
                          <span className="inline-flex items-center gap-1">
                            {Icon && React.createElement(Icon, { size: 18, className: "text-[#006397]" })}
                            {field.label}
                          </span>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row, rowIdx) => (
                    <TableRow key={rowIdx} className="hover:bg-[#f4faff]">
                      {fields.map(field => {
                        let displayValue = row[field.key];
                        if (field.type === "checkbox") {
                          displayValue = row[field.key] ? "Yes" : "No";
                        }
                        if (field.type === "number+unit") {
                          const unit = row[field.unitKey] || "";
                          displayValue = `${row[field.key] ?? ""} ${unit}`.trim();
                        }
                        return (
                          <TableCell
                            key={field.key}
                            className="px-6 py-2 text-sm text-center border-r border-[#f0f0f0] whitespace-nowrap"
                          >
                            {displayValue || "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
