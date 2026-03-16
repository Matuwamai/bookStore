import { BASE_URL } from "../../base_url";
import {
  createProductFail,
  createProductStart,
  createProductSuccess,
  fetchProductsFail,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductDetailsStart,
  fetchProductDetailsSuccess,
  fetchProductDetailsFail,
  resetProductSuccess,
} from "../slices/productSlices";
import axios from "axios";

// Create product with FormData (for file upload)
export const createProduct = (formData) => async (dispatch, getState) => {
  dispatch(createProductStart());
  try {
    const {
      user: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${BASE_URL}/books`, formData, config);
    dispatch(createProductSuccess(data));
    return data;
  } catch (err) {
    dispatch(
      createProductFail(err.response ? err.response.data.message : err.message),
    );
    throw err;
  }
};

// Fetch all products with pagination and search
export const fetchProducts =
  (page = 1, limit = 10, search = "") =>
  async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const { data } = await axios.get(`${BASE_URL}/books`, {
        params: {
          page,
          limit,
          search,
        },
      });
      dispatch(fetchProductsSuccess(data));
      return data;
    } catch (err) {
      dispatch(
        fetchProductsFail(
          err.response ? err.response.data.message : err.message,
        ),
      );
      throw err;
    }
  };

// Fetch single product by ID
export const fetchProductDetails = (id) => async (dispatch) => {
  dispatch(fetchProductDetailsStart());
  try {
    const { data } = await axios.get(`${BASE_URL}/books/${id}`);
    dispatch(fetchProductDetailsSuccess(data));
    return data;
  } catch (err) {
    dispatch(
      fetchProductDetailsFail(
        err.response ? err.response.data.message : err.message,
      ),
    );
    throw err;
  }
};

// Fetch single product by name (as per your backend route)
export const fetchProductByName = (name) => async (dispatch) => {
  dispatch(fetchProductDetailsStart());
  try {
    const { data } = await axios.get(`${BASE_URL}/books/${name}/details`);
    dispatch(fetchProductDetailsSuccess(data));
    return data;
  } catch (err) {
    dispatch(
      fetchProductDetailsFail(
        err.response ? err.response.data.message : err.message,
      ),
    );
    throw err;
  }
};

// Update product
export const updateProduct =
  (id, productData) => async (dispatch, getState) => {
    dispatch(createProductStart()); // Reusing start action
    try {
      const {
        user: { token },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/books/${id}`,
        productData,
        config,
      );
      dispatch(createProductSuccess(data)); // Reusing success action
      return data;
    } catch (err) {
      dispatch(
        createProductFail(
          err.response ? err.response.data.message : err.message,
        ),
      );
      throw err;
    }
  };

// Update product with images (using FormData)
export const updateProductWithImages =
  (id, formData) => async (dispatch, getState) => {
    dispatch(createProductStart());
    try {
      const {
        user: { token },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/books/${id}`,
        formData,
        config,
      );
      dispatch(createProductSuccess(data));
      return data;
    } catch (err) {
      dispatch(
        createProductFail(
          err.response ? err.response.data.message : err.message,
        ),
      );
      throw err;
    }
  };

// Delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch(createProductStart()); // Reusing start action
  try {
    const {
      user: { token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${BASE_URL}/books/${id}`, config);
    // Refresh products list after deletion
    dispatch(fetchProducts());
    return true;
  } catch (err) {
    dispatch(
      createProductFail(err.response ? err.response.data.message : err.message),
    );
    throw err;
  }
};

// Search products
export const searchProducts =
  (query, classId, subjectId) => async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const { data } = await axios.get(`${BASE_URL}/books/search`, {
        params: {
          query,
          classId,
          subjectId,
        },
      });
      dispatch(fetchProductsSuccess({ books: data, totalBooks: data.length }));
      return data;
    } catch (err) {
      dispatch(
        fetchProductsFail(
          err.response ? err.response.data.message : err.message,
        ),
      );
      throw err;
    }
  };

// Reset product success state
export const resetProductSuccessAction = () => (dispatch) => {
  dispatch(resetProductSuccess());
};

// Clear product error
export const clearProductError = () => (dispatch) => {
  dispatch(fetchProductsFail(null)); // Reusing fail action with null to clear error
};
