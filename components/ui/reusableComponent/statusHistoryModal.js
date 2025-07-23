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
import { Textarea } from "@/components/ui/textarea";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

// --- Dummy data for Assign Vehicle Modal ---
const carriers = [
  { id: '8432', name: 'BHARAT CARRIER' },
  { id: '8433', name: 'GLOBAL LOGISTICS' },
]
const vehicleTypes = [
  '20FT container - Open TOP',
  '40FT container - Closed',
]
const vehicles = [
  'AP39K1442 - 20FT container - Open TOP',
  'MH12AB1234 - 40FT container - Closed',
]
const drivers = [
  'SHIVA MUNI',
  'RAHUL KUMAR',
]
const rateCategories = [
  '-select-',
  'Standard',
  'Express',
]

// --- Assign Vehicle Modal ---
export function useAssignVehicleModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    scheduleDate: '',
    carrier: carriers[0].name,
    carrierId: carriers[0].id,
    vehicleType: vehicleTypes[0],
    vehicle: vehicles[0],
    driver: drivers[0],
    rateCategory: rateCategories[0],
    rate: '',
    notify: false,
    carrierInstructions: '',
    weightCapacity: '',
    volumeCapacity: '',
    additionalConditions: '',
    temperatureRegime: '',
    loadingPenalty: '',
  });
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleUpdate = () => {
    // For now, just close the modal
    setOpen(false);
  };
  return { open, openModal, closeModal, form, handleChange, handleUpdate };
}

export function AssignVehicleModal({ open, onClose, form, handleChange, handleUpdate }) {
  const fields = [
    { label: 'Schedule Date*', name: 'scheduleDate', type: 'datetime-local', required: true },
    { label: 'Carrier Instructions', name: 'carrierInstructions', type: 'text' },
    { label: 'Carrier*', name: 'carrier', type: 'select', options: carriers.map(c => ({ value: c.name, label: c.name })) },
    { label: 'Carrier Id', name: 'carrierId', type: 'text', readOnly: true },
    { label: 'Vehicle Type*', name: 'vehicleType', type: 'select', options: vehicleTypes.map(vt => ({ value: vt, label: vt })) },
    { label: 'Weight Capacity', name: 'weightCapacity', type: 'text' },
    { label: 'Vehicle*', name: 'vehicle', type: 'select', options: vehicles.map(v => ({ value: v, label: v })) },
    { label: 'Volume Capacity', name: 'volumeCapacity', type: 'text' },
    { label: 'Driver*', name: 'driver', type: 'select', options: drivers.map(d => ({ value: d, label: d })) },
    { label: 'Additional Conditions', name: 'additionalConditions', type: 'text' },
    { label: 'Rate Category', name: 'rateCategory', type: 'select', options: rateCategories.map(rc => ({ value: rc, label: rc })) },
    { label: 'Temperature Regime', name: 'temperatureRegime', type: 'text' },
    { label: 'Rate', name: 'rate', type: 'text' },
    { label: 'Time for loading and penalty rate', name: 'loadingPenalty', type: 'text' },
  ];
  // Checkbox config
  const checkboxField = { label: 'Notify', name: 'notify', type: 'checkbox' };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[60rem] max-h-[90vh] p-0 flex flex-col">
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            Assign Vehicle
          </DialogTitle>
        </div>
        <form className="flex-1 overflow-y-auto px-8 py-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {fields.map((field, idx) => (
              <div key={field.name}>
                <label className="block font-medium mb-1 text-gray-700" htmlFor={field.name}>{field.label}</label>
                {field.type === 'select' ? (
                  <Select
                    value={form[field.name]}
                    onValueChange={value => handleChange({ target: { name: field.name, value, type: 'select-one' } })}
                  >
                    <SelectTrigger id={field.name} className="w-full border rounded-md h-9 px-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    aria-label={field.label}
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full rounded-md h-9 px-3 text-sm"
                    readOnly={field.readOnly}
                  />
                )}
              </div>
            ))}

            <div className="flex items-center mt-2">
              <Input
                aria-label={checkboxField.label}
                id={checkboxField.name}
                type="checkbox"
                name={checkboxField.name}
                checked={form[checkboxField.name]}
                onChange={handleChange}
                className="mr-2 w-5 h-5 rounded-md"
              />
              <label htmlFor={checkboxField.name} className="text-gray-700">{checkboxField.label}</label>
            </div>
          </div>
          <div className="flex justify-end gap-4 col-span-2 mt-10 pb-4">
            <Button type="button" variant="outline" onClick={onClose} className="px-8 py-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-100">Cancel</Button>
            <Button type="button" onClick={handleUpdate} className="bg-[#0082c9] text-white px-8 py-2 rounded hover:bg-[#006fa1]">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// --- Nearby Vehicle Modal ---
export function useNearbyVehicleModal() {
  const [open, setOpen] = useState(false);
  const [radius, setRadius] = useState('5');
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  return { open, openModal, closeModal, radius, setRadius };
}
const radiusOptions = [
  { value: '5', label: '5 km' },
  { value: '10', label: '10 km' },
  { value: '20', label: '20 km' },
  { value: '50', label: '50 km' },
];

export function NearbyVehicleModal({ open, onClose, radius, setRadius }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            Nearby Vehicle
          </DialogTitle>
        </div>
        <div className="px-6 pt-6">
          <label className="block text-gray-700 font-medium mb-2">Select Radius (km):</label>
          <select value={radius} onChange={e => setRadius(e.target.value)} className="border rounded px-3 py-2 mb-4">
            {radiusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center">
            {/* Placeholder for Google Map */}
            <span className="text-gray-500">[Map will be shown here]</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- Status History Modal ---
const statusTabs = [
  { value: 'status', label: 'Status History', icon: Clock },
  { value: 'documents', label: 'Attached Documents', icon: FileText },
  { value: 'drivers', label: 'Drivers', icon: Truck },
];
const statusTabColumns = {
  status: [
    { header: 'Order ID', accessor: 'orderId', className: 'font-medium' },
    { header: 'Code', accessor: 'code', render: (item) => <Badge variant="outline" className="font-mono text-xs">{item.code || '-'}</Badge> },
    { header: 'Status', accessor: 'status' },
    { header: 'Comments', accessor: 'comments' },
    { header: 'Location', accessor: 'location', className: 'max-w-[200px] truncate', title: (item) => item.location },
    { header: 'Stop ID', accessor: 'stopId' },
    { header: 'Stop Type', accessor: 'stopType', render: (item) => item.stopType ? (<Badge className={item.stopType === 'P' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>{item.stopType}</Badge>) : '-' },
    { header: 'Time', accessor: 'time', className: 'text-sm' },
  ],
  documents: [
    { header: 'Order ID', accessor: 'orderId', className: 'font-medium' },
    { header: 'Location', accessor: 'location' },
    { header: 'Doc Type', accessor: 'docType', render: (item) => <Badge variant="outline">{item.docType || '-'}</Badge> },
    { header: 'Document', accessor: 'document', className: 'max-w-[150px] truncate', title: (item) => item.document },
    { header: 'Stop ID', accessor: 'stopId' },
    { header: 'Stop Type', accessor: 'stopType', render: (item) => item.stopType ? (<Badge className={item.stopType === 'P' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>{item.stopType}</Badge>) : '-' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Time', accessor: 'time', className: 'text-sm' },
    { header: 'Actions', accessor: 'actions', render: (item) => (
      <div className="flex items-center gap-1">
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0"><Eye className="w-3 h-3" /></Button>
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0"><Download className="w-3 h-3" /></Button>
      </div>
    ) },
  ],
  drivers: [
    { header: 'Name', accessor: 'name', render: (item) => (
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <span className="font-medium">{item.name || '-'}</span>
        {item.isPrimary && <Badge className="bg-blue-100 text-blue-800 text-xs">PRIMARY</Badge>}
      </div>
    ) },
    { header: 'Mobile', accessor: 'mobile', render: (item) => (
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-gray-500" />
        <span className="font-mono text-sm">{item.mobile || '-'}</span>
      </div>
    ) },
    { header: 'Time', accessor: 'time', className: 'text-sm' },
    { header: 'Status', accessor: 'isPrimary', render: (item) => item.isPrimary ? (<Badge className="bg-green-100 text-green-800">Active</Badge>) : (<Badge variant="outline">Inactive</Badge>) },
  ],
};

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

  const filtered = {
    status: statusHistory.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    documents: attachedDocuments.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
    drivers: drivers.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    ),
  };

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
              {statusTabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {/* Tab Content */}
          <div className="px-6 pb-4 flex-1 overflow-auto">
            {statusTabs.map(tab => (
              <TabsContent key={tab.value} value={tab.value} className="mt-4">
                <div className="max-h-[400px] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        {statusTabColumns[tab.value].map((col, idx) => (
                          <TableHead key={idx} className={col.className}>{col.header}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered[tab.value].map((item, rowIdx) => (
                        <TableRow key={rowIdx} className="hover:bg-gray-50">
                          {statusTabColumns[tab.value].map((col, colIdx) => (
                            <TableCell key={colIdx} className={col.className} title={col.title ? col.title(item) : undefined}>
                              {col.render ? col.render(item) : (item[col.accessor] ?? '-')}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
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
const shareTabs = [
  { value: 'driver', label: 'Driver Link' },
  { value: 'carrier', label: 'Carrier Link' },
];
const shareOptions = [
  { label: 'Via SMS', icon: Smartphone, handler: 'onSendSMS' },
  { label: 'Via Whatsapp', icon: MessageCircle, handler: 'onSendWhatsapp' },
  { label: 'Via Email', icon: Mail, handler: 'onSendEmail' },
];

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

  const shareHandlers = { onSendSMS, onSendWhatsapp, onSendEmail };

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
              {shareTabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
              ))}
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
            {shareOptions.slice(0,2).map(opt => (
              <Button key={opt.label} onClick={() => shareHandlers[opt.handler]?.(link, phone)} variant="default" className="flex-1">
                <opt.icon className="w-4 h-4 mr-1" /> {opt.label}
              </Button>
            ))}
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


export function useBillingDetailsModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]); // dummy data for now
  const openModal = useCallback((billingData = []) => {
    setData(billingData);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);
  return { open, data, openModal, closeModal };
}

export function BillingDetailsModal({ open, onClose, data = [] }) {
  // Dummy data if none provided
  const rows = data.length ? data : [
    {
      partyName: "BHARAT CARRIER",
      recipientType: "Carrier",
      invoiceNumber: "INV-12345",
      invoiceDate: "2024-06-01",
      code: "BILL-001",
      billGroup: "Group A",
      billStatus: "Pending",
      document: "invoice.pdf",
    },
  ];
  const columns = [
    { key: "partyName", label: "Party Name" },
    { key: "recipientType", label: "Recipient Type" },
    { key: "invoiceNumber", label: "Invoice Number" },
    { key: "invoiceDate", label: "Invoice Date" },
    { key: "code", label: "Code" },
    { key: "billGroup", label: "Bill Group" },
    { key: "billStatus", label: "Bill Status" },
    { key: "document", label: "Document" },
  ];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[60rem] p-0 max-h-[95vh]">
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">Billing Details</DialogTitle>
        </div>
        <div className="p-8">
          <div className="bg-white rounded-lg border border-gray-200 p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#02abf5] text-white hover:bg-[#02abf5]">
                    {columns.map(col => (
                      <th key={col.key} className="text-white font-medium p-3 whitespace-nowrap text-left">{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 border-b border-gray-100">
                      {columns.map(col => (
                        <td key={col.key} className="p-3 whitespace-nowrap">{row[col.key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 mt-0 pt-6 border-t border-gray-200">
              <div className="font-semibold mb-2">Carrier uploaded files</div>
              <div className="flex items-center gap-2 mb-2">
                <input type="file" className="border rounded px-2 py-1 text-sm" />
                <Button className="bg-blue-600 text-white px-4 py-1 rounded">Upload</Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 rounded-b-lg">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- CO2 Emission Modal ---
export function useCO2EmissionModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null); 
  const openModal = useCallback((co2Data = null) => {
    setData(co2Data);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);
  return { open, data, openModal, closeModal };
}

export function CO2EmissionModal({ open, onClose, data }) {
  // Dummy data if none provided
  const co2 = data || {
    weight: "1 kg",
    distance: "539 km",
    emission: "87210.2 g",
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">CO2 Emission</DialogTitle>
        </div>
        <div className="p-6">
          <ul className="space-y-2 text-base">
            <li><span className="font-bold">Weight:</span> {co2.weight}</li>
            <li><span className="font-bold">Distance:</span> {co2.distance}</li>
            <li><span className="font-bold">CO2 Emission:</span> {co2.emission}</li>
          </ul>
        </div>
        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 rounded-b-lg">
          <DialogClose asChild>
            <Button className="bg-blue-700 text-white px-6 rounded">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 