import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alerts: []
  },
  reducers: {
    setAlert: (state, action) => {
      state.alerts = [action.payload, ...state.alerts];
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.alerts = [];
    }
  }
});

export const { setAlert, removeAlert, clearAlerts } = alertSlice.actions;

// Helper function to create alerts
export const createAlert = (message, type = 'info', timeout = 5000) => (dispatch) => {
  const id = Date.now();
  dispatch(setAlert({ id, message, type }));
  
  setTimeout(() => {
    dispatch(removeAlert(id));
  }, timeout);
};

export default alertSlice.reducer;