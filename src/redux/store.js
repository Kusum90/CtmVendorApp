import { configureStore } from "@reduxjs/toolkit";
import couponReducer from '../redux/Coupon/Coupon';

const store = configureStore({
  reducer: {
    coupons: couponReducer,
  },
});

export default store;
