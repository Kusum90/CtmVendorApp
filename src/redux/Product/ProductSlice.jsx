import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform, ToastAndroid, Alert } from "react-native";

// Initial state without default values
const initialState = {
  loading: false,
  products: [],
  productDetails: {}, // Dynamically filled product details
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
      console.log("Fetching dashboard data...");
      const response = await axios.get("https://cm-backend-yk2y.onrender.com/user/vproductDashboard");
      console.log("Dashboard data fetched:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
      console.log("Creating product with data:", productData);
      const response = await axios.post(
        "http://192.168.1.10:4001/user/create-product",
        productData
      );

      console.log("Product created successfully:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error creating product:", error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Thunk to fetch a single product by ID
// Thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      console.log(`Fetching details for product with ID: ${productId}`);
      const response = await axios.get(`http://192.168.1.10:4001/user/product/${productId}`);
      console.log("Product details fetched successfully:", response.data.data.product); // Log to confirm the data structure
      return response.data.data.product; // Return only the `product` object
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        showToast(error.response.data.error || "Failed to fetch product details");
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
        showToast("No response from server. Please check your network.");
      } else {
        console.error("Error setting up request:", error.message);
        showToast(error.message || "Network error occurred. Please try again.");
      }
      return rejectWithValue(error.message);
    }
  }
);



// Thunk to get all products
export const getAllProduct = createAsyncThunk(
  'products/getAllProduct',
  async ({ page, limit, searchTerm, selectedDate, stockFilter, category }, { rejectWithValue }) => {
    try {
      console.log("Fetching all products...");
      const response = await axios.get(
        `https://cm-backend-yk2y.onrender.com/user/getallproduct`,
        {
          params: { page, limit, searchTerm, selectedDate, stockFilter, category },
        }
      );
      console.log("Fetched products:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast(error?.response?.data?.error || "Failed to fetch products");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    try {
      console.log("Deleting product with ID:", productId);
      const response = await axios.delete(`https://cm-backend-yk2y.onrender.com/user/delete-product/${productId}`);
      console.log("Product deleted successfully:", productId);
      showToast("Product deleted successfully!");
      return productId;
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast(error?.response?.data?.error || "Failed to delete product");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Thunk to update a product
export const updateProduct = createAsyncThunk(
  "product/update",
  async (productData, { rejectWithValue }) => {
    try {
      console.log("Updating product with data:", productData);
      const response = await axios.put(
        `http://192.168.1.10:4001/user/update-product/${productData._id}`,
        productData
      );
      console.log("Product updated successfully:", response.data.data);
      showToast("Product updated successfully!");
      return response.data.data;
    } catch (error) {
      console.error("Error updating product:", error);
      showToast(error?.response?.data?.error || "Failed to update product");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Redux slice for products and form data
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Action to dynamically set product details from one of the steps
    setProductDetails: (state, action) => {
      console.log("Setting product details:", action.payload);
      state.productDetails = { ...state.productDetails, ...action.payload };
    },
    // Action to set the current page
    setCurrentPage: (state, action) => {
      console.log("Setting current page:", action.payload);
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        console.log("Fetching dashboard data...");
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log("Dashboard data loaded successfully");
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
        console.error("Failed to load dashboard data:", state.error);
      })
      .addCase(createProduct.pending, (state) => {
        console.log("Creating product...");
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.products)) {
          state.products = []; // Initialize if undefined
        }
        state.products.push(action.payload);
        console.log("Product created and added to state");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
        console.error("Failed to create product:", state.error);
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalProducts = action.payload.totalProducts;
        state.totalPages = action.payload.totalPages;
        console.log("All products fetched successfully");
      })

       .addCase(deleteProduct.fulfilled, (state, action) => {
        // Remove the product from the Redux state
        state.data = state.data.filter((product) => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        if (!Array.isArray(state.products)) {
          state.products = []; // Initialize products if undefined
        }
      
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          // Update the existing product in the list
          state.products[index] = action.payload;
        }
      
        // Also update the `data` array if it exists
        if (Array.isArray(state.data)) {
          const dataIndex = state.data.findIndex((product) => product._id === action.payload._id);
          if (dataIndex !== -1) {
            state.data[dataIndex] = action.payload;
          }
        }
      
        state.loading = false;
        console.log("Product updated successfully in Redux state:", action.payload);
      })
      
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
        console.error("Failed to update product:", state.error);
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload; // Directly set product details in state
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      });
  },
});

export const {
  setProductDetails,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
