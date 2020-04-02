import React from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { NavigationBar } from "../features/navigationBar";
import { useLoggedIn } from "../utils/customHooks";
import { logout } from "../firebase/crud";
import * as constants from "./constants";
import { useLanguage, useIsMobile } from "../utils/customHooks";
// import { MISC_LANG } from "../utils/constants";

const useStyles = makeStyles(theme => ({
  navBarBackground: {
    bottom: 0,
    position: "fixed",
    width: "100%",
    zIndex: 4500,
    whiteSpace: "nowrap"
  }
}));

const iconStyleOveride = makeStyles(theme => ({
  root: {
    minWidth: 60,
    color: theme.palette.type === "dark" ? "#c2c2c2" : "#005A70",
    "&$selected": {
      color:
        theme.palette.type === "dark" ? theme.palette.secondary.main : "#004CA1"
    }
  },
  selected: {}
}));

function chooseLoggedInIcons(isMobile) {
  let loggedInIcons = [
    // {
    //   label: { en: "Home", zh: "首頁", jp: "ホーム" },
    //   icon: HomeIcon,
    //   to: constants.PAGE_HOME
    // },
  ];

  // if (isMobile) {
  //   loggedInIcons = [
  //     ...loggedInIcons,
  //     {
  //       label: MISC_LANG.setting,
  //       icon: SettingsIcon,
  //       to: "/settings"
  //     }
  //   ];
  // } else {
  //   loggedInIcons = [
  //     ...loggedInIcons,
  //     {
  //       label: MISC_LANG.logout,
  //       icon: ExitToAppIcon,
  //       to: "/logout"
  //     }
  //   ];
  // }
  return loggedInIcons;
}

function chooseLoggedOutIcons(isMobile) {
  let loggedOutIcons = [
    {
      label: { en: "Log In", zh: "登入", jp: "ログイン" },
      icon: AccountCircleIcon,
      to: constants.PAGE_LOGIN
    },
    {
      label: { en: "Home", zh: "首頁", jp: "ホーム" },
      icon: HomeIcon,
      to: constants.PAGE_HOME
    }
  ];

  if (isMobile) {
    loggedOutIcons = [
      ...loggedOutIcons,
      // {
      //   label: MISC_LANG.setting,
      //   icon: SettingsIcon,
      //   to: "/settings"
      // }
    ];
  }
  return loggedOutIcons;
}

function showIcons(isLoggedIn, isMobile) {
  if (isLoggedIn) {
    return chooseLoggedInIcons(isMobile);
  } else {
    return chooseLoggedOutIcons(isMobile);
  }
}

export default function Navigation({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const firebase = useFirebase();
  // const locale = useLanguage();

  const iconStyleOverideClasses = iconStyleOveride();
  const isMobile = useIsMobile();
  const isLoggedIn = useLoggedIn();

  const iconsToShow = showIcons(isLoggedIn, isMobile);

  // function handleOnClick(path) {
  //   if (path === "/logout") {
  //     logout(firebase);
  //   } else {
  //     path = locale ? `/${locale}${path}` : path;
  //     history.push(path);
  //   }
  // }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <NavigationBar/>
      {/* {isMobile ? (
      ) : (
        <TopNavBar
          homeLink={constants.PAGE_HOME}
          handleOnClick={handleOnClick}
          iconsToShow={iconsToShow}
          locale={locale}
        />
      )} */}
      {children}
    </Grid>
  );
}

Navigation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
