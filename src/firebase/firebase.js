import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import { prodConfig, devConfig } from "./config";

export const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

firebase.initializeApp(config);

export default firebase;
