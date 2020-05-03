import { GET_SCHEDULE } from "../constants/actionTypes";

const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return action.payload;
    default:
      return state;
  }
};

export { scheduleReducer };
