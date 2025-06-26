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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'


const referenceTypes = [
  { id: 'type-a', label: 'Type A' },
  { id: 'type-b', label: 'Type B' },
  { id: 'type-c', label: 'Type C' },
]

const schema = z.object({
  referenceType: z.string().min(1, 'Reference Type is required'),
  name: z.string().min(1, 'Name is required'),
  value: z.string().min(1, 'Value is required'),
  description: z.string().optional(),
  gstin: z.string().optional(),
})

export default function AddReferenceForm() {
  const [rows, setRows] = useState([])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      referenceType: '',
      name: '',
      value: '',
      description: '',
      gstin: '',
    },
  })

const onValid = (values) => {
  setRows((prev) => [...prev, values])
  toast.success('Reference added successfully')
  form.reset()
}

const onInvalid = (errors) => {
  if (errors.referenceType) {
    toast.error('Please fill in Reference Type')
  } else if (errors.name) {
    toast.error('Please fill in Name')
  } else if (errors.value) {
    toast.error('Please fill in Value')
  }
}
//   const onSubmit = (values) => {
//     setRows((prev) => [...prev, values])
//     toast.success('Reference added successfully')
//     form.reset()
//   }


  return (
    <div className="p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5]">
            Add Reference
          </AccordionTrigger>
          <AccordionContent className="bg-[#f5f7fc] p-6 rounded-b-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onValid, onInvalid)} className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="referenceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {referenceTypes.map((type) => (
                              <SelectItem key={type.id} value={type.label}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gstin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GSTIN</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                >
                  Add Reference
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
              <th className="px-3 py-2 border-r">Reference Type</th>
              <th className="px-3 py-2 border-r">Name</th>
              <th className="px-3 py-2 border-r">Value</th>
              <th className="px-3 py-2 border-r">Description</th>
              <th className="px-3 py-2">GSTIN</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-3 py-2 border-r">
                  <input type="checkbox" />
                </td>
                <td className="px-3 py-2 border-r">{row.referenceType}</td>
                <td className="px-3 py-2 border-r">{row.name}</td>
                <td className="px-3 py-2 border-r">{row.value}</td>
                <td className="px-3 py-2 border-r">{row.description}</td>
                <td className="px-3 py-2">{row.gstin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
