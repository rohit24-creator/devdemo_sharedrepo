"use client";

import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

// Zod schema for Charges table rows
const chargesRowSchema = z.object({
  chargeType: z.string().min(1, "Charge Type is required"),
  tierId: z.string().optional(),
  geoTierId: z.string().optional(),
  chargeId: z.string().optional(),
  exchangeRateId: z.string().optional(),
  chargeBasis: z.string().optional(),
  minimumAmount: z.string().optional(),
  amount: z.string().optional(),
  fuelSurcharge: z.string().optional(),
  currency: z.string().optional(),
});

// Options
const chargeTypeData = [
  { value: "select", label: "Select" },
  { value: "fixed", label: "Fixed" },
  { value: "tier", label: "Tier" },
  { value: "geo_tier", label: "Geo Tier" },
];
const tierIdData = [
  { value: "TIER001", label: "TIER001" },
  { value: "TIER002", label: "TIER002" },
  { value: "TIER003", label: "TIER003" },
  { value: "TIER004", label: "TIER004" },
  { value: "TIER005", label: "TIER005" },
];
const geoTierIdData = [
  { value: "GEO001", label: "GEO001" },
  { value: "GEO002", label: "GEO002" },
  { value: "GEO003", label: "GEO003" },
  { value: "GEO004", label: "GEO004" },
  { value: "GEO005", label: "GEO005" },
];
const chargeIdData = [
  { value: "CHG001", label: "CHG001" },
  { value: "CHG002", label: "CHG002" },
  { value: "CHG003", label: "CHG003" },
  { value: "CHG004", label: "CHG004" },
  { value: "CHG005", label: "CHG005" },
];
const exchangeRateIdData = [
  { value: "EXR001", label: "EXR001" },
  { value: "EXR002", label: "EXR002" },
  { value: "EXR003", label: "EXR003" },
  { value: "EXR004", label: "EXR004" },
  { value: "EXR005", label: "EXR005" },
];
const chargeBasisData = [
  { value: "per_unit", label: "Per Unit" },
  { value: "per_weight", label: "Per Weight" },
  { value: "per_distance", label: "Per Distance" },
  { value: "per_shipment", label: "Per Shipment" },
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed" },
  { value: "tiered", label: "Tiered" },
  { value: "volume_based", label: "Volume Based" },
];
const fuelSurchargeData = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "conditional", label: "Conditional" },
];
const currencyData = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "INR", label: "INR" },
  { value: "GBP", label: "GBP" },
  { value: "JPY", label: "JPY" },
  { value: "AUD", label: "AUD" },
  { value: "CAD", label: "CAD" },
  { value: "SGD", label: "SGD" },
];

// Disable logic
const getFieldDisabled = (chargeType, fieldName) => {
  switch (chargeType) {
    case "select":
      return fieldName === "fuelSurcharge";
    case "fixed":
      return ["tierId", "geoTierId", "fuelSurcharge"].includes(fieldName);
    case "tier":
      return ["geoTierId", "exchangeRateId", "chargeBasis", "minimumAmount", "amount", "fuelSurcharge"].includes(fieldName);
    case "geo_tier":
      return ["tierId", "exchangeRateId", "chargeBasis", "minimumAmount", "amount", "fuelSurcharge"].includes(fieldName);
    default:
      return false;
  }
};

export default function RateRecordChargesPage() {
  const columns = [
    { accessorKey: "chargeType", header: "Charge Type", type: "select", options: chargeTypeData, placeholder: "Select Charge Type" },
    { accessorKey: "tierId", header: "Tier ID", type: "select", options: tierIdData, placeholder: "Select Tier ID", getDisabled: (row) => getFieldDisabled(row?.chargeType, "tierId") },
    { accessorKey: "geoTierId", header: "Geo Tier ID", type: "select", options: geoTierIdData, placeholder: "Select Geo Tier ID", getDisabled: (row) => getFieldDisabled(row?.chargeType, "geoTierId") },
    { accessorKey: "chargeId", header: "Charge ID", type: "select", options: chargeIdData, placeholder: "Select Charge ID", getDisabled: (row) => getFieldDisabled(row?.chargeType, "chargeId") },
    { accessorKey: "exchangeRateId", header: "Exchange Rate ID", type: "select", options: exchangeRateIdData, placeholder: "Select Exchange Rate ID", getDisabled: (row) => getFieldDisabled(row?.chargeType, "exchangeRateId") },
    { accessorKey: "chargeBasis", header: "Charge Basis", type: "select", options: chargeBasisData, placeholder: "Select Charge Basis", getDisabled: (row) => getFieldDisabled(row?.chargeType, "chargeBasis") },
    { accessorKey: "minimumAmount", header: "Minimum Amount", type: "number", placeholder: "Enter Minimum Amount", getDisabled: (row) => getFieldDisabled(row?.chargeType, "minimumAmount") },
    { accessorKey: "amount", header: "Amount", type: "number", placeholder: "Enter Amount", getDisabled: (row) => getFieldDisabled(row?.chargeType, "amount") },
    { accessorKey: "fuelSurcharge", header: "Fuel Surcharge", type: "select", options: fuelSurchargeData, placeholder: "Select Fuel Surcharge", getDisabled: (row) => getFieldDisabled(row?.chargeType, "fuelSurcharge") },
    { accessorKey: "currency", header: "Currency", type: "select", options: currencyData, placeholder: "Select Currency", getDisabled: (row) => getFieldDisabled(row?.chargeType, "currency") },
  ];

  const sections = [
    {
      type: "table",
      title: "Charges",
      dynamicRows: true,
      showActions: true,
      columns,
      defaultRow: {
        chargeType: "",
        tierId: "",
        geoTierId: "",
        chargeId: "",
        exchangeRateId: "",
        chargeBasis: "",
        minimumAmount: "",
        amount: "",
        fuelSurcharge: "",
        currency: "",
      },
      tableSchema: chargesRowSchema,
      onSave: (rowData, rowIndex) => {
        // Optional: clear values for disabled fields on save to keep data clean
        const type = rowData?.chargeType;
        [
          "tierId",
          "geoTierId",
          "exchangeRateId",
          "chargeBasis",
          "minimumAmount",
          "amount",
          "fuelSurcharge",
        ].forEach((f) => {
          if (getFieldDisabled(type, f)) rowData[f] = "";
        });
        console.log("Charges row saved:", rowData, "at index:", rowIndex);
      },
    },
  ];

  return (
    <BillingForm sections={sections} useAccordion={true} />
  );
}
