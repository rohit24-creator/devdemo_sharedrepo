"use client"

import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
import ReusableModal from "../reusableComponent/bussinessPartnerModal";
import FormModal from "../reusableComponent/formmodal";
import { useState } from 'react';

export default function ReusableTable({ fields, defaultValues = [], modalData, formFields: modalFormFields, onDataChange }) {
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

  const form = useForm({
    defaultValues: {
      rows: defaultValues.length > 0 ? defaultValues : [{}]
    }
  });

  const { fields: formFields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalRowIdx, setModalRowIdx] = React.useState(null);
  const [modalFieldKey, setModalFieldKey] = useState(null);
  const [formModalOpen, setFormModalOpen] = React.useState(false);

  // Watch for changes and notify parent
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (onDataChange) {
        onDataChange(value.rows || []);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

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
    append(newRow);
  };

  const handleRemoveRow = (idx) => {
    remove(idx);
  };

  // Dynamic field renderer - no more hardcoding!
  const renderField = (field, rowIdx) => {
    const baseControllerProps = {
      control: form.control,
      name: `rows.${rowIdx}.${field.key}`,
    };

    switch (field.type) {
      case 'text+icons':
        return (
          <div className="relative flex items-center">
            <Controller
              {...baseControllerProps}
              render={({ field: controllerField }) => (
                <Input
                  value={controllerField.value || ''}
                  onChange={e => controllerField.onChange(e.target.value)}
                  className="w-full pr-14"
                />
              )}
            />
            <div className="absolute right-0 h-full bg-[#E7ECFD] flex items-center px-2 space-x-2 rounded-r-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-1 h-6 w-6" 
                type="button"
                onClick={() => {
                  setModalOpen(true);
                  setModalRowIdx(rowIdx);
                  setModalFieldKey(field.key);
                }}
              >
                <Search size={16} />
              </Button>
              {field.showPlus !== false && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="p-1 h-6 w-6" 
                  type="button"
                  onClick={() => setFormModalOpen(true)}
                >
                  <Plus size={16} />
                </Button>
              )}
            </div>
          </div>
        );

      case 'number+unit':
        return (
          <div className="relative flex items-center">
            <Controller
              {...baseControllerProps}
              render={({ field: controllerField }) => (
                <Input
                  type="text"
                  value={controllerField.value || ''}
                  onChange={e => controllerField.onChange(e.target.value)}
                  className="w-full pr-24 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              )}
            />
            <div className="absolute right-0 h-full bg-[#E7ECFD] flex items-center px-3 min-w-24 rounded-r-md border-l border-gray-200">
              <Controller
                control={form.control}
                name={`rows.${rowIdx}.${field.unitKey}`}
                render={({ field: controllerField }) => (
                  <Select
                    value={controllerField.value ?? ""}
                    onValueChange={val => controllerField.onChange(val)}
                  >
                    <SelectTrigger className="border-0 bg-transparent px-2 py-1 h-6 min-w-20 text-xs font-medium text-gray-700 hover:text-gray-900 focus:outline-none shadow-none ring-0 data-[state=open]:bg-transparent">
                      {controllerField.value || "Select"}
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      {field.unitOptions?.map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <Controller
            {...baseControllerProps}
            render={({ field: controllerField }) => (
              <Input
                value={controllerField.value || ''}
                onChange={e => controllerField.onChange(e.target.value)}
              />
            )}
          />
        );

      case 'number':
        return (
          <Controller
            {...baseControllerProps}
            render={({ field: controllerField }) => (
              <Input
                type="number"
                value={controllerField.value || ''}
                onChange={e => controllerField.onChange(e.target.value)}
              />
            )}
          />
        );

      case 'select':
        return (
          <Controller
            {...baseControllerProps}
            render={({ field: controllerField }) => (
              <Select
                value={controllerField.value || ''}
                onValueChange={val => controllerField.onChange(val)}
              >
                <SelectTrigger className="w-full min-w-[200px] px-3 py-2 text-base h-11">
                  {controllerField.value || "Select"}
                </SelectTrigger>
                <SelectContent className="w-full text-base">
                  {field.options?.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Controller
              {...baseControllerProps}
              render={({ field: controllerField }) => (
                <Checkbox
                  checked={!!controllerField.value}
                  onCheckedChange={val => controllerField.onChange(val)}
                />
              )}
            />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {field.label}
            </label>
          </div>
        );

      default:
        return (
          <Controller
            {...baseControllerProps}
            render={({ field: controllerField }) => (
              <Input
                value={controllerField.value || ''}
                onChange={e => controllerField.onChange(e.target.value)}
              />
            )}
          />
        );
    }
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
              <Table className="min-w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center align-middle border-l-0">
                      <ChevronDown size={18} className="text-[#006397]" />
                    </TableHead>
                    {fields.map(field => {
                      if (!field.label) return null;
                      const Icon = field.icon || iconMap[field.key];
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
            {formFields.map((row, rowIdx) => (
              <TableRow key={row.id}>
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
                    {renderField(field, rowIdx)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={fields.length + 1}>
                <div className="pl-[10px] mt-4 mb-6">
                      <Button
                        type="button"
                        onClick={handleAddRow}
                    className="rounded-full px-6 bg-[#006397] text-white"
                      >
                        Add Row
                      </Button>
                </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
      {modalOpen && modalData && (
        <ReusableModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={item => {
            if (modalRowIdx !== null && modalFieldKey) {
              update(modalRowIdx, { ...formFields[modalRowIdx], [modalFieldKey]: item[modalData.columns[0]] });
            }
            setModalOpen(false);
          }}
          data={modalData.data}
          columns={modalData.columns}
          title={modalData.title}
        />
      )}
      {formModalOpen && modalFormFields && (
        <FormModal
          open={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          onSubmit={item => {
            append(item);
            setFormModalOpen(false);
          }}
          formFields={modalFormFields}
        />
      )}
    </>
  );
}
