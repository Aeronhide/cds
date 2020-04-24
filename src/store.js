import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  themesReducer,
  globalReducer,
  questionsReducer,
  answersReducer,
  examsReducer,
} from "./reducers";

const rootReducer = combineReducers({
  themes: themesReducer,
  questions: questionsReducer,
  answers: answersReducer,
  exams: examsReducer,
  loading: globalReducer,
});

const configStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export { configStore };