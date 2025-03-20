import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    success: false,
    products: [],
    productDetails: null,
    updateSuccess: false,
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.updateSuccess = false;
    },
    createStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductsStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
        state.loading = false;
        state.products = action.payload;
    },
    fetchProductsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchProductDetailsStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    fetchProductDetailsSuccess: (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
    },
    fetchProductDetailsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateProductStart: (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
    },
    updateProductSuccess: (state) => {
        state.loading = false;
        state.updateSuccess = true;
    },
    updateProductFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
    createStart,
    createSuccess,
    createFail,
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFail,
    fetchProductDetailsStart,
    fetchProductDetailsSuccess,
    fetchProductDetailsFail,
    updateProductStart,
    updateProductSuccess,
    updateProductFail,
    resetProductState,
} = productSlice.actions;
export default productSlice.reducer;
