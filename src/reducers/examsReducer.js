import {
  SET_EXAM_DURATION,
  SET_EXAM_QUESTIONS,
  GET_EXAM_QUESTIONS,
  SET_EXAM_THEMES,
  SET_EXAM_SETTINGS,
  LOAD_EXAMS,
} from "../constants/actionTypes";

const initialState = {
  themes: [],
  questions: [],
  duration: {},
};

const examsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXAM_THEMES:
      return {
        ...state,
        themes: action.themes,
      };
    case GET_EXAM_QUESTIONS:
      const filteredQuestions = state.themes
        .map(
          (t) =>
            action.questionsList &&
            action.questionsList.filter((q) => q.themeId === t.key)
        )
        .flat();
      // example without flat()
      // filtered.reduce((acc, val) => acc.concat(val), []);
      return {
        ...state,
        questionsList: filteredQuestions,
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
    case SET_EXAM_SETTINGS:
      return {
        ...state,
        settings: action.settings,
      };
    case LOAD_EXAMS:
      return {
        ...state,
        examsList: action.examsList,
      };
    default:
      return state;
  }
};

export { examsReducer };
