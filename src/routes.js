import React from "react";
import { Switch, withRouter, Route } from "react-router-dom";
import { routes } from "./constants/routes";
import { AuthRoute } from "./components/routes/authRoute";
import { NotFound } from "./views";
import Minimal from "./layouts/minimal/minimal";
import Login from "./views/login/login";

const Routes = () => (
  <div className="route-container">
    <Switch>
      {routes.map((route) => (
        <AuthRoute
          key={route.title}
          exact={route.exact}
          path={route.path}
          component={route.component}
          layout={route.layout}
          title={route.title}
        />
      ))}
      <Route
        path="/login"
        render={() => (
          <Minimal>
            <Login />
          </Minimal>
        )}
      />
      <Route
        path="*"
        render={() => (
          <Minimal>
            <NotFound />
          </Minimal>
        )}
      />
    </Switch>
  </div>
);

export default withRouter(Routes);
