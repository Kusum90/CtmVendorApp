import { configureStore } from "@reduxjs/toolkit";
import couponReducer from '../redux/Coupon/Coupon';
import customerReducer from '../redux/Customer/CustomerSlice';
import productReducer from '../redux/Product/ProductSlice';

const store = configureStore({
  reducer: {
    coupons: couponReducer,
    customers: customerReducer,
    products: productReducer,
  },
});

export default store;
