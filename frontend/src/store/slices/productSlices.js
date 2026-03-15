import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // Create product
    createProductStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      state.success = true;
      state.error = null;
    },
    createProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    // Fetch products
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    fetchProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset success state
    resetProductSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  createProductStart,
  createProductSuccess,
  createProductFail,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFail,
  resetProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
