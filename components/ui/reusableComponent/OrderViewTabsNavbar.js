import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function OrderViewTabsNavbar({ id }) {
  const pathname = usePathname();
  const tabs = [
    { label: "General Info", href: `/orders/view/${id}/general-info` },
    { label: "Order Financials", href: `/orders/view/${id}/financials` },
  ];
  return (
    <nav className="flex border-b border-gray-200 mb-6">
      {tabs.map(tab => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
              isActive
                ? "border-[#006397] text-[#006397] bg-white"
                : "border-transparent text-gray-500 hover:text-[#006397]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
} 