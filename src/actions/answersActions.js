import {
  ADD_ANSWER,
  DELETE_ANSWER,
  EDIT_ANSWER,
  GET_ANSWERS,
  LOADING,
} from "../constants/actionTypes";
import api from "../api";

export const getAnswers = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.answers.getAnswers().then((res) => {
    dispatch({
      type: GET_ANSWERS,
      payload: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const addAnswer = (answer) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.answers.addAnswer(answer).then(() => {
    dispatch({ type: ADD_ANSWER });
    return api.answers.getAnswers().then((res) => {
      dispatch({
        type: GET_ANSWERS,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};

export const updateAnswer = (answer) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.answers.updateAnswer(answer).then(() => {
    dispatch({ type: EDIT_ANSWER });
    return api.answers.getAnswers().then((res) => {
      dispatch({
        type: GET_ANSWERS,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};

export const deleteAnswer = (answer) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.answers.deleteAnswer(answer).then(() => {
    dispatch({ type: DELETE_ANSWER });
    return api.answers.getAnswers().then((res) => {
      dispatch({
        type: GET_ANSWERS,
        payload: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};
