import React from "react";

import { useHistory } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import TranslateIcon from "@material-ui/icons/Translate";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import PieChartIcon from "@material-ui/icons/PieChart";
import { useIsMobile, useIsVerified } from "../../utils/customHooks";

import * as pathConstants from "../../layouts/constants";

const useStyles = makeStyles(theme => ({
  paper: {
    background: theme.palette.background.navBar,
    width: theme.spacing(7) + 1,
    overflowX: "hidden"
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    width: theme.spacing(7) + 1
  },
  toolbar: {
    alignItems: "center"
  },
  icon: {
    fontSize: 24
  },
  iconContainer: {
    paddingTop: 25,
    paddingBottom: 25
  },
  iconGroup: {
    marginTop: "30vh"
  },
  navBarBackground: {
    bottom: 0,
    left: 0,
    position: "fixed",
    width: "100%",
    zIndex: 4500,
    whiteSpace: "nowrap",
    background: theme.palette.background.navBar
  }
}));
const iconStyleOveride = makeStyles(theme => ({
  root: {
    // minWidth: 60,
    color: "#fff"
  },
  selected: {}
}));

let ICONS = [
  {
    label: { en: "Language", zh: "語言" },
    icon: TranslateIcon
    // to: constants.PAGE_HOME
  },
  {
    label: { en: "Home", zh: "首頁" },
    icon: HomeIcon,
    to: pathConstants.PAGE_HOME
  },
  {
    label: { en: "Create Portfolio", zh: "投資組合" },
    icon: PieChartIcon,
    to: pathConstants.PAGE_CREATE_PORTFOLIO
  },

];

let LOGGEDIN_ICONS = [
  {
    label: { en: "Logout", zh: "登出" },
    icon: ExitToAppIcon,
    to: pathConstants.PAGE_LOGOUT
  }
];

let LOGGEDOUT_ICONS = [
  {
    label: { en: "Login", zh: "登入" },
    icon: AccountBoxIcon,
    to: pathConstants.PAGE_LOGIN
  }
];

export default function NavigationBar() {
  const classes = useStyles();
  const iconStyleOverideClasses = iconStyleOveride();
  const isMobile = useIsMobile();
  const history = useHistory();
  const locale = "en";
  const isLoggedIn = useIsVerified();
  const iconsToShow = isLoggedIn
    ? [...ICONS, ...LOGGEDIN_ICONS]
    : [...ICONS, ...LOGGEDOUT_ICONS];

  function handleOnClick(path) {
    console.log(path);
    if (path === "/logout") {
      // logout(firebase);
    } else {
      // path = locale ? `/${locale}${path}` : path;
      history.push(path);
    }
  }

  return (
    <div>
      {isMobile ? (
        <BottomNavigation className={classes.navBarBackground} showLabels>
          {iconsToShow.map(obj => (
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
            paper: classes.paper
          }}
          color="#fff"
        >
          <List className={classes.iconGroup}>
            {iconsToShow.map((obj, i) => (
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
            ))}
          </List>
        </Drawer>
      )}
    </div>
  );
}
