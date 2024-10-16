import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for coupon and product management
const initialState = {
  loading: false,
  coupons: [],
  products: [],
  error: null,
};

// Async thunk to handle the creation of a coupon
export const createCoupon = createAsyncThunk(
    "coupons/createCoupon",
    async (couponData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "https://cm-backend-yk2y.onrender.com/user/coupon", // Ensure this URL is correct
          couponData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("Coupon created successfully!"); // Log success
        return response.data;
      } catch (error) {
        console.log("Failed to create Coupon", error?.response?.data || error.message); // Log full error
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  

// Async thunk to handle fetching products (added functionality)
export const fetchProducts = createAsyncThunk(
  "coupons/fetchProducts",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://cm-backend-yk2y.onrender.com/user/search-products`,
        { params: { title: searchTerm } }
      );
      return response.data.data;
    } catch (error) {
      console.log(error?.response?.data?.error || "Failed to fetch Products");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Coupon slice to manage the state of coupons and products
const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling createCoupon states
      .addCase(createCoupon.pending, (state) => {
        state.loading = true; // Set loading to true while request is pending
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when request is fulfilled
        state.coupons.push(action.payload); // Add created coupon to the state
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false; // Set loading to false when request is rejected
        state.error = action.payload?.error || action.error.message; // Set error message
      })

      // Handling fetchProducts states
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Set loading to true while request is pending
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when request is fulfilled
        state.products = action.payload; // Update products list in the state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Set loading to false when request is rejected
        state.error = action.payload?.error || action.error.message; // Set error message
      });
  },
});

export default couponSlice.reducer;
