import { GET_SCHEDULE, LOADING, SET_LESSON } from "../constants/actionTypes";
import api from "../api";

export const getSchedule = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.schedule.getSchedule().then((res) => {
    dispatch({
      type: GET_SCHEDULE,
      payload: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const addlesson = (lesson) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.schedule.addLesson(lesson).then(() => {
    dispatch({ type: SET_LESSON });
    return api.schedule.getSchedule().then((res) => {
      dispatch({
        type: GET_SCHEDULE,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};
