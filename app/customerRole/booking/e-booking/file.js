"use client"
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
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
  Fuel
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

// Import modal components from separate file
import {
  BookingDetailsModal,
  EditBookingModal
} from "./e-booking-modals";

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
// Export StatusBadge for use in modals file
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
    <CardContent className="p-4">
      {/* Main Content Row */}
      <div className="flex">
         {/* Left Section: Order Info and Addresses */}
         <div className="flex-1">
           <div className="flex">
             {/* Order ID and Reference */}
             <div className="w-3/12">
               <div className="flex items-start">
                 <div className="p-2 bg-blue-100 rounded-lg mr-3">
                   <Truck className="w-5 h-5 text-blue-600" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg text-blue-600 mb-1">{booking.id}</h3>
                   <p className="text-sm text-gray-600 mb-1">
                     Order Reference 
                     <span className="text-gray-800 ml-1">DQ: {booking.dq}</span>
                     <Info className="w-3 h-3 text-blue-600 ml-1 inline" />
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
               <ArrowRight className="w-5 h-5 text-blue-600" />
             </div>
             
             {/* Delivery Information */}
             <div className="w-3/12 pl-1">
               <h4 className="font-semibold text-sm text-gray-800 mb-1">{booking.destination.name}</h4>
               <p className="text-xs text-gray-600 mb-1">{booking.destination.address}</p>
               <p className="text-xs text-gray-500">By {booking.destination.deadline}</p>
             </div>
             
             {/* Status Icon - Added to match PHP reference */}
             <div className="w-2/12 flex items-center justify-center">
               <div className="p-2 bg-blue-100 rounded-lg">
                 <CheckCircle className="w-5 h-5 text-blue-600" />
               </div>
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
                 <div className="text-blue-600 font-bold text-sm">{booking.weight}</div>
               </div>
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Package className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Volume</span>
                 </div>
                 <div className="text-blue-600 font-bold text-sm">{booking.volume}</div>
               </div>
             </div>
             
             {/* Column 2 - ETA & Distance */}
             <div className="space-y-2">
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Clock className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">ETA</span>
                 </div>
                 <div className="text-blue-600 font-bold text-xs">{booking.eta}</div>
               </div>
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Navigation className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Distance</span>
                 </div>
                 <div className="text-blue-600 font-bold text-sm">{booking.distance}</div>
               </div>
             </div>
             
             {/* Column 3 - Vehicle Type & Vehicle ID */}
             <div className="space-y-2">
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Truck className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Vehicle Type</span>
                 </div>
                 <div className="text-blue-600 font-bold text-sm">{booking.vehicleType}</div>
               </div>
               <div className="metric-item">
                 <div className="flex items-center mb-1">
                   <Truck className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-xs text-gray-500">Vehicle ID</span>
                 </div>
                 <div className="text-blue-600 font-bold text-sm">{booking.vehicleId}</div>
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
              onDelete={handleDelete}
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
