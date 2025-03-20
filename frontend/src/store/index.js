import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import categoryReducer from "./slices/categorySlices";
import productReducer from "./slices/productSlices";
import cartReducer from "./slices/cartSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
