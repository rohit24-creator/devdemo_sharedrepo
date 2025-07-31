"use client";
import React from "react";
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OrdersForm } from "@/components/ui/reusableComponent/orderFomrs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Plus, Trash2 } from "lucide-react";

// Schema for Route Template
const routeTemplateSchema = z.object({
  templateId: z.string(),
  templateName: z.string().min(1, { message: "Template Name is required" }),
  active: z.boolean().default(true),
  description: z.string().optional(),
});

// Schema for Route Header
const routeHeaderSchema = z.object({
  product: z.string().optional(),
  service: z.string().optional(),
  customerId: z.string().optional(),
  orderType: z.string().optional(),
  contactNumber: z.string().optional(),
});

// Schema for Route Attributes
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

// Schema for Route Legs
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
      renderLayout: () => (
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
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Leg ID</TableHead>
                    <TableHead className="font-semibold">Origin Location</TableHead>
                    <TableHead className="font-semibold">Destination Location</TableHead>
                    <TableHead className="font-semibold">Way Points</TableHead>
                    <TableHead className="font-semibold">Vessel Number</TableHead>
                    <TableHead className="font-semibold">Carrier Name</TableHead>
                    <TableHead className="font-semibold">Mode of Transport</TableHead>
                    <TableHead className="font-semibold">Vehicle Type</TableHead>
                    <TableHead className="font-semibold">Vehicle ID</TableHead>
                    <TableHead className="font-semibold">Driver Name</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                                 <TableBody>
                   {fields.map((leg, index) => (
                     <TableRow key={leg.id} className="hover:bg-gray-50">
                       <TableCell>
                         <Input
                           value={leg.legId}
                           disabled
                           className="bg-gray-100"
                         />
                       </TableCell>
                       <TableCell>
                         <Controller
                           control={routeLegsForm.control}
                           name={`routeLegs.${index}.originLocation`}
                           render={({ field }) => (
                             <Input
                               {...field}
                               placeholder="Enter origin location"
                             />
                           )}
                         />
                       </TableCell>
                       <TableCell>
                         <Controller
                           control={routeLegsForm.control}
                           name={`routeLegs.${index}.destinationLocation`}
                           render={({ field }) => (
                             <Input
                               {...field}
                               placeholder="Enter destination location"
                             />
                           )}
                         />
                       </TableCell>
                       <TableCell>
                         <div className="flex items-center space-x-2">
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
                       <TableCell>
                         <Controller
                           control={routeLegsForm.control}
                           name={`routeLegs.${index}.vesselNumber`}
                           render={({ field }) => (
                             <Input
                               {...field}
                               placeholder="Vessel Number"
                             />
                           )}
                         />
                       </TableCell>
                       <TableCell>
                         <Controller
                           control={routeLegsForm.control}
                           name={`routeLegs.${index}.carrierName`}
                           render={({ field }) => (
                             <Select
                               value={field.value}
                               onValueChange={field.onChange}
                             >
                               <SelectTrigger>
                                 <SelectValue placeholder="Select" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="carrier1">Carrier 1</SelectItem>
                                 <SelectItem value="carrier2">Carrier 2</SelectItem>
                                 <SelectItem value="carrier3">Carrier 3</SelectItem>
                               </SelectContent>
                             </Select>
                           )}
                         />
                       </TableCell>
                       <TableCell>
                         <Controller
                           control={routeLegsForm.control}
                           name={`routeLegs.${index}.modeOfTransport`}
                           render={({ field }) => (
                             <Select
                               value={field.value}
                               onValueChange={field.onChange}
                             >
                               <SelectTrigger>
                                 <SelectValue placeholder="Select" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="truck">Truck</SelectItem>
                                 <SelectItem value="rail">Rail</SelectItem>
                                 <SelectItem value="ship">Ship</SelectItem>
                                 <SelectItem value="air">Air</SelectItem>
                               </SelectContent>
                             </Select>
                           )}
                         />
                       </TableCell>
                       <TableCell>
                         <Controller
                           control={routeLegsForm.control}
                           name={`routeLegs.${index}.vehicleType`}
                           render={({ field }) => (
                             <Select
                               value={field.value}
                               onValueChange={field.onChange}
                             >
                               <SelectTrigger>
                                 <SelectValue placeholder="Select" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="truck">Truck</SelectItem>
                                 <SelectItem value="trailer">Trailer</SelectItem>
                                 <SelectItem value="container">Container</SelectItem>
                               </SelectContent>
                             </Select>
                           )}
                         />
                       </TableCell>
                       <TableCell>
                         <Controller
                           control={routeLegsForm.control}
                           name={`routeLegs.${index}.vehicleId`}
                           render={({ field }) => (
                             <Select
                               value={field.value}
                               onValueChange={field.onChange}
                             >
                               <SelectTrigger>
                                 <SelectValue placeholder="Select" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="vehicle1">Vehicle 1</SelectItem>
                                 <SelectItem value="vehicle2">Vehicle 2</SelectItem>
                                 <SelectItem value="vehicle3">Vehicle 3</SelectItem>
                               </SelectContent>
                             </Select>
                           )}
                         />
                       </TableCell>
                       <TableCell>
                         <Controller
                           control={routeLegsForm.control}
                           name={`routeLegs.${index}.driverName`}
                           render={({ field }) => (
                             <Select
                               value={field.value}
                               onValueChange={field.onChange}
                             >
                               <SelectTrigger>
                                 <SelectValue placeholder="Select" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="driver1">Driver 1</SelectItem>
                                 <SelectItem value="driver2">Driver 2</SelectItem>
                                 <SelectItem value="driver3">Driver 3</SelectItem>
                               </SelectContent>
                             </Select>
                           )}
                         />
                       </TableCell>
                       <TableCell>
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
          </CardContent>
        </Card>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Route Template</h1>
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