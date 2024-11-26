import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      return response.data; // Assuming response includes user data and token
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed, please try again.'
      );
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
