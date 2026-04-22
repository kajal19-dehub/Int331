import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import businessReducer from './slices/businessSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    business: businessReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;