"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ViewFormPage() {
  const vehicleData = {
    leftCard: [
      { label: "Register Number", value: "AP39K7007" },
      { label: "Contact Name", value: "Mac" },
      { label: "Contact Number", value: "7878667564" },
      { label: "Vehicle Type", value: "Full Truck Load" }
    ],
    rightTopCard: [
      { label: "Length", value: "89.00 (M)" },
      { label: "Width", value: "89.00 (M)" },
      { label: "Height", value: "89.00 (M)" },
      { label: "Weight(Kgs)", value: "80.00 (Kg)" },
      { label: "Volume", value: "704969.00 (cbm)" }
    ],
    rightBottomCard: [
      { label: "Insured By", value: "Zxcvbnm" },
      { label: "Insurance Start Date", value: "2025-06-24" },
      { label: "Insurance Exp. Date", value: "2025-06-30" },
      { label: "Truck Brand", value: "BMW" },
      { label: "Fuel Type", value: "petrol" }
    ]
  }

  const handleCancel = () => {
    console.log("Cancel clicked")
  }

  const hasData = vehicleData.leftCard.length > 0 || vehicleData.rightTopCard.length > 0 || vehicleData.rightBottomCard.length > 0

  return (
    <div className="min-h-screen bg-slate-150">
      <div className="w-full max-w-7xl mx-auto p-8 space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-white to-slate-50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full translate-y-16 -translate-x-16" />
          <CardHeader className="flex flex-row items-center justify-between relative py-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Vehicle Information
            </CardTitle>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </CardHeader>
        </Card>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          {/* Left Card */}
          <div className="lg:col-span-1 flex">
            <Card className="relative overflow-hidden w-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full translate-y-16 -translate-x-16" />
              <CardContent className="px-6 pt-2 pb-2 flex items-center justify-center relative h-full">
                {hasData && vehicleData.leftCard.length > 0 ? (
                  <div className="space-y-6">
                    {vehicleData.leftCard.map((item, index) => (
                      <div key={index} className="text-left">
                        <p className="text-base font-medium text-gray-500 uppercase tracking-wide mb-1">
                          {item.label}
                        </p>
                        <p className="text-base font-medium text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <p className="text-lg font-medium">No Data Available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Cards */}
          <div className="lg:col-span-3 flex flex-col gap-8 h-full">
            {/* Top Right Card */}
            <Card className="relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full translate-y-16 -translate-x-16" />
              <CardContent className="px-6 pt-2 pb-2 relative h-full flex items-center">
                {hasData && vehicleData.rightTopCard.length > 0 ? (
                  <div className="grid grid-cols-5 gap-15 w-full">
                    {vehicleData.rightTopCard.map((item, index) => (
                      <div key={index} className="text-left space-y-2">
                        <p className="text-base font-medium text-gray-500 uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="text-base font-medium text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 w-full">
                    <p className="text-lg font-medium">No Data Available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Bottom Right Card */}
            <Card className="relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full translate-y-16 -translate-x-16" />
              <CardContent className="px-6 pt-2 pb-2 relative h-full flex items-center">
                {hasData && vehicleData.rightBottomCard.length > 0 ? (
                  <div className="grid grid-cols-5 gap-15 w-full">
                    {vehicleData.rightBottomCard.map((item, index) => (
                      <div key={index} className="text-left space-y-2">
                        <p className="text-base font-medium text-gray-500 uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="text-base font-medium text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 w-full">
                    <p className="text-lg font-medium">No Data Available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
