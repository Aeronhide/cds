import React from "react";
import { Route } from "react-router-dom";
const AuthRoute = (props) => {
  const { component: Component, layout: Layout, path, exact, ...rest } = props;

  return (
    <Route
      {...rest}
      exact
      path={path}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export { AuthRoute };
