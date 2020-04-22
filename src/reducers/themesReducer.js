import {
  ADD_THEME,
  DELETE_THEME,
  EDIT_THEME,
  GET_THEMES,
} from "../constants/actionTypes";

const themesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_THEMES:
      return action.payload;
    case ADD_THEME:
      return action.payload;
    case EDIT_THEME:
      return action.payload;
    case DELETE_THEME:
      return action.payload;
    default:
      return state;
  }
};

export { themesReducer };
