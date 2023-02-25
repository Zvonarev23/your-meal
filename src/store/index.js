import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import productReducer from "./product/productSlice";
import orderReducer from "./order/orderSlice";
import { localStorageMiddleware } from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
  },

  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(localStorageMiddleware)
});