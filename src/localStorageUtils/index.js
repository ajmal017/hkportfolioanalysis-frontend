import * as constants from "./constants";

function getFromLocalStorage(item) {
  const data = localStorage.getItem(item);
  return data;
}

function setToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getLastQueryTime() {
  const lastQueryTime = getFromLocalStorage(constants.LAST_FETCH_TIME) || 0;
  return parseInt(lastQueryTime);
}

export function setLastQueryTime(dbLastQueryTime) {
  setToLocalStorage(constants.LAST_FETCH_TIME, dbLastQueryTime);
}

export function getStocksObject() {
  const stocksObject = getFromLocalStorage(constants.STOCKS_OBJ);
  return JSON.parse(stocksObject);
}

export function setStocksObject(stocksObject) {
  setToLocalStorage(constants.STOCKS_OBJ, JSON.stringify(stocksObject));
}

export function getBackendResponse() {
  const backendResponse = getFromLocalStorage(constants.BACKEND_RESPONSE);
  return JSON.parse(backendResponse);
}

export function setBackendResponseObject(backendResponse) {
  setToLocalStorage(
    constants.BACKEND_RESPONSE,
    JSON.stringify(backendResponse)
  );
}

export function setLanguageLocalStorage(language) {
  setToLocalStorage(constants.LANGUAGE, language);
}

export function getLanguage() {
  return getFromLocalStorage(constants.LANGUAGE);
}
