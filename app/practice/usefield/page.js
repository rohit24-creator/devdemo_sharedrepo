'use client'

import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/sonner'

const accountSchema = z.object({
  accounts: z.array(
    z.object({
      accountNumber: z.string().min(1, 'Required'),
      aconEnvironment: z.string().min(1, 'Required'),
      sourceSystem: z.string().min(1, 'Required'),
      companyCode: z.string().min(1, 'Required'),
      billable: z.string(),
      prePayment: z.string(),
      multipleInvoices: z.string(),
    })
  )
})

export default function AccountAccordion() {
  const form = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accounts: [
        {
          accountNumber: '',
          aconEnvironment: '',
          sourceSystem: '',
          companyCode: 'THKN',
          billable: 'No',
          prePayment: 'No',
          multipleInvoices: 'No',
        },
      ],
    },
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'accounts',
  })

  const onSubmit = (data) => {
    toast.success('Account added')
    console.log(data.accounts)
  }

  return (
    <div className="p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Accounts
          </AccordionTrigger>
          <AccordionContent className="bg-[#f5f7fc] p-6 rounded-b-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name={`accounts.${index}.accountNumber`}
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
                        control={form.control}
                        name={`accounts.${index}.aconEnvironment`}
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
                        control={form.control}
                        name={`accounts.${index}.sourceSystem`}
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
                        control={form.control}
                        name={`accounts.${index}.companyCode`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Code *</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['billable', 'prePayment', 'multipleInvoices'].map((name, i) => (
                        <FormField
                          key={i}
                          control={form.control}
                          name={`accounts.${index}.${name}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block capitalize">
                                {name.replace(/([A-Z])/g, ' $1')}
                              </FormLabel>
                              <div className="flex items-center space-x-6">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    value="Yes"
                                    checked={field.value === 'Yes'}
                                    onChange={field.onChange}
                                  />
                                  <span>Yes</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    value="No"
                                    checked={field.value === 'No'}
                                    onChange={field.onChange}
                                  />
                                  <span>No</span>
                                </label>
                              </div>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                <Button
                  type="submit"
                  className="mt-4 bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                >
                  Add Account
                </Button>
              </form>
            </Form>

            {/* Table */}
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
                  {form.getValues('accounts').map((acc, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-3 py-2 border-r">
                        <input type="checkbox" />
                      </td>
                      <td className="px-3 py-2 border-r">{acc.accountNumber}</td>
                      <td className="px-3 py-2 border-r">{acc.aconEnvironment}</td>
                      <td className="px-3 py-2 border-r">{acc.companyCode}</td>
                      <td className="px-3 py-2 border-r">{acc.sourceSystem}</td>
                      <td className="px-3 py-2 border-r">{acc.billable}</td>
                      <td className="px-3 py-2 border-r">{acc.prePayment}</td>
                      <td className="px-3 py-2">{acc.multipleInvoices}</td>
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