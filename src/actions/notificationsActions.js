import {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS,
  LOADING,
  NOTIFICATION_EXPIRED,
} from "../constants/actionTypes";
import api from "../api";

export const getNotifications = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.notifications.getNotifications().then((res) => {
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const addNotification = (n) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.notifications.addNotification(n).then(() => {
    dispatch({ type: ADD_NOTIFICATION });
    return api.notifications.getNotifications().then((res) => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};

export const expired = (n) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.notifications.expired(n).then(() => {
    dispatch({ type: NOTIFICATION_EXPIRED });
    return api.notifications.getNotifications().then((res) => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};
