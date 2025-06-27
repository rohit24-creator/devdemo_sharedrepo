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

  return (
    <Card>
      <CardContent className="p-4">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          {/* Left Button */}
          <Button className="bg-[#006397] text-white px-3 py-1 rounded-sm text-sm">
            Toggle Columns
          </Button>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            <label htmlFor="display" className="text-sm font-medium">
              Display
            </label>

            <Select
              value={displayCount.toString()}
              onValueChange={(value) => setDisplayCount(Number(value))}
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

            {/* Pagination arrows */}
            <Button size="sm" variant="outline">
              {"<"}
            </Button>
            <Button size="sm" variant="outline">
              {">"}
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>

              {showActions && rows.length > 0 && (
                <TableHead className="w-12" />
              )}

              {columns.map((col) => (
                <TableHead
                  key={col.accessorKey}
                  className="text-[#006397] text-left text-sm font-semibold"
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length > 0 ? (
              rows.slice(0, displayCount).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>

                  {showActions && (
                    <TableCell>
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
                            >
                              {action.icon} {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}

                  {columns.map((col) => (
                    <TableCell key={col.accessorKey} className="text-sm">
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
