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
  Filter
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
        const response = await fetch('/bookings/bookingList.json');
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

const MetricsGrid = memo(({ booking }) => {
  const metrics = [
    { icon: Scale, label: 'Weight', value: booking.weight },
    { icon: Package, label: 'Volume', value: booking.volume },
    { icon: Clock, label: 'ETA', value: booking.eta },
    { icon: Navigation, label: 'Distance', value: booking.distance }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {metrics.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-800">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

MetricsGrid.displayName = 'MetricsGrid';

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
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-blue-600">{booking.id}</h3>
            <p className="text-sm text-gray-600">{booking.orderReference}</p>
          </div>
        </div>
        
        {/* Origin and Destination Flow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-left">
            <h4 className="font-semibold text-gray-800 text-sm">{booking.origin.name}</h4>
            <p className="text-xs text-gray-600">{booking.origin.address}</p>
            <p className="text-xs text-gray-500">By {booking.origin.deadline}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-blue-600" />
            </div>
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-gray-800 text-sm">{booking.destination.name}</h4>
            <p className="text-xs text-gray-600">{booking.destination.address}</p>
            <p className="text-xs text-gray-500">By {booking.destination.deadline}</p>
          </div>
          <div></div>
        </div>
        
        <StatusBadge status={booking.status} />
      </div>

      {/* Metrics Section */}
      <div className="mb-3">
        <MetricsGrid booking={booking} />
      </div>

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

const DetailedBookingCard = memo(({ booking, onView, onEdit, onGenerateLabel }) => (
  <Card className="mb-6">
    <CardHeader className="bg-blue-50 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-blue-600">{booking.id}</CardTitle>
            <p className="text-sm text-gray-600">{booking.orderReference}</p>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Origin and Destination */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-2">{booking.origin.name}</h4>
              <p className="text-sm text-gray-600 mb-1">{booking.origin.address}</p>
              <p className="text-xs text-gray-500">By {booking.origin.deadline}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-2">{booking.destination.name}</h4>
              <p className="text-sm text-gray-600 mb-1">{booking.destination.address}</p>
              <p className="text-xs text-gray-500">By {booking.destination.deadline}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Scale className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Weight</p>
              <p className="font-semibold text-blue-600">{booking.weight}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Volume</p>
              <p className="font-semibold text-blue-600">{booking.volume}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">ETA</p>
              <p className="font-semibold text-blue-600">{booking.eta}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Navigation className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Distance</p>
              <p className="font-semibold text-blue-600">{booking.distance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Vehicle Type</p>
              <p className="text-sm text-gray-600">{booking.vehicleType}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Vehicle ID</p>
              <p className="text-sm text-gray-600">{booking.vehicleId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-6 border-t flex justify-between items-center">
        <Badge className="bg-green-100 text-green-800 border-green-200">
          {booking.driverStatus}
        </Badge>
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

DetailedBookingCard.displayName = 'DetailedBookingCard';

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

  const { bookings, setBookings, pagination, loading } = useBookings();
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredBookings } = useBookingFilters(bookings);

  // Memoized callbacks for event handlers
  const handleViewDetails = useCallback((booking) => {
    setSelectedBooking(booking);
  }, []);

  const handleEdit = useCallback((booking) => {
    console.log('Edit booking:', booking.id);
    // Add edit functionality
  }, []);

  const handleGenerateLabel = useCallback((booking) => {
    console.log('Generate label for booking:', booking.id);
    // Add label generation functionality
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedBooking(null);
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

      {/* Detailed View Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Booking Details</h2>
                <Button
                  variant="ghost"
                  onClick={handleCloseModal}
                >
                  ×
                </Button>
              </div>
              <DetailedBookingCard 
                booking={selectedBooking}
                onView={handleViewDetails}
                onEdit={handleEdit}
                onGenerateLabel={handleGenerateLabel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
