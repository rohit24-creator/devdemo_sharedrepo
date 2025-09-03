"use client";
import React from "react";
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Trash2 } from "lucide-react";

// Minimal scrollbar styles
const Scrollbar = `
  .minimal-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db #f3f4f6;
  }
  
  .minimal-scrollbar::-webkit-scrollbar {
    height: 4px;
  }
  
  .minimal-scrollbar::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 2px;
  }
  
  .minimal-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 2px;
  }
  
  .minimal-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const routeTemplateSchema = z.object({
  templateId: z.string(),
  templateName: z.string().min(1, { message: "Template Name is required" }),
  active: z.boolean().default(true),
  description: z.string().optional(),
});


const routeHeaderSchema = z.object({
  product: z.string().optional(),
  service: z.string().optional(),
  customerId: z.string().optional(),
  orderType: z.string().optional(),
  contactNumber: z.string().optional(),
});


const routeAttributesSchema = z.object({
  carrierType: z.string().min(1, { message: "Carrier Type is required" }),
  shipmentType: z.string().min(1, { message: "Shipment Type is required" }),
  minDistance: z.string().optional(),
  maxDistance: z.string().optional(),
  minWeight: z.string().optional(),
  maxWeight: z.string().optional(),
  minVolume: z.string().optional(),
  maxVolume: z.string().optional(),
});


const routeLegsSchema = z.object({
  routeLegs: z.array(z.object({
    legId: z.string(),
    originLocation: z.string().optional(),
    destinationLocation: z.string().optional(),
    wayPoints: z.string().optional(),
    vesselNumber: z.string().optional(),
    carrierName: z.string().optional(),
    modeOfTransport: z.string().optional(),
    vehicleType: z.string().optional(),
    vehicleId: z.string().optional(),
    driverName: z.string().optional(),
  }))
});

export default function TripTemplatePage() {
  const routeTemplateForm = useForm({
    resolver: zodResolver(routeTemplateSchema),
    defaultValues: {
      templateId: "",
      templateName: "",
      active: true,
      description: "",
    },
  });

  const routeHeaderForm = useForm({
    resolver: zodResolver(routeHeaderSchema),
    defaultValues: {
      product: "",
      service: "",
      customerId: "",
      orderType: "",
      contactNumber: "",
    },
  });

  const routeAttributesForm = useForm({
    resolver: zodResolver(routeAttributesSchema),
    defaultValues: {
      carrierType: "Single Carrier",
      shipmentType: "Domestic",
      minDistance: "",
      maxDistance: "",
      minWeight: "",
      maxWeight: "",
      minVolume: "",
      maxVolume: "",
    },
  });

  const routeLegsForm = useForm({
    resolver: zodResolver(routeLegsSchema),
    defaultValues: {
      routeLegs: [
        {
          legId: "LEG001",
          originLocation: "",
          destinationLocation: "",
          wayPoints: "",
          vesselNumber: "",
          carrierName: "",
          modeOfTransport: "",
          vehicleType: "",
          vehicleId: "",
          driverName: "",
        },
        {
          legId: "LEG002",
          originLocation: "",
          destinationLocation: "",
          wayPoints: "",
          vesselNumber: "",
          carrierName: "",
          modeOfTransport: "",
          vehicleType: "",
          vehicleId: "",
          driverName: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: routeLegsForm.control,
    name: "routeLegs",
  });

  const routeTemplateFields = [
    { name: "templateId", label: "Template ID", disabled: true },
    { name: "templateName", label: "Template Name *" },
    { name: "active", label: "Active", type: "checkbox" },
    { name: "description", label: "Description", type: "textarea", wide: true },
  ];

  const routeHeaderFields = [
    { name: "product", label: "Product", type: "select", options: ["Electronics", "Clothing", "Food", "Automotive", "Pharmaceuticals"] },
    { name: "service", label: "Service", type: "select", options: ["Standard", "Express", "Premium", "Economy"] },
    { name: "customerId", label: "Customer ID" },
    { name: "orderType", label: "Order Type", type: "select", options: ["Bulk", "Single", "Express", "Regular"] },
    { name: "contactNumber", label: "Contact Number" },
  ];

  const routeAttributesFields = [
    { name: "carrierType", label: "Carrier Type *", type: "select", options: ["Single Carrier", "Multiple Carriers", "Third Party"] },
    { name: "shipmentType", label: "Shipment Type *", type: "select", options: ["Domestic", "International", "Express", "Bulk"] },
    { name: "minDistance", label: "Minimum Distance", type: "number", unitOptions: ["KM", "Miles", "Meters"] },
    { name: "maxDistance", label: "Maximum Distance", type: "number", unitOptions: ["KM", "Miles", "Meters"] },
    { name: "minWeight", label: "Minimum Weight", type: "number", unitOptions: ["KG", "Tons", "Pounds"] },
    { name: "maxWeight", label: "Maximum Weight", type: "number", unitOptions: ["KG", "Tons", "Pounds"] },
    { name: "minVolume", label: "Minimum Volume", type: "number", unitOptions: ["CBM", "Liters", "Gallons"] },
    { name: "maxVolume", label: "Maximum Volume", type: "number", unitOptions: ["CBM", "Liters", "Gallons"] },
  ];

  const routeLegsFields = [
    { name: "originLocation"},
    { name: "destinationLocation"},
    { name: "vesselNumber", placeholder: "Vessel Number" },
    { name: "carrierName", type: "select", options: ["carrier1", "carrier2", "carrier3"], placeholder: "Select carrier" },
    { name: "modeOfTransport", type: "select", options: ["truck", "rail", "ship", "air"], placeholder: "Select mode" },
    { name: "vehicleType", type: "select", options: ["truck", "trailer", "container"], placeholder: "Select vehicle type" },
    { name: "vehicleId", type: "select", options: ["vehicle1", "vehicle2", "vehicle3"], placeholder: "Select vehicle" },
    { name: "driverName", type: "select", options: ["driver1", "driver2", "driver3"], placeholder: "Select driver" },
  ];

  const addNewLeg = () => {
    const newLegId = `LEG${String(fields.length + 1).padStart(3, '0')}`;
    append({
      legId: newLegId,
      originLocation: "",
      destinationLocation: "",
      wayPoints: "",
      vesselNumber: "",
      carrierName: "",
      modeOfTransport: "",
      vehicleType: "",
      vehicleId: "",
      driverName: "",
    });
  };

  const sections = [
    {
      title: "Route Template Configuration",
      type: "form",
      form: routeTemplateForm,
      fields: routeTemplateFields,
      renderLayout: ({ renderField }) => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                     {/* Route Template Card */}
           <Card className="shadow-lg lg:col-span-3">
             <CardHeader className="pb-3">
               <CardTitle className="text-lg font-semibold text-[#0088d2]">Route Template</CardTitle>
             </CardHeader>
             <CardContent>
               <FormProvider {...routeTemplateForm}>
                 <form>
                   <div className="grid grid-cols-1 gap-4">
                     {routeTemplateFields.slice(0, 3).map(field =>
                       renderField(field, routeTemplateForm, 0)
                     )}
                   </div>
                 </form>
               </FormProvider>
             </CardContent>
           </Card>

           {/* Route Header Card */}
           <Card className="shadow-lg lg:col-span-3">
             <CardHeader className="pb-3">
               <CardTitle className="text-lg font-semibold text-[#0088d2]">Route Header</CardTitle>
             </CardHeader>
             <CardContent>
               <FormProvider {...routeHeaderForm}>
                 <form>
                   <div className="grid grid-cols-1 gap-4">
                     {routeHeaderFields.map(field =>
                       renderField(field, routeHeaderForm, 1)
                     )}
                   </div>
                 </form>
               </FormProvider>
             </CardContent>
           </Card>

           {/* Route Attributes Card */}
           <Card className="shadow-lg lg:col-span-6">
             <CardHeader className="pb-3">
               <CardTitle className="text-lg font-semibold text-[#0088d2]">Route Attributes</CardTitle>
             </CardHeader>
             <CardContent>
               <FormProvider {...routeAttributesForm}>
                 <form>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {routeAttributesFields.map(field =>
                       renderField(field, routeAttributesForm, 2)
                     )}
                   </div>
                 </form>
               </FormProvider>
             </CardContent>
           </Card>
        </div>
      )
    },
    {
      title: "Route Legs",
      type: "table",
             renderLayout: ({ renderField }) => (
         <Card className="shadow-lg">
           <CardHeader className="pb-3">
             <div className="flex justify-between items-center">
               <CardTitle className="text-lg font-semibold text-gray-700">Route Legs</CardTitle>
               <Button 
                 onClick={addNewLeg}
                 className="bg-blue-600 hover:bg-blue-700 text-white"
                 size="sm"
               >
                 <Plus className="w-4 h-4 mr-2" />
                 Add Leg
               </Button>
             </div>
           </CardHeader>
                       <CardContent className="p-6">
              <FormProvider {...routeLegsForm}>
                <div className="overflow-x-auto minimal-scrollbar">
                  <Table className="min-w-full xl:min-w-max">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold w-24 sm:w-28 lg:w-32 px-3 py-3">Leg ID</TableHead>
                        <TableHead className="font-semibold w-32 sm:w-36 lg:w-40 px-3 py-3">Origin Location</TableHead>
                        <TableHead className="font-semibold w-32 sm:w-36 lg:w-40 px-3 py-3">Destination Location</TableHead>
                        <TableHead className="font-semibold w-24 sm:w-28 lg:w-32 px-3 py-3">Way Points</TableHead>
                        <TableHead className="font-semibold w-32 sm:w-36 lg:w-40 px-3 py-3">Vessel Number</TableHead>
                        <TableHead className="font-semibold w-32 sm:w-36 lg:w-40 px-3 py-3">Carrier Name</TableHead>
                        <TableHead className="font-semibold w-32 sm:w-36 lg:w-40 px-3 py-3">Mode of Transport</TableHead>
                        <TableHead className="font-semibold w-32 sm:w-36 lg:w-40 px-3 py-3">Vehicle Type</TableHead>
                        <TableHead className="font-semibold w-32 sm:w-36 lg:w-40 px-3 py-3">Vehicle ID</TableHead>
                        <TableHead className="font-semibold w-32 sm:w-36 lg:w-40 px-3 py-3">Driver Name</TableHead>
                        <TableHead className="font-semibold w-20 sm:w-24 lg:w-28 px-3 py-3">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {fields.map((leg, index) => (
                         <TableRow key={leg.id} className="hover:bg-gray-50">
                           <TableCell className="w-24 sm:w-28 lg:w-32 px-3 py-3">
                             <Input
                               value={leg.legId}
                               disabled
                               className="bg-gray-100 w-full h-9"
                             />
                           </TableCell>
                              {routeLegsFields.slice(0, 2).map((field, fieldIndex) => (
                              <TableCell key={fieldIndex} className="w-32 sm:w-36 lg:w-40 px-3 py-3">
                                {renderField(
                                  { 
                                    ...field, 
                                    name: `routeLegs.${index}.${field.name}`,
                                    modalFieldName: field.name 
                                  },
                                  routeLegsForm,
                                  3
                                )}
                              </TableCell>
                            ))}
                           <TableCell className="w-24 sm:w-28 lg:w-32 px-3 py-3">
                             <div className="flex items-center justify-center">
                               <Button
                                 variant="outline"
                                 size="sm"
                                 className="p-1"
                                 title="Manage Way Points"
                               >
                                 <MapPin className="w-4 h-4" />
                               </Button>
                             </div>
                           </TableCell>
                              {routeLegsFields.slice(2).map((field, fieldIndex) => (
                              <TableCell key={fieldIndex + 2} className="w-32 sm:w-36 lg:w-40 px-3 py-3">
                                {renderField(
                                  { 
                                    ...field, 
                                    name: `routeLegs.${index}.${field.name}`,
                                    modalFieldName: field.name 
                                  },
                                  routeLegsForm,
                                  3
                                )}
                              </TableCell>
                            ))}
                           <TableCell className="w-20 sm:w-24 lg:w-28 px-3 py-3">
                             <Button
                               variant="outline"
                               size="sm"
                               onClick={() => remove(index)}
                               disabled={fields.length === 1}
                               className="text-red-600 hover:text-red-700"
                             >
                               <Trash2 className="w-4 h-4" />
                             </Button>
                           </TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                  </Table>
                </div>
              </FormProvider>
            </CardContent>
         </Card>
       )
    }
  ];

  return (
    <div className="p-6">
      <style dangerouslySetInnerHTML={{ __html: Scrollbar}} />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Trip Template</h1>
      </div>
      
      <OrdersForm sections={sections} useAccordion={false} />
      
      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" className="border-gray-300">
          Cancel
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Template
        </Button>
      </div>
    </div>
  );
} 