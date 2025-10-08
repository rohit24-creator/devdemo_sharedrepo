import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';


const makeStore = () => {
  return configureStore({
    reducer: {
      orders: ordersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
};

// Create store instance
export const store = makeStore();
