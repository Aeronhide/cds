import {
  SET_EXAM_DURATION,
  SET_EXAM_QUESTIONS,
  GET_EXAM_QUESTIONS,
  SET_EXAM_THEMES,
} from "../constants/actionTypes";

const initialState = {
  themes: [],
  questions: [],
  duration: {},
};

const examReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXAM_THEMES:
      return {
        ...state,
        themes: action.themes,
      };
    case GET_EXAM_QUESTIONS:
      return {
        ...state,
        questionsList: action.questionsList,
      };
    case SET_EXAM_QUESTIONS:
      return {
        ...state,
        questionsSelected: action.questionsSelected,
      };
    case SET_EXAM_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    default:
      return state;
  }
};

export { examReducer };
