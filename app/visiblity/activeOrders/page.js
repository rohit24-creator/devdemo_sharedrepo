"use client"
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import OrderListWithActions from "@/components/ui/reusableComponent/activePendingDoneOrders";

// Constants to avoid hardcoding
const FILTER_FIELDS = [
  { name: "fromDate", label: "From Date", type: "date" },
  { name: "toDate", label: "To Date", type: "date" },
  { name: "bookingId", label: "Booking ID" },
  { name: "referenceNo", label: "Reference No." },
];

const ACTIONS_CONFIG = {
  view: true,
  status: true,
  liveTrack: true,
  manageDocs: true,
  download: true,
  lrReport: true,
  checkbox: false,
};

// Custom hook for orders data management - following milestone pattern
const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/activeOrders.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, setOrders, loading, error };
};

// Custom hook for filtering logic
const useOrderFilters = (orders) => {
  const [searchFilters, setSearchFilters] = useState({});
  
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    let filtered = [...orders];
    
    // Filter by Booking ID
    if (searchFilters.bookingId) {
      filtered = filtered.filter(order => 
        order.bookingId.toLowerCase().includes(searchFilters.bookingId.toLowerCase())
      );
    }
    
    // Filter by Reference No (Shipment ID)
    if (searchFilters.referenceNo) {
      filtered = filtered.filter(order => 
        order.shipmentId.toLowerCase().includes(searchFilters.referenceNo.toLowerCase())
      );
    }
    
    // Filter by From Date
    if (searchFilters.fromDate) {
      filtered = filtered.filter(order => 
        new Date(order.fromDate) >= new Date(searchFilters.fromDate)
      );
    }
    
    // Filter by To Date
    if (searchFilters.toDate) {
      filtered = filtered.filter(order => 
        new Date(order.toDate) <= new Date(searchFilters.toDate)
      );
    }
    
    return filtered;
  }, [orders, searchFilters]);

  const handleSearch = useCallback((filters) => {
    console.log("Search filters:", filters);
    setSearchFilters(filters);
  }, []);

  return {
    searchFilters,
    setSearchFilters,
    filteredOrders,
    handleSearch
  };
};

// Memoized loading component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading orders...</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Memoized error component
const ErrorMessage = memo(({ error, onRetry }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="text-red-600 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Orders</h3>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
));

ErrorMessage.displayName = 'ErrorMessage';

// Memoized main component
const ActiveOrdersContent = memo(({ orders, filteredOrders, handleSearch, handleDownload, handleDownloadLR }) => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Active Orders</h1>
      <OrderListWithActions
        orders={filteredOrders}
      filterFields={FILTER_FIELDS}
      actionsConfig={ACTIONS_CONFIG}
        onSearch={handleSearch}
        onDownload={handleDownload}
        onDownloadLR={handleDownloadLR}
      />
    </div>
));

ActiveOrdersContent.displayName = 'ActiveOrdersContent';

export default function ActiveOrdersPage() {
  const { orders, setOrders, loading, error } = useOrders();
  const { filteredOrders, handleSearch } = useOrderFilters(orders);
  
  // Memoized event handlers
  const handleDownload = useCallback((order) => {
    console.log("Download ePOD for order:", order.id);
    // In real app, this would trigger file download
    alert(`Downloading ePOD for ${order.bookingId}`);
  }, []);
  
  const handleDownloadLR = useCallback((order) => {
    console.log("Download LR Report for order:", order.id);
    // In real app, this would trigger file download
    alert(`Downloading LR Report for ${order.bookingId}`);
  }, []);

  const handleRetry = useCallback(() => {
    // Trigger a re-fetch by updating the orders state
    setOrders([]);
  }, [setOrders]);

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return <ErrorMessage error={error} onRetry={handleRetry} />;
  }

  // Main content
  return (
    <ActiveOrdersContent
      orders={orders}
      filteredOrders={filteredOrders}
      handleSearch={handleSearch}
      handleDownload={handleDownload}
      handleDownloadLR={handleDownloadLR}
    />
  );
} 