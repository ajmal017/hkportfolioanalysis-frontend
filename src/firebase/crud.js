import * as constants from "./constants";
import { config } from "./firebase";
import { setStocksObject, clearBackendResponse } from "../localStorageUtils";

async function fetchFirebase(firebase, endPoint) {
  const ref = firebase.ref(endPoint);
  let result;
  await ref.once("value", (snapshot) => {
    result = snapshot.val();
  });
  return result;
}

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

async function deleteObjectBasedOnValue(firebase, path, key, value) {
  const ref = firebase.ref(path);
  let deleted = false;
  try {
    const snapshot = await ref.orderByChild(key).equalTo(value).once("value");
    snapshot.forEach((childSnapshot) => {
      ref.child(childSnapshot.key).remove();
      deleted = true;
    });
    return { status: "success", deleted };
  } catch (error) {
    // console.log(erorr);
    return { status: "fail", deleted };
  }
}

export async function fetchLastBusinessDate(firebase) {
  const dbLastBusinessDate = await fetchFirebase(
    firebase,
    constants.END_POINT_LAST_BUSINESS_DAY
  );
  return dbLastBusinessDate;
}

export async function registerUser(firebase, email, password) {
  const authUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return authUser;
}

export async function sendPasswordResetEmail(firebase, email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

export async function sendVerification(firebase) {
  await firebase.auth().currentUser.sendEmailVerification({
    url: config.domain,
  });
}

export async function logout(firebase) {
  await firebase.auth().signOut();
  clearBackendResponse();
}

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

export async function fetchStockName(firebase, stockCode, language) {
  const path = `${constants.END_POINT_STOCKS}/${stockCode}/name/${language}`;
  const stockName = await fetchFirebase(firebase, path);
  return stockName;
}
