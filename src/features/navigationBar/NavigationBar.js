import React from "react";

import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useDispatch } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import TranslateIcon from "@material-ui/icons/Translate";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PieChartIcon from "@material-ui/icons/PieChart";
import Tooltip from "@material-ui/core/Tooltip";

import { useIsMobile, useIsVerified } from "../../utils/customHooks";
import * as pathConstants from "../../layouts/constants";
import { logout } from "../../firebase/crud";
import { clearBackendResponse } from "../../localStorageUtils";
import { changeLanguage } from "../language/languageSlice";
import { useLanguage } from "../../utils/customHooks";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.navBar,
    width: theme.spacing(7) + 1,
    overflowX: "hidden",
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
  iconContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  iconGroup: {
    marginTop: "30vh",
  },
  navBarBackground: {
    bottom: 0,
    left: 0,
    position: "fixed",
    width: "100%",
    zIndex: 4500,
    whiteSpace: "nowrap",
    background: theme.palette.background.navBar,
  },
  iconText: {
    fontWeight: 800,
    fontSize: 20,
  },
}));
const iconStyleOveride = makeStyles((theme) => ({
  root: {
    // minWidth: 60,
    color: "#fff",
  },
  selected: {},
}));

let ICONS = [
  {
    label: { en: "中文", zh: "Eng" },
    icon: TranslateIcon,
    to: "changeLanguage",
  },
  {
    label: { en: "Home", zh: "首頁" },
    icon: HomeIcon,
    to: pathConstants.PAGE_HOME,
  },
  {
    label: { en: "Create Portfolio", zh: "投資組合" },
    icon: PieChartIcon,
    to: pathConstants.PAGE_CREATE_PORTFOLIO,
  },
];

let LOGGEDIN_ICONS = [
  {
    label: { en: "Logout", zh: "登出" },
    icon: ExitToAppIcon,
    to: pathConstants.PAGE_LOGOUT,
  },
];

let LOGGEDOUT_ICONS = [
  {
    label: { en: "Login", zh: "登入" },
    icon: AccountBoxIcon,
    to: pathConstants.PAGE_LOGIN,
  },
];

export default function NavigationBar() {
  const dispatch = useDispatch();
  const locale = useLanguage();

  const classes = useStyles();
  const iconStyleOverideClasses = iconStyleOveride();
  const isMobile = useIsMobile();
  const history = useHistory();
  const isLoggedIn = useIsVerified();
  const firebase = useFirebase();
  const iconsToShow = isLoggedIn
    ? [...ICONS, ...LOGGEDIN_ICONS]
    : [...ICONS, ...LOGGEDOUT_ICONS];

  async function handleOnClick(path) {
    if (path === "/logout") {
      clearBackendResponse();
      await logout(firebase);
      window.location.reload();
    } else if (path === "changeLanguage") {
      const value = locale === "en" ? "zh" : "en";
      dispatch(changeLanguage(value));
    } else {
      history.push(path);
    }
  }

  return (
    <div>
      {isMobile ? (
        <BottomNavigation className={classes.navBarBackground} showLabels>
          {iconsToShow.map((obj) => (
            <BottomNavigationAction
              classes={iconStyleOverideClasses}
              label={obj.label[locale]}
              icon={<obj.icon />}
              key={obj.label.en}
              onClick={() => handleOnClick(obj.to)}
              value={obj.label.en}
            />
          ))}
        </BottomNavigation>
      ) : (
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.paper,
          }}
          color="#fff"
        >
          <List className={classes.iconGroup}>
            {iconsToShow.map((obj, i) => (
              <Tooltip title={obj.label[locale]}>
                <ListItem
                  button
                  key={i}
                  className={classes.iconContainer}
                  onClick={() => handleOnClick(obj.to)}
                >
                  <ListItemIcon>
                    <obj.icon className={classes.icon} />
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Drawer>
      )}
    </div>
  );
}
