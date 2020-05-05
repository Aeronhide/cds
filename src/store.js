import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  themesReducer,
  globalReducer,
  questionsReducer,
  answersReducer,
  examsReducer,
  examReducer,
  loginReducer,
  notificationsReducer,
  scheduleReducer,
  usersReducer,
} from "./reducers";

const rootReducer = combineReducers({
  themes: themesReducer,
  questions: questionsReducer,
  answers: answersReducer,
  exams: examsReducer,
  exam: examReducer,
  loading: globalReducer,
  login: loginReducer,
  notifications: notificationsReducer,
  schedule: scheduleReducer,
  users: usersReducer,
});

const configStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export { configStore };
