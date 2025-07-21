"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Truck, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Calendar,
  Download,
  Eye,
  Copy as CopyIcon, 
  Mail, 
  Smartphone, 
  MessageCircle, 
  Link2
} from "lucide-react";

// --- Custom Hook for Status History Modal ---
export function useStatusHistoryModal() {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [data, setData] = useState({ statusHistory: [], attachedDocuments: [], drivers: [] });

  const openModal = useCallback((order, shipments) => {
    setOrder(order);
    
    const shipment = shipments.find(s => s.orders.some(o => o.orderId === order.orderId));
    const targetOrder = shipment?.orders.find(o => o.orderId === order.orderId);
    setData({
      statusHistory: targetOrder?.statusHistory || [],
      attachedDocuments: targetOrder?.attachedDocuments || [],
      drivers: targetOrder?.drivers || [],
    });
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  return { open, order, data, openModal, closeModal };
}

// --- Custom Hook for Share Secure Link Modal ---
export function useShareSecureLinkModal() {
  const [open, setOpen] = useState(false);
  const [driverLink, setDriverLink] = useState('');
  const [carrierLink, setCarrierLink] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const openModal = useCallback((shipment) => {
    setDriverLink(`https://devdemov1.shipmentx.com/driverappv3/${shipment.id}`);
    setCarrierLink(`https://devdemov1.shipmentx.com/carrierappv3/${shipment.id}`);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  const handleCopyLink = (link) => { navigator.clipboard.writeText(link); };
  const handleSendSMS = (link, phone) => { alert(`Send SMS to ${phone}: ${link}`); };
  const handleSendWhatsapp = (link, phone) => { alert(`Send WhatsApp to ${phone}: ${link}`); };
  const handleSendEmail = (link, email) => { alert(`Send Email to ${email}: ${link}`); };

  return {
    open,
    driverLink,
    carrierLink,
    phone,
    setPhone,
    email,
    setEmail,
    openModal,
    closeModal,
    handleCopyLink,
    handleSendSMS,
    handleSendWhatsapp,
    handleSendEmail,
  };
}

export default function StatusHistoryModal({
  open,
  onClose,
  statusHistory = [],
  attachedDocuments = [],
  drivers = [],
  distance = "0 miles",
  duration = "0 hours"
}) {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("status");


  const filteredStatusHistory = statusHistory.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const filteredDocuments = attachedDocuments.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const filteredDrivers = drivers.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[80rem] p-0 max-h-[90vh]">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Status History
          </DialogTitle>
        </div>

        {/* Summary Info */}
        <div className="px-6 py-3 bg-gray-50 border-b">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="font-medium">Distance:</span>
              <span className="text-gray-700">{distance}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="font-medium">Duration:</span>
              <span className="text-gray-700">{duration}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-end px-6 py-3 border-b">
          <span className="text-sm font-medium mr-2">Search:</span>
          <Input
            className="h-8 w-60 text-sm"
            placeholder="Search across all data..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="status" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Status History
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Attached Documents
              </TabsTrigger>
              <TabsTrigger value="drivers" className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Drivers
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="px-6 pb-4 flex-1 overflow-auto">
            <TabsContent value="status" className="mt-4">
              <div className="max-h-[400px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="font-medium">Order ID</TableHead>
                      <TableHead className="font-medium">Code</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="font-medium">Comments</TableHead>
                      <TableHead className="font-medium">Location</TableHead>
                      <TableHead className="font-medium">Stop ID</TableHead>
                      <TableHead className="font-medium">Stop Type</TableHead>
                      <TableHead className="font-medium">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStatusHistory.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{item.orderId || '-'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.code || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.status || '-'}</TableCell>
                        <TableCell>{item.comments || '-'}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={item.location}>
                          {item.location || '-'}
                        </TableCell>
                        <TableCell>{item.stopId || '-'}</TableCell>
                        <TableCell>
                          {item.stopType ? (
                            <Badge className={item.stopType === 'P' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {item.stopType}
                            </Badge>
                          ) : '-'}
                        </TableCell>
                        <TableCell className="text-sm">{item.time || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <div className="max-h-[400px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="font-medium">Order ID</TableHead>
                      <TableHead className="font-medium">Location</TableHead>
                      <TableHead className="font-medium">Doc Type</TableHead>
                      <TableHead className="font-medium">Document</TableHead>
                      <TableHead className="font-medium">Stop ID</TableHead>
                      <TableHead className="font-medium">Stop Type</TableHead>
                      <TableHead className="font-medium">Created By</TableHead>
                      <TableHead className="font-medium">Time</TableHead>
                      <TableHead className="font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{item.orderId || '-'}</TableCell>
                        <TableCell>{item.location || '-'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.docType || '-'}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate" title={item.document}>
                          {item.document || '-'}
                        </TableCell>
                        <TableCell>{item.stopId || '-'}</TableCell>
                        <TableCell>
                          {item.stopType ? (
                            <Badge className={item.stopType === 'P' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {item.stopType}
                            </Badge>
                          ) : '-'}
                        </TableCell>
                        <TableCell>{item.createdBy || '-'}</TableCell>
                        <TableCell className="text-sm">{item.time || '-'}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="drivers" className="mt-4">
              <div className="max-h-[400px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="font-medium">Name</TableHead>
                      <TableHead className="font-medium">Mobile</TableHead>
                      <TableHead className="font-medium">Time</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrivers.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{item.name || '-'}</span>
                            {item.isPrimary && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                PRIMARY
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="font-mono text-sm">{item.mobile || '-'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{item.time || '-'}</TableCell>
                        <TableCell>
                          {item.isPrimary ? (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          ) : (
                            <Badge variant="outline">Inactive</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 rounded-b-lg">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 

// --- Share Secure Link Modal ---
export function ShareSecureLinkModal({
  open,
  onClose,
  driverLink = '',
  carrierLink = '',
  onCopy,
  onSendSMS,
  onSendWhatsapp,
  onSendEmail,
}) {
  const [activeTab, setActiveTab] = React.useState('driver');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const link = activeTab === 'driver' ? driverLink : carrierLink;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            Secure link to share
          </DialogTitle>
        </div>
        {/* Tabs */}
        <div className="px-6 pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-1/2 grid-cols-2 mb-2">
              <TabsTrigger value="driver">Driver Link</TabsTrigger>
              <TabsTrigger value="carrier">Carrier Link</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* Link Sharing */}
        <div className="px-6 pb-2">
          <div className="text-sm font-semibold mb-1">Link Sharing On</div>
          <div className="flex items-center gap-2 mb-3">
            <Input readOnly value={link} className="flex-1 text-xs" />
            <Button onClick={() => onCopy?.(link)} variant="default" className="ml-2">
              <CopyIcon className="w-4 h-4 mr-1" /> Copy Link
            </Button>
          </div>
          <Input
            placeholder="Enter phone numbers"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="mb-3"
          />
          <div className="flex gap-2 mb-3">
            <Button onClick={() => onSendSMS?.(link, phone)} variant="default" className="flex-1">
              <Smartphone className="w-4 h-4 mr-1" /> Via SMS
            </Button>
            <Button onClick={() => onSendWhatsapp?.(link, phone)} variant="default" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-1" /> Via Whatsapp
            </Button>
          </div>
          <Input
            placeholder="Enter email addresses"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mb-3"
          />
          <Button onClick={() => onSendEmail?.(link, email)} variant="default" className="w-full">
            <Mail className="w-4 h-4 mr-1" /> Via Email
          </Button>
        </div>
        {/* Footer */}
        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 rounded-b-lg">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 