import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import ReusableModal from "./bussinessPartnerModal";
import { Search } from "lucide-react";

// Dummy data for customers and vendors (move here, not from parent)
const customerData = [
  { "Customer Code": "CUST001", Name: "John Doe", Address: "123 Main St", Email: "john@example.com" },
  { "Customer Code": "CUST002", Name: "Jane Smith", Address: "456 Second Ave", Email: "jane@example.com" },
];
const vendorData = [
  { "Vendor Code": "VEND001", Name: "Acme Supplies", Address: "789 Ocean Ave", Email: "acme@supplies.com" },
  { "Vendor Code": "VEND002", Name: "Global Vendors", Address: "101 River Rd", Email: "global@vendors.com" },
];

export function FinancialsTable({ headers, initialRows = [] }) {
  const form = useForm({
    defaultValues: {
      rows: initialRows.length > 0 ? initialRows : [{ role: "", code: "", name: "", amount: "", bu: "", flightRecorder: "", foreignCurrency: "", currencyExchange: "", exchangeRate: "", invoiceNumber: "", idCard: "", creditNoteNumber: "", invoiceDate: "", invoiceCreationDate: "", invoiceReceivedDate: "", status: "" }],
    },
  });
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowIndex, setModalRowIndex] = useState(null);
  const [modalSearch, setModalSearch] = useState("");
  const [filteredModalData, setFilteredModalData] = useState([]);
  const [modalRole, setModalRole] = useState("Customer");

  // Open modal for a specific row, using correct data for role
  const openModal = (rowIndex) => {
    setModalRowIndex(rowIndex);
    setModalOpen(true);
    setModalSearch("");
    const role = form.getValues(`rows.${rowIndex}.role`);
    setModalRole(role === "Vendor" ? "Vendor" : "Customer");
    setFilteredModalData(role === "Vendor" ? vendorData : customerData);
  };

  // Handle modal search
  const handleModalSearch = (e) => {
    const value = e.target.value;
    setModalSearch(value);
    const data = modalRole === "Vendor" ? vendorData : customerData;
    const codeLabel = modalRole === "Vendor" ? "Vendor Code" : "Customer Code";
    setFilteredModalData(
      data.filter((item) =>
        item[codeLabel]?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // Handle modal select
  const handleModalSelect = (item) => {
    const newRow = { ...fields[modalRowIndex] };
    if (modalRole === "Vendor") {
      newRow.code = item["Vendor Code"];
      newRow.name = item["Name"];
    } else {
      newRow.code = item["Customer Code"];
      newRow.name = item["Name"];
    }
    update(modalRowIndex, newRow);
    setModalOpen(false);
  };

  // When role changes, clear code/name fields and update modal data if open
  const handleRoleChange = (rowIndex, newRole) => {
    form.setValue(`rows.${rowIndex}.role`, newRole);
    form.setValue(`rows.${rowIndex}.code`, "");
    form.setValue(`rows.${rowIndex}.name`, "");
    if (modalOpen && modalRowIndex === rowIndex) {
      setModalRole(newRole === "Vendor" ? "Vendor" : "Customer");
      setFilteredModalData(newRole === "Vendor" ? vendorData : customerData);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg border border-[#E7ECFD]">
      <form onSubmit={form.handleSubmit(() => {})}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20 min-w-[100px] text-[#006397] text-left text-sm font-semibold px-3 py-2 bg-[#f8fafc]">Action</TableHead>
              {headers.map((header, idx) => (
                <TableHead
                  key={header.key}
                  className={
                    `text-[#006397] text-left text-sm font-semibold px-3 py-2 bg-[#f8fafc]` +
                    (idx === 0 || idx > 0 ? " border-l border-[#E7ECFD]" : "")
                  }
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((row, rowIndex) => (
              <TableRow key={row.id}>
                {/* Action cell */}
                <TableCell className="w-20 min-w-[100px]">
                  <div className="flex gap-2 items-center">
                    <Button type="button" size="sm" variant="outline" className="px-3 py-1 rounded-full text-[#006397] border-[#006397] hover:bg-[#e7ecfd]" tabIndex={-1}>
                      Save
                    </Button>
                    <Button type="button" size="sm" variant="destructive" className="px-3 py-1 rounded-full" onClick={() => remove(rowIndex)} tabIndex={-1}>
                      Remove
                    </Button>
                  </div>
                </TableCell>
                {headers.map((header) => {
                  if (header.key === "role") {
                    return (
                      <TableCell key={header.key} className="min-w-[180px] w-full px-2">
                        <Controller
                          control={form.control}
                          name={`rows.${rowIndex}.role`}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={val => {
                                field.onChange(val);
                                // Clear code/name fields and update modal data if open
                                form.setValue(`rows.${rowIndex}.code`, "");
                                form.setValue(`rows.${rowIndex}.name`, "");
                                if (modalOpen && modalRowIndex === rowIndex) {
                                  setModalRole(val === "Vendor" ? "Vendor" : "Customer");
                                  setFilteredModalData(val === "Vendor" ? vendorData : customerData);
                                }
                              }}
                            >
                              <SelectTrigger className="w-full min-w-[180px]">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Customer">Customer</SelectItem>
                                <SelectItem value="Vendor">Vendor</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </TableCell>
                    );
                  }
                  if (header.key === "code") {
                    return (
                      <TableCell key={header.key} className="relative min-w-[180px] w-full px-2">
                        <div className="flex items-center">
                          <Input
                            value={row.code || ""}
                            onChange={e => form.setValue(`rows.${rowIndex}.code`, e.target.value)}
                            className="pr-10 w-full min-w-[180px]"
                          />
                          <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 flex items-center justify-center"
                            onClick={() => openModal(rowIndex)}
                            tabIndex={-1}
                          >
                            <Search size={18} className="text-[#0088d2]" />
                          </button>
                        </div>
                      </TableCell>
                    );
                  }
                  // For auto-filled columns, disable if value is present and was set by modal
                  if (["name", "amount", "bu", "flightRecorder", "foreignCurrency", "currencyExchange", "exchangeRate", "invoiceNumber", "idCard", "creditNoteNumber", "invoiceDate", "invoiceCreationDate", "invoiceReceivedDate", "status"].includes(header.key)) {
                    return (
                      <TableCell key={header.key} className="min-w-[180px] w-full px-2">
                        <Input
                          value={row[header.key] || ""}
                          onChange={e => form.setValue(`rows.${rowIndex}.${header.key}`, e.target.value)}
                          disabled={!!row.code}
                          className="w-full min-w-[180px]"
                        />
                      </TableCell>
                    );
                  }
                  // Default editable cell
                  return (
                    <TableCell key={header.key} className="min-w-[180px] w-full px-2">
                      <Input
                        value={row[header.key] || ""}
                        onChange={e => form.setValue(`rows.${rowIndex}.${header.key}`, e.target.value)}
                        className="w-full min-w-[180px]"
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="pl-[10px] mt-4 mb-6">
          <Button type="button" onClick={() => append({})} className="rounded-full px-6 bg-[#006397] text-white">
            Add Row
          </Button>
        </div>

        <ReusableModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalRole === "Vendor" ? "Search Vendor" : "Search Customer"}
          columns={modalRole === "Vendor"
            ? ["Vendor Code", "Name", "Address", "Email"]
            : ["Customer Code", "Name", "Address", "Email"]}
          data={filteredModalData}
          onSelect={handleModalSelect}
        >
          <Input
            placeholder={modalRole === "Vendor" ? "Search by vendor code..." : "Search by customer code..."}
            value={modalSearch}
            onChange={handleModalSearch}
            className="mb-2"
          />
        </ReusableModal>
      </form>
    </div>
  );
} 