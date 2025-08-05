'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function SwitchesAccordion() {
  return (
    <div className="p-4 sm:p-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-switches">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Switches
          </AccordionTrigger>
          <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* eBooking Section */}
              <fieldset className="border border-gray-300 rounded-md p-4 relative">
                <legend className="px-2 text-base font-semibold text-gray-800">eBooking</legend>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    {['Generate Label', 'Grid view', 'DG Cargo Allowed', 'Show Services'].map(
                      (label, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Checkbox id={`ebooking-left-${idx}`} className="text-blue-600" />
                          <Label htmlFor={`ebooking-left-${idx}`} className="text-sm">
                            {label}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                  <div className="space-y-2">
                    {['Show All Rates', 'Show Quotes', 'eBooking'].map((label, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Checkbox id={`ebooking-right-${idx}`} className="text-blue-600" />
                        <Label htmlFor={`ebooking-right-${idx}`} className="text-sm">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* Integration Section */}
              <fieldset className="border border-gray-300 rounded-md p-4 relative">
                <legend className="px-2 text-base font-semibold text-gray-800">Integration</legend>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    {['Send to Altova', 'MYKN', 'Macadam'].map((label, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Checkbox id={`integration-left-${idx}`} className="text-blue-600" />
                        <Label htmlFor={`integration-left-${idx}`} className="text-sm">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {['SALOG', 'Roadlog'].map((label, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Checkbox id={`integration-right-${idx}`} className="text-blue-600" />
                        <Label htmlFor={`integration-right-${idx}`} className="text-sm">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* Visibility Section */}
              <fieldset className="border border-gray-300 rounded-md p-4 relative">
                <legend className="px-2 text-base font-semibold text-gray-800">Visibility</legend>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    {['CO2 Emission', 'Show Carrier'].map((label, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Checkbox id={`visibility-left-${idx}`} className="text-blue-600" />
                        <Label htmlFor={`visibility-left-${idx}`} className="text-sm">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="visibility-map" className="text-blue-600" />
                    <Label htmlFor="visibility-map" className="text-sm">
                      Show Map
                    </Label>
                  </div>
                </div>
              </fieldset>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
