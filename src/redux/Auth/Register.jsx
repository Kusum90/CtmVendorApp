import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform, ToastAndroid, Alert } from "react-native";

const initialState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
  email: null, // To store the email of the registered vendor
  isEmailVerified: false, // To track OTP verification
};

// Async thunk for vendor registration
export const registerVendor = createAsyncThunk(
  "vendor/register",
  async (vendorData, { rejectWithValue }) => {
    try {
      console.log("Axios request data:", vendorData);
      const response = await axios.post(
        "http://192.168.1.8:4001/user/vendors",
        vendorData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Return success message and email
      console.log("Axios response data:", response.data);
      return {
        message: response.data.message,
        email: response.data.data.email,
      };
    } catch (error) {
      console.error("Axios error response:", error.response);
      console.error("Full Error Response:", error?.response); // Log the full error response
      const errorMessage =
        error?.response?.data?.message || "Failed to register vendor.";

      // Show toast for Android
      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } else if (Platform.OS === "ios") {
        // Show alert for iOS
        Alert.alert("Error", errorMessage);
      }

      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for OTP verification
export const verifyVendorOtp = createAsyncThunk(
  "vendor/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.8:4001/user/vendors/verify-otp",
        { email, otp }
      );

      // Return success message
      return {
        message: response.data.message,
      };
    } catch (error) {
      console.error("Register Vendor Error:", error);

      const errorMessage =
        error?.response?.data?.message || "Failed to verify OTP.";

      // Show toast for Android
      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } else if (Platform.OS === "ios") {
        // Show alert for iOS
        Alert.alert("Error", errorMessage);
      }

      return rejectWithValue(errorMessage);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Register Vendor
      .addCase(registerVendor.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(registerVendor.fulfilled, (state, action) => {
        console.log("Register Vendor Fulfilled:", action.payload.email); // Add this
        state.loading = false;
        state.successMessage = action.payload.message;
        state.email = action.payload.email;
        state.errorMessage = null;
      })      
      .addCase(registerVendor.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload || "Something went wrong.";
      })

      // Handle Verify OTP
      .addCase(verifyVendorOtp.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(verifyVendorOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.isEmailVerified = true; // Mark email as verified
        state.errorMessage = null;
      })
      .addCase(verifyVendorOtp.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload || "Failed to verify OTP.";
      });
  },
});

export const { clearMessages } = registerSlice.actions;
export default registerSlice.reducer;
