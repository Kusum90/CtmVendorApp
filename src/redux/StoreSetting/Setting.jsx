import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
  vendorData: null, // Store fetched vendor data
};

// Helper function to extract user ID from token
const getUserIdFromToken = (token) => {
  try {
    const payload = token.split('.')[1]; // Extract the payload from the token
    const decoded = JSON.parse(atob(payload)); // Decode the base64 payload
    console.log('Decoded token payload:', decoded);
    return decoded?.id; // Assuming user ID is stored in 'id'
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// AsyncThunk for fetching vendor data
export const fetchVendor = createAsyncThunk(
  'vendor/fetchVendor',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching vendor profile...');
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('Token is missing.');
        throw new Error('Token missing.');
      }

      console.log('Token retrieved successfully for fetching:', token);

      // Extract vendor ID from the token
      const vendorId = getUserIdFromToken(token);
      if (!vendorId) throw new Error('No vendor ID found in token');

      console.log('Vendor ID from token:', vendorId);

      // Fetch specific vendor data using the vendor ID
      const response = await axios.get(
        `https://cm-backend-yk2y.onrender.com/user/vendors/${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Vendor profile fetched successfully:', response.data);
      return response.data; // Assuming the API returns vendor data in response.data
    } catch (error) {
      console.error('Error during fetching vendor profile:', error);
      console.error('Error response:', error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch vendor profile.'
      );
    }
  }
);

// AsyncThunk for updating vendor data
export const updateVendor = createAsyncThunk(
  'vendor/updateVendor',
  async ({ vendorDetails }, { rejectWithValue }) => {
    try {
      console.log('Attempting to update vendor profile...');
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('Token is missing.');
        throw new Error('Token missing.');
      }

      console.log('Token retrieved successfully for updating:', token);

      // Extract vendor ID from the token
      const vendorId = getUserIdFromToken(token);
      if (!vendorId) throw new Error('No vendor ID found in token');

      console.log('Vendor ID from token:', vendorId);

      const response = await axios.patch(
        `https://cm-backend-yk2y.onrender.com/user/update-vendor/${vendorId}`,
        vendorDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Vendor profile updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during updating vendor profile:', error);
      console.error('Error response:', error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || 'Failed to update vendor profile.'
      );
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    clearVendorMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Fetch Vendor
      .addCase(fetchVendor.pending, (state) => {
        console.log('Fetching vendor profile started...');
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(fetchVendor.fulfilled, (state, action) => {
        console.log('Vendor profile fetched successfully:', action.payload);
        state.loading = false;
        state.vendorData = action.payload.data; // Fetched vendor data
      })
      .addCase(fetchVendor.rejected, (state, action) => {
        console.error('Error fetching vendor profile:', action.payload);
        state.loading = false;
        state.errorMessage = action.payload; // Error message
      })

      // Handle Update Vendor
      .addCase(updateVendor.pending, (state) => {
        console.log('Updating vendor profile started...');
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        console.log('Vendor profile updated successfully:', action.payload);
        state.loading = false;
        state.vendorData = action.payload.data; // Updated vendor data
        state.successMessage = action.payload.message; // Success message
      })
      .addCase(updateVendor.rejected, (state, action) => {
        console.error('Error updating vendor profile:', action.payload);
        state.loading = false;
        state.errorMessage = action.payload; // Error message
      });
  },
});

export const { clearVendorMessages } = vendorSlice.actions;
export default vendorSlice.reducer;
