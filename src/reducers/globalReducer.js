import { LOADING } from "../constants/actionTypes";

const globalReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return action.payload;
    default:
      return state;
  }
};

export { globalReducer };
