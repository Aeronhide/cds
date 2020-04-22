import {
  GET_EXAM_QUESTIONS,
  LOADING,
  SET_EXAM_THEMES,
  SET_EXAM_QUESTIONS,
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

export const setExamQuestions = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  return api.answers.getAnswers().then((res) => {
    dispatch({
      type: SET_EXAM_QUESTIONS,
      questions: res.docs.map((item) => item.data()),
    });
    dispatch({ type: LOADING, payload: false });
  });
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
