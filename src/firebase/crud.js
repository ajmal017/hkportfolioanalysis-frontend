import PropTypes from "prop-types";

import * as constants from "./constants";
import { config } from "./firebase";
import {
  setStocksObject,
  clearBackendResponse,
  setStockCodes,
  getStockCodes,
} from "../localStorageUtils";

async function fetchFirebase(firebase, endPoint) {
  const ref = firebase.ref(endPoint);
  let result;
  await ref.once("value", (snapshot) => {
    result = snapshot.val();
  });
  return result;
}

fetchFirebase.propTypes = {
  firebase: PropTypes.object.isRequired,
  endPoint: PropTypes.string.isRequired,
};

async function updateObject(firebase, path, obj) {
  const ref = firebase.ref(path);
  try {
    await ref.update(obj);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

fetchFirebase.propTypes = {
  firebase: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  obj: PropTypes.object.isRequired,
};

export async function fetchLastBusinessDate(firebase) {
  const dbLastBusinessDate = await fetchFirebase(
    firebase,
    constants.END_POINT_LAST_BUSINESS_DAY
  );
  return dbLastBusinessDate;
}

fetchLastBusinessDate.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export async function registerUser(firebase, email, password) {
  const authUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return authUser;
}

registerUser.propTypes = {
  firebase: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export async function sendPasswordResetEmail(firebase, email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

sendPasswordResetEmail.propTypes = {
  firebase: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
};

export async function sendVerification(firebase) {
  await firebase.auth().currentUser.sendEmailVerification({
    url: config.domain,
  });
}

sendVerification.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export async function logout(firebase) {
  await firebase.auth().signOut();
  clearBackendResponse();
}

logout.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export async function createPortfolio(firebase, userId, stockObj) {
  const buyDate = await fetchLastBusinessDate(firebase);
  const obj = { buyDate: buyDate, stocks: { ...stockObj } };
  const path = `${constants.END_POINT_USERS}/${userId}/portfolio`;
  if (userId) {
    updateObject(firebase, path, obj);
  } else {
    setStocksObject(obj);
  }
}

createPortfolio.propTypes = {
  firebase: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  stockObj: PropTypes.object.isRequired,
};

export async function fetchStockName(firebase, stockCode, language) {
  const path = `${constants.END_POINT_STOCKS}/${stockCode}/name/${language}`;
  const stockName = await fetchFirebase(firebase, path);
  return stockName;
}

createPortfolio.propTypes = {
  firebase: PropTypes.object.isRequired,
  stockCode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export async function fetchStockCodes() {
  // firebase web does not have shallow

  const date = new Date();
  const cachedStockCodes = getStockCodes();
  if (cachedStockCodes && cachedStockCodes.queryDate === date.getDate()) {
    console.log("Getting stocks codes from cache");
    return cachedStockCodes.stockCodes;
  }
  console.log("Fetching stock codes from firebase");
  const path = `${config.databaseURL}/${constants.END_POINT_STOCKS}.json?shallow=true`;
  const resp = await fetch(path, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json_ = await resp.json();
  const stockCodes = Object.keys(json_);
  setStockCodes(stockCodes);
  return stockCodes;
}
