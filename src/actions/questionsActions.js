import {
  ADD_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  GET_QUESTIONS,
  GET_THEME,
  LOADING,
} from "../constants/actionTypes";
import api from "../api";

export const getTheme = (key) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.questions.getTheme(key).then((res) => {
    dispatch({
      type: GET_THEME,
      theme: res.data(),
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const getQuestions = (key) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.questions.getQuestions(key).then((res) => {
    dispatch({
      type: GET_QUESTIONS,
      questions: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const addQuestion = (question) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.questions.addQuestion(question).then(() => {
    dispatch({ type: ADD_QUESTION });
    return api.questions.getQuestions().then((res) => {
      dispatch({
        type: GET_QUESTIONS,
        questions: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};

export const updateQuestion = (question) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.questions.updateQuestion(question).then(() => {
    dispatch({ type: EDIT_QUESTION });
    return api.questions.getQuestions().then((res) => {
      dispatch({
        type: GET_QUESTIONS,
        questions: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};

export const deleteQuestion = (question) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.questions.deleteQuestion(question).then(() => {
    dispatch({ type: DELETE_QUESTION });
    return api.questions.getQuestions().then((res) => {
      dispatch({
        type: GET_QUESTIONS,
        questions: res.docs.map((item) => item.data()),
      });
      dispatch({ type: LOADING, payload: false });
    });
  });
};
