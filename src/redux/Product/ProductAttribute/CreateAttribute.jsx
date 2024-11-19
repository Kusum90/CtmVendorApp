import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert,ToastAndroid } from 'react-native';

const initialState = {
  loading: false,
  attributes: [],
  error: null,
};

// Fetch attributes with optional searchValue parameter
export const fetchAttributes = createAsyncThunk(
  'attributes/fetchAttributes',
  async (searchValue = '', { rejectWithValue }) => {
    try {
      const response = await axios.get('http://cm-backend-yk2y.onrender.com/user/attribute', {
        params: { searchValue },
      });
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

// Add a new value to an existing attribute
export const addAttributeValue = createAsyncThunk(
  'attribute/addValue',
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://cm-backend-yk2y.onrender.com/user/update-attribute/${id}`,
        { value }
      );
      console.log('Value added successfully!');
      return response.data.attribute;
    } catch (error) {
      console.log(error?.response?.data?.error || 'Failed to add attribute value');
      return rejectWithValue(error?.response?.data);
    }
  }
);

const attributesSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAttributes
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

      // Handle createAttribute
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
      })
      .addCase(addAttributeValue.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAttributeValue.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAttribute = action.payload;
        state.attributes = state.attributes.map((attribute) =>
          attribute._id === updatedAttribute._id ? updatedAttribute : attribute
        );
      })
      .addCase(addAttributeValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      });
  },
});

export default attributesSlice.reducer;
