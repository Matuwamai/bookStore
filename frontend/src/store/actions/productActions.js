import { BASE_URL } from "../../base_url";
import {
  createProductFail,
  createProductStart,
  createProductSuccess,
  fetchProductsFail,
  fetchProductsStart,
  fetchProductsSuccess,
} from "../slices/productSlices";
import axios from "axios";

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
  } catch (err) {
    dispatch(
      createProductFail(err.response ? err.response.data.message : err.message),
    );
  }
};

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const { data } = await axios.get(`${BASE_URL}/books`);
    dispatch(fetchProductsSuccess(data));
  } catch (err) {
    dispatch(
      fetchProductsFail(err.response ? err.response.data.message : err.message),
    );
  }
};

export const fetchProductDetails = (name) => async (dispatch) => {
  dispatch(fetchProductDetailsStart());
  try {
    const { data } = await axios.get(`${BASE_URL}/books/${name}`);
    dispatch(fetchProductDetailsSuccess(data));
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message;
    dispatch(fetchProductDetailsFail(errMsg));
  }
};

// Update createProduct to handle FormData with file upload

// Other product actions...
