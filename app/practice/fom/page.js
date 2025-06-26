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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/sonner'
import { Search, FilePlus } from 'lucide-react'

// SCHEMAS
const accountSchema = z.object({
  accountNumber: z.string().min(1, 'Account Number is required'),
  aconEnvironment: z.string().min(1, 'Acon Environment is required'),
  sourceSystem: z.string().min(1, 'Source System is required'),
  companyCode: z.string().min(1, 'Company Code is required'),
  billable: z.enum(['yes', 'no']),
  prePayment: z.enum(['yes', 'no']),
  multipleInvoices: z.enum(['yes', 'no']),
})

const tariffSchema = z.object({
  companyCode: z.string().min(1, 'Company Code is required'),
  branchCode: z.string().min(1, 'Branch Code is required'),
  contractId: z.string().min(1, 'Contract ID is required'),
  rateDerivation: z.enum(['specific', 'generic']),
})

export default function AccountAndTariffForms() {
  const [accountRows, setAccountRows] = useState([])
  const [tariffRows, setTariffRows] = useState([])

  const accountForm = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountNumber: '',
      aconEnvironment: '',
      sourceSystem: '',
      companyCode: 'THKN',
      billable: 'no',
      prePayment: 'yes',
      multipleInvoices: 'yes',
    },
  })

  const tariffForm = useForm({
    resolver: zodResolver(tariffSchema),
    defaultValues: {
      companyCode: 'THKN',
      branchCode: 'THBKK',
      contractId: '',
      rateDerivation: 'generic',
    },
  })

  const onAccountSubmit = (data) => {
    setAccountRows((prev) => [...prev, data])
    toast.success('Account added successfully')
    accountForm.resetField('accountNumber')
    accountForm.resetField('aconEnvironment')
    accountForm.resetField('sourceSystem')
  }

  const onTariffSubmit = (data) => {
    setTariffRows((prev) => [...prev, data])
    toast.success('Tariff/Contract added successfully')
    tariffForm.resetField('contractId')
  }

  return (
    <div className="p-4">
      <Accordion type="single" collapsible>
        {/* ACCOUNTS ACCORDION */}
        <AccordionItem value="account">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Accounts
          </AccordionTrigger>
          <AccordionContent className="bg-[#f5f7fc] p-6 rounded-b-md">
            <Form {...accountForm}>
              <form
                onSubmit={accountForm.handleSubmit(onAccountSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={accountForm.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="aconEnvironment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Acon Environment *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="sourceSystem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source System *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="companyCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Code *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} disabled />
                            <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
                              <Search className="w-4 h-4 text-gray-400" />
                              <FilePlus className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['billable', 'prePayment', 'multipleInvoices'].map((field) => (
                    <FormField
                      key={field}
                      control={accountForm.control}
                      name={field}
                      render={({ field: radio }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</FormLabel>
                          <FormControl>
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  value="yes"
                                  checked={radio.value === 'yes'}
                                  onChange={() => radio.onChange('yes')}
                                />
                                Yes
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  value="no"
                                  checked={radio.value === 'no'}
                                  onChange={() => radio.onChange('no')}
                                />
                                No
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <Button type="submit" className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6">
                  Add Account
                </Button>
              </form>
            </Form>

            {/* Account Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full bg-white border text-sm text-left">
                <thead className="text-[#006397] border-b">
                  <tr>
                    <th className="px-3 py-2 border-r">
                      <input type="checkbox" />
                    </th>
                    <th className="px-3 py-2 border-r">Account Number</th>
                    <th className="px-3 py-2 border-r">Acon Environment</th>
                    <th className="px-3 py-2 border-r">Company Code</th>
                    <th className="px-3 py-2 border-r">Source System</th>
                    <th className="px-3 py-2 border-r">Billable</th>
                    <th className="px-3 py-2 border-r">Pre-Payment</th>
                    <th className="px-3 py-2">Multiple-Invoices</th>
                  </tr>
                </thead>
                <tbody>
                  {accountRows.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-3 py-2 border-r">
                        <input type="checkbox" />
                      </td>
                      <td className="px-3 py-2 border-r">{row.accountNumber}</td>
                      <td className="px-3 py-2 border-r">{row.aconEnvironment}</td>
                      <td className="px-3 py-2 border-r">{row.companyCode}</td>
                      <td className="px-3 py-2 border-r">{row.sourceSystem}</td>
                      <td className="px-3 py-2 border-r">{row.billable}</td>
                      <td className="px-3 py-2 border-r">{row.prePayment}</td>
                      <td className="px-3 py-2">{row.multipleInvoices}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Spacer between accordions */}
        <div className="h-2" />

        {/* TARIFF/CONTRACT ACCORDION */}
        <AccordionItem value="tariff">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Tariff/Contract
          </AccordionTrigger>
          <AccordionContent className="bg-[#f5f7fc] p-6 rounded-b-md">
            <Form {...tariffForm}>
              <form
                onSubmit={tariffForm.handleSubmit(onTariffSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['companyCode', 'branchCode'].map((name) => (
                    <FormField
                      key={name}
                      control={tariffForm.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{name.replace(/([A-Z])/g, ' $1')} *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} disabled />
                              <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <FilePlus className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}

                  <FormField
                    control={tariffForm.control}
                    name="contractId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract ID *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                <FormItem>
                  <FormLabel>Check Rate Derivation</FormLabel>
                  <div className="flex items-center gap-6">
                    {['specific', 'generic'].map((val) => (
                      <FormField
                        key={val}
                        control={tariffForm.control}
                        name="rateDerivation"
                        render={({ field }) => (
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={field.value === val}
                              onChange={() => field.onChange(val)}
                            />
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                          </label>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
                </div>



                <Button
                  type="submit"
                  className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                >
                  Add Tariff/Contract
                </Button>
              </form>
            </Form>

            {/* Tariff Table */}
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
                  {tariffRows.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-3 py-2 border-r">
                        <input type="checkbox" />
                      </td>
                      <td className="px-3 py-2 border-r">{row.companyCode}</td>
                      <td className="px-3 py-2 border-r">{row.branchCode}</td>
                      <td className="px-3 py-2 border-r">{row.contractId}</td>
                      <td className="px-3 py-2">{row.rateDerivation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}