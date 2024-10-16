import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ToastAndroid } from 'react-native'; // Import ToastAndroid from react-native

const initialState = {
  loading: false,
  categories: [],
  hsnCodes: [], // New state for storing HSN codes
  error: null,
};

// AsyncThunk for fetching categories
export const searchCategories = createAsyncThunk(
  'categories/searchCategories',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://cm-backend-yk2y.onrender.com/user/searchCategory',
        {
          params: { name: searchTerm },
        }
      );
      return response.data.data; // Assuming API returns { data: { data: [] } }
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.error || 'Failed to fetch categories',
        ToastAndroid.SHORT
      );
      return rejectWithValue(error?.response?.data);
    }
  }
);

// AsyncThunk for fetching HSN codes
export const MandatePoints = createAsyncThunk(
  'attributes/MandatePoints',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://cm-backend-yk2y.onrender.com/user/searchHsnCodes',
        {
          params: { hsnCode: searchTerm },
        }
      );
      return response.data.data; // Assuming API returns { data: { data: [] } }
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.error || 'Failed to fetch MandatePoints',
        ToastAndroid.SHORT
      );
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling searchCategories actions
    builder
      .addCase(searchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload || [];
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      });

    // Handling MandatePoints actions
    builder
      .addCase(MandatePoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(MandatePoints.fulfilled, (state, action) => {
        state.loading = false;
        state.hsnCodes = action.payload || []; // Store HSN codes
      })
      .addCase(MandatePoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      });
  },
});

export default categorySlice.reducer;
