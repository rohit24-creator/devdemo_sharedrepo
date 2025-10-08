"use client"
import React, { useEffect, useCallback } from "react";
import OrderListWithActions from "@/components/ui/reusableComponent/activePendingDoneOrders";
import { useOrders } from "@/lib/hooks/useOrders";
import { ORDER_TYPES } from "@/lib/slices/ordersSlice";
import LoadingSpinner, { ErrorMessage } from "@/components/ui/LoadingSpinner";

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

export default function ActiveOrdersPage() {
  // Use Redux hooks for orders management
  const { 
    orders, 
    filteredOrders, 
    loading, 
    error, 
    fetchOrders, 
    clearError, 
    handleSearch 
  } = useOrders(ORDER_TYPES.ACTIVE);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Retry handler
  const handleRetry = useCallback(() => {
    clearError();
    fetchOrders();
  }, [clearError, fetchOrders]);

  // Download handler
  const handleDownload = useCallback((selectedOrders) => {
    console.log("Downloading orders:", selectedOrders);
    // Implement download logic here
  }, []);

  // Download LR handler
  const handleDownloadLR = useCallback((selectedOrders) => {
    console.log("Downloading LR for orders:", selectedOrders);
    // Implement LR download logic here
  }, []);

  // Download EPOD handler
  const handleDownloadEPOD = useCallback((selectedOrders) => {
    console.log("Downloading EPOD for orders:", selectedOrders);
    // Implement EPOD download logic here
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#006397] mb-4">Active Orders</h1>
        <LoadingSpinner />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#006397] mb-4">Active Orders</h1>
        <ErrorMessage error={error} onRetry={handleRetry} />
      </div>
    );
  }

  // Main content
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Active Orders</h1>
      <OrderListWithActions
        orders={orders}
        filteredOrders={filteredOrders}
        filterFields={FILTER_FIELDS}
        actionsConfig={ACTIONS_CONFIG}
        onSearch={handleSearch}
        onDownload={handleDownload}
        onDownloadLR={handleDownloadLR}
        onDownloadEPOD={handleDownloadEPOD}
        orderType="active"
      />
    </div>
  );
}