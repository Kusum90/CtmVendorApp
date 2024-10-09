import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform, ToastAndroid, Alert } from "react-native";

// Initial state
const initialState = {
  loading: false,
  products: [],
  data: [],
  error: null,
  totalProducts: 0,
  totalPages: 1,
  currentPage: 1,
};

// Function to show toast based on platform
const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Notification', message);
  }
};

// Thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  "product/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://cm-backend-yk2y.onrender.com/user/vproductDashboard"
      );
      return response.data.data;
    } catch (error) {
      showToast(error?.response?.data?.error || "Failed to fetch dashboard data");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Thunk to create a new product
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/user/create-product",
        productData
      );
      showToast("Product created successfully!");
      return response.data.data;
    } catch (error) {
      showToast(error?.response?.data?.error || "Failed to create product");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Thunk to fetch all products
export const getAllProduct = createAsyncThunk(
  "getAll/Product",
  async (
    { page, limit, searchTerm, selectedDate, stockFilter, category },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/user/getallproduct`,
        {
          params: {
            page,
            limit,
            searchTerm,
            selectedDate,
            stockFilter,
            category,
          },
        }
      );
      return response.data;
    } catch (error) {
      showToast(error?.response?.data?.error || "Failed to fetch products");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Redux slice for products
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      })

      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalProducts = action.payload.totalProducts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      });
  },
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
