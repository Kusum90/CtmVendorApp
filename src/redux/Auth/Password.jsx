import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform, ToastAndroid, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
  email: null, // To store the email for password reset
};

// Async thunk for sending forgot password OTP
export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async ({ email, otp, newPassword, confirmNewPassword }, { rejectWithValue }) => {
    try {
      console.log("Reset Password API called with payload:", {
        email,
        otp,
        newPassword,
        confirmNewPassword,
      });

      const response = await axios.post(
        "https://cm-backend-yk2y.onrender.com/user/vendorreset-password",
        { email, newPassword, confirmNewPassword } // Note: Exclude OTP if not needed
      );

      console.log("Reset Password API response:", response.data);
      return { message: response.data.message };
    } catch (error) {
      console.error("Error in resetPassword:", error.response?.data);
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



export const sendForgotPasswordOtp = createAsyncThunk(
  "password/sendForgotPasswordOtp",
  async (email, { rejectWithValue }) => {
    try {
      console.log("Send OTP API called with email:", email);
      const response = await axios.post(
        "https://cm-backend-yk2y.onrender.com/user/vendorforgot-password",
        { email }
      );
      console.log("Send OTP API response:", response.data);
      return { message: response.data.message, email };
    } catch (error) {
      console.error("Error in sendForgotPasswordOtp:", error.response?.data);
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

export const verifyOtp = createAsyncThunk(
  "password/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      console.log("Verify OTP API called with payload:", { email, otp });
      const response = await axios.post(
        "https://cm-backend-yk2y.onrender.com/user/vendors/verify-otp",
        { email, otp }
      );
      console.log("Verify OTP API response:", response.data);
      return response.data.message;
    } catch (error) {
      console.error("Error in verifyOtp:", error.response?.data);
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

// AsyncThunk to change password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    console.log('Executing changePassword thunk with:', { oldPassword, newPassword });
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token is missing.');
      }

      const response = await axios.put(
        'https://cm-backend-yk2y.onrender.com/user/change-password', // Ensure this matches backend
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in changePassword thunk:', error);
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
      })

       // Verify OTP
       .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Password changed successfully.';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearPasswordMessages } = passwordSlice.actions;
export default passwordSlice.reducer;
