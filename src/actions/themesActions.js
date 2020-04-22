import {
  ADD_THEME,
  DELETE_THEME,
  EDIT_THEME,
  GET_THEMES,
  LOADING,
} from "../constants/actionTypes";
import api from "../api";

export const getThemes = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.themes.getThemes().then((res) => {
    dispatch({
      type: GET_THEMES,
      payload: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const addTheme = (theme) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.themes.addTheme(theme).then(() => {
    return api.themes.getThemes().then((res) => {
      dispatch({
        type: ADD_THEME,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};

export const updateTheme = (theme) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.themes.updateTheme(theme).then(() => {
    return api.themes.getThemes().then((res) => {
      dispatch({
        type: EDIT_THEME,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};

export const deleteTheme = (theme) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.themes.deleteTheme(theme).then(() => {
    return api.themes.getThemes().then((res) => {
      dispatch({
        type: DELETE_THEME,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};
