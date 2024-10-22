import { configureStore } from "@reduxjs/toolkit";
import couponReducer from './Coupon/CouponSlice';
import customerReducer from '../redux/Customer/CustomerSlice';
import productReducer from '../redux/Product/ProductSlice';
import categoryReducer from '../redux/Product/ProductAttribute/ProductAttribute';
import attributesReducer from '../redux/Product/ProductAttribute/CreateAttribute';
import ordersReducer from '../redux/Order/OrderSlice';

const store = configureStore({
  reducer: {
    coupons: couponReducer,
    customers: customerReducer,
    products: productReducer,
    categories: categoryReducer,
    attributes: attributesReducer,
    orders: ordersReducer,
  },
});

export default store;
