import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchActiveOrders, 
  fetchPendingOrders, 
  fetchDoneOrders,
  fetchAllOrders,
  clearError,
  updateOrder,
  addOrder,
  removeOrder,
  selectOrdersByType,
  selectLoadingByType,
  selectErrorByType,
  selectLastFetchedByType,
  ORDER_TYPES
} from '../slices/ordersSlice';
import { useCallback, useMemo, useState } from 'react';

// Custom hook for orders management
export const useOrders = (orderType) => {
  const dispatch = useDispatch();
  
  // Selectors
  const orders = useSelector(state => selectOrdersByType(state, orderType));
  const loading = useSelector(state => selectLoadingByType(state, orderType));
  const error = useSelector(state => selectErrorByType(state, orderType));
  const lastFetched = useSelector(state => selectLastFetchedByType(state, orderType));

  // Filtering state
  const [searchFilters, setSearchFilters] = useState({});
  
  // Filtered orders
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

  // Memoized actions
  const actions = useMemo(() => ({
    fetchOrders: () => {
      switch (orderType) {
        case ORDER_TYPES.ACTIVE:
          return dispatch(fetchActiveOrders());
        case ORDER_TYPES.PENDING:
          return dispatch(fetchPendingOrders());
        case ORDER_TYPES.DONE:
          return dispatch(fetchDoneOrders());
        default:
          throw new Error(`Unknown order type: ${orderType}`);
      }
    },
    clearError: () => dispatch(clearError(orderType)),
    updateOrder: (orderId, updates) => dispatch(updateOrder({ orderType, orderId, updates })),
    addOrder: (order) => dispatch(addOrder({ orderType, order })),
    removeOrder: (orderId) => dispatch(removeOrder({ orderType, orderId }))
  }), [dispatch, orderType]);

  // Search handler
  const handleSearch = useCallback((filters) => {
    console.log("Search filters:", filters);
    setSearchFilters(filters);
  }, []);

  return {
    orders: orders || [],
    filteredOrders,
    loading,
    error,
    lastFetched,
    searchFilters,
    handleSearch,
    ...actions
  };
};

// Hook for managing all orders
export const useAllOrders = () => {
  const dispatch = useDispatch();
  
  const fetchAll = useCallback(() => {
    return dispatch(fetchAllOrders());
  }, [dispatch]);

  return {
    fetchAll
  };
};

// Hook for order filtering (reusable across all order types)
export const useOrderFilters = (orders) => {
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    return [...orders]; // Base filtered orders (can be extended with search logic)
  }, [orders]);

  const applyFilters = useCallback((filters) => {
    if (!orders || orders.length === 0) return [];

    let filtered = [...orders];
    
    // Filter by Booking ID
    if (filters.bookingId) {
      filtered = filtered.filter(order => 
        order.bookingId.toLowerCase().includes(filters.bookingId.toLowerCase())
      );
    }
    
    // Filter by Reference No (Shipment ID)
    if (filters.referenceNo) {
      filtered = filtered.filter(order => 
        order.shipmentId.toLowerCase().includes(filters.referenceNo.toLowerCase())
      );
    }
    
    // Filter by From Date
    if (filters.fromDate) {
      filtered = filtered.filter(order => 
        new Date(order.fromDate) >= new Date(filters.fromDate)
      );
    }
    
    // Filter by To Date
    if (filters.toDate) {
      filtered = filtered.filter(order => 
        new Date(order.toDate) <= new Date(filters.toDate)
      );
    }
    
    return filtered;
  }, [orders]);

  return {
    filteredOrders,
    applyFilters
  };
};
