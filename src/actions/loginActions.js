import { LOADING, SIGN_IN, SIGN_OUT } from "../constants/actionTypes";
import api from "../api";

export const login = (data) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.login.signIn(data).then(() => {
    dispatch({
      type: SIGN_IN,
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.login.signOut().then(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    dispatch({
      type: SIGN_OUT,
    });
    dispatch({ type: LOADING, payload: false });
  });
};
