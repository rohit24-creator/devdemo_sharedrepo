'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/sonner'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Search, Files } from 'lucide-react'

const schema = z.object({
  companyCode: z.string().min(1, 'Company Code is required'),
  branchCode: z.string().min(1, 'Branch Code is required'),
  contractId: z.string().min(1, 'Contract ID is required'),
  rateDerivation: z.array(z.enum(['Generic', 'Specific'])).optional(),
})

export default function AddTarrifContractForm() {
  const [rows, setRows] = useState([])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      companyCode: 'THKN',
      branchCode: 'THBKK',
      contractId: '',
      rateDerivation: ['Generic'],
    },
  })

  const onSubmit = (values) => {
    setRows((prev) => [...prev, values])
    toast.success('Tariff/Contract added successfully')
    form.reset({
      companyCode: 'THKN',
      branchCode: 'THBKK',
      contractId: '',
      rateDerivation: [],
    })
  }

  return (
    <div className="p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Add Tariff/Contract
          </AccordionTrigger>
          <AccordionContent className="bg-[#f5f7fc] p-6 rounded-b-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="companyCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Code *</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input {...field} disabled className="pr-14" />
                          </FormControl>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 text-gray-500">
                            <Search size={16} />
                            <Files size={16} />
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="branchCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Code *</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input {...field} disabled className="pr-14" />
                          </FormControl>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 text-gray-500">
                            <Search size={16} />
                            <Files size={16} />
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contractId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract ID *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rateDerivation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check Rate Derivation</FormLabel>
                        <FormControl>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                value="Specific"
                                checked={field.value?.includes('Specific')}
                                onChange={(e) => {
                                  const checked = e.target.checked
                                  const updated = checked
                                    ? [...(field.value || []), 'Specific']
                                    : (field.value || []).filter((val) => val !== 'Specific')
                                  field.onChange(updated)
                                }}
                              />
                              Specific
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                value="Generic"
                                checked={field.value?.includes('Generic')}
                                onChange={(e) => {
                                  const checked = e.target.checked
                                  const updated = checked
                                    ? [...(field.value || []), 'Generic']
                                    : (field.value || []).filter((val) => val !== 'Generic')
                                  field.onChange(updated)
                                }}
                              />
                              Generic
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                >
                  Add Tariff/Contract
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white border text-sm text-left">
          <thead className="text-[#006397] border-b">
            <tr>
              <th className="px-3 py-2 border-r">
                <input type="checkbox" />
              </th>
              <th className="px-3 py-2 border-r">Company Code</th>
              <th className="px-3 py-2 border-r">Branch Code</th>
              <th className="px-3 py-2 border-r">Contract ID</th>
              <th className="px-3 py-2">Rate Derivation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-3 py-2 border-r">
                  <input type="checkbox" />
                </td>
                <td className="px-3 py-2 border-r">{row.companyCode}</td>
                <td className="px-3 py-2 border-r">{row.branchCode}</td>
                <td className="px-3 py-2 border-r">{row.contractId}</td>
                <td className="px-3 py-2">{(row.rateDerivation || []).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
