import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    success: false,
    totalBooks: 0,
    currentPage: 1,
    pageSize: 10,
  },
  reducers: {
    // Create/Update product
    createProductStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      // Update products list if it contains the updated product
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
      state.product = action.payload;
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
      state.products = action.payload.books || action.payload;
      state.totalBooks = action.payload.totalBooks || action.payload.length;
      state.currentPage = action.payload.currentPage || 1;
      state.pageSize = action.payload.pageSize || 10;
      state.error = null;
    },
    fetchProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch single product
    fetchProductDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    fetchProductDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.product = null;
    },

    // Reset states
    resetProductSuccess: (state) => {
      state.success = false;
    },
    clearProductState: (state) => {
      state.product = null;
      state.error = null;
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
  fetchProductDetailsStart,
  fetchProductDetailsSuccess,
  fetchProductDetailsFail,
  resetProductSuccess,
  clearProductState,
} = productSlice.actions;

export default productSlice.reducer;
