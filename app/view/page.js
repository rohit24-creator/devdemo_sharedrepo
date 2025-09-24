"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

export default function View() {
  const data = [
    { label: "Register Number", value: "BKL309" },
    { label: "Vehicle Type", value: "22 WHEELER" },
    { label: "Contact Name", value: "Albert" },
    { label: "Contact Number", value: "9708569443" },
    { label: "Length", value: "8.00 (M)" },
    { label: "Width", value: "3.00 (M)" },
    { label: "Height", value: "4.00 (M)" },
    { label: "Weight", value: "1300.00 (Kg)" },
    { label: "Volume", value: "5.60 (cbm)" },
    { label: "Insured By", value: "Albert" },
    { label: "Insurance Start Date", value: "2024-11-28" },
    { label: "Insurance Exp Date", value: "2030-11-15" },
    { label: "Truck Brand", value: "Western Star" },
    { label: "Fuel Type", value: "Select" },
    { label: "Status", value: "Active", isStatus: true },
    { label: "Description", value: "Goods and Services" },
  ];

  return <div className="min-h-screen p-8 bg-slate-100">
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-3xl font-semibold">View Information</h1>
      <Button variant="destructive">Cancel</Button>
    </div>

    <Card >
      <CardHeader className="flex items-center bg-blue-400 px-4 py-6 rounded-t-md" >
        <Truck className="h-8 w-8 text-white" />
        <CardTitle className="text-2xl font-medium text-white">VIEW DETAILS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <div key={index} className="grid grid-cols-2">
              <span className="text-base font-semibold text-gray-700">{item.label} :</span>
              <span className="text-lg font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div >


}