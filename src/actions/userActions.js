import { GET_USERS, LOADING, UPDATE_USER } from "../constants/actionTypes";
import api from "../api";

export const getUsers = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.users.getUsers().then((res) => {
    dispatch({
      type: GET_USERS,
      payload: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const updateUser = (user) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.users.updateUser(user).then(() => {
    dispatch({ type: UPDATE_USER });
    return api.users.getUsers().then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};
