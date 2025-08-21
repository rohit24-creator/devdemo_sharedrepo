"use client"

import { createContext, useState } from "react"
export const ToastContext = createContext()

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const toast = ({ title, description, duration = 4000 }) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, title, description }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, duration)
    }

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map(t => (
                    <div key={t.id} className="bg-white border shadow-lg rounded-lg px-4 py-3 min-w-[250px]">
                        <div className="font-semibold">{t.title}</div>
                        <div className="text-sm">{t.description}</div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}