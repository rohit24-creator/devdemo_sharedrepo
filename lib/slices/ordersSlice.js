import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const ORDER_TYPES = {
  ACTIVE: 'active',
  PENDING: 'pending',
  DONE: 'done'
};


const initialState = {

  orders: {
    [ORDER_TYPES.ACTIVE]: [],
    [ORDER_TYPES.PENDING]: [],
    [ORDER_TYPES.DONE]: []
  },

  loading: {
    [ORDER_TYPES.ACTIVE]: false,
    [ORDER_TYPES.PENDING]: false,
    [ORDER_TYPES.DONE]: false
  },

  error: {
    [ORDER_TYPES.ACTIVE]: null,
    [ORDER_TYPES.PENDING]: null,
    [ORDER_TYPES.DONE]: null
  },

  lastFetched: {
    [ORDER_TYPES.ACTIVE]: null,
    [ORDER_TYPES.PENDING]: null,
    [ORDER_TYPES.DONE]: null
  }
};

// Async thunks for fetching orders
export const fetchActiveOrders = createAsyncThunk(
  'orders/fetchActiveOrders',
  async (_, { rejectWithValue }) => {

    if (typeof window === 'undefined') {
      return rejectWithValue({
        type: ORDER_TYPES.ACTIVE,
        error: 'Cannot fetch on server side'
      });
    }
    
    try {
      const response = await fetch('/activeOrders.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { type: ORDER_TYPES.ACTIVE, orders: data.orders };
    } catch (error) {
      return rejectWithValue({
        type: ORDER_TYPES.ACTIVE,
        error: error.message || 'Failed to fetch active orders'
      });
    }
  }
);

export const fetchPendingOrders = createAsyncThunk(
  'orders/fetchPendingOrders',
  async (_, { rejectWithValue }) => {

    if (typeof window === 'undefined') {
      return rejectWithValue({
        type: ORDER_TYPES.PENDING,
        error: 'Cannot fetch on server side'
      });
    }
    
    try {
      const response = await fetch('/pendingOrders.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { type: ORDER_TYPES.PENDING, orders: data.orders };
    } catch (error) {
      return rejectWithValue({
        type: ORDER_TYPES.PENDING,
        error: error.message || 'Failed to fetch pending orders'
      });
    }
  }
);

export const fetchDoneOrders = createAsyncThunk(
  'orders/fetchDoneOrders',
  async (_, { rejectWithValue }) => {

    if (typeof window === 'undefined') {
      return rejectWithValue({
        type: ORDER_TYPES.DONE,
        error: 'Cannot fetch on server side'
      });
    }
    
    try {
      const response = await fetch('/doneOrders.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { type: ORDER_TYPES.DONE, orders: data.orders };
    } catch (error) {
      return rejectWithValue({
        type: ORDER_TYPES.DONE,
        error: error.message || 'Failed to fetch done orders'
      });
    }
  }
);


export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { dispatch }) => {

    const promises = [
      dispatch(fetchActiveOrders()),
      dispatch(fetchPendingOrders()),
      dispatch(fetchDoneOrders())
    ];
    
    await Promise.allSettled(promises);
    return { message: 'All orders fetch completed' };
  }
);

// Orders slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Clear error for specific order type
    clearError: (state, action) => {
      const orderType = action.payload;
      state.error[orderType] = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchActiveOrders
    builder
      .addCase(fetchActiveOrders.pending, (state) => {
        state.loading[ORDER_TYPES.ACTIVE] = true;
        state.error[ORDER_TYPES.ACTIVE] = null;
      })
      .addCase(fetchActiveOrders.fulfilled, (state, action) => {
        state.loading[ORDER_TYPES.ACTIVE] = false;
        state.orders[ORDER_TYPES.ACTIVE] = action.payload.orders;
        state.error[ORDER_TYPES.ACTIVE] = null;
        state.lastFetched[ORDER_TYPES.ACTIVE] = new Date().toISOString();
      })
      .addCase(fetchActiveOrders.rejected, (state, action) => {
        state.loading[ORDER_TYPES.ACTIVE] = false;
        state.error[ORDER_TYPES.ACTIVE] = action.payload.error;
      });

    // Handle fetchPendingOrders
    builder
      .addCase(fetchPendingOrders.pending, (state) => {
        state.loading[ORDER_TYPES.PENDING] = true;
        state.error[ORDER_TYPES.PENDING] = null;
      })
      .addCase(fetchPendingOrders.fulfilled, (state, action) => {
        state.loading[ORDER_TYPES.PENDING] = false;
        state.orders[ORDER_TYPES.PENDING] = action.payload.orders;
        state.error[ORDER_TYPES.PENDING] = null;
        state.lastFetched[ORDER_TYPES.PENDING] = new Date().toISOString();
      })
      .addCase(fetchPendingOrders.rejected, (state, action) => {
        state.loading[ORDER_TYPES.PENDING] = false;
        state.error[ORDER_TYPES.PENDING] = action.payload.error;
      });

    // Handle fetchDoneOrders
    builder
      .addCase(fetchDoneOrders.pending, (state) => {
        state.loading[ORDER_TYPES.DONE] = true;
        state.error[ORDER_TYPES.DONE] = null;
      })
      .addCase(fetchDoneOrders.fulfilled, (state, action) => {
        state.loading[ORDER_TYPES.DONE] = false;
        state.orders[ORDER_TYPES.DONE] = action.payload.orders;
        state.error[ORDER_TYPES.DONE] = null;
        state.lastFetched[ORDER_TYPES.DONE] = new Date().toISOString();
      })
      .addCase(fetchDoneOrders.rejected, (state, action) => {
        state.loading[ORDER_TYPES.DONE] = false;
        state.error[ORDER_TYPES.DONE] = action.payload.error;
      });

    
    builder
      .addCase(fetchAllOrders.pending, (state) => {

        Object.keys(state.loading).forEach(key => {
          state.loading[key] = true;
        });

        Object.keys(state.error).forEach(key => {
          state.error[key] = null;
        });
      })
      .addCase(fetchAllOrders.fulfilled, (state) => {
      });
  }
});


export const {
  clearError
} = ordersSlice.actions;


export const selectOrdersByType = (state, orderType) => state.orders.orders[orderType];
export const selectLoadingByType = (state, orderType) => state.orders.loading[orderType];
export const selectErrorByType = (state, orderType) => state.orders.error[orderType];
export const selectLastFetchedByType = (state, orderType) => state.orders.lastFetched[orderType];


export const selectAllOrders = (state) => state.orders.orders;
export const selectAllLoading = (state) => state.orders.loading;
export const selectAllErrors = (state) => state.orders.error;


export const selectHasAnyError = (state) => {
  return Object.values(state.orders.error).some(error => error !== null);
};

export const selectIsAnyLoading = (state) => {
  return Object.values(state.orders.loading).some(loading => loading === true);
};

export default ordersSlice.reducer;
