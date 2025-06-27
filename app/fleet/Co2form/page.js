'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';



export default function CO2Form() {

    const form = useForm({
        defaultValues: {
            fuelConsumption: '',
            fuelConsumptionCap: '',
            fuelConsumptionNetCap: '',
            ttw: '',
            wtw: '',
            ttwCo2e: '',
            wtwCo2e: '',
            regimeType: '',
            regimeValue: '',
        },
    });


    return (
        <div className="p-7 space-y-2">
            <Accordion type="single" collapsible className="w-full" defaultValue="add-co2form">
                <AccordionItem value="add-co2form">
                    <AccordionTrigger className="data-[state=open]:bg-[#02abf5] data-[state=closed]:bg-[#006397] text-white px-4 py-2 rounded-md">
                        CO2
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                        <Form {...form}>
                            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Fuel Consumption Section */}
                                <Card>
                                    <CardHeader className="bg-blue-800 rounded-t px-4 py-0">
                                        <CardTitle className="text-white text-center text-base">
                                            Fuel Consumption (Per 100 KM)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <FormField control={form.control} name="fuelConsumption" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fuel Consumption</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" />

                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="fuelConsumptionCap" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fuel Consumption Cap</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="fuelConsumptionNetCap" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fuel Consumption Net Cap</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </CardContent>
                                </Card>

                                {/* CO2 Emission Section */}
                                <Card>
                                    <CardHeader className="bg-blue-800 rounded-t px-4 py-0">
                                        <CardTitle className="text-white text-center text-base">
                                            CO2 Emission (Per 1 Litre)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <FormField control={form.control} name="ttw" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tank To Wheel (TTW)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="wtw" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Well To Wheel (WTW)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="ttwCo2e" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tank to Wheel (TTW) - CO2e</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="wtwCo2e" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Well to Wheel (WTW) - CO2e</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </CardContent>
                                </Card>

                                {/* Regime Section */}
                                <Card>
                                    <CardHeader className="bg-blue-800 rounded-t px-4 py-0">
                                        <CardTitle className="text-white text-center text-base">
                                            Regime
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <FormField control={form.control} name="regimeType" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Temperature Regime Type</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="w-full px-3 py-2 border-2 border-[#E7ECFD] rounded-md">

                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Select">Select</SelectItem>
                                                            <SelectItem value="Ambient">Ambient</SelectItem>
                                                            <SelectItem value="Chilled">Chilled</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="regimeValue" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Regime Value</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="w-full px-3 py-2 rounded-md border-2 border-[#E7ECFD]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </CardContent>
                                </Card>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
//