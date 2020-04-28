import { SIGN_IN } from "../constants/actionTypes";

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export { loginReducer };
