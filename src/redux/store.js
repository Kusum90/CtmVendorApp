import { configureStore } from "@reduxjs/toolkit";
import couponReducer from './Coupon/CouponSlice';
import customerReducer from '../redux/Customer/CustomerSlice';
import productReducer from '../redux/Product/ProductSlice';
import categoryReducer from '../redux/Product/ProductAttribute/ProductAttribute';
import attributesReducer from '../redux/Product/ProductAttribute/CreateAttribute';
import ordersReducer from '../redux/Order/OrderSlice';
import homeReducer from '../redux/Home/HomeSlice';
import registerReducer from "../redux/Auth/Register";

const store = configureStore({
  reducer: {
    coupons: couponReducer,
    customers: customerReducer,
    products: productReducer,
    categories: categoryReducer,
    attributes: attributesReducer,
    orders: ordersReducer,
    home: homeReducer,
    register: registerReducer,
  },
});

export default store;
