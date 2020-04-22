import React from "react";
import { configStore } from "./store";
import { Router } from "react-router-dom";
import history from "./utils/history";
import Routes from "./routes";
import { Provider } from "react-redux";

const store = configStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
};

export { App };
