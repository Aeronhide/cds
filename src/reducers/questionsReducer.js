import { GET_QUESTIONS, GET_THEME } from "../constants/actionTypes";
const initialState = {
  theme: {},
  questions: [],
};
const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions:
          action.questions &&
          action.questions.filter((q) => q.themeId === state.theme.key),
      };
    default:
      return state;
  }
};

export { questionsReducer };
