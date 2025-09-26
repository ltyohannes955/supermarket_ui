import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/app/services/auth";
import { productsApi } from "../services/products";
import { categoriesApi } from "../services/category";
import cartReducer from "./cartSlice"; // Import the new cart reducer
import { orderssApi } from "../services/order";
import { DeliveryOrdersApi } from "../services/delivery_order";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer, // Add the cart reducer here
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [orderssApi.reducerPath]: orderssApi.reducer,
    [DeliveryOrdersApi.reducerPath]: DeliveryOrdersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      orderssApi.middleware,
      DeliveryOrdersApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
