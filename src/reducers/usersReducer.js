import { GET_USERS } from "../constants/actionTypes";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
};

export { usersReducer };
