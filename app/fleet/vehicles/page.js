'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';



const schema = z.object({
    registerNumber: z.string().min(1, 'Register Number is required'),
    length: z.string().min(1, 'Length is required'),
    width: z.string().min(1, 'Width is required'),
    height: z.string().min(1, 'Height is required'),
    weight: z.string().min(1, 'Weight is required'),
    volume: z.string().optional(),
    contactName: z.string().min(1, 'Contact Name is required'),
    contactNumber: z.string().min(1, 'Contact Number is required'),
    vehicleType: z.string().min(1, 'Vehicle Type is required'),
    insuredBy: z.string().optional(),
    insuranceStart: z.string().optional(),
    insuranceEnd: z.string().optional(),
    truckBrand: z.string().optional(),
    fuelType: z.string().min(1, 'Fuel Type is required'),
    trailerNo: z.string().optional(),
    status: z.string().min(1, 'Status is required'),
    description: z.string().optional(),
    vehicleOwner: z.string().optional(),
    emissionClass: z.string().optional(),
    currentLocation: z.string().optional(),
    autoAllocate: z.boolean().optional(),
});

export default function Vehicles() {

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            registerNumber: '',
            length: '',
            width: '',
            height: '',
            weight: '',
            volume: '',
            contactName: '',
            contactNumber: '',
            vehicleType: '',
            insuredBy: '',
            insuranceStart: '',
            insuranceEnd: '',
            truckBrand: '',
            fuelType: '',
            trailerNo: '',
            status: 'active',
            description: '',
            vehicleOwner: '',
            emissionClass: '',
            currentLocation: '',
            autoAllocate: false,
        }
    });

    return (
        <div className="p-7 space-y-2">

            <Accordion type="single" collapsible className="w-full" defaultValue="add-vehicle">
                <AccordionItem value="add-vehicle">
                    <AccordionTrigger className="data-[state=open]:bg-[#02abf5] data-[state=closed]:bg-[#006397] text-white px-4 py-2 rounded-md">
                        Vehicles
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                        <Form {...form}>

                            <form
                                onSubmit={form.handleSubmit((data) => {
                                    console.log('Vehicle Form Data:', data);
                                })} className="grid grid-cols-1 md:grid-cols-4 gap-4">

                                <FormField control={form.control} name="registerNumber" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Register Number*</FormLabel>
                                        <FormControl><Input placeholder="Enter Register Number" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <div className="flex items-end gap-2">
                                    <FormField control={form.control} name="length" render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Length*</FormLabel>
                                            <FormControl><Input placeholder="Length" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Select>
                                        <SelectTrigger className="w-23 border-2 border-[#E7ECFD]"><SelectValue placeholder="M" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="m">M</SelectItem>
                                            <SelectItem value="cm">CM</SelectItem>
                                            <SelectItem value="inches">Inches</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-end gap-2">
                                    <FormField control={form.control} name="width" render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Width*</FormLabel>
                                            <FormControl><Input placeholder="Width" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Select>
                                        <SelectTrigger className="w-23 border-2 border-[#E7ECFD]"><SelectValue placeholder="M" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="m">M</SelectItem>
                                            <SelectItem value="cm">CM</SelectItem>
                                            <SelectItem value="inches">Inches</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-end gap-2">
                                    <FormField control={form.control} name="height" render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Height*</FormLabel>
                                            <FormControl><Input placeholder="Height" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Select>
                                        <SelectTrigger className="w-23 border-2 border-[#E7ECFD]"><SelectValue placeholder="M" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="m">M</SelectItem>
                                            <SelectItem value="cm">CM</SelectItem>
                                            <SelectItem value="inches">Inches</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-end gap-2">
                                    <FormField control={form.control} name="weight" render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Weight*</FormLabel>
                                            <FormControl><Input placeholder="Weight" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Select>
                                        <SelectTrigger className="w-23 border-2 border-[#E7ECFD]"><SelectValue placeholder="Kg" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="kg">Kg</SelectItem>
                                            <SelectItem value="ton">Tons</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-end gap-2">
                                    <FormField control={form.control} name="volume" render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Volume</FormLabel>
                                            <FormControl><Input placeholder="Volume" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Select>
                                        <SelectTrigger className="w-23 border-2 border-[#E7ECFD]"><SelectValue placeholder="cbm" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cbm">cbm</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <FormField control={form.control} name="contactName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Name*</FormLabel>
                                        <FormControl><Input placeholder="Contact Person" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="contactNumber" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Number*</FormLabel>
                                        <FormControl><Input placeholder="Phone" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="vehicleType" render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Vehicle Type*</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full border-2 border-[#E7ECFD]"><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="fulltruckload">full-truck-load</SelectItem>
                                                    <SelectItem value="22wheeler">22-wheeler</SelectItem>
                                                    <SelectItem value="4wheeler">4 Wheeler</SelectItem>
                                                    <SelectItem value="cabinet">Cabinet</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="insuredBy" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Insured By</FormLabel>
                                        <FormControl><Input placeholder="Insured By" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="insuranceStart" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Insurance Start Date</FormLabel>
                                        <FormControl><Input type="date" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="insuranceEnd" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Insurance Exp. Date</FormLabel>
                                        <FormControl><Input type="date" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="truckBrand" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Truck Brand</FormLabel>
                                        <FormControl><Input placeholder="Truck Brand" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="fuelType" render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Fuel Type*</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="diesel">Diesel</SelectItem>
                                                    <SelectItem value="petrol">Petrol</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="trailerNo" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Trailer No</FormLabel>
                                        <FormControl><Input placeholder="Trailer No" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="status" render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Status*</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full border-2 border-[#E7ECFD]"><SelectValue placeholder="Active" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl><Textarea placeholder="Description" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="vehicleOwner" render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Vehicle Owner</FormLabel>
                                        <FormControl><Textarea placeholder="Vehicle Owner" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="emissionClass" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vehicle Emission Class</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Vehicle Emission Class" disabled className="bg-muted text-muted-foreground cursor-not-allowed" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="currentLocation" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Location</FormLabel>
                                        <FormControl><Input placeholder="Current Location" {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <div className="col-span-4 flex items-center space-x-2 mt-2">
                                    <FormField control={form.control} name="autoAllocate" render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel>Auto Allocate</FormLabel>
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="col-span-4 flex justify-start mt-4">
                                    <Button
                                        type="submit"
                                        className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                                    >
                                        Add Vehicle
                                    </Button>
                                </div>

                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div >

    );
}
//