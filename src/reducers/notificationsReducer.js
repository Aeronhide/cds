import { GET_NOTIFICATIONS } from "../constants/actionTypes";

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.payload;
    default:
      return state;
  }
};

export { notificationsReducer };
