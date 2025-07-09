"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function buildZodSchema(fields = []) {
  const shape = {};

  fields.forEach((field) => {
    const { name, type, unitKey, unitName } = field;

    if (!name) {
      throw new Error("Missing 'name' in one of the form fields");
    }

    switch (type) {
      case "text":
      case "text+icons":
        shape[name] = z.string().optional();
        break;

      case "number":
        shape[name] = z
          .union([z.string().regex(/^\d*\.?\d*$/), z.number()])
          .optional();
        break;

      case "number+unit": {
        shape[name] = z
          .union([z.string().regex(/^\d*\.?\d*$/), z.number()])
          .optional();
        const unitField = unitName || unitKey;
        if (!unitField) {
          throw new Error(`Missing 'unitName' or 'unitKey' for number+unit field: ${name}`);
        }
        shape[unitField] = z.string().optional();
        break;
      }

      case "checkbox":
        shape[name] = z.boolean().optional();
        break;

      default:
        throw new Error(`Unsupported field type: ${type}`);
    }
  });

  return z.object(shape);
}

export default function FormModal({ open, onClose, title, formFields = [], onSubmit }) {
  const schema = useMemo(() => buildZodSchema(formFields), [formFields]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: formFields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      if (field.type === "number+unit" && (field.unitKey || field.unitName)) {
        acc[field.unitKey || field.unitName] = "";
      }
      return acc;
    }, {}),
  });

  function handleSubmit(data) {
    onSubmit(data);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[60rem] p-0">
        {/* Title Bar */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-md">
          <DialogTitle className="text-lg font-semibold">{title || "Add Item"}</DialogTitle>
        </div>
        {/* Form Fields in 3-column grid */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="bg-white px-8 py-6 grid grid-cols-3 gap-x-6 gap-y-4">
            {formFields.map((field) => {
              const unitField = field.unitKey || field.unitName;
              return (
                <div key={field.name} className="flex flex-col gap-1">
                  <label className="font-medium text-sm mb-1">{field.label}</label>
                  {field.type === "text" || field.type === "text+icons" ? (
                    <Input {...form.register(field.name)} className="w-full px-4 py-2 text-base" />
                  ) : field.type === "number" ? (
                    <Input type="number" {...form.register(field.name)} className="w-full px-4 py-2 text-base" />
                  ) : field.type === "number+unit" ? (
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        {...form.register(field.name)}
                        placeholder={field.label}
                        className="flex-1 w-full px-4 py-2 text-base"
                      />
                      <select {...form.register(unitField)} className="border px-4 py-2 rounded min-w-[80px] text-base w-auto">
                        {field.unitOptions?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : field.type === "checkbox" ? (
                    <input type="checkbox" {...form.register(field.name)} />
                  ) : (
                    <Input {...form.register(field.name)} className="w-full px-4 py-2 text-base" />
                  )}
                </div>
              );
            })}
            {/* Empty divs to fill last row if needed */}
            {Array.from({length: (3 - (formFields.length % 3)) % 3}).map((_, i) => <div key={"empty-"+i}></div>)}
          </form>
          {/* Footer row: Close/Add buttons */}
          <div className="w-full flex justify-end gap-4 pt-6 bg-[#eaf3fc] px-8 py-6 rounded-b-md">
            <Button type="button" variant="destructive" className="px-8 rounded-full" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full">
              Add
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
