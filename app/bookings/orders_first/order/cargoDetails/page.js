"use client"


import React, { useState } from "react";
import ReusableTable from "../../../../../components/ui/reusableComponent/reusabletable";
import {
  Truck,
  FileText,
  ShoppingCart,
  UserSquare,
  ScanLine,
  Ruler,
  ArrowLeftRight,
  ArrowUpDown,
  Weight,
  BarChart2,
  List,
  Layers,
  Square,
  SplitSquare,
} from "lucide-react";

const cargoFields = [
  { key: 'packageType', label: 'Package Type', type: 'text+icons', icon: Truck },
  { key: 'goodsDescription', label: 'Goods Description', type: 'text', icon: FileText },
  { key: 'quantity', label: 'Quantity', type: 'number', icon: ShoppingCart },
  { key: 'itemId', label: 'Item ID', type: 'text', icon: UserSquare },
  { key: 'scannedQuantity', label: 'Scanned Quantity', type: 'number', icon: ScanLine },
  { key: 'length', label: 'Length', type: 'number+unit', icon: Ruler, unitKey: 'lengthUnit',  unitOptions: ['M', 'CM', 'MM'] },
  { key: 'width', label: 'Width', type: 'number+unit', icon: ArrowLeftRight, unitKey: 'widthUnit', unitOptions: ['M', 'CM', 'MM'] },
  { key: 'height', label: 'Height', type: 'number+unit', icon: ArrowUpDown, unitKey: 'heightUnit', unitOptions: ['M', 'CM', 'MM'] },
  { key: 'actualWeight', label: 'Actual Weight', type: 'number+unit', icon: Weight, unitKey: 'actualWeightUnit', unitOptions: ['Kg', 'Lb'] },
  { key: 'weight', label: 'Weight', type: 'number+unit', icon: Weight, unitKey: 'weightUnit', unitOptions: ['Kg', 'Lb'] },
  { key: 'volumetricWeight', label: 'Volumetric Weight', type: 'number+unit', icon: Weight, unitKey: 'volumetricWeightUnit', unitOptions: ['Kg', 'Lb'] },
  { key: 'actualVolume', label: 'Actual Volume', type: 'number+unit', icon: BarChart2, unitKey: 'actualVolumeUnit', unitOptions: ['cbm', 'l'] },
  { key: 'volume', label: 'Volume', type: 'number+unit', icon: BarChart2, unitKey: 'volumeUnit', unitOptions: ['cbm', 'l'] },
  { key: 'ldm', label: 'LDM', type: 'text', icon: List },
  { key: 'stackable', label: 'Stackable', type: 'checkbox'},
  { key: 'grounded', label: 'Grounded', type: 'checkbox' },
  { key: 'split', label: 'Split', type: 'checkbox' },
  { key: 'dgGoods', label: 'DG Goods', type: 'checkbox' },

];

const itemFormFields = [
  { name: "packageType", label: "Package Type", type: "text", required: true },
  { name: "itemName", label: "Item Name", type: "text", required: true },
  { name: "description", label: "Description", type: "text" },
  { name: "length", label: "Length", type: "number+unit", unitName: "lengthUnit", unitOptions: ["M", "CM", "MM"], required: true },
  { name: "width", label: "Width", type: "number+unit", unitName: "widthUnit", unitOptions: ["M", "CM", "MM"], required: true },
  { name: "height", label: "Height", type: "number+unit", unitName: "heightUnit", unitOptions: ["M", "CM", "MM"], required: true },
  { name: "actualWeight", label: "Actual Weight", type: "number+unit", unitName: "actualWeightUnit", unitOptions: ["kg", "g", "lb"], required: true },
  { name: "weight", label: "Weight", type: "number+unit", unitName: "weightUnit", unitOptions: ["kg", "g", "lb"], required: true },
  { name: "volumetricWeight", label: "Volumetric Weight", type: "number+unit", unitName: "volumetricWeightUnit", unitOptions: ["kg", "g", "lb"], required: true },
  { name: "actualVolume", label: "Actual Volume", type: "number+unit", unitName: "actualVolumeUnit", unitOptions: ["cbm", "l", "CM3"], required: true },
  { name: "volume", label: "Volume", type: "number+unit", unitName: "volumeUnit", unitOptions: ["cbm", "l", "CM3"], required: true },
  { name: "itemNumber", label: "Item Number", type: "text" },
  { name: "hsnCode", label: "HSN Code", type: "text" },
  { name: "colorCode", label: "Color Code", type: "text" },
  { name: "colorCodeName", label: "Color Code Name", type: "text" },
  { name: "sizeCode", label: "Size Code", type: "text" },
  { name: "sizeCodeName", label: "Size Code Name", type: "text" },
  { name: "unitPrice", label: "Unit Price", type: "text" },
];

export default function OrderPage() {
  const [cargoData, setCargoData] = useState([
    // Initial row example (can be empty)
    // { packageType: '', goodsDescription: '', ... }
  ]);

  const packageTypeList = [
    { "Package Type": "item-1", Length: "1111.00m", Width: "111.00m", Height: "1111.00m", "Actual Weight": "11.00kg", Weight: "11.000kg", "Volumetric Weight": "111.00kg", "Actual Volume": "11.000cbm", Volume: "11.000", "Description": "Sample item 1" },
    { "Package Type": "METALS", Length: "22.00m", Width: "22.00m", Height: "45.00m", "Actual Weight": "200.00kg", Weight: "700.000kg", "Volumetric Weight": "46.00kg", "Actual Volume": "0.000cbm", Volume: "0.000", "Description": "Metal goods" },
    { "Package Type": "BX", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Box type cargo" },
    { "Package Type": "CNT", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Container cargo" },
    { "Package Type": "CTN", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Carton cargo" },
    { "Package Type": "PCS", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Pieces" },
    { "Package Type": "PKG", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Package" },
    { "Package Type": "PLT", Length: "2.00m", Width: "2.00m", Height: "2.00m", "Actual Weight": "8.00kg", Weight: "0", "Volumetric Weight": "0.00", "Actual Volume": "8.000cbm", Volume: "0", "Description": "Pallet" },
    { "Package Type": "BOXES TEST AKL FNT", Length: "0.00m", Width: "0.00m", Height: "0.00m", "Actual Weight": "0.00kg", Weight: "10.000kg", "Volumetric Weight": "0.00", "Actual Volume": "0.000cbm", Volume: "0.000", "Description": "Test boxes" },
    { "Package Type": "Cotton Relaxed Ankle Pants", Length: "58.00CM", Width: "37.00CM", Height: "24.00CM", "Actual Weight": "20000.00G", Weight: "0", "Volumetric Weight": "0", "Actual Volume": "51504.000CM3", Volume: "0", "Description": "Garment item" },
  ];
  const packageTypeColumns = ["Package Type", "Length", "Width", "Height", "Actual Weight", "Weight", "Volumetric Weight", "Actual Volume", "Volume","Description"];

  return (
    <div style={{ padding: 24 }}>
      <ReusableTable
        fields={cargoFields}
        data={cargoData}
        onChange={setCargoData}
        accordionTitle="Cargo Details"
        modalData={{
          data: packageTypeList,
          columns: packageTypeColumns,
          title: "List of Items"
        }}
        formFields={itemFormFields}
      />
    </div>
  );
}
