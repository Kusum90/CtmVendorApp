import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

const initialState = {
  loading: false,
  attributes: [],
  error: null,
};

// Fetch attributes
export const fetchAttributes = createAsyncThunk(
  'attributes/fetchAttributes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://cm-backend-yk2y.onrender.com/user/attribute');
      return response.data.attributes;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch attributes');
    }
  }
);

// Create a new attribute
export const createAttribute = createAsyncThunk(
  'attributes/createAttribute',
  async (attributeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://cm-backend-yk2y.onrender.com/user/create-attribute',
        attributeData
      );
      return response.data.attribute;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create attribute');
    }
  }
);

const attributesSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAttribute.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes.push(action.payload); // Add the new attribute to the state
      })
      .addCase(createAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attributesSlice.reducer;
