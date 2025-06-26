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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'

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
    if (errors.referenceType) toast.error('Please fill in Reference Type')
    else if (errors.name) toast.error('Please fill in Name')
    else if (errors.value) toast.error('Please fill in Value')
  }

  const fields = [
    {
      name: 'referenceType',
      label: 'Reference Type *',
      type: 'select',
      required: true,
    },
    { name: 'name', label: 'Name *', type: 'text', required: true },
    { name: 'value', label: 'Value *', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'gstin', label: 'GSTIN', type: 'text' },
  ]

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
                  {fields.map((fieldDef) => (
                    <FormField
                      key={fieldDef.name}
                      control={form.control}
                      name={fieldDef.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{fieldDef.label}</FormLabel>
                          <FormControl>
                            {fieldDef.type === 'select' ? (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  {referenceTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.label}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input {...field} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-6"
                >
                  Add Reference
                </Button>
              </form>
            </Form>
{rows.length > 0 && (
  <Card className="mt-6">
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="w-16"></TableHead>
            {fields.map((field) => (
              <TableHead key={field.name}>{field.label.replace(' *', '')}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell></TableCell>
              {fields.map((field) => (
                <TableCell key={field.name}>{row[field.name]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)}
</AccordionContent>
</AccordionItem>
</Accordion>
    </div>
  )
}
