"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";

const conversionFactorSchema = z.object({
  conversionId: z.string().min(1, "Conversion ID is required"),
  conversionName: z.string().min(1, "Conversion Name is required"),
  companyCode: z.string().min(1, "Company Code is required"),
  uom1: z.string().min(1, "UOM 1 is required"),
  units1: z.string().min(1, "Units 1 is required"),
  conversion1: z.string().min(1, "Conversion 1 is required"),
  uom2: z.string().min(1, "UOM 2 is required"),
  units2: z.string().min(1, "Units 2 is required"),
  conversion2: z.string().min(1, "Conversion 2 is required"),
  uom3: z.string().optional(),
  units3: z.string().optional(),
  conversion3: z.string().optional(),
  uom4: z.string().optional(),
  units4: z.string().optional(),
  conversion4: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  baseUom: z.string().min(1, "Base UOM is required"),
  tariffType: z.string().min(1, "Tariff Type is required"),
});

const conversionFactorFields = [
  { 
    name: "conversionId", 
    label: "Conversion ID", 
    type: "text",
    placeholder: "Enter Conversion ID",
  },
  { 
    name: "conversionName", 
    label: "Conversion Name", 
    type: "text",
    placeholder: "Enter Conversion Name",
  },
  { 
    name: "companyCode", 
    label: "Company Code", 
    type: "text",
    placeholder: "Enter Company Code",
    modalFieldName: "companyCode",
  },
];

const conversionGroupFields = [
  { 
    name: "uom1", 
    label: "UOM 1", 
    type: "select",
    options: [
      { value: "kg", label: "Kilogram (KG)" },
      { value: "lb", label: "Pound (LB)" },
      { value: "m3", label: "Cubic Meter (M3)" },
      { value: "ft3", label: "Cubic Feet (FT3)" },
      { value: "m", label: "Meter (M)" },
      { value: "ft", label: "Feet (FT)" },
      { value: "km", label: "Kilometer (KM)" },
      { value: "mile", label: "Mile" },
      { value: "liter", label: "Liter (L)" },
      { value: "gallon", label: "Gallon (GAL)" },
      { value: "piece", label: "Piece (PCS)" },
      { value: "box", label: "Box" },
      { value: "pallet", label: "Pallet" },
      { value: "container", label: "Container" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "units1", 
    label: "Units 1", 
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "10", label: "10" },
      { value: "100", label: "100" },
      { value: "1000", label: "1000" },
      { value: "0.1", label: "0.1" },
      { value: "0.01", label: "0.01" },
      { value: "0.001", label: "0.001" },
      { value: "2", label: "2" },
      { value: "5", label: "5" },
      { value: "20", label: "20" },
      { value: "25", label: "25" },
      { value: "50", label: "50" },
      { value: "200", label: "200" },
      { value: "500", label: "500" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "conversion1", 
    label: "Conversion 1", 
    type: "text",
    placeholder: "Enter Conversion 1",
  },
  { 
    name: "uom2", 
    label: "UOM 2", 
    type: "select",
    options: [
      { value: "kg", label: "Kilogram (KG)" },
      { value: "lb", label: "Pound (LB)" },
      { value: "m3", label: "Cubic Meter (M3)" },
      { value: "ft3", label: "Cubic Feet (FT3)" },
      { value: "m", label: "Meter (M)" },
      { value: "ft", label: "Feet (FT)" },
      { value: "km", label: "Kilometer (KM)" },
      { value: "mile", label: "Mile" },
      { value: "liter", label: "Liter (L)" },
      { value: "gallon", label: "Gallon (GAL)" },
      { value: "piece", label: "Piece (PCS)" },
      { value: "box", label: "Box" },
      { value: "pallet", label: "Pallet" },
      { value: "container", label: "Container" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "units2", 
    label: "Units 2", 
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "10", label: "10" },
      { value: "100", label: "100" },
      { value: "1000", label: "1000" },
      { value: "0.1", label: "0.1" },
      { value: "0.01", label: "0.01" },
      { value: "0.001", label: "0.001" },
      { value: "2", label: "2" },
      { value: "5", label: "5" },
      { value: "20", label: "20" },
      { value: "25", label: "25" },
      { value: "50", label: "50" },
      { value: "200", label: "200" },
      { value: "500", label: "500" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "conversion2", 
    label: "Conversion 2", 
    type: "text",
    placeholder: "Enter Conversion 2",
  },
  { 
    name: "country", 
    label: "Country", 
    type: "select",
    options: [
      { value: "india", label: "India" },
      { value: "thailand", label: "Thailand" },
      { value: "singapore", label: "Singapore" },
      { value: "malaysia", label: "Malaysia" },
      { value: "indonesia", label: "Indonesia" },
      { value: "vietnam", label: "Vietnam" },
      { value: "philippines", label: "Philippines" },
      { value: "china", label: "China" },
      { value: "japan", label: "Japan" },
      { value: "south_korea", label: "South Korea" },
      { value: "australia", label: "Australia" },
      { value: "new_zealand", label: "New Zealand" },
      { value: "usa", label: "United States" },
      { value: "canada", label: "Canada" },
      { value: "uk", label: "United Kingdom" },
      { value: "germany", label: "Germany" },
      { value: "france", label: "France" },
      { value: "italy", label: "Italy" },
      { value: "spain", label: "Spain" },
      { value: "netherlands", label: "Netherlands" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "uom3", 
    label: "UOM 3", 
    type: "select",
    options: [
      { value: "kg", label: "Kilogram (KG)" },
      { value: "lb", label: "Pound (LB)" },
      { value: "m3", label: "Cubic Meter (M3)" },
      { value: "ft3", label: "Cubic Feet (FT3)" },
      { value: "m", label: "Meter (M)" },
      { value: "ft", label: "Feet (FT)" },
      { value: "km", label: "Kilometer (KM)" },
      { value: "mile", label: "Mile" },
      { value: "liter", label: "Liter (L)" },
      { value: "gallon", label: "Gallon (GAL)" },
      { value: "piece", label: "Piece (PCS)" },
      { value: "box", label: "Box" },
      { value: "pallet", label: "Pallet" },
      { value: "container", label: "Container" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "units3", 
    label: "Units 3", 
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "10", label: "10" },
      { value: "100", label: "100" },
      { value: "1000", label: "1000" },
      { value: "0.1", label: "0.1" },
      { value: "0.01", label: "0.01" },
      { value: "0.001", label: "0.001" },
      { value: "2", label: "2" },
      { value: "5", label: "5" },
      { value: "20", label: "20" },
      { value: "25", label: "25" },
      { value: "50", label: "50" },
      { value: "200", label: "200" },
      { value: "500", label: "500" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "conversion3", 
    label: "Conversion 3", 
    type: "text",
    placeholder: "Enter Conversion 3",
  },
  { 
    name: "uom4", 
    label: "UOM 4", 
    type: "select",
    options: [
      { value: "kg", label: "Kilogram (KG)" },
      { value: "lb", label: "Pound (LB)" },
      { value: "m3", label: "Cubic Meter (M3)" },
      { value: "ft3", label: "Cubic Feet (FT3)" },
      { value: "m", label: "Meter (M)" },
      { value: "ft", label: "Feet (FT)" },
      { value: "km", label: "Kilometer (KM)" },
      { value: "mile", label: "Mile" },
      { value: "liter", label: "Liter (L)" },
      { value: "gallon", label: "Gallon (GAL)" },
      { value: "piece", label: "Piece (PCS)" },
      { value: "box", label: "Box" },
      { value: "pallet", label: "Pallet" },
      { value: "container", label: "Container" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "units4", 
    label: "Units 4", 
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "10", label: "10" },
      { value: "100", label: "100" },
      { value: "1000", label: "1000" },
      { value: "0.1", label: "0.1" },
      { value: "0.01", label: "0.01" },
      { value: "0.001", label: "0.001" },
      { value: "2", label: "2" },
      { value: "5", label: "5" },
      { value: "20", label: "20" },
      { value: "25", label: "25" },
      { value: "50", label: "50" },
      { value: "200", label: "200" },
      { value: "500", label: "500" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "conversion4", 
    label: "Conversion 4", 
    type: "text",
    placeholder: "Enter Conversion 4",
  },
  { 
    name: "baseUom", 
    label: "Base UOM", 
    type: "select",
    options: [
      { value: "kg", label: "Kilogram (KG)" },
      { value: "lb", label: "Pound (LB)" },
      { value: "m3", label: "Cubic Meter (M3)" },
      { value: "ft3", label: "Cubic Feet (FT3)" },
      { value: "m", label: "Meter (M)" },
      { value: "ft", label: "Feet (FT)" },
      { value: "km", label: "Kilometer (KM)" },
      { value: "mile", label: "Mile" },
      { value: "liter", label: "Liter (L)" },
      { value: "gallon", label: "Gallon (GAL)" },
      { value: "piece", label: "Piece (PCS)" },
      { value: "box", label: "Box" },
      { value: "pallet", label: "Pallet" },
      { value: "container", label: "Container" },
    ],
    placeholder: "SELECT",
  },
  { 
    name: "tariffType", 
    label: "Tariff Type", 
    type: "select",
    options: [
      { value: "freight", label: "Freight" },
      { value: "fuel_surcharge", label: "Fuel Surcharge" },
      { value: "peak_season", label: "Peak Season" },
      { value: "weekend", label: "Weekend" },
      { value: "holiday", label: "Holiday" },
      { value: "urgent", label: "Urgent" },
      { value: "express", label: "Express" },
      { value: "standard", label: "Standard" },
      { value: "bulk", label: "Bulk" },
      { value: "container", label: "Container" },
      { value: "break_bulk", label: "Break Bulk" },
      { value: "project_cargo", label: "Project Cargo" },
      { value: "dangerous_goods", label: "Dangerous Goods" },
      { value: "perishable", label: "Perishable" },
      { value: "heavy_lift", label: "Heavy Lift" },
      { value: "oversized", label: "Oversized" },
    ],
    placeholder: "SELECT",
  },
];

export default function ConversionFactorPage() {
  const form = useForm({
    resolver: zodResolver(conversionFactorSchema),
    defaultValues: {
      conversionId: "",
      conversionName: "",
      companyCode: "",
      uom1: "",
      units1: "",
      conversion1: "",
      uom2: "",
      units2: "",
      conversion2: "",
      uom3: "",
      units3: "",
      conversion3: "",
      uom4: "",
      units4: "",
      conversion4: "",
      country: "",
      baseUom: "",
      tariffType: "",
    },
  });

  const handleSubmit = (data) => {
    console.log("Conversion Factor Submitted:", data);
  };

  // Custom layout renderer for the conversion factor form
  const renderConversionLayout = ({ renderField }) => {
    // Helper function to find field by name
    const findFieldByName = (fieldName) => {
      return conversionGroupFields.find(field => field.name === fieldName);
    };

    // Get specific fields dynamically
    const tariffTypeField = findFieldByName("tariffType");
    const countryField = findFieldByName("country");
    const baseUomField = findFieldByName("baseUom");

    // Get conversion fields dynamically
    const conversion1Fields = conversionGroupFields.filter(field => 
      field.name.match(/^(uom|units|conversion)1$/)
    );
    const conversion2Fields = conversionGroupFields.filter(field => 
      field.name.match(/^(uom|units|conversion)2$/)
    );
    const conversion3Fields = conversionGroupFields.filter(field => 
      field.name.match(/^(uom|units|conversion)3$/)
    );
    const conversion4Fields = conversionGroupFields.filter(field => 
      field.name.match(/^(uom|units|conversion)4$/)
    );

    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-6">
            {/* Top row - Basic info (4 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {conversionFactorFields.map((field) =>
                renderField(field, form, 0)
              )}
              {tariffTypeField && renderField(tariffTypeField, form, 0)}
            </div>

            {/* Conversion 1 & 2 row (7 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {conversion1Fields.map((field) =>
                renderField(field, form, 0)
              )}
              {conversion2Fields.map((field) =>
                renderField(field, form, 0)
              )}
              {countryField && renderField(countryField, form, 0)}
            </div>

            {/* Conversion 3 & 4 row (7 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {conversion3Fields.map((field) =>
                renderField(field, form, 0)
              )}
              {conversion4Fields.map((field) =>
                renderField(field, form, 0)
              )}
              {baseUomField && renderField(baseUomField, form, 0)}
            </div>
          </div>
        </form>
      </FormProvider>
    );
  };

  const sections = [
    {
      type: "form",
      title: "General Info",
      form,
      fields: [], 
      onSubmit: handleSubmit,
      renderLayout: renderConversionLayout,
      children: (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6 py-2"
          >
            Save Conversion Factor
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Conversion Factor</h1>
      <BillingForm sections={sections} useAccordion={true} />
    </div>
  );
}
