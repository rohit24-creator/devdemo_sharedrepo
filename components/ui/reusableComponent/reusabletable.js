"use client"

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Truck, FileText, ShoppingCart, UserSquare, ScanLine, Ruler, ArrowLeftRight,
  ArrowUpDown, Weight, BarChart2, List, Layers, Square, SplitSquare,
  MoreVertical, ChevronDown, Search, Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ReusableModal from "../reusableComponent/bussinessParnterModal";
import FormModal from "../reusableComponent/formmodal";

export default function ReusableTable({ fields, data, onChange, accordionTitle, modalData, formFields }) {
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
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalRowIdx, setModalRowIdx] = React.useState(null);
  const [modalFieldKey, setModalFieldKey] = React.useState(null);
  const [formModalOpen, setFormModalOpen] = React.useState(false);

  const handleAddRow = () => {
    const newRow = {};
    fields.forEach(f => {
      if (f.type === 'checkbox') {
        newRow[f.key] = false;
      } else if (f.type === 'number+unit') {
        newRow[f.key] = '';
        newRow[f.unitKey] = f.unitOptions?.[0] || '';
      } else {
        newRow[f.key] = '';
      }
    });
    onChange([...data, newRow]);
  };

  const handleRemoveRow = (idx) => {
    const newData = data.filter((_, i) => i !== idx);
    onChange(newData);
  };

  const handleCellChange = (rowIdx, key, value) => {
    const newData = data.map((row, i) =>
      i === rowIdx ? { ...row, [key]: value } : row
    );
    onChange(newData);
  };

  return (
    <>
      <Accordion type="single" collapsible defaultValue="table-accordion">
        <AccordionItem value="table-accordion">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
            {accordionTitle}
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto w-full mt-5">
              <Table className="min-w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center align-middle border-l-0">
                      <ChevronDown size={18} className="text-[#006397]" />
                    </TableHead>
                    {fields.map(field => {
                      if (!field.label) return null;
                      const Icon = iconMap[field.key];
                      return (
                        <TableHead key={field.key} className="text-center align-middle border-l border-[#e0e0e0]">
                          <span className="inline-flex items-center justify-center gap-1">
                            {Icon && React.createElement(Icon, { size: 18, className: "text-[#006397]" })}
                            <span className="text-xs font-semibold">{field.label}</span>
                          </span>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row, rowIdx) => (
                    <TableRow key={rowIdx}>
                      <TableCell className="text-center align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                           <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => {/* Save logic here */}}>
                                ✓ Save
                              </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRemoveRow(rowIdx)} className="text-red-600">
                              🗑 Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      {fields.map(field => (
                        <TableCell key={field.key}>
                          {field.type === 'text+icons' ? (
                            <div className="relative flex items-center">
                              <Input
                                value={row[field.key] || ''}
                                onChange={e => handleCellChange(rowIdx, field.key, e.target.value)}
                                className="w-full pr-14"
                              />
                              <div className="absolute right-0 h-full bg-[#E7ECFD] flex items-center px-2 space-x-2 rounded-r-md">
                                <Button variant="ghost" size="icon" className="p-1 h-6 w-6" type="button"
                                  onClick={() => {
                                    setModalOpen(true);
                                    setModalRowIdx(rowIdx);
                                    setModalFieldKey(field.key);
                                  }}
                                >
                                  <Search size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="p-1 h-6 w-6" type="button"
                                  onClick={() => setFormModalOpen(true)}
                                >
                                  <Plus size={16} />
                                </Button>
                              </div>
                            </div>
                          ) : field.type === 'number+unit' ? (
                            <div className="relative flex items-center">
                              <Input
                                type="text"
                                value={row[field.key] || ''}
                                onChange={e => handleCellChange(rowIdx, field.key, e.target.value)}
                                className="w-full pr-20"
                              />
                              <div className="absolute right-0 h-full bg-[#E7ECFD] flex items-center px-2 pl-4 min-w-20 rounded-r-md">
                                <Select
                                  value={row[field.unitKey] ?? ""}
                                  onValueChange={val => handleCellChange(rowIdx, field.unitKey, val)}
                                >
                                  <SelectTrigger className="border-0 bg-transparent px-0 py-0 h-6 min-w-16 text-xs">
                                    <span>{row[field.unitKey] || "Select"}</span>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.unitOptions?.map(opt => (
                                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ) : field.type === 'text' ? (
                            <Input
                              value={row[field.key] || ''}
                              onChange={e => handleCellChange(rowIdx, field.key, e.target.value)}
                            />
                          ) : field.type === 'number' ? (
                            <Input
                              type="number"
                              value={row[field.key] || ''}
                              onChange={e => handleCellChange(rowIdx, field.key, e.target.value)}
                            />
                          ) : field.type === 'select' ? (
                            <Select
                              value={row[field.key] || ''}
                              onValueChange={val => handleCellChange(rowIdx, field.key, val)}
                            >
                              <SelectTrigger className="text-xs">{row[field.key] || "Select"}</SelectTrigger>
                              <SelectContent>
                                {field.options?.map(opt => (
                                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : field.type === 'checkbox' ? (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={!!row[field.key]}
                                onCheckedChange={val => handleCellChange(rowIdx, field.key, val)}
                              />
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {field.label}
                              </label>
                            </div>
                          ) : null}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={fields.length + 1}>
                      <Button variant="default" size="sm" onClick={handleAddRow}>+ Add Row</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {modalOpen && modalData && (
        <ReusableModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={item => {
            if (modalRowIdx !== null && modalFieldKey) {
              handleCellChange(modalRowIdx, modalFieldKey, item[modalData.columns[0]]);
            }
            setModalOpen(false);
          }}
          data={modalData.data}
          columns={modalData.columns}
          title={modalData.title}
        />
      )}
      {formModalOpen && formFields && (
        <FormModal
          open={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          onSubmit={item => {
            onChange([...data, item]);
            setFormModalOpen(false);
          }}
          fields={formFields}
        />
      )}
    </>
  );
}
