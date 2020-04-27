import {
  LOADING,
  SELECT_EXAM,
  GET_EXAM,
  START_EXAM,
} from "../constants/actionTypes";
import api from "../api";

export const selectExam = (exam) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.exam.selectExam(exam).then(() => {
    dispatch({
      type: SELECT_EXAM,
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const startExam = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.exam.startExam().then(() => {
    dispatch({ type: START_EXAM, payload: true });
    return api.exam.getExam().then((res) => {
      dispatch({
        type: GET_EXAM,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};

export const getExam = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.exam.getExam().then((res) => {
    dispatch({
      type: GET_EXAM,
      payload: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
};
