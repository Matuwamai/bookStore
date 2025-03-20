import {
  createFail,
  createStart,
  createSuccess,
  fetchCategoriesFail,
  fetchCategoriesStart,
  fetchClassesSuccess,
  fetchSubjectsSuccess,
} from "../slices/categorySlices";
import { BASE_URL } from "../../base_url";
import api from "../../lib/api";

export const createCategory = (details, type) => async (dispatch) => {
  dispatch(createStart());
  try {
    if (type === "class") {
      await api.post(`${BASE_URL}/classes/`, details);
    } else if (type === "subject") {
      await api.post(`${BASE_URL}/subjects/`, details);
    }
    dispatch(createSuccess());
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message;
    dispatch(createFail(errMsg));
  }
};

export const fetchCategories = (type) => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    if (type === "class") {
      const { data } = await api.get(`${BASE_URL}/classes/`);
      dispatch(fetchClassesSuccess(data));
    } else if (type === "subject") {
      const { data } = await api.get(`${BASE_URL}/subjects/`);
      dispatch(fetchSubjectsSuccess(data));
    }
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message;
    dispatch(fetchCategoriesFail(errMsg));
  }
};
