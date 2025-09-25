"use client"
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Edit, 
  FileText, 
  Truck, 
  Calendar, 
  MapPin, 
  Scale, 
  Package, 
  Clock, 
  Navigation,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Clock as ClockIcon,
  AlertCircle,
  CheckSquare,
  Search,
  Filter,
  X,
  Phone,
  FileIcon,
  Download,
  Upload,
  PlayCircle,
  PauseCircle,
  Plus,
  Trash2,
  DollarSign,
  User,
  Mail,
  Building,
  Globe,
  CreditCard,
  LocationPin,
  Box,
  AlertTriangle,
  Settings,
  Search as SearchIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Import StatusBadge from main page file
import { StatusBadge } from "./page";

// Configuration constants for dropdown options
const COUNTRY_OPTIONS = [
  { value: "UNITED STATES OF AMERICA", label: "UNITED STATES OF AMERICA" },
  { value: "UNITED KINGDOM", label: "UNITED KINGDOM" },
  { value: "INDIA", label: "INDIA" },
  { value: "CANADA", label: "CANADA" },
  { value: "AUSTRALIA", label: "AUSTRALIA" }
];

const ORDER_TYPE_OPTIONS = [
  { value: "Standard", label: "Standard" },
  { value: "Express", label: "Express" },
  { value: "Temperature Control", label: "Temperature Control" },
  { value: "Local", label: "Local" }
];

const SERVICE_OPTIONS = [
  { value: "Express", label: "Express" },
  { value: "Standard", label: "Standard" },
  { value: "Economy", label: "Economy" }
];

const TRANSPORT_MODE_OPTIONS = [
  { value: "Road", label: "Road" },
  { value: "Rail", label: "Rail" },
  { value: "Air", label: "Air" },
  { value: "Sea", label: "Sea" }
];

const CARGO_ITEM_OPTIONS = [
  { value: "BOXES", label: "BOXES" },
  { value: "PALLETS", label: "PALLETS" },
  { value: "CONTAINERS", label: "CONTAINERS" }
];

const CARGO_TYPE_OPTIONS = [
  { value: "General", label: "General" },
  { value: "Fragile", label: "Fragile" },
  { value: "Hazardous", label: "Hazardous" }
];


// Reusable cargo item schema
const cargoItemSchema = z.object({
  item: z.string().min(1, "Item is required"),
  packageType: z.string().min(1, "Package Type is required"),
  goodsDescription: z.string().min(1, "Goods Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  weight: z.number().min(0, "Weight must be positive"),
  length: z.number().min(0, "Length must be positive"),
  width: z.number().min(0, "Width must be positive"),
  height: z.number().min(0, "Height must be positive"),
  actualVolume: z.number().min(0, "Actual Volume must be positive"),
  cargoType: z.string().min(1, "Cargo Type is required")
});

const bookingFormSchema = z.object({

  shipperId: z.string().min(1, "Shipper ID is required"),
  shipperName: z.string().min(1, "Shipper Name is required"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  estimatedPickupDate: z.string().min(1, "Estimated Pickup Date is required"),
  shipperAddress: z.string().min(1, "Shipper Address is required"),
  country: z.string().min(1, "Country is required"),
  street: z.string().min(1, "Street is required"),
  suburb: z.string().min(1, "Suburb is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email format"),
  
  consigneeId: z.string().min(1, "Consignee ID is required"),
  consigneeName: z.string().min(1, "Consignee Name is required"),
  consigneeContactPerson: z.string().min(1, "Contact Person is required"),
  estimatedDeliveryDate: z.string().min(1, "Estimated Delivery Date is required"),
  consigneeAddress: z.string().min(1, "Consignee Address is required"),
  deliveryCountry: z.string().min(1, "Country is required"),
  deliveryStreet: z.string().min(1, "Street is required"),
  deliverySuburb: z.string().min(1, "Suburb is required"),
  deliveryCity: z.string().min(1, "City is required"),
  deliveryPostalCode: z.string().min(1, "Postal Code is required"),
  deliveryPhone: z.string().min(1, "Phone is required"),
  deliveryEmail: z.string().email("Invalid email format"),

  orderType: z.string().min(1, "Order Type is required"),
  service: z.string().min(1, "Service is required"),
  modeOfTransport: z.string().min(1, "Mode of Transport is required"),
  pickupInstructions: z.string().optional(),
  
  customerReference: z.string().min(1, "Customer Reference is required"),
  purchaseOrder: z.string().min(1, "Purchase Order is required"),
  deliveryInstructions: z.string().optional(),
  
  paymentMethod: z.string().optional(),
  namedPlace: z.string().optional(),
  equipmentGroup: z.string().optional(),
  otherLocation: z.string().optional(),
  trailerNumber: z.string().optional(),
  nmfcClass: z.string().optional(),
  hazmat: z.string().optional(),
  commodityCode: z.string().optional(),
  
    cargoItems: z.array(cargoItemSchema).min(1, "At least one cargo item is required"),
    
    newCargoItem: cargoItemSchema.optional()
});

// Cargo field configuration
const CARGO_FIELDS = [
  { name: 'item', label: 'Item', type: 'select', options: CARGO_ITEM_OPTIONS },
  { name: 'packageType', label: 'Package Type', type: 'select', options: CARGO_ITEM_OPTIONS },
  { name: 'goodsDescription', label: 'Goods Description', type: 'input', placeholder: 'Enter goods description' },
  { name: 'quantity', label: 'Quantity', type: 'number', placeholder: '1' },
  { name: 'weight', label: 'Weight (Lbs)', type: 'number', placeholder: 'Enter weight' },
  { name: 'actualVolume', label: 'Actual Volume (cbm)', type: 'number', placeholder: 'Enter volume' },
  { name: 'cargoType', label: 'Cargo Type', type: 'select', options: CARGO_TYPE_OPTIONS }
];

const DIMENSION_FIELDS = [
  { name: 'length', placeholder: 'L' },
  { name: 'width', placeholder: 'W' },
  { name: 'height', placeholder: 'H' }
];

// Form field configuration arrays
const PICKUP_FIELDS = [
  { 
    name: 'shipperId', 
    label: 'Shipper ID', 
    type: 'text', 
    hasIcons: true,
  },
  { 
    name: 'shipperName', 
    label: 'Shipper Name', 
    type: 'text',
  },
  { 
    name: 'contactPerson', 
    label: 'Contact person', 
    type: 'text',
  },
  { 
    name: 'estimatedPickupDate', 
    label: 'Estimated Pickup Date', 
    type: 'text',
  },
  { 
    name: 'shipperAddress', 
    label: 'Shipper Address', 
    type: 'text',
  },
  { 
    name: 'country', 
    label: 'Country', 
    type: 'select',
    options: COUNTRY_OPTIONS,
  },
  { 
    name: 'street', 
    label: 'Street', 
    type: 'text',
  },
  { 
    name: 'suburb', 
    label: 'Suburb', 
    type: 'text',
  },
  { 
    name: 'city', 
    label: 'City / Town', 
    type: 'text',
  },
  { 
    name: 'postalCode', 
    label: 'Postal Code', 
    type: 'text',
  },
  { 
    name: 'phone', 
    label: 'Phone', 
    type: 'tel',
  },
  { 
    name: 'email', 
    label: 'Email', 
    type: 'email',
  }
];

const DELIVERY_FIELDS = [
  { 
    name: 'consigneeId', 
    label: 'Consignee ID', 
    type: 'text', 
    hasIcons: true,
  },
  { 
    name: 'consigneeName', 
    label: 'Consignee Name', 
    type: 'text',
  },
  { 
    name: 'consigneeContactPerson', 
    label: 'Contact person', 
    type: 'text',
  },
  { 
    name: 'estimatedDeliveryDate', 
    label: 'Estimated Delivery Date', 
    type: 'text',
  },
  { 
    name: 'consigneeAddress', 
    label: 'Consignee Address', 
    type: 'text',
  },
  { 
    name: 'deliveryCountry', 
    label: 'Country', 
    type: 'select',
    options: COUNTRY_OPTIONS,
  },
  { 
    name: 'deliveryStreet', 
    label: 'Street', 
    type: 'text',
  },
  { 
    name: 'deliverySuburb', 
    label: 'Suburb', 
    type: 'text',
  },
  { 
    name: 'deliveryCity', 
    label: 'City / Town', 
    type: 'text',
  },
  { 
    name: 'deliveryPostalCode', 
    label: 'Postal Code', 
    type: 'text',
  },
  { 
    name: 'deliveryPhone', 
    label: 'Phone', 
    type: 'tel',
  },
  { 
    name: 'deliveryEmail', 
    label: 'Email', 
    type: 'email',
  }
];

const ORDER_ATTRIBUTES_FIELDS = [
  { 
    name: 'orderType', 
    label: 'Select Order Type', 
    type: 'select',
    options: ORDER_TYPE_OPTIONS,
  },
  { 
    name: 'service', 
    label: 'Select Service', 
    type: 'select',
    options: SERVICE_OPTIONS,
  },
  { 
    name: 'modeOfTransport', 
    label: 'Mode Of Transport', 
    type: 'select',
    options: TRANSPORT_MODE_OPTIONS,
  },
  { 
    name: 'pickupInstructions', 
    label: 'Pick Up Instructions', 
    type: 'textarea',
    rows: 3,
  }
];

const REFERENCES_FIELDS = [
  { 
    name: 'customerReference', 
    label: 'DQ/Customer reference', 
    type: 'text',
  },
  { 
    name: 'purchaseOrder', 
    label: 'Purchase Order', 
    type: 'text',
  },
  { 
    name: 'deliveryInstructions', 
    label: 'Delivery Instructions', 
    type: 'textarea',
    rows: 3,
  }
];

const ADDITIONAL_DETAILS_FIELDS = [
  { 
    name: 'paymentMethod', 
    label: 'Payment Method', 
    type: 'text',
  },
  { 
    name: 'namedPlace', 
    label: 'Named Place', 
    type: 'text',
  },
  { 
    name: 'equipmentGroup', 
    label: 'Equipment Group', 
    type: 'text',
  },
  { 
    name: 'otherLocation', 
    label: 'Other Location', 
    type: 'text',
  },
  { 
    name: 'trailerNumber', 
    label: 'Trailer Number', 
    type: 'text',
  },
  { 
    name: 'nmfcClass', 
    label: 'NMFC Class', 
    type: 'text',
  },
  { 
    name: 'hazmat', 
    label: 'Hazmat', 
    type: 'text',
  },
  { 
    name: 'commodityCode', 
    label: 'Commodity Code', 
    type: 'text',
  }
];

const renderField = (field, control) => {
  const { name, label, type, options, hasIcons, className, rows, ...props } = field;
  
  return (
    <FormField
      key={name}
      control={control}
      name={name}
      render={({ field: formField, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700">
        {label}
          </FormLabel>
          <FormControl>
      {type === 'text' || type === 'tel' || type === 'email' ? (
        hasIcons ? (
          <div className="flex gap-1">
            <Input
              type={type}
              className="flex-1 h-9 text-sm border-2 border-[#E7ECFD]"
                    {...formField}
              {...props}
            />
            <Button variant="outline" size="sm" type="button" className="h-9 w-9 p-0 border-2 border-[#E7ECFD]">
              <SearchIcon className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" type="button" className="h-9 w-9 p-0 border-2 border-[#E7ECFD]">
              <FileIcon className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <Input
            type={type}
            className="h-9 text-sm border-2 border-[#E7ECFD]"
                  {...formField}
            {...props}
          />
        )
      ) : type === 'select' ? (
              <Select onValueChange={formField.onChange} value={formField.value}>
          <SelectTrigger className="h-9 text-sm border-2 border-[#E7ECFD] w-full">
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options?.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : type === 'textarea' ? (
        <Textarea
          rows={rows || 3}
          className="border-2 border-[#E7ECFD] text-sm"
                {...formField}
          {...props}
        />
      ) : null}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Info Tab Component
const InfoTab = memo(({ booking }) => (
  <div className="space-y-6">
    {/* Pickup and Delivery Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pickup Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-blue-600">PICK UP</CardTitle>
              <p className="text-sm text-gray-600 font-medium">{booking.origin.name}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium text-gray-800">{booking.sourceCity}, {booking.origin.country}</p>
            <p className="text-sm text-gray-600">{booking.origin.name}, {booking.origin.address}</p>
            <p className="text-xs text-gray-500">Phone: {booking.origin.phone} , Fax: {booking.origin.fax}</p>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-blue-600">DELIVERY</CardTitle>
              <p className="text-sm text-gray-600 font-medium">{booking.destination.name}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium text-gray-800">{booking.destinationCity}, {booking.destination.country}</p>
            <p className="text-sm text-gray-600">{booking.destination.name}, {booking.destination.address}</p>
            <p className="text-xs text-gray-500">Phone: {booking.destination.phone} , Fax: {booking.destination.fax}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Cargo and Reference Details */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cargo Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">CARGO DETAILS</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-600 font-semibold">Package Type</TableHead>
                <TableHead className="text-blue-600 font-semibold">Actual Weight</TableHead>
                <TableHead className="text-blue-600 font-semibold">Actual Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{booking.cargoDetails.packageType}</TableCell>
                <TableCell>{booking.cargoDetails.actualWeight}</TableCell>
                <TableCell>{booking.cargoDetails.actualVolume}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-gray-500 mt-2">Showing 1 to 1 of 1 entries</p>
        </CardContent>
      </Card>

      {/* Reference Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">REFERENCE DETAILS</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-600 font-semibold">Reference ID</TableHead>
                <TableHead className="text-blue-600 font-semibold">Reference Name</TableHead>
                <TableHead className="text-blue-600 font-semibold">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{booking.referenceDetails.referenceId}</TableCell>
                <TableCell>{booking.referenceDetails.referenceName}</TableCell>
                <TableCell>{booking.referenceDetails.value}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
));

InfoTab.displayName = 'InfoTab';

// Status Tab Component
const StatusTab = memo(({ booking }) => {
  const statusTimeline = useMemo(() => {
    if (!booking.statusHistory || booking.statusHistory.length === 0) {
      return [];
    }
    
    return booking.statusHistory.map((statusItem, index) => ({
      status: statusItem.status,
      timestamp: statusItem.timestamp,
      icon: ClockIcon, 
      isActive: statusItem.isActive
    }));
  }, [booking.statusHistory]);

  return (
    <div className="space-y-6">
      {statusTimeline.length > 0 ? (
        <ol className="relative border-l-2 border-blue-200 ml-4">
          {statusTimeline.map((item, index) => (
            <li key={index} className="mb-8 ml-6 flex flex-col gap-1">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-8 ring-white">
                <ClockIcon className="w-5 h-5 text-blue-600" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-blue-800 text-lg">{item.status}</span>
                <span className="text-sm text-gray-500 font-medium">Created Date: {item.timestamp}</span>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="text-center py-8">
          <ClockIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No status updates</h3>
          <p className="text-gray-600">Status history will appear here as the order progresses.</p>
        </div>
      )}
    </div>
  );
});

StatusTab.displayName = 'StatusTab';

// Attachments Tab Component
const AttachmentsTab = memo(({ booking }) => (
  <div className="space-y-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-blue-600 font-semibold">Location</TableHead>
          <TableHead className="text-blue-600 font-semibold">Doc Type</TableHead>
          <TableHead className="text-blue-600 font-semibold">Document</TableHead>
          <TableHead className="text-blue-600 font-semibold">Stop ID</TableHead>
          <TableHead className="text-blue-600 font-semibold">Stop Type</TableHead>
          <TableHead className="text-blue-600 font-semibold">Created By</TableHead>
          <TableHead className="text-blue-600 font-semibold">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
            {booking.attachments && booking.attachments.length > 0 
              ? 'Loading attachments...' 
              : 'No attachments available for this booking'}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
));

AttachmentsTab.displayName = 'AttachmentsTab';

// Main Modal Component
const BookingDetailsModal = memo(({ booking, isOpen, onClose, onEdit, onGenerateLabel }) => {
  const [activeTab, setActiveTab] = useState('info');

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[80rem] w-[95vw] max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 py-4 border-b pr-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl text-blue-600">{booking.id}</DialogTitle>
                <p className="text-sm text-gray-600">{booking.orderReference}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="px-6 border-b">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="info" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Info
                </TabsTrigger>
                <TabsTrigger value="status" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Status
                </TabsTrigger>
                <TabsTrigger value="attachments" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Attachment
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <TabsContent value="info" className="mt-0">
                <InfoTab booking={booking} />
              </TabsContent>

              <TabsContent value="status" className="mt-0">
                <StatusTab booking={booking} />
              </TabsContent>

              <TabsContent value="attachments" className="mt-0">
                <AttachmentsTab booking={booking} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
});

BookingDetailsModal.displayName = 'BookingDetailsModal';

// Edit Modal Component
const EditBookingModal = memo(({ booking, isOpen, onClose, mode = 'edit' }) => {
  const [documents, setDocuments] = useState([]);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({ type: '', name: '', file: null });


  const form = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {

      shipperId: "",
      shipperName: "",
      contactPerson: "",
      estimatedPickupDate: "",
      shipperAddress: "",
      country: "",
      street: "",
      suburb: "",
      city: "",
      postalCode: "",
      phone: "",
      email: "",
      
      consigneeId: "",
      consigneeName: "",
      consigneeContactPerson: "",
      estimatedDeliveryDate: "",
      consigneeAddress: "",
      deliveryCountry: "",
      deliveryStreet: "",
      deliverySuburb: "",
      deliveryCity: "",
      deliveryPostalCode: "",
      deliveryPhone: "",
      deliveryEmail: "",
      
      orderType: "",
      service: "",
      modeOfTransport: "",
      pickupInstructions: "",
      
      customerReference: "",
      purchaseOrder: "",
      deliveryInstructions: "",
      
      paymentMethod: "",
      namedPlace: "",
      equipmentGroup: "",
      otherLocation: "",
      trailerNumber: "",
      nmfcClass: "",
      hazmat: "",
      commodityCode: "",
      
      cargoItems: [],
      newCargoItem: {
        item: '',
        packageType: '',
        goodsDescription: '',
        quantity: 1,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        actualVolume: 0,
        cargoType: ''
      }
    }
  });

  const { control, register, watch, setValue, reset } = form;
  
  const cargoItems = watch('cargoItems') || [];
  const totalWeight = cargoItems.reduce((sum, item) => sum + (item.weight || 0), 0);
  const totalVolume = cargoItems.reduce((sum, item) => sum + (item.actualVolume || 0), 0);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "cargoItems"
  });

  useEffect(() => {
    if (mode === 'add') {
      reset({

        shipperId: "",
        shipperName: "",
        contactPerson: "",
        estimatedPickupDate: "",
        shipperAddress: "",
        country: "",
        street: "",
        suburb: "",
        city: "",
        postalCode: "",
        phone: "",
        email: "",
        
        consigneeId: "",
        consigneeName: "",
        consigneeContactPerson: "",
        estimatedDeliveryDate: "",
        consigneeAddress: "",
        deliveryCountry: "",
        deliveryStreet: "",
        deliverySuburb: "",
        deliveryCity: "",
        deliveryPostalCode: "",
        deliveryPhone: "",
        deliveryEmail: "",
        

        orderType: "",
        service: "",
        modeOfTransport: "",
        pickupInstructions: "",
        

        customerReference: "",
        purchaseOrder: "",
        deliveryInstructions: "",
        

        paymentMethod: "",
        namedPlace: "",
        equipmentGroup: "",
        otherLocation: "",
        trailerNumber: "",
        nmfcClass: "",
        hazmat: "",
        commodityCode: "",
        

        cargoItems: [],
        newCargoItem: {
          item: '',
          packageType: '',
          goodsDescription: '',
          quantity: 1,
          weight: 0,
          length: 0,
          width: 0,
          height: 0,
          actualVolume: 0,
          cargoType: ''
        }
      });
    } else if (booking && mode === 'edit') {

      reset({

        shipperId: booking.origin?.id || "",
        shipperName: booking.origin?.name || "",
        contactPerson: booking.origin?.name || "",
        estimatedPickupDate: booking.pickupDate || "",
        shipperAddress: `${booking.sourceCity || ""}, ${booking.origin?.country || ""}`,
        country: booking.origin?.country || "",
        street: booking.origin?.street || "",
        suburb: booking.origin?.suburb || "",
        city: booking.sourceCity || "",
        postalCode: booking.origin?.postalCode || "",
        phone: booking.origin?.phone || "",
        email: booking.origin?.email || "",
        

        consigneeId: booking.destination?.id || "",
        consigneeName: booking.destination?.name || "",
        consigneeContactPerson: booking.destination?.name || "",
        estimatedDeliveryDate: booking.deliveryDate || "",
        consigneeAddress: `${booking.destinationCity || ""}, ${booking.destination?.country || ""}`,
        deliveryCountry: booking.destination?.country || "",
        deliveryStreet: booking.destination?.street || "",
        deliverySuburb: booking.destination?.suburb || "",
        deliveryCity: booking.destinationCity || "",
        deliveryPostalCode: booking.destination?.postalCode || "",
        deliveryPhone: booking.destination?.phone || "",
        deliveryEmail: booking.destination?.email || "",
        
        orderType: booking.orderAttributes?.orderType || "",
        service: booking.orderAttributes?.service || "",
        modeOfTransport: booking.orderAttributes?.modeOfTransport || "",
        pickupInstructions: booking.orderAttributes?.pickupInstructions || "",
        
        customerReference: booking.dq || "",
        purchaseOrder: booking.po || "",
        deliveryInstructions: booking.referenceDetails?.deliveryInstructions || "",
        
        paymentMethod: booking.additionalDetails?.paymentMethod || "",
        namedPlace: booking.additionalDetails?.namedPlace || "",
        equipmentGroup: booking.additionalDetails?.equipmentGroup || "",
        otherLocation: booking.additionalDetails?.otherLocation || "",
        trailerNumber: booking.additionalDetails?.trailerNumber || "",
        nmfcClass: booking.additionalDetails?.nmfcClass || "",
        hazmat: booking.additionalDetails?.hazmat || "",
        commodityCode: booking.additionalDetails?.commodityCode || "",
        
        cargoItems: booking.cargoDetails ? [{
          item: booking.cargoDetails.packageType || 'BOXES',
          packageType: booking.cargoDetails.packageType || 'BOXES',
          goodsDescription: booking.cargoDetails.goodsDescription || '',
          quantity: booking.cargoDetails.quantity || 1,
          weight: booking.cargoDetails.weight || 0,
          length: booking.cargoDetails.length || 0,
          width: booking.cargoDetails.width || 0,
          height: booking.cargoDetails.height || 0,
          actualVolume: booking.cargoDetails.actualVolume || 0,
          cargoType: booking.cargoDetails.cargoType || 'General'
        }] : [],
        newCargoItem: {
        item: '',
        packageType: '',
        goodsDescription: '',
        quantity: 1,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        actualVolume: 0,
        cargoType: ''
        }
      });
    }
  }, [booking, mode, reset]);

  // Separate handlers for Add and Edit modes
  const onSubmitWithValidation = useCallback(async (data) => {
    console.log('Creating new booking:', data);
  }, []);

  const onSubmitWithoutValidation = useCallback(async (event) => {
    event.preventDefault();
    const formData = form.getValues();
    console.log('Updating booking:', booking?.id, formData);
  }, [form, booking?.id]);

  const handleCargoAdd = useCallback(() => {
    const newCargoData = watch('newCargoItem');
    
    // Check if required fields are filled
    if (!newCargoData || !newCargoData.item || !newCargoData.packageType) {
      toast.error("Missing Required Fields", {
        description: (
          <span style={{ color: '#1f2937', fontWeight: '500' }}>
            Please fill all the details to add cargo item. Required fields: Item, Package Type, Goods Description, Quantity, Weight, Dimensions, Actual Volume, and Cargo Type.
          </span>
        ),
      });
      return;
    }
    
    append(newCargoData);
    // Reset the form
    setValue('newCargoItem', {
      item: '',
      packageType: '',
      goodsDescription: '',
      quantity: 1,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      actualVolume: 0,
      cargoType: ''
    });
    
    toast.success("Cargo Item Added", {
      description: (
        <span style={{ color: '#1f2937', fontWeight: '500' }}>
          Cargo item has been successfully added to the list.
        </span>
      ),
    });
  }, [append, watch, setValue]);

  const handleCargoDelete = useCallback((index) => {
    remove(index);
  }, [remove]);

  const handleDocumentAdd = useCallback(() => {
    if (newDocument.type && newDocument.name) {
      setDocuments(prev => [...prev, { ...newDocument, id: Date.now() }]);
      setNewDocument({ type: '', name: '', file: null });
      setIsDocumentModalOpen(false);
    }
  }, [newDocument]);

  if (!booking && mode === 'edit') return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="lg:max-w-[90rem] w-[95vw] max-h-[95vh] overflow-hidden p-0 flex flex-col"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl text-blue-600">
              {mode === 'add' ? 'Add New Booking' : `Booking Details (Shipment Characteristics) - ${booking?.id}`}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form 
              id="booking-form" 
              onSubmit={mode === 'add' ? form.handleSubmit(onSubmitWithValidation) : onSubmitWithoutValidation}
              className="flex-1 overflow-y-auto p-6 space-y-8 min-h-0 bg-gray-100"
            >
            {/* Booking Details Summary - Non-editable */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Booking Details</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">Pickup Address</p>
                      <p className="text-xs text-gray-600 truncate">{form.watch('shipperName') || 'N/A'}</p>
                      <p className="text-xs text-gray-600 truncate">{form.watch('shipperAddress') || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">Delivery Address</p>
                      <p className="text-xs text-gray-600 truncate">{form.watch('consigneeName') || 'N/A'}</p>
                      <p className="text-xs text-gray-600 truncate">{form.watch('consigneeAddress') || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Weight & Actual Volume</p>
                      <p className="text-xs text-gray-600">{totalWeight > 0 ? `${totalWeight} lbs` : 'N/A'}</p>
                      <p className="text-xs text-gray-600">Actual Volume {totalVolume > 0 ? `${totalVolume} cbm` : 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Navigation className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Distance</p>
                      <p className="text-xs text-gray-600">{booking?.distance || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pick Up and Delivery Sections with Cards */}
            <div className="grid grid-cols-2 gap-6">
              {/* Pick Up Section */}
              <Card className="p-6">
                <CardHeader className="pb-2 px-0">
                  <CardTitle className="text-lg text-blue-600">Pick Up</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-0">
                  <div className="grid grid-cols-2 gap-3">
                    {PICKUP_FIELDS.map(field => renderField(field, control))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Section */}
              <Card className="p-6">
                <CardHeader className="pb-2 px-0">
                  <CardTitle className="text-lg text-blue-600">Delivery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-0">
                  <div className="grid grid-cols-2 gap-3">
                    {DELIVERY_FIELDS.map(field => renderField(field, control))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Attributes, References, and Documents */}
            <div className="grid grid-cols-5 gap-6">
              {/* Order Attributes and References - 60% width */}
              <div className="col-span-3">
                <div className="grid grid-cols-2 gap-6">
                  {/* Order Attributes */}
                  <Card className="p-3">
                    <CardHeader className="pb-2 px-0">
                      <CardTitle className="text-lg text-blue-600">Order Attributes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 px-0">
                      {ORDER_ATTRIBUTES_FIELDS.map(field => renderField(field, control))}
                    </CardContent>
                  </Card>

                  {/* References */}
                  <Card className="p-3">
                    <CardHeader className="pb-2 px-0">
                      <CardTitle className="text-lg text-blue-600">References</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 px-0">
                      {REFERENCES_FIELDS.map(field => renderField(field, control))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Route - 40% width */}
              <div className="col-span-2">
                <Card className="p-3 h-full">
                  <CardHeader className="pb-2 px-0">
                    <CardTitle className="text-lg text-blue-600">Route</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 flex flex-col h-full">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Navigation className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No Data Available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Cargo Details - Full Width */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-blue-600">Cargo Details</h2>
              
              {/* Add Cargo Form */}
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white">
                {/* Row 1: Item, Package Type, Goods Description, Quantity */}
                <div className="grid grid-cols-4 gap-4">
                  {CARGO_FIELDS.slice(0, 4).map(field => (
                    <div key={field.name}>
                      <FormField
                        control={control}
                        name={`newCargoItem.${field.name}`}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">{field.label}</FormLabel>
                            <FormControl>
                              {field.type === 'select' ? (
                                <Select onValueChange={formField.onChange} value={formField.value}>
                                  <SelectTrigger className="h-9 w-full border-2 border-[#E7ECFD]">
                                    <SelectValue placeholder={field.name === 'packageType' ? 'Select Package' : 'Select'} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  type={field.type}
                                  placeholder={field.placeholder}
                                  className="h-9 w-full border-2 border-[#E7ECFD]"
                                  {...formField}
                                  onChange={field.type === 'number' ? (e) => formField.onChange(Number(e.target.value)) : formField.onChange}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Row 2: Weight, Dimensions, Actual Volume, Cargo Type */}
                <div className="grid grid-cols-4 gap-4">
                  {/* Weight Field */}
                  <div>
                    <FormField
                      control={control}
                      name="newCargoItem.weight"
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Weight (Lbs)</FormLabel>
                          <FormControl>
                            <Input
                                type="number"
                                placeholder="Enter weight"
                                className="h-9 w-full border-2 border-[#E7ECFD]"
                              {...formField}
                              onChange={(e) => formField.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Dimensions Field */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Dimensions (cm) per unit</Label>
                    <div className="flex gap-1">
                      {DIMENSION_FIELDS.map(field => (
                        <FormField
                          key={field.name}
                          control={control}
                          name={`newCargoItem.${field.name}`}
                          render={({ field: formField }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder={field.placeholder}
                                    className="h-9 border-2 border-[#E7ECFD]"
                                  {...formField}
                                  onChange={(e) => formField.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Actual Volume Field */}
                  <div>
                    <FormField
                      control={control}
                      name="newCargoItem.actualVolume"
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Actual Volume (cbm)</FormLabel>
                          <FormControl>
                            <Input
                                type="number"
                                placeholder="Enter volume"
                                className="h-9 w-full border-2 border-[#E7ECFD]"
                              {...formField}
                              onChange={(e) => formField.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Cargo Type Field */}
                  <div>
                    <FormField
                      control={control}
                      name="newCargoItem.cargoType"
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Cargo Type</FormLabel>
                          <FormControl>
                            <Select onValueChange={formField.onChange} value={formField.value}>
                               <SelectTrigger className="h-9 w-full border-2 border-[#E7ECFD]">
                                <SelectValue placeholder="Select Cargo Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {CARGO_TYPE_OPTIONS.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Add Button */}
                <div className="flex justify-end">
                  <Button type="button" onClick={handleCargoAdd} className="bg-blue-600 hover:bg-blue-700 h-9 px-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Cargo Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-sm font-medium text-gray-700">Actions</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Item</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Package Type</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Goods Description</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Quantity</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Weight (Lbs)</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Actual Volume (cbm)</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Dimensions (cm)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id} className="hover:bg-gray-50">
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCargoDelete(index)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell className="text-sm">{field.item || '-'}</TableCell>
                        <TableCell className="text-sm">{field.packageType || '-'}</TableCell>
                        <TableCell className="text-sm">{field.goodsDescription || '-'}</TableCell>
                        <TableCell className="text-sm">{field.quantity || 0}</TableCell>
                        <TableCell className="text-sm">{field.weight || 0}</TableCell>
                        <TableCell className="text-sm">{field.actualVolume || 0}</TableCell>
                        <TableCell className="text-sm">
                          {field.length || 0} x {field.width || 0} x {field.height || 0}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Documents and Charges*/}
            <div className="grid grid-cols-2 gap-6">
              {/* Documents */}
              <div>
                <Card className="p-3 h-full">
                  <CardHeader className="pb-2 px-0">
                    <CardTitle className="text-lg text-blue-600">Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 flex flex-col h-full">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Truck className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No Data Available</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button 
                        type="button"
                        onClick={() => setIsDocumentModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 h-9 px-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charges */}
              <div>
                <Card className="p-3 h-full">
                  <CardHeader className="pb-2 px-0">
                    <CardTitle className="text-lg text-blue-600">Charges</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 flex flex-col h-full">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No Data Available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-blue-600">Additional Details</h2>
              <div className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="grid grid-cols-4 gap-4">
                  {ADDITIONAL_DETAILS_FIELDS.map(field => renderField(field, control))}
                </div>
              </div>
            </div>
            </form>
          </Form>

          <DialogFooter className="px-6 py-4 border-t">
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outline" onClick={() => reset()}>
                Reset
              </Button>
              <Button type="submit" form="booking-form" className="bg-blue-600 hover:bg-blue-700">
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Upload Sub-Modal */}
      <Dialog open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="docType" className="text-sm font-medium text-gray-700 mb-1 block">Document Type</Label>
              <Input
                id="docType"
                value={newDocument.type}
                onChange={(e) => setNewDocument(prev => ({ ...prev, type: e.target.value }))}
                placeholder="Enter document type"
              />
            </div>
            <div>
              <Label htmlFor="docName" className="text-sm font-medium text-gray-700 mb-1 block">Document Name</Label>
              <Input
                id="docName"
                value={newDocument.name}
                onChange={(e) => setNewDocument(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter document name"
              />
            </div>
            <div>
              <Label htmlFor="docUpload" className="text-sm font-medium text-gray-700 mb-1 block">Upload</Label>
              <Input
                id="docUpload"
                type="file"
                onChange={(e) => setNewDocument(prev => ({ ...prev, file: e.target.files[0] }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDocumentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDocumentAdd} className="bg-blue-600 hover:bg-blue-700">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

EditBookingModal.displayName = 'EditBookingModal';

export {
  InfoTab,
  StatusTab,
  AttachmentsTab,
  BookingDetailsModal,
  EditBookingModal
};
