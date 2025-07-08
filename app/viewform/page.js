"use client"

import { useEffect, useState } from "react"
import ReusableViewAccordion from "@/components/ui/reusableComponent/ReusableViewAccordion"

export default function ViewFormPage() {
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/forms?type=vehicles")  // hardcoded to fetch only vehicles
                const data = await res.json()
                setFormData(data)
            } catch (err) {
                console.error("Failed to fetch form data:", err)
            }
        }

        fetchData()
    }, []) // removed dependency

    const sections = formData
        ? [
            {
                title: "View Vehicles", // hardcoded title
                fields: Object.entries(formData).map(([key, value]) => ({
                    label: key,
                    value: value,
                })),
            },
        ]
        : []

    return (
        <div className="p-4">
            {formData ? (
                <ReusableViewAccordion sections={sections} />
            ) : (
                <p className="text-center text-gray-600">Loading...</p>
            )}
        </div>
    )
}

