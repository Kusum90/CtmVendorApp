import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching dashboard data
export const fetchDashboardData = createAsyncThunk(
  'home/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://cm-backend-yk2y.onrender.com/user/vendor-dashboard`);
      return response.data.data; // Access 'data' field here
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching dashboard data');
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    dashboard: {
      grossSales: 0,
      itemsSold: 0,
      ordersReceived: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload; // Set dashboard with payload directly
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch dashboard data';
      });
  },
});

export const selectDashboard = (state) => state.home.dashboard;
export const selectLoading = (state) => state.home.loading;
export const selectError = (state) => state.home.error;

export default homeSlice.reducer;
