import * as constants from "./constants";
import { config } from "./firebase";

// probably needs reconciling

async function doTransaction(firebase, path, value) {
  const ref = firebase.ref(path);
  ref.transaction(curreuntCount => {
    return (curreuntCount || 0) + value;
  });
}

async function fetchFirebase(firebase, endPoint) {
  const ref = firebase.ref(endPoint);
  let result;
  await ref.once("value", snapshot => {
    result = snapshot.val();
  });
  return result;
}

async function pushNewEntry(firebase, path, obj) {
  const ref = firebase.ref(path);
  let isSuccessful = true;
  const snapshot = await ref.push(obj, error => {
    if (error) {
      alert(error);
      isSuccessful = false;
    }
  });
  return { isSuccessful, snapshot };
}

async function setObject(firebase, path, obj) {
  const ref = firebase.ref(path);
  try {
    await ref.set(obj);
    return true;
  } catch (error) {
    // console.log(erorr);
    return false;
  }
}

async function updateObject(firebase, path, obj) {
  const ref = firebase.ref(path);
  try {
    await ref.update(obj);
    return true;
  } catch (error) {
    // console.log(erorr);
    return false;
  }
}

async function deleteObject(firebase, path) {
  const ref = firebase.ref(path);
  try {
    await ref.remove();
    return true;
  } catch (error) {
    // console.log(erorr);
    return false;
  }
}

async function deleteObjectBasedOnValue(firebase, path, key, value) {
  const ref = firebase.ref(path);
  let deleted = false;
  try {
    const snapshot = await ref
      .orderByChild(key)
      .equalTo(value)
      .once("value");
    snapshot.forEach(childSnapshot => {
      ref.child(childSnapshot.key).remove();
      deleted = true;
    });
    return { status: "success", deleted };
  } catch (error) {
    // console.log(erorr);
    return { status: "fail", deleted };
  }
}

export async function fetchLastUpdateTime(firebase) {
  const dbLastUpdateTime = await fetchFirebase(
    firebase,
    constants.END_POINT_LAST_UPDATE_TIME
  );
  return dbLastUpdateTime;
}

export async function fetchProductsObject(firebase) {
  const productsObj = await fetchFirebase(
    firebase,
    constants.END_POINT_PRODUCTS
  );
  return productsObj;
}

export async function pushProductObject(firebase, objToSave) {
  const path = constants.END_POINT_PRODUCTS;
  const { isSuccessful, snapshot } = await pushNewEntry(
    firebase,
    path,
    objToSave
  );
  return { isSuccessful, snapshot };
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
    url: config.domain
  });
}

export async function logout(firebase) {
  await firebase.auth().signOut();
}
