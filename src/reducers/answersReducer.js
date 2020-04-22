import { GET_ANSWERS } from "../constants/actionTypes";

const answersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ANSWERS:
      return action.payload;
    default:
      return state;
  }
};

export { answersReducer };
