import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunks
export const fetchBusinesses = createAsyncThunk(
  'business/fetchBusinesses',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await api.get('/businesses', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBusinessById = createAsyncThunk(
  'business/fetchBusinessById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/businesses/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const businessSlice = createSlice({
  name: 'business',
  initialState: {
    businesses: [],
    currentBusiness: null,
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1
  },
  reducers: {
    clearCurrentBusiness: (state) => {
      state.currentBusiness = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinesses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.businesses;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBusinessById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBusiness = action.payload.business;
      })
      .addCase(fetchBusinessById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentBusiness, clearError } = businessSlice.actions;
export default businessSlice.reducer;