"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const accountSchema = z.object({
  accountNumber: z.string().min(1, "Account Number is required"),
  aconEnvironment: z.string().min(1, "Acon Environment is required"),
  sourceSystem: z.string().min(1, "Source System is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  billable: z.enum(["yes", "no"]),
  prePayment: z.enum(["yes", "no"]),
  multipleInvoices: z.enum(["yes", "no"]),
});

const tariffSchema = z.object({
  companyCode: z.string().min(1, "Company Code is required"),
  branchCode: z.string().min(1, "Branch Code is required"),
  contractId: z.string().min(1, "Contract ID is required"),
  rateDerivation: z.enum(["specific", "generic"]),
});

const accountFields = [
  { name: "accountNumber", label: "Account Number", type: "text" },
  { name: "aconEnvironment", label: "Acon Environment", type: "text" },
  { name: "sourceSystem", label: "Source System", type: "text" },
  { name: "companyCode", label: "Company Code", type: "company" },
  { name: "billable", label: "Billable", type: "radio", options: ["yes", "no"] },
  { name: "prePayment", label: "Pre Payment", type: "radio", options: ["yes", "no"] },
  { name: "multipleInvoices", label: "Multiple Invoices", type: "radio", options: ["yes", "no"] },
  ];

const tariffFields = [
  { name: "companyCode", label: "Company Code", type: "company" },
  { name: "branchCode", label: "Branch Code", type: "branch" },
  { name: "contractId", label: "Contract ID", type: "text" },
  { name: "rateDerivation", label: "Rate Derivation", type: "radio", options: ["specific", "generic"] },
];

export default function FinancialsForm() {
  const accountForm = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountNumber: "",
      aconEnvironment: "",
      sourceSystem: "",
      companyCode: "THKN",
      billable: "no",
      prePayment: "yes",
      multipleInvoices: "yes",
    },
  });

  const tariffForm = useForm({
    resolver: zodResolver(tariffSchema),
    defaultValues: {
      companyCode: "THKN",
      branchCode: "THBKK",
      contractId: "",
      rateDerivation: "generic",
    },
  });

  const [accountEntries, setAccountEntries] = useState([]);
  const [tariffEntries, setTariffEntries] = useState([]);

  const onAccountSubmit = (data) => {
    setAccountEntries((prev) => [...prev, data]);
    accountForm.reset();
  };

  const onTariffSubmit = (data) => {
    setTariffEntries((prev) => [...prev, data]);
    tariffForm.reset();
  };

  const sections = [
    {
      type: "form",
      title: "Accounts",
      form: accountForm,
      fields: accountFields,
      onSubmit: onAccountSubmit,
      children: (
        <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
                  Add Account
                </Button>
      ),
      customTable: {
        schema: accountSchema,
        entries: accountEntries,
        onEdit: (entry, index) => {
          accountForm.reset({
            accountNumber: entry.accountNumber ?? "",
            aconEnvironment: entry.aconEnvironment ?? "",
            sourceSystem: entry.sourceSystem ?? "",
            companyCode: entry.companyCode ?? "",
            billable: entry.billable ?? "no",
            prePayment: entry.prePayment ?? "yes",
            multipleInvoices: entry.multipleInvoices ?? "yes",
          });
        },
        onDelete: (index) => {
          const updated = [...accountEntries];
          updated.splice(index, 1);
          setAccountEntries(updated);
        },
        renderOutsideForm: false,
      },
    },
    {
      type: "form",
      title: "Tariff/Contract",
      form: tariffForm,
      fields: tariffFields,
      onSubmit: onTariffSubmit,
      children: (
        <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
          Add Tariff/Contract
                                </Button>
      ),
      customTable: {
        schema: tariffSchema,
        entries: tariffEntries,
        onEdit: (entry, index) => {
          tariffForm.reset({
            companyCode: entry.companyCode ?? "",
            branchCode: entry.branchCode ?? "",
            contractId: entry.contractId ?? "",
            rateDerivation: entry.rateDerivation ?? "generic",
          });
        },
        onDelete: (index) => {
          const updated = [...tariffEntries];
                                      updated.splice(index, 1);
          setTariffEntries(updated);
        },
        renderOutsideForm: false,
      },
    },
  ];

  return (
    <div className="p-6">
      <ReusableForm sections={sections} />
    </div>
  );
}