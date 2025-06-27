"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ReusableForm } from "@/components/ui/reusableComponent/profilesForm";


const driverFormSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        city: z.string().optional(),
        contact: z.string().min(1, "Contact Number is required"),
        companyCode: z.string().min(1, "Company Code is required"),
        password: z.string().min(1, "Password is required"),
        confirmPassword: z.string().min(1, "Confirm Password is required"),
        branchCode: z.string().min(1, "Branch Code is required"),
        licenceNumber: z.string().optional(),
        driverType: z.string().optional(),
        age: z.string().optional(),
        drivingSince: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });


const fieldConfig = [
    { name: "name", label: "Name*" },
    { name: "city", label: "City" },
    { name: "contact", label: "Contact Number*" },
    { name: "companyCode", label: "Company Code*" },
    { name: "password", label: "Password*", type: "password" },
    { name: "confirmPassword", label: "Confirm Password*", type: "password" },
    { name: "branchCode", label: "Branch Code*" },
    { name: "licenceNumber", label: "Licence Number" },
    {
        name: "driverType", label: "Driver Type", type: "select", options: [
            { value: "Local Driver", label: "Local Driver" },
            { value: "Global Driver", label: "Global Driver" },
        ]
    },
    { name: "age", label: "Age" },
    { name: "drivingSince", label: "Driving Since" },
];


export default function Drivers() {

    const form = useForm({
        resolver: zodResolver(driverFormSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            city: "",
            contact: "",
            companyCode: "THKN",
            password: "",
            confirmPassword: "",
            branchCode: "THBKK",
            licenceNumber: "",
            driverType: "local driver",
            age: "",
            drivingSince: "",
        },
    });

    const handleSubmit = (data) => {
        console.log("Submitted:", data);
    };

    const sections = [
        {
            type: "form",
            title: "Add Driver",
            form,
            fields: fieldConfig,
            onSubmit: handleSubmit,
            children: (
                <Button
                    type="submit"
                    className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                >
                    Add Driver
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