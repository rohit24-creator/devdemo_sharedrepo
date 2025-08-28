"use client"

import { useEffect, useState } from "react"
import ReusableViewAccordion from "@/components/ui/reusableComponent/reusableView"

export default function ViewFormPage() {
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/vehicle12.json")
                const data = await res.json()
                setFormData(data)
            } catch (err) {
                console.error("Failed to fetch form data:", err)
            }
        }
        fetchData()
    }, [])

    const sections = formData && formData.rows && formData.rows.length > 0
        ? [
            {
                title: "Driver Information",
                fields: formData.headers.map(header => ({
                    label: header.header,
                    value: formData.rows[0][header.accessorKey] || ""
                }))
            }
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