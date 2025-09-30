"use client"
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
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
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  Edit, 
  FileText, 
  Truck, 
  Calendar, 
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
  Info,
  Trash2,
  Fuel,
  Plus,
  Download,
  Upload,
  ArrowUpDown
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import {
  BookingDetailsModal,
  EditBookingModal
} from "./e-booking-modals";

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
  },
  'DELIVERED': {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle
  },
  'CLOSED': {
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


const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};


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
  const [searchError, setSearchError] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredBookings = useMemo(() => {
    try {
      setSearchError(''); 
      
    return bookings.filter(booking => {
      const matchesSearch = 
          booking.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          booking.dq.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          booking.sourceCity.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          booking.destinationCity.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    } catch (error) {
      setSearchError('Error occurred while filtering results');
      return bookings; 
    }
  }, [bookings, debouncedSearchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredBookings,
    searchError
  };
};

// Utility functions
const getStatusConfig = (status) => {
  return STATUS_CONFIG[status] || DEFAULT_STATUS;
};

// Dynamic status icon component
const StatusIcon = memo(({ status }) => {
  const config = getStatusConfig(status);
  const IconComponent = config.icon;
  
  return (
    <div className="p-2 bg-blue-100 rounded-lg">
      <IconComponent className="w-5 h-5 text-[#0088d2]" />
    </div>
  );
});

StatusIcon.displayName = 'StatusIcon';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};


export const StatusBadge = memo(({ status }) => {
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

const ActionButtons = memo(({ booking, onView, onEdit, onGenerateLabel, onDelete }) => (
  <div className="flex gap-2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => onView(booking.id)}
      className="flex items-center gap-1"
    >
      <Eye className="w-4 h-4" />
      View
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onEdit(booking.id)}
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
    <Button
      variant="outline"
      size="sm"
      onClick={() => onDelete(booking)}
      className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </Button>
  </div>
));

ActionButtons.displayName = 'ActionButtons';

const BookingCard = memo(({ booking, onView, onEdit, onGenerateLabel, onDelete }) => (
  <Card className="mb-3 hover:shadow-lg transition-shadow">
    <CardContent className="px-4 py-3">
      {/* Main Content Row */}
      <div className="flex">
         {/* Left Section: Order Info and Addresses */}
         <div className="flex-1">
           <div className="flex">
             {/* Order ID and Reference */}
             <div className="w-3/12">
               <div className="flex items-start">
                 <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Truck className="w-5 h-5 text-[#0088d2]" />
          </div>
          <div>
                   <h3 className="font-bold text-lg text-[#0088d2] mb-1">{booking.id}</h3>
                   <p className="text-sm text-gray-600 mb-1">
                     Order Reference 
                     <span className="text-gray-800 ml-1">DQ: {booking.dq}</span>
                     <Info className="w-3 h-3 text-[#0088d2] ml-1 inline" />
                   </p>
                   <p className="text-sm text-gray-600">PO: {booking.po}</p>
                 </div>
          </div>
        </div>
             
             {/* Pickup Information */}
             <div className="w-3/12 pr-1">
               <h4 className="font-semibold text-sm text-gray-800 mb-1">{booking.origin.name}</h4>
               <p className="text-xs text-gray-600 mb-1">{booking.origin.address}</p>
               <p className="text-xs text-gray-500">By {booking.origin.deadline}</p>
      </div>

             {/* Arrow - Properly centered with more space */}
             <div className="w-1/12 flex items-center justify-center">
               <ArrowRight className="w-5 h-5 text-[#0088d2]" />
            </div>
             
             {/* Delivery Information */}
             <div className="w-3/12 pl-1">
               <h4 className="font-semibold text-sm text-gray-800 mb-1">{booking.destination.name}</h4>
               <p className="text-xs text-gray-600 mb-1">{booking.destination.address}</p>
               <p className="text-xs text-gray-500">By {booking.destination.deadline}</p>
          </div>
             
             {/* Status Icon - Dynamic based on status */}
             <div className="w-2/12 flex items-center justify-center">
               <StatusIcon status={booking.status} />
            </div>
          </div>
        </div>

         {/* Right Section: Metrics in 3 columns */}
         <div className="w-1/3 ml-4">
           <div className="grid grid-cols-3 gap-2">
             {/* Column 1 - Weight & Volume */}
             <div className="space-y-2">
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Scale className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Weight</span>
                 </div>
                 <div className="text-[#0088d2] font-bold text-sm">{booking.weight}</div>
               </div>
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Package className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Volume</span>
          </div>
                 <div className="text-[#0088d2] font-bold text-sm">{booking.volume}</div>
            </div>
          </div>
             
             {/* Column 2 - ETA & Distance */}
             <div className="space-y-2">
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Clock className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">ETA</span>
                 </div>
                 <div className="text-[#0088d2] font-bold text-xs">{booking.eta}</div>
               </div>
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Navigation className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Distance</span>
                 </div>
                 <div className="text-[#0088d2] font-bold text-sm">{booking.distance}</div>
          </div>
        </div>

             {/* Column 3 - Vehicle Type & Vehicle ID */}
             <div className="space-y-2">
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Truck className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Vehicle Type</span>
                 </div>
                 <div className="text-[#0088d2] font-bold text-sm">{booking.vehicleType}</div>
            </div>
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Truck className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Vehicle ID</span>
          </div>
                 <div className="text-[#0088d2] font-bold text-sm">{booking.vehicleId}</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Action Buttons, Status, and CO2 */}
      <hr className="my-3" />
      <div className="flex items-center justify-between">
        {/* Action Buttons */}
        <div className="flex-1">
        <ActionButtons 
          booking={booking}
          onView={onView}
          onEdit={onEdit}
          onGenerateLabel={onGenerateLabel}
            onDelete={onDelete}
          />
        </div>
        
        {/* Status */}
        <div className="flex-1 flex justify-center">
          <StatusBadge status={booking.status} />
        </div>
        
        {/* CO2 Emissions */}
        <div className="flex-1 flex justify-end items-center">
          <Fuel className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{booking.co2}</span>
        </div>
      </div>
    </CardContent>
  </Card>
));

BookingCard.displayName = 'BookingCard';

// Loading and utility components  
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
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const viewMode = searchParams.get('view') === 'card' ? VIEW_MODES.CARD : VIEW_MODES.TABLE;
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // true = edit, false = add
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: 'asc' 
  });

  const { bookings, setBookings, pagination, loading } = useBookings();
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredBookings, searchError } = useBookingFilters(bookings);

  // Sorting logic
  const sortedBookings = useMemo(() => {
    if (!sortConfig.field) return filteredBookings;

    return [...filteredBookings].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string' && 
          (aValue.includes('-') || aValue.includes('/'))) {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }
      }

      const aStr = String(aValue || '');
      const bStr = String(bValue || '');
      const comparison = aStr.toLowerCase().localeCompare(bStr.toLowerCase());
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredBookings, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedBookings.length / displayCount) || 1;
  const paginatedBookings = sortedBookings.slice(
    (currentPage - 1) * displayCount,
    currentPage * displayCount
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Sort handler
  const handleSort = useCallback((field) => {
    setSortConfig(prevConfig => {
      if (prevConfig.field === field) {

        return {
          field,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      } else {

        return {
          field,
          direction: 'asc'
        };
      }
    });
    setCurrentPage(1); 
  }, []);

  // Memoized callbacks for event handlers
  const handleViewDetails = useCallback(async (id) => {
    try {
      const response = await fetch('/bookingList.json');
      const data = await response.json();
      const freshBooking = data.bookings.find(b => b.id === id);
      
      if (freshBooking) {
        setSelectedBooking(freshBooking);
    setIsModalOpen(true);
      } else {
        console.error('Booking not found:', id);
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  }, []);

  const handleEdit = useCallback(async (id) => {
    try {

      const response = await fetch('/bookingList.json');
      const data = await response.json();
      const freshBooking = data.bookings.find(b => b.id === id);
      
      if (freshBooking) {
        setSelectedBooking(freshBooking);
        setIsEditMode(true); 
    setIsEditModalOpen(true);
        setIsAddModalOpen(false); 
      } else {
        console.error('Booking not found:', id);
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  }, []);

  const handleAdd = useCallback(() => {
    setSelectedBooking(null); 
    setIsEditMode(false); 
    setIsAddModalOpen(true);
    setIsEditModalOpen(false); 
  }, []);

  const handleGenerateLabel = useCallback((booking) => {
    console.log('Generate label for booking:', booking.id);
    // Add label generation functionality
  }, []);

  const handleDelete = useCallback((booking) => {
    console.log('Delete booking:', booking.id);
    // Add delete functionality
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setSelectedBooking(null);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setIsEditMode(false);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', mode);
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  // Memoized status options
  const statusOptions = useMemo(() => [
    { value: 'all', label: 'All Status' },
    { value: 'ACCEPTED BY DRIVER', label: 'Accepted by Driver' },
    { value: 'IN TRANSIT', label: 'In Transit' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'COMPLETED', label: 'Completed' }
  ], []);

  // Table columns configuration
  const tableColumns = useMemo(() => [
    { field: 'id', label: 'ORDER ID' },
    { field: 'dq', label: 'DQ' },
    { field: 'sourceCity', label: 'SOURCE CITY' },
    { field: 'destinationCity', label: 'DESTINATION CITY' },
    { field: 'status', label: 'STATUS' },
    { field: 'pickupDate', label: 'PICKUP DATE' },
    { field: 'deliveryDate', label: 'DELIVERY DATE' },
    { field: 'weight', label: 'WEIGHT' },
    { field: 'volume', label: 'VOLUME' },
    { field: 'bookingType', label: 'BOOKING TYPE' }
  ], []);

  // Toolbar buttons configuration
  const toolbarButtons = useMemo(() => [
    {
      id: 'add',
      label: 'Add',
      icon: Plus,
      variant: 'outline',
      hasText: true,
      onClick: handleAdd
    },
    {
      id: 'download',
      label: 'Download',
      icon: Download,
      variant: 'outline',
      hasText: false,
      title: 'Download',
      onClick: () => console.log('Download clicked')
    },
    {
      id: 'upload',
      label: 'Upload',
      icon: Upload,
      variant: 'outline',
      hasText: false,
      title: 'Upload',
      onClick: () => console.log('Upload clicked')
    },
    {
      id: 'sort-toggle',
      label: 'Sort',
      icon: ArrowUpDown,
      variant: sortConfig.field ? 'default' : 'outline',
      hasText: false,
      title: sortConfig.field 
        ? `Sort by ${sortConfig.field} (${sortConfig.direction === 'asc' ? 'Ascending' : 'Descending'})`
        : 'Sort by Order ID',
      onClick: () => handleSort('id')
    }
  ], [sortConfig, handleSort]);

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
          <Tabs 
            value={viewMode} 
            onValueChange={handleViewModeChange}
            className="w-auto"
          >
            <TabsList className="flex bg-gray-100 rounded-lg p-1 h-auto">
              <TabsTrigger 
                value={VIEW_MODES.TABLE}
                className="text-xs font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-[#0088d2] data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:text-gray-800 transition-colors"
            >
              Table View
              </TabsTrigger>
              <TabsTrigger 
                value={VIEW_MODES.CARD}
                className="text-xs font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-[#0088d2] data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:text-gray-800 transition-colors"
            >
              Card View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                type="text"
                placeholder="Search by Order ID, DQ, Source, or Destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {searchError && (
                <p className="text-red-500 text-sm mt-1">{searchError}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {toolbarButtons.map((button) => {
              const IconComponent = button.icon;
              return (
                <Button
                  key={button.id}
                  variant={button.variant}
                  size={button.hasText ? "default" : "icon"}
                  title={button.title}
                  onClick={button.onClick}
                  className={button.hasText ? "flex items-center gap-2" : ""}
                >
                  <IconComponent className="w-4 h-4" />
                  {button.hasText && button.label}
                </Button>
              );
            })}
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
          <Select 
            value={displayCount.toString()} 
            onValueChange={(value) => {
              setDisplayCount(Number(value));
              setCurrentPage(1);
            }}
          >
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
          <span className="text-sm text-gray-600">records</span>
          <span className="text-sm text-gray-600 ml-4">
            ({paginatedBookings.length} of {sortedBookings.length} bookings)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
          <Button 
            variant="outline" 
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs value={viewMode} onValueChange={handleViewModeChange}>
        <TabsContent value={VIEW_MODES.TABLE}>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                  {tableColumns.map((column) => (
                    <TableHead 
                      key={column.field}
                      className="cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort(column.field)}
                    >
                      <div className="flex items-center gap-1">
                        {column.label}
                        {sortConfig.field === column.field && (
                          <span className="text-xs">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(booking.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(booking.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleGenerateLabel(booking)}>
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Label
                        </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(booking)}
                            className="text-red-600 focus:text-red-700 focus:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="font-medium text-[#0088d2]">{booking.id}</TableCell>
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
        </TabsContent>
        
        <TabsContent value={VIEW_MODES.CARD}>
        <div className="space-y-4">
            {paginatedBookings.map((booking) => (
            <BookingCard 
              key={booking.id} 
              booking={booking}
              onView={handleViewDetails}
              onEdit={handleEdit}
              onGenerateLabel={handleGenerateLabel}
                onDelete={handleDelete}
            />
          ))}
        </div>
        </TabsContent>
      </Tabs>

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

      {/* Edit/Add Booking Modal */}
      <EditBookingModal
        key={`${isEditMode ? 'edit' : 'add'}-${selectedBooking?.id || 'new'}`}
        booking={selectedBooking}
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={handleCloseEditModal}
        mode={isEditMode ? 'edit' : 'add'}
      />
    </div>
  );
}
