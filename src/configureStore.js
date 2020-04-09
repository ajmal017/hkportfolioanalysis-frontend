import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { reduxFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";

import rootReducer from "./state";
import firebase, { config } from "./firebase";

const logger = createLogger({
  // ...options
});

function middlewareWrapper() {
  if (process.env.NODE_ENV !== "production") {
    return () =>
      applyMiddleware(thunk.withExtraArgument({ getFirebase }), logger);
  } else {
    return () => applyMiddleware(thunk.withExtraArgument({ getFirebase }));
  }
}
const store = createStore(
  rootReducer,
  compose(middlewareWrapper()(), reduxFirestore(firebase, config))
);

export default store;
