import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform, ToastAndroid, Alert } from "react-native";

const initialState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
  email: null, // To store the email of the vendor
  isEmailVerified: false, // To track OTP verification
  otpSent: false, // To track if OTP has been sent
};

// Async thunk for sending OTP
export const sendVendorOtp = createAsyncThunk(
  "vendor/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.12:4001/user/vendors/send-otp",
        { email }
      );

      return { message: response.data.message, email };
    } catch (error) {
      console.error("Error in sendVendorOtp:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to send OTP.";

      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", errorMessage);
      }

      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for verifying OTP
export const verifyVendorOtp = createAsyncThunk(
  "vendor/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.12:4001/user/vendors/verify-otp",
        { email, otp }
      );

      return { message: response.data.message };
    } catch (error) {
      console.error("Error in verifyVendorOtp:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to verify OTP.";

      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", errorMessage);
      }

      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for vendor registration
export const registerVendor = createAsyncThunk(
  "vendor/register",
  async (vendorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.12:4001/user/vendors/register",
        vendorData
      );

      return {
        message: response.data.message,
        email: response.data.data.email,
      };
    } catch (error) {
      console.error("Error in registerVendor:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to register vendor.";

      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } else {
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
      // Handle Send OTP
      .addCase(sendVendorOtp.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
        state.otpSent = false;
      })
      .addCase(sendVendorOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.email = action.payload.email;
        state.otpSent = true; // Mark OTP as sent
      })
      .addCase(sendVendorOtp.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload;
        state.otpSent = false;
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
      })
      .addCase(verifyVendorOtp.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload;
        state.isEmailVerified = false;
      })

      // Handle Register Vendor
      .addCase(registerVendor.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(registerVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.email = action.payload.email;
      })
      .addCase(registerVendor.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearMessages } = registerSlice.actions;
export default registerSlice.reducer;
