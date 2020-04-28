import React from "react";
import { Route, Redirect } from "react-router-dom";
const AuthRoute = (props) => {
  const { component: Component, layout: Layout, path, exact, ...rest } = props;
  const user = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      exact
      path={path}
      render={(props) =>
        !!user ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export { AuthRoute };
