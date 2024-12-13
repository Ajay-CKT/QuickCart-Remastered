import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/ProductsSlice";
import cartReducer from "../features/cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
