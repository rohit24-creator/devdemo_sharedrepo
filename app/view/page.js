"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";

export default function Viewpages() {
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

  return (
    <div className="min-h-screen bg-slate-150 p-8 space-y-6">

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-3xl font-semibold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Vehicle Details
          </CardTitle>
          <Button variant="destructive">Cancel</Button>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex itme-center space-x-2">
          <div className="bg-green-600 rounded-md p-2">
            <Truck className="text-white" />
          </div>
          <CardTitle className="text-xl font-semibold text-blue-700">
            Vehicle Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col">
                < span className="text-base font-semibold text-gray-700" >
                  {item.label}:
                </span>
                <span className="text-lg font-medium text-gray-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent >
      </Card >
    </div >
  );
}
//