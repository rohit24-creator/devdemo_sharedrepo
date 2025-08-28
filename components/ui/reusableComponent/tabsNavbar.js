"use client"
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/**
 * Reusable Tabs Navbar Component
 * 
 * @param {Array} tabs - Array of tab objects with value, label, and component
 * @param {string} defaultTab - Default active tab value
 */
export function TabsNavbar({ tabs = [], defaultTab = null }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value || "");

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 border-b border-[#E7ECFD] bg-transparent h-auto p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-full px-6 py-2 text-[#006397] font-semibold data-[state=active]:border-b-2 data-[state=active]:border-[#006397] data-[state=active]:bg-white border-b-2 border-transparent transition-all duration-200 hover:bg-gray-50"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
            {tab.component && <tab.component />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
