import React from "react";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Provider } from "react-redux";
import store from "./configureStore";

import MainLayout from "./layouts/mainLayout";
import firebase from "./firebase";
import { THEME } from "./colorsTheme";

const rrfConfig = {
  userProfile: "users"
};
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={THEME}>
          <CssBaseline />
          <MainLayout />
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
