"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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


  const midIndex = Math.ceil(data.length / 2);
  const firstcard = data.slice(0, midIndex);
  const secondcard = data.slice(midIndex);

  return (
    <div className="min-h-screen bg-slate-150 p-8 space-y-6">

      <Card className="bg-gradient-to-r from-white to-blue-100">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-3xl font-medium text-blue-700">
            View Pages
          </CardTitle>
          <Button variant="destructive">Cancel</Button>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              {firstcard.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-semibold text-gray-900">{item.label}</span>
                  <span className="font-medium text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              {secondcard.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-semibold text-gray-900">{item.label}</span>
                  <span className="font-medium text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

}
//