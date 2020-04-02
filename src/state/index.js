import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import counterReducer from '../features/counter/counterSlice';

export default combineReducers({
    firebase: firebaseReducer,
    counter: counterReducer
});
