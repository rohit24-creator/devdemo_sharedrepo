"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ViewFormPage() {
  // Simple array of label-value pairs
  const allFields = [
    { label: "Register Number", value: "BKL309" },
    { label: "Vehicle Type", value: "22 WHEELER" },
    { label: "Truck Brand", value: "WESTERN STAR" },
    { label: "Fuel Type", value: "Diesel" },
    { label: "Status", value: "Active" },
    { label: "Owner Name", value: "ALBERT" },
    { label: "Vehicle Color", value: "Blue" },
    { label: "Purchase Year", value: "2022" },
    { label: "Length", value: "8.00 (M)" },
    { label: "Width", value: "3.00 (M)" },
    { label: "Height", value: "4.00 (M)" },
    { label: "Weight(Kgs)", value: "1300.00 (Kg)" },
    { label: "Volume", value: "5.00 (cbm)" },
    { label: "Contact Name", value: "ALBERT" },
    { label: "Contact Number", value: "8706586545" },
    { label: "Vehicle Owner", value: "ALBERT" },
    { label: "Insured By", value: "ALBERT" },
    { label: "Insurance Start Date", value: "2024-11-28" },
    { label: "Insurance Exp. Date", value: "2030-11-15" },
    { label: "Description", value: "GOODS AND SERVICES" }
  ]



  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white sticky top-0 z-10 shadow-sm border-b border-slate-200 w-full">
        <div className="w-full px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Vehicles View
          </h1>
          <Button variant="destructive" size="lg">Cancel</Button>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 py-6">
        <Card className="w-full border border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-100 py-4 px-5">
            <CardTitle className="text-xl font-semibold text-slate-900">Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 pb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {allFields.map((field, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-0 items-center">
                  <span className="text-base font-medium text-slate-600">{field.label} : </span>
                  <span className="text-base font-semibold text-slate-900">{field.value}</span>
          </div>
              ))}
          </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
