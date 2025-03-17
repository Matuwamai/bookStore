import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import categoryReducer from "./slices/categorySlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer
  },
});
