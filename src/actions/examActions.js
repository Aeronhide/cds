import {
  GET_EXAM_QUESTIONS,
  LOADING,
  SET_EXAM_THEMES,
  SET_EXAM_QUESTIONS,
  SET_EXAM_SETTINGS,
  CREATE_EXAM,
} from "../constants/actionTypes";
import api from "../api";

export const setExamThemes = (themes) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  dispatch({
    type: SET_EXAM_THEMES,
    themes: themes,
  });
  dispatch({ type: LOADING, payload: false });
};

export const setExamQuestions = (questions) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  dispatch({
    type: SET_EXAM_QUESTIONS,
    questionsSelected: questions,
  });
  dispatch({ type: LOADING, payload: false });
};

export const getExamQuestions = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.questions.getQuestions().then((res) => {
    dispatch({
      type: GET_EXAM_QUESTIONS,
      questionsList: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
};

export const setExamSettings = (data) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  dispatch({
    type: SET_EXAM_SETTINGS,
    settings: data,
  });
  dispatch({ type: LOADING, payload: false });
};

export const createExam = (exam) => (dispatch) => {
  console.warn({ exam });
  dispatch({ type: LOADING, payload: true });
  return api.exam.createExam(exam).then(() => {
    dispatch({
      type: CREATE_EXAM,
    });
    dispatch({ type: LOADING, payload: false });
  });
};
