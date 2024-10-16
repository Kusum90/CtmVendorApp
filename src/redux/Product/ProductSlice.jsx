import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform, ToastAndroid, Alert } from "react-native";

// Initial state
const initialState = {
  loading: false,
  products: [],
  productDetails: {
    productType: 'simple', // default to 'simple' or 'variable'
    title: '',
    price: 1,
    salePrice: 1,
    images: [],
    shortDescription: '',
    description: '',
    categories: [],
    tags: [],
    catalogVisibility: 'shop', // default to 'shop'
    sku: '',
    stockQty: 1, // should be a number
    allowBackorders: 'no', // default to 'no'
    soldIndividually: false,
    weight: 1, // should be a number
    length: 1, // should be a number
    width: 1, // should be a number
    height: 1, // should be a number
    shippingClass: 'Free Shipping', // default to 'Free Shipping'
    processingTime: '1-2 business days', // default to a valid option
    taxStatus: 'taxable', // default to 'taxable'
    taxClass: 'standard', // default to 'standard'
    attributes: [], // should be an array of attribute objects
    upSells: [],
    crossSells: [],
    hsnCode: [], // should be an array of HSN codes
    isAssemblyRequired: false,
    powerSource: 'Corded', // default to 'Battery Powered'
    sustainability: '',
    carbonFootprint: '',
    minimumOrderQuantity: 1, // should be a number
    unitOfMeasure: '',
    overridePolicyFields: false,
    policyTabLabel: '',
    shippingPolicy: '',
    refundPolicy: '',
    cancelReturnExchangePolicy: '',
    enableReviews: true,
    menuOrder: 1, // should be a number
    purchaseNote: '',
    reviews: [],
  },
  inventoryDetails: {
    sku: '',
    stockQty: 0, // should be a number
    allowBackorders: 'no', // default to 'no'
    soldIndividually: false,
  },
  shippingDetails: {
    weight: 0, // should be a number
    length: 0, // should be a number
    width: 0, // should be a number
    height: 0, // should be a number
    shippingClass: 'Free Shipping', // default to 'Free Shipping'
    processingTime: '1-2 business days', // default to a valid option
  },
  data: [],
  error: null,
  totalProducts: 0,
  totalPages: 1,
  currentPage: 1,
};

// Function to show toast based on platform
const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Notification', message);
  }
};

// Thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  "product/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://cm-backend-yk2y.onrender.com/user/vproductDashboard"
      );
      return response.data.data;
    } catch (error) {
      showToast(error?.response?.data?.error || "Failed to fetch dashboard data");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Thunk to create a new product
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.172.186:4001/user/create-product",
        productData
      );
      showToast("Product created successfully!");
      return response.data.data;
    } catch (error) {
      showToast(error?.response?.data?.error || "Failed to create product");
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const getAllProduct = createAsyncThunk(
  'products/getAllProduct',

  async (
    { page, limit, searchTerm, selectedDate, stockFilter, category },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://cm-backend-yk2y.onrender.com/user/getallproduct`,
        {
          params: {
            page,
            limit,
            searchTerm,
            selectedDate,
            stockFilter,
            category,
          },
        }
      );
      return response.data;
    } catch (error) {
      showToast(error?.response?.data?.error || "Failed to fetch products");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://cm-backend-yk2y.onrender.com/user/delete-product/${productId}`);
      showToast("Product deleted successfully!");
      return productId; // Return the deleted product ID
    } catch (error) {
      // Log error to debug
      console.error("Delete product error:", error);
      showToast(error?.response?.data?.error || "Failed to delete product");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Thunk to update a product
export const updateProduct = createAsyncThunk(
  "product/update",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://cm-backend-yk2y.onrender.com/user/update-product/${productData._id}`,
        productData
      );
      showToast("Product updated successfully!");
      return response.data.data; // Adjust according to your API response structure
    } catch (error) {
      showToast(error?.response?.data?.error || "Failed to update product");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Redux slice for products and form data
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Action to set product details from one of the steps
    setProductDetails: (state, action) => {
      state.productDetails = { ...state.productDetails, ...action.payload };
    },
    // Action to set inventory details from one of the steps
    setInventoryDetails: (state, action) => {
      state.inventoryDetails = { ...state.inventoryDetails, ...action.payload };
    },
    // Action to set shipping details from one of the steps
    setShippingDetails: (state, action) => {
      state.shippingDetails = { ...state.shippingDetails, ...action.payload };
    },
    // Action to set the current page
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Ensure action.payload.data is correct
        state.totalProducts = action.payload.totalProducts; // Ensure this matches your response structure
        state.totalPages = action.payload.totalPages; // Ensure this matches your response structure
      })
       // Delete product cases
       .addCase(deleteProduct.fulfilled, (state, action) => {
        // Filter products array to remove the deleted product
        state.products = state.products.filter((product) => product._id !== action.payload);
        // Additionally, filter the data array if needed
        state.data = state.data.filter((product) => product._id !== action.payload);
        state.loading = false; // Set loading to false when deletion is successful
    })

      // Update product cases
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Find the index of the updated product and replace it in the state
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product details
        }
        // Optionally, update the data array as well
        const dataIndex = state.data.findIndex(product => product._id === action.payload._id);
        if (dataIndex !== -1) {
          state.data[dataIndex] = action.payload; // Update the product details in data array
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      });
  },
});

export const {
  setProductDetails,
  setInventoryDetails,
  setShippingDetails,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
