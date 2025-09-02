"use client"
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useForm, useFieldArray } from 'react-hook-form';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Constants to avoid hardcoding
const STATUS_CONFIG = {
  'ACCEPTED BY DRIVER': {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle
  },
  'IN TRANSIT': {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Navigation
  },
  'PENDING': {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: ClockIcon
  },
  'COMPLETED': {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: CheckSquare
  }
};

const DEFAULT_STATUS = {
  color: 'bg-gray-100 text-gray-800 border-gray-200',
  icon: AlertCircle
};

const PAGINATION_OPTIONS = [10, 25, 50];
const VIEW_MODES = {
  TABLE: 'table',
  CARD: 'card'
};

// Custom hook for booking data management - following milestone pattern
const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/bookingList.json');
        const data = await response.json();
        setBookings(data.bookings);
        setPagination(data.pagination);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, setBookings, pagination, setPagination, loading };
};

// Custom hook for filtering logic
const useBookingFilters = (bookings) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = 
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.dq.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.sourceCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredBookings
  };
};

// Utility functions
const getStatusConfig = (status) => {
  return STATUS_CONFIG[status] || DEFAULT_STATUS;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

// Memoized components
const StatusBadge = memo(({ status }) => {
  const config = getStatusConfig(status);
  const IconComponent = config.icon;
  
  return (
    <Badge className={`${config.color} flex items-center gap-1`}>
      <IconComponent className="w-4 h-4" />
      {status}
    </Badge>
  );
});

StatusBadge.displayName = 'StatusBadge';



const ActionButtons = memo(({ booking, onView, onEdit, onGenerateLabel }) => (
  <div className="flex gap-2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => onView(booking)}
      className="flex items-center gap-1"
    >
      <Eye className="w-4 h-4" />
      View
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onEdit(booking)}
      className="flex items-center gap-1"
    >
      <Edit className="w-4 h-4" />
      Edit
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onGenerateLabel(booking)}
      className="flex items-center gap-1"
    >
      <FileText className="w-4 h-4" />
      Label
    </Button>
  </div>
));

ActionButtons.displayName = 'ActionButtons';

const BookingCard = memo(({ booking, onView, onEdit, onGenerateLabel }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow cursor-pointer">
    <CardContent className="p-5">
      {/* Top Row: Booking ID, DQ, and Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-blue-600">{booking.id}</h3>
            <p className="text-sm text-gray-600">{booking.orderReference}</p>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Main Content Grid: 3 columns layout */}
      <div className="grid grid-cols-3 gap-6 mb-4">
        {/* Left Column: Weight and Volume */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Weight</p>
              <p className="text-sm font-medium text-gray-800">{booking.weight}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Volume</p>
              <p className="text-sm font-medium text-gray-800">{booking.volume}</p>
            </div>
          </div>
        </div>

        {/* Middle Column: Origin and Destination Flow */}
        <div className="flex items-center gap-4">
          <div className="flex-1 text-left">
            <h4 className="font-semibold text-gray-800 text-sm">{booking.origin.name}</h4>
            <p className="text-xs text-gray-600">{booking.origin.address}</p>
            <p className="text-xs text-gray-500">By {booking.origin.deadline}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-blue-600" />
            </div>
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-semibold text-gray-800 text-sm">{booking.destination.name}</h4>
            <p className="text-xs text-gray-600">{booking.destination.address}</p>
            <p className="text-xs text-gray-500">By {booking.destination.deadline}</p>
          </div>
        </div>

        {/* Right Column: ETA and Distance */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">ETA</p>
              <p className="text-sm font-medium text-gray-800">{booking.eta}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Distance</p>
              <p className="text-sm font-medium text-gray-800">{booking.distance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Vehicle Details and Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{booking.vehicleType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{booking.vehicleId}</span>
          </div>
        </div>
        <ActionButtons 
          booking={booking}
          onView={onView}
          onEdit={onEdit}
          onGenerateLabel={onGenerateLabel}
        />
      </div>
    </CardContent>
  </Card>
));

BookingCard.displayName = 'BookingCard';

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
      icon: ClockIcon, // Use consistent Clock icon for all statuses (like Active/Pending Orders)
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
const EditBookingModal = memo(({ booking, isOpen, onClose }) => {
  const [formData, setFormData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({ type: '', name: '', file: null });

  // React Hook Form setup
  const { control, register, watch, setValue } = useForm({
    defaultValues: {
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

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "cargoItems"
  });

  // Initialize form data when booking changes
  useEffect(() => {
    if (booking) {
      setFormData({
        // Pick Up fields
        shipperId: booking.origin?.id,
        shipperName: booking.origin?.name,
        contactPerson: booking.origin?.name,
        estimatedPickupDate: booking.pickupDate,
        shipperAddress: `${booking.sourceCity}, ${booking.origin?.country}`,
        country: booking.origin?.country,
        street: booking.origin?.street,
        suburb: booking.origin?.suburb,
        city: booking.sourceCity,
        postalCode: booking.origin?.postalCode,
        phone: booking.origin?.phone,
        email: booking.origin?.email,
        
        // Delivery fields
        consigneeId: booking.destination?.id,
        consigneeName: booking.destination?.name,
        consigneeContactPerson: booking.destination?.name,
        estimatedDeliveryDate: booking.deliveryDate,
        consigneeAddress: `${booking.destinationCity}, ${booking.destination?.country}`,
        deliveryCountry: booking.destination?.country,
        deliveryStreet: booking.destination?.street,
        deliverySuburb: booking.destination?.suburb,
        deliveryCity: booking.destinationCity,
        deliveryPostalCode: booking.destination?.postalCode,
        deliveryPhone: booking.destination?.phone,
        deliveryEmail: booking.destination?.email,
        
        // Order Attributes
        orderType: booking.orderAttributes?.orderType,
        service: booking.orderAttributes?.service,
        modeOfTransport: booking.orderAttributes?.modeOfTransport,
        pickupInstructions: booking.orderAttributes?.pickupInstructions,
        
        // References
        customerReference: booking.dq,
        purchaseOrder: booking.po,
        deliveryInstructions: '',
        
        // Additional Details
        paymentMethod: booking.additionalDetails?.paymentMethod,
        namedPlace: booking.additionalDetails?.namedPlace,
        equipmentGroup: booking.additionalDetails?.equipmentGroup,
        otherLocation: booking.additionalDetails?.otherLocation,
        trailerNumber: booking.additionalDetails?.trailerNumber,
        nmfcClass: booking.additionalDetails?.nmfcClass,
        hazmat: booking.additionalDetails?.hazmat,
        commodityCode: booking.additionalDetails?.commodityCode
      });
      
      // Initialize cargo items with field array
      setValue('cargoItems', [{
        item: 'BOXES',
        packageType: 'BOXES',
        goodsDescription: '',
        quantity: 1,
        weight: 800,
        length: 300,
        width: 300,
        height: 300,
        actualVolume: 13000,
        cargoType: 'General'
      }]);
      
      // Initialize new cargo item form
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
    }
  }, [booking]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

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

  if (!booking) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="lg:max-w-[90rem] w-[95vw] max-h-[95vh] overflow-hidden p-0 flex flex-col">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl text-blue-600">
              Booking Details (Shipment Characteristics) - {booking.id}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 min-h-0 bg-gray-50">
            {/* Booking Details Summary - Non-editable */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Booking Details</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formData.shipperName}</p>
                    <p className="text-xs text-gray-600">{formData.shipperAddress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formData.consigneeName}</p>
                    <p className="text-xs text-gray-600">{formData.consigneeAddress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">800</p>
                    <p className="text-xs text-gray-600">Actual Volume 13000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Navigation className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Distance</p>
                    <p className="text-xs text-gray-600">{booking.distance}</p>
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
                    <div>
                      <Label htmlFor="shipperId" className="text-sm font-medium text-gray-700 mb-1 block">Shipper ID</Label>
                      <div className="flex gap-1">
                        <Input
                          id="shipperId"
                          value={formData.shipperId || ''}
                          onChange={(e) => handleInputChange('shipperId', e.target.value)}
                          className="flex-1 h-8 text-sm"
                        />
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <SearchIcon className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <FileIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="shipperName" className="text-sm font-medium text-gray-700 mb-1 block">Shipper Name</Label>
                      <Input
                        id="shipperName"
                        value={formData.shipperName || ''}
                        onChange={(e) => handleInputChange('shipperName', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPerson" className="text-sm font-medium text-gray-700 mb-1 block">Contact person</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson || ''}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedPickupDate" className="text-sm font-medium text-gray-700 mb-1 block">Estimated Pickup Date</Label>
                      <Input
                        id="estimatedPickupDate"
                        value={formData.estimatedPickupDate || ''}
                        onChange={(e) => handleInputChange('estimatedPickupDate', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipperAddress" className="text-sm font-medium text-gray-700 mb-1 block">Shipper Address</Label>
                      <Input
                        id="shipperAddress"
                        value={formData.shipperAddress || ''}
                        onChange={(e) => handleInputChange('shipperAddress', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1 block">Country</Label>
                      <Select value={formData.country || ''} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UNITED STATES OF AMERICA">UNITED STATES OF AMERICA</SelectItem>
                          <SelectItem value="UNITED KINGDOM">UNITED KINGDOM</SelectItem>
                          <SelectItem value="INDIA">INDIA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="street" className="text-sm font-medium text-gray-700 mb-1 block">Street</Label>
                      <Input
                        id="street"
                        value={formData.street || ''}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="suburb" className="text-sm font-medium text-gray-700 mb-1 block">Suburb</Label>
                      <Input
                        id="suburb"
                        value={formData.suburb || ''}
                        onChange={(e) => handleInputChange('suburb', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1 block">City / Town</Label>
                      <Input
                        id="city"
                        value={formData.city || ''}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700 mb-1 block">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode || ''}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
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
                    <div>
                      <Label htmlFor="consigneeId" className="text-sm font-medium text-gray-700 mb-1 block">Consignee ID</Label>
                      <div className="flex gap-1">
                        <Input
                          id="consigneeId"
                          value={formData.consigneeId || ''}
                          onChange={(e) => handleInputChange('consigneeId', e.target.value)}
                          className="flex-1 h-8 text-sm"
                        />
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <SearchIcon className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <FileIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="consigneeName" className="text-sm font-medium text-gray-700 mb-1 block">Consignee Name</Label>
                      <Input
                        id="consigneeName"
                        value={formData.consigneeName || ''}
                        onChange={(e) => handleInputChange('consigneeName', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consigneeContactPerson" className="text-sm font-medium text-gray-700 mb-1 block">Contact person</Label>
                      <Input
                        id="consigneeContactPerson"
                        value={formData.consigneeContactPerson || ''}
                        onChange={(e) => handleInputChange('consigneeContactPerson', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedDeliveryDate" className="text-sm font-medium text-gray-700 mb-1 block">Estimated Delivery Date</Label>
                      <Input
                        id="estimatedDeliveryDate"
                        value={formData.estimatedDeliveryDate || ''}
                        onChange={(e) => handleInputChange('estimatedDeliveryDate', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consigneeAddress" className="text-sm font-medium text-gray-700 mb-1 block">Consignee Address</Label>
                      <Input
                        id="consigneeAddress"
                        value={formData.consigneeAddress || ''}
                        onChange={(e) => handleInputChange('consigneeAddress', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryCountry" className="text-sm font-medium text-gray-700 mb-1 block">Country</Label>
                      <Select value={formData.deliveryCountry || ''} onValueChange={(value) => handleInputChange('deliveryCountry', value)}>
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UNITED STATES OF AMERICA">UNITED STATES OF AMERICA</SelectItem>
                          <SelectItem value="UNITED KINGDOM">UNITED KINGDOM</SelectItem>
                          <SelectItem value="INDIA">INDIA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="deliveryStreet" className="text-sm font-medium text-gray-700 mb-1 block">Street</Label>
                      <Input
                        id="deliveryStreet"
                        value={formData.deliveryStreet || ''}
                        onChange={(e) => handleInputChange('deliveryStreet', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliverySuburb" className="text-sm font-medium text-gray-700 mb-1 block">Suburb</Label>
                      <Input
                        id="deliverySuburb"
                        value={formData.deliverySuburb || ''}
                        onChange={(e) => handleInputChange('deliverySuburb', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryCity" className="text-sm font-medium text-gray-700 mb-1 block">City / Town</Label>
                      <Input
                        id="deliveryCity"
                        value={formData.deliveryCity || ''}
                        onChange={(e) => handleInputChange('deliveryCity', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryPostalCode" className="text-sm font-medium text-gray-700 mb-1 block">Postal Code</Label>
                      <Input
                        id="deliveryPostalCode"
                        value={formData.deliveryPostalCode || ''}
                        onChange={(e) => handleInputChange('deliveryPostalCode', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryPhone" className="text-sm font-medium text-gray-700 mb-1 block">Phone</Label>
                      <Input
                        id="deliveryPhone"
                        value={formData.deliveryPhone || ''}
                        onChange={(e) => handleInputChange('deliveryPhone', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryEmail" className="text-sm font-medium text-gray-700 mb-1 block">Email</Label>
                      <Input
                        id="deliveryEmail"
                        type="email"
                        value={formData.deliveryEmail || ''}
                        onChange={(e) => handleInputChange('deliveryEmail', e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
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
                      <div>
                        <Label htmlFor="orderType" className="text-sm font-medium text-gray-700 mb-1 block">Select Order Type</Label>
                        <Select value={formData.orderType || ''} onValueChange={(value) => handleInputChange('orderType', value)}>
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue placeholder="Select Order Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Express">Express</SelectItem>
                            <SelectItem value="Temperature Control">Temperature Control</SelectItem>
                            <SelectItem value="Local">Local</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="service" className="text-sm font-medium text-gray-700 mb-1 block">Select Service</Label>
                        <Select value={formData.service || ''} onValueChange={(value) => handleInputChange('service', value)}>
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue placeholder="Select Service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Express">Express</SelectItem>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Economy">Economy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="modeOfTransport" className="text-sm font-medium text-gray-700 mb-1 block">Mode Of Transport</Label>
                        <Select value={formData.modeOfTransport || ''} onValueChange={(value) => handleInputChange('modeOfTransport', value)}>
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue placeholder="Select Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Road">Road</SelectItem>
                            <SelectItem value="Rail">Rail</SelectItem>
                            <SelectItem value="Air">Air</SelectItem>
                            <SelectItem value="Sea">Sea</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pickupInstructions" className="text-sm font-medium text-gray-700 mb-1 block">Pick Up Instructions</Label>
                        <Textarea
                          id="pickupInstructions"
                          value={formData.pickupInstructions || ''}
                          onChange={(e) => handleInputChange('pickupInstructions', e.target.value)}
                          rows={3}
                          className="resize-none text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* References */}
                  <Card className="p-3">
                    <CardHeader className="pb-2 px-0">
                      <CardTitle className="text-lg text-blue-600">References</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 px-0">
                      <div>
                        <Label htmlFor="customerReference" className="text-sm font-medium text-gray-700 mb-1 block">DQ/Customer reference</Label>
                        <Input
                          id="customerReference"
                          value={formData.customerReference || ''}
                          onChange={(e) => handleInputChange('customerReference', e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="purchaseOrder" className="text-sm font-medium text-gray-700 mb-1 block">Purchase Order</Label>
                        <Input
                          id="purchaseOrder"
                          value={formData.purchaseOrder || ''}
                          onChange={(e) => handleInputChange('purchaseOrder', e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="deliveryInstructions" className="text-sm font-medium text-gray-700 mb-1 block">Delivery Instructions</Label>
                        <Textarea
                          id="deliveryInstructions"
                          value={formData.deliveryInstructions || ''}
                          onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
                          rows={3}
                          className="resize-none text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Documents - 40% width */}
              <div className="col-span-2">
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
            </div>

            {/* Cargo Details - Full Width */}
                         <div className="space-y-4">
               <h2 className="text-lg font-semibold text-blue-600">Cargo Details</h2>
               
               {/* Add Cargo Form */}
               <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white">
                 {/* Row 1: Item, Package Type, Goods Description, Quantity */}
                 <div className="grid grid-cols-4 gap-4">
                   <div>
                     <Label className="text-sm font-medium text-gray-700 mb-2 block">Item</Label>
                     <Select onValueChange={(value) => setValue('newCargoItem.item', value)}>
                       <SelectTrigger className="h-9 w-full">
                         <SelectValue placeholder="Select" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="BOXES">BOXES</SelectItem>
                         <SelectItem value="PALLETS">PALLETS</SelectItem>
                         <SelectItem value="CONTAINERS">CONTAINERS</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700 mb-2 block">Package Type</Label>
                     <Select onValueChange={(value) => setValue('newCargoItem.packageType', value)}>
                       <SelectTrigger className="h-9 w-full">
                         <SelectValue placeholder="Select Package" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="BOXES">BOXES</SelectItem>
                         <SelectItem value="PALLETS">PALLETS</SelectItem>
                         <SelectItem value="CONTAINERS">CONTAINERS</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700 mb-2 block">Goods Description</Label>
                     <Input 
                       placeholder="Enter goods description" 
                       className="h-9 w-full"
                       {...register('newCargoItem.goodsDescription')}
                     />
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</Label>
                     <Input 
                       type="number" 
                       placeholder="1" 
                       className="h-9 w-full"
                       {...register('newCargoItem.quantity', { valueAsNumber: true })}
                     />
                   </div>
                 </div>
                 
                 {/* Row 2: Weight, Dimensions, Actual Volume, Cargo Type */}
                 <div className="grid grid-cols-4 gap-4">
                   <div>
                     <Label className="text-sm font-medium text-gray-700 mb-2 block">Weight (Lbs)</Label>
                     <Input 
                       type="number" 
                       placeholder="800" 
                       className="h-9 w-full"
                       {...register('newCargoItem.weight', { valueAsNumber: true })}
                     />
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700 mb-2 block">Dimensions (cm) per unit</Label>
                     <div className="flex gap-1">
                       <Input 
                         placeholder="L" 
                         className="flex-1 h-9"
                         {...register('newCargoItem.length', { valueAsNumber: true })}
                       />
                       <Input 
                         placeholder="W" 
                         className="flex-1 h-9"
                         {...register('newCargoItem.width', { valueAsNumber: true })}
                       />
                       <Input 
                         placeholder="H" 
                         className="flex-1 h-9"
                         {...register('newCargoItem.height', { valueAsNumber: true })}
                       />
                     </div>
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700 mb-2 block">Actual Volume (cbm)</Label>
                     <Input 
                       type="number" 
                       placeholder="13000" 
                       className="h-9 w-full"
                       {...register('newCargoItem.actualVolume', { valueAsNumber: true })}
                     />
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700 mb-2 block">Cargo Type</Label>
                     <Select onValueChange={(value) => setValue('newCargoItem.cargoType', value)}>
                       <SelectTrigger className="h-9 w-full">
                         <SelectValue placeholder="Select Cargo Type" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="General">General</SelectItem>
                         <SelectItem value="Fragile">Fragile</SelectItem>
                         <SelectItem value="Hazardous">Hazardous</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                 </div>
                 
                 {/* Add Button */}
                 <div className="flex justify-end">
                   <Button onClick={handleCargoAdd} className="bg-blue-600 hover:bg-blue-700 h-9 px-4">
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

            {/* Additional Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-blue-600">Additional Details</h2>
              <div className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700 mb-1 block">Payment Method</Label>
                  <Input
                    id="paymentMethod"
                    value={formData.paymentMethod || ''}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="namedPlace" className="text-sm font-medium text-gray-700 mb-1 block">Named Place</Label>
                  <Input
                    id="namedPlace"
                    value={formData.namedPlace || ''}
                    onChange={(e) => handleInputChange('namedPlace', e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentGroup" className="text-sm font-medium text-gray-700 mb-1 block">Equipment Group</Label>
                  <Input
                    id="equipmentGroup"
                    value={formData.equipmentGroup || ''}
                    onChange={(e) => handleInputChange('equipmentGroup', e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="otherLocation" className="text-sm font-medium text-gray-700 mb-1 block">Other Location</Label>
                  <Input
                    id="otherLocation"
                    value={formData.otherLocation || ''}
                    onChange={(e) => handleInputChange('otherLocation', e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="trailerNumber" className="text-sm font-medium text-gray-700 mb-1 block">Trailer Number</Label>
                  <Input
                    id="trailerNumber"
                    value={formData.trailerNumber || ''}
                    onChange={(e) => handleInputChange('trailerNumber', e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="nmfcClass" className="text-sm font-medium text-gray-700 mb-1 block">NMFC Class</Label>
                  <Input
                    id="nmfcClass"
                    value={formData.nmfcClass || ''}
                    onChange={(e) => handleInputChange('nmfcClass', e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="hazmat" className="text-sm font-medium text-gray-700 mb-1 block">Hazmat</Label>
                  <Input
                    id="hazmat"
                    value={formData.hazmat || ''}
                    onChange={(e) => handleInputChange('hazmat', e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="commodityCode" className="text-sm font-medium text-gray-700 mb-1 block">Commodity Code</Label>
                  <Input
                    id="commodityCode"
                    value={formData.commodityCode || ''}
                    onChange={(e) => handleInputChange('commodityCode', e.target.value)}
                    className="h-9"
                  />
                </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outline">
                Reset
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
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

const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading bookings...</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

const NoResultsMessage = memo(() => (
  <div className="text-center py-12">
    <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
  </div>
));

NoResultsMessage.displayName = 'NoResultsMessage';

export default function EBookingPage() {
  const [viewMode, setViewMode] = useState(VIEW_MODES.TABLE);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { bookings, setBookings, pagination, loading } = useBookings();
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredBookings } = useBookingFilters(bookings);

  // Memoized callbacks for event handlers
  const handleViewDetails = useCallback((booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  }, []);

  const handleGenerateLabel = useCallback((booking) => {
    console.log('Generate label for booking:', booking.id);
    // Add label generation functionality
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setSelectedBooking(null);
    setIsEditModalOpen(false);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  // Memoized status options
  const statusOptions = useMemo(() => [
    { value: 'all', label: 'All Status' },
    { value: 'ACCEPTED BY DRIVER', label: 'Accepted by Driver' },
    { value: 'IN TRANSIT', label: 'In Transit' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'COMPLETED', label: 'Completed' }
  ], []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">E-Booking List</h1>
          <p className="text-gray-600 mt-1">Manage and track all your shipments</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === VIEW_MODES.TABLE ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewModeChange(VIEW_MODES.TABLE)}
              className="text-xs"
            >
              Table View
            </Button>
            <Button
              variant={viewMode === VIEW_MODES.CARD ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewModeChange(VIEW_MODES.CARD)}
              className="text-xs"
            >
              Card View
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Order ID, DQ, Source, or Destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Pagination Header */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Showing</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGINATION_OPTIONS.map(option => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">entries</span>
          <span className="text-sm text-gray-600 ml-4">
            ({filteredBookings.length} of {bookings.length} bookings)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600">Page {pagination.currentPage} of {pagination.totalPages}</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === VIEW_MODES.TABLE ? (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>ORDER ID</TableHead>
                <TableHead>DQ</TableHead>
                <TableHead>SOURCE CITY</TableHead>
                <TableHead>DESTINATION CITY</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PICKUP DATE</TableHead>
                <TableHead>DELIVERY DATE</TableHead>
                <TableHead>WEIGHT</TableHead>
                <TableHead>VOLUME</TableHead>
                <TableHead>BOOKING TYPE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(booking)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleGenerateLabel(booking)}>
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Label
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="font-medium text-blue-600">{booking.id}</TableCell>
                  <TableCell>{booking.dq}</TableCell>
                  <TableCell>{booking.sourceCity}</TableCell>
                  <TableCell>{booking.destinationCity}</TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {formatDate(booking.pickupDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {formatDate(booking.deliveryDate)}
                    </div>
                  </TableCell>
                  <TableCell>{booking.weight}</TableCell>
                  <TableCell>{booking.volume}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4 text-gray-500" />
                      {booking.bookingType}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard 
              key={booking.id} 
              booking={booking}
              onView={handleViewDetails}
              onEdit={handleEdit}
              onGenerateLabel={handleGenerateLabel}
            />
          ))}
        </div>
      )}

      {/* No results message */}
      {filteredBookings.length === 0 && <NoResultsMessage />}

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onGenerateLabel={handleGenerateLabel}
      />

      {/* Edit Booking Modal */}
      <EditBookingModal
        booking={selectedBooking}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      />
    </div>
  );
}
