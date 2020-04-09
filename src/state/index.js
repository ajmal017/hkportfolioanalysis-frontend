import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import lastBusinessDayReducer from "../features/lastBusinessDay/lastBusinessDaySlice";
import languageReducer from "../features/language/languageSlice";

export default combineReducers({
  firebase: firebaseReducer,
  lastBusinessDay: lastBusinessDayReducer,
  language: languageReducer,
});
