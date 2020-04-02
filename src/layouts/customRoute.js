import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import Navigation from "./navigation";
import { useLoggedIn, useIsVerified, useIsAuthLoaded } from "../utils/customHooks";
import { PAGE_VERIFY, PAGE_LOGIN } from "./constants";

function CustomRoute({ component: Component, isPrivate = false, ...rest }) {
  const isLoggedIn = useLoggedIn();
  const isVerified = useIsVerified();
  const isAuthLoaded = useIsAuthLoaded();
  return (
    <Route
      {...rest}
      render={renderProps => {
        if (isAuthLoaded && isPrivate && !isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: PAGE_LOGIN
              }}
            />
          );
        } else if (isAuthLoaded && isPrivate && !isVerified) {
          return <Redirect to={{ pathname: PAGE_VERIFY }} />;
        } else {
          return (
            <Navigation>
              <Component {...renderProps}/>
            </Navigation>
          );
        }
      }}
    />
  );
};

CustomRoute.propTypes = {
  component: PropTypes.func
};

CustomRoute.defaultProps = {
  component: () => null
};

export default CustomRoute;
