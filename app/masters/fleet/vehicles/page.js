"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";

const schema = z.object({
    registerNumber: z.string().min(1, "Register Number is required"),
    length: z.string().min(1, "Length is required"),
    width: z.string().min(1, "Width is required"),
    height: z.string().min(1, "Height is required"),
    weight: z.string().min(1, "Weight is required"),
    volume: z.string().optional(),
    contactName: z.string().min(1, "Contact Name is required"),
    contactNumber: z.string().min(1, "Contact Number is required"),
    vehicleType: z.string().min(1, "Vehicle Type is required"),
    insuredBy: z.string().optional(),
    insuranceStart: z.date().optional(),
    insuranceEnd: z.date().optional(),
    truckBrand: z.string().optional(),
    fuelType: z.string().min(1, "Fuel Type is required"),
    trailerNo: z.string().optional(),
    status: z.string().min(1, "Status is required"),
    description: z.string().optional(),
    vehicleOwner: z.string().optional(),
    emissionClass: z.string().optional(),
    currentLocation: z.string().optional(),
    autoAllocate: z.boolean().optional(),
});

const fieldConfig = [
    { name: "registerNumber", label: "Register Number*", placeholder: "Register Number" },
    {
        name: "length",
        label: "Length*",
        type: "text-with-unit",
        unitName: "lengthUnit",
        unitOptions: [
            { label: "M", value: "m" },
            { label: "Cm", value: "cm" },
            { label: "Inches", value: "in" },
        ],
    },
    {
        name: "width",
        label: "Width*",
        type: "text-with-unit",
        unitName: "widthUnit",
        unitOptions: [
            { label: "M", value: "m" },
            { label: "Cm", value: "cm" },
            { label: "Inches", value: "in" },
        ],
    },
    {
        name: "height",
        label: "Height*",
        type: "text-with-unit",
        unitName: "heightUnit",
        unitOptions: [
            { label: "M", value: "m" },
            { label: "Cm", value: "cm" },
            { label: "Inches", value: "in" },
        ],
    },
    {
        name: "weight",
        label: "Weight*",
        type: "text-with-unit",
        unitName: "weightUnit",
        unitOptions: [
            { label: "Kg", value: "kg" },
            { label: "Tons", value: "tons" },
        ],
    },
    {
        name: "volume",
        label: "Volume",
        type: "text-with-unit",
        unitName: "volumeUnit",
        unitOptions: [
            { label: "cmb", value: "cbm" },
        ],
    },
    { name: "contactName", label: "Contact Name*", placeholder: "Contact Name" },
    { name: "contactNumber", label: "Contact Number*", placeholder: "Phone" },
    {
        name: "vehicleType",
        label: "Vehicle Type*",
        type: "select",
        options: ["22wheeler", "4wheeler", "cabinet"],
    },
    { name: "insuredBy", label: "Insured By" },
    { name: "insuranceStart", label: "Insurance Start Date", type: "date" },
    { name: "insuranceEnd", label: "Insurance Exp. Date", type: "date" },
    { name: "truckBrand", label: "Truck Brand" },
    {
        name: "fuelType",
        label: "Fuel Type*",
        type: "select",
        options: ["Diesel", "Petrol", "Electric", "Hybrid"],
    },
    { name: "trailerNo", label: "Trailer No" },
    {
        name: "status",
        label: "Status*",
        type: "select",
        options: ["Active", "Inactive"],
    },
    { name: "description", label: "Description", type: "textarea" },
    { name: "vehicleOwner", label: "Vehicle Owner", type: "textarea" },
    { name: "emissionClass", label: "Vehicle Emission Class", disabled: true },
    { name: "currentLocation", label: "Current Location" },
    { name: "autoAllocate", placeholder: "Auto Allocate", type: "checkbox" },
];


export default function Vehicles() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            registerNumber: "",
            length: "",
            lengthUnit: "",
            width: "",
            widthUnit: "",
            height: "",
            heightUnit: "",
            weight: "",
            weightUnit: "",
            volume: "",
            volumeUnit: "",
            contactName: "",
            contactNumber: "",
            vehicleType: "",
            insuredBy: "",
            insuranceStart: undefined,
            insuranceEnd: undefined,
            truckBrand: "",
            fuelType: "",
            trailerNo: "",
            status: "",
            description: "",
            vehicleOwner: "",
            emissionClass: "",
            currentLocation: "",
            autoAllocate: false,
        },
    });

    const handleSubmit = (data) => {
        console.log("Submitted:", data);
    };

    const sections = [
        {
            type: "form",
            title: "Add Vehicle",
            form,
            fields: fieldConfig,
            disableAccordionToggle: true,
            onSubmit: handleSubmit,
            children: (
                <Button
                    type="submit"
                    className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                >
                    Add Vehicle
                </Button>
            ),
        },
    ];

    return (
        <div className="p-6">
            <ReusableForm sections={sections} />
        </div>
    );
}
