// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    orders: [],
    dashboard: {
        grossSales: 0,
        itemsSold: 0,
        ordersReceived: 0,
    },
    loading: false,
    error: null,
};

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axios.get('https://cm-backend-hikc.onrender.com/user/orders'); // Replace with your API endpoint
    return response.data.data; // Accessing the 'data' field from the response
});

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk('orders/fetchDashboardData', async () => {
    const response = await axios.get('https://cm-backend-hikc.onrender.com/user/vendor-dashboard'); // Replace with your API endpoint
    return response.data.data; // Accessing the 'data' field from the response
});

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetch orders
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload; // Set orders to the fetched data
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Set error message
            })
            // Handle fetch dashboard data
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard.grossSales = action.payload.grossSales;
                state.dashboard.itemsSold = action.payload.itemsSold;
                state.dashboard.ordersReceived = action.payload.ordersReceived;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Set error message
            });
    },
});

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectDashboard = (state) => state.orders.dashboard;
export const selectLoading = (state) => state.orders.loading;
export const selectError = (state) => state.orders.error;

// Export the reducer
export default orderSlice.reducer;
