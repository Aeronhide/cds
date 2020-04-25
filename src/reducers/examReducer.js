import { GET_EXAM } from "../constants/actionTypes";

const examReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM:
      return action.payload[0];
    default:
      return state;
  }
};

export { examReducer };
