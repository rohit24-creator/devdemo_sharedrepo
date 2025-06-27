"use client";

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
import { useState } from "react";

export default function ReusableTable({
  title = "Table",
  columns = [],
  rows = [],
  actions = [],
  showActions = true,
}) {
  const [displayCount, setDisplayCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rows.length / displayCount);
  const paginatedRows = rows.slice(
    (currentPage - 1) * displayCount,
    currentPage * displayCount
  );

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4">
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          {/* Toggle Columns Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#006397] text-white px-3 py-1 rounded-sm text-sm">
                Toggle Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Right side: Pagination & Display count */}
          <div className="flex items-center space-x-2">
            <label htmlFor="display" className="text-sm font-medium">
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              {">"}
            </Button>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300 mb-4" />

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="w-12 px-4 py-2">
                <Checkbox />
              </TableHead>

              {showActions && rows.length > 0 && (
                <TableHead className="w-12 px-4 py-2" />
              )}

              {columns.map((col, index) => (
                <TableHead
                  key={col.accessorKey}
                  className={`text-[#006397] text-left text-sm font-semibold px-6 py-3 ${
                    index !== 0 ? "border-l border-gray-300" : ""
                  }`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="px-4 py-3">
                    <Checkbox />
                  </TableCell>

                  {showActions && (
                    <TableCell className="px-6 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-xl px-2"
                          >
                            ☰
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right">
                          {actions.map((action, idx) => (
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
}
