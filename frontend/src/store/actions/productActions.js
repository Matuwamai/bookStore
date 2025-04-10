import { BASE_URL } from "../../base_url";
import { createFail, createStart, createSuccess, fetchProductDetailsFail, fetchProductDetailsStart, fetchProductDetailsSuccess, fetchProductsFail, fetchProductsStart, fetchProductsSuccess } from "../slices/productSlices";
import api from "../../lib/api";

export const createProduct = (details) => async (dispatch) => {
  dispatch(createStart());
  try {
    await api.post(`${BASE_URL}/books/`, details);
    dispatch(createSuccess());
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message;
    dispatch(createFail(errMsg));
  }
};

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const { data } = await api.get(`${BASE_URL}/books/`);
    dispatch(fetchProductsSuccess(data));
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message;
    dispatch(fetchProductsFail(errMsg));
  }
};

export const fetchProductDetails = (name) => async (dispatch) => {
    dispatch(fetchProductDetailsStart());
    try {
        const { data } = await api.get(`${BASE_URL}/books/${name}`);
        dispatch(fetchProductDetailsSuccess(data));
    } catch (err) {
        const errMsg = err.response ? err.response.data.message : err.message;
        dispatch(fetchProductDetailsFail(errMsg));
    }
}

