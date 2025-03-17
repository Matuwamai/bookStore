import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    error: null,
    success: false,
    subjects: [],
    classes: [],
  },
  reducers: {
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
    fetchCategoriesStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    fetchClassesSuccess: (state, action) => {
        state.loading = false;
        state.classes = action.payload;
    },
    fetchSubjectsSuccess: (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
    },
    fetchCategoriesFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteCategoryStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    deleteCategorySuccess: (state) => {
        state.loading = false;
    },
    deleteCategoryFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateCategoryStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    updateCategorySuccess: (state) => {
        state.loading = false;
    },
    updateCategoryFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
    createStart,
    createSuccess,
    createFail,
    fetchCategoriesStart,
    fetchClassesSuccess,
    fetchSubjectsSuccess,
    fetchCategoriesFail,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFail,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFail,
} = categorySlice.actions;
export default categorySlice.reducer;
