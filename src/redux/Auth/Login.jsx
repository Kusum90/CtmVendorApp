import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// AsyncThunk to handle login API call
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://cm-backend-yk2y.onrender.com/user/vendor',
        { email, password }
      );
      // Store token in AsyncStorage
      await AsyncStorage.setItem('userToken', response.data.token);
      return response.data; // Assuming response includes user data and token
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed, please try again.'
      );
    }
  }
);

// AsyncThunk to handle logout API call
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token available');

      const response = await axios.post(
        'https://cm-backend-yk2y.onrender.com/user/vendorlogout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      // Remove token from AsyncStorage after successful logout
      await AsyncStorage.removeItem('userToken');
      return response.data.message; // Logout success message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Logout failed, please try again.'
      );
    }
  }
);



const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Assuming response contains user info
        state.token = action.payload.token; // Assuming response contains JWT token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthState } = loginSlice.actions;
export default loginSlice.reducer;
