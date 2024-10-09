import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform, ToastAndroid, Alert } from "react-native";

const initialState = {
  loading: false,
  customers: [],
  error: null,
  totalPages: 1,
  currentPage: 1,
};

// Async thunk for fetching customers
export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  async ({ page, limit, searchTerm, selectedDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://cm-backend-yk2y.onrender.com/user/customers", {
        params: { page, limit, searchTerm, selectedDate },
      });
      return {
        customers: response.data.data,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch customer data";
      
      // Show a toast for Android
      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } 
      // Show an alert for iOS
      else if (Platform.OS === "ios") {
        Alert.alert("Error", errorMessage);
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const { setCurrentPage } = customerSlice.actions;
export default customerSlice.reducer;
