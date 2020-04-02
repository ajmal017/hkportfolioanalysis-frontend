import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import * as pages from "../pages";
import CustomRoute from "./customRoute";
import * as constants from "./constants";

const history = createBrowserHistory();

const LOCALE = ["", "/:locale"];

const ROUTES = [
  { path: constants.PAGE_LOGIN, component: pages.LoginPage, isPrivate: false },
  { path: constants.PAGE_HOME, component: pages.HomePage, isPrivate: false },
  {
    path: constants.PAGE_REGISTER,
    component: pages.RegisterPage,
    isPrivate: false
  },
  {
    path: constants.PAGE_FORGOT_PW,
    component: pages.ForgotPasswordPage,
    isPrivate: false
  },
  {
    path: constants.PAGE_CREATE_PORTFOLIO,
    component: pages.CreatePortfolioPage,
    isPrivate: false
  },
  // {
  //   path: constants.PAGE_VERIFY,
  //   component: pages.VerifyPage,
  //   isPrivate: false
  // },
  // {
  //   path: constants.PAGE_SETTINGS,
  //   component: pages.SettingsPage,
  //   isPrivate: false
  // }
];

const MainLayout = () => {
  return (
    <Router history={history}>
      <Switch>
        {LOCALE.map(locale =>
          ROUTES.map(({ path, component, isPrivate }) => (
            <CustomRoute
              key={locale + path}
              exact
              path={locale + path}
              component={component}
              isPrivate={isPrivate}
            />
          ))
        )}
        <Route component={pages.Error404Page} />
      </Switch>
    </Router>
  );
};

export default MainLayout;
