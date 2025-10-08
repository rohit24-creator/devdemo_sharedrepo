import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchActiveOrders, 
  fetchPendingOrders, 
  fetchDoneOrders,
  fetchAllOrders,
  clearError,
  selectOrdersByType,
  selectLoadingByType,
  selectErrorByType,
  selectLastFetchedByType,
  ORDER_TYPES
} from '../slices/ordersSlice';
import { useCallback, useMemo, useState } from 'react';


const applyOrderFilters = (orders, filters) => {
  if (!orders || orders.length === 0) return [];
  
  let filtered = [...orders];
  
  if (filters.bookingId) {
    filtered = filtered.filter(order => 
      order.bookingId.toLowerCase().includes(filters.bookingId.toLowerCase())
    );
  }
  
  if (filters.referenceNo) {
    filtered = filtered.filter(order => 
      order.shipmentId.toLowerCase().includes(filters.referenceNo.toLowerCase())
    );
  }
  
  if (filters.fromDate) {
    filtered = filtered.filter(order => 
      new Date(order.fromDate) >= new Date(filters.fromDate)
    );
  }
  
  if (filters.toDate) {
    filtered = filtered.filter(order => 
      new Date(order.toDate) <= new Date(filters.toDate)
    );
  }
  
  return filtered;
};


export const useOrders = (orderType) => {
  const dispatch = useDispatch();
  
  // Selectors
  const orders = useSelector(state => selectOrdersByType(state, orderType));
  const loading = useSelector(state => selectLoadingByType(state, orderType));
  const error = useSelector(state => selectErrorByType(state, orderType));
  const lastFetched = useSelector(state => selectLastFetchedByType(state, orderType));


  const [searchFilters, setSearchFilters] = useState({});
  
  // Filtered orders 
  const filteredOrders = useMemo(() => {
    return applyOrderFilters(orders, searchFilters);
  }, [orders, searchFilters]);


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
    clearError: () => dispatch(clearError(orderType))
  }), [dispatch, orderType]);


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


export const useAllOrders = () => {
  const dispatch = useDispatch();
  
  const fetchAll = useCallback(() => {
    return dispatch(fetchAllOrders());
  }, [dispatch]);

  return {
    fetchAll
  };
};
