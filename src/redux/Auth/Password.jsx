import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform, ToastAndroid, Alert } from "react-native";

const initialState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
  email: null, // To store the email for password reset
};

// Async thunk for sending forgot password OTP
export const sendForgotPasswordOtp = createAsyncThunk(
  "password/sendForgotPasswordOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://cm-backend-yk2y.onrender.com/user/vendorforgot-password", // Replace with your API URL
        { email }
      );
      return { message: response.data.message, email };
    } catch (error) {
      console.error("Error in sendForgotPasswordOtp:", error);
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

// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://cm-backend-yk2y.onrender.com/user/vendorreset-password", // Replace with your API URL
        { email, otp, newPassword }
      );
      return { message: response.data.message };
    } catch (error) {
      console.error("Error in resetPassword:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to reset password.";
      
      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", errorMessage);
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    clearPasswordMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Send OTP
      .addCase(sendForgotPasswordOtp.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(sendForgotPasswordOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.email = action.payload.email;
      })
      .addCase(sendForgotPasswordOtp.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload;
      })

      // Handle Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearPasswordMessages } = passwordSlice.actions;
export default passwordSlice.reducer;
