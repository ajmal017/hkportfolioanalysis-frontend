import PropTypes from "prop-types";
import * as constants from "./constants";

function getFromLocalStorage(item) {
  const data = localStorage.getItem(item);
  return data;
}

getFromLocalStorage.propTypes = {
  item: PropTypes.string.isRequired,
};

function setToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

setToLocalStorage.propTypes = {
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export function getLastFetchDate() {
  const lastFetchDate = getFromLocalStorage(constants.LAST_FETCH_TIME) || 0;
  return parseInt(lastFetchDate);
}

export function setLastFetchDate(dbLastQueryTime) {
  setToLocalStorage(constants.LAST_FETCH_TIME, dbLastQueryTime);
}

setLastFetchDate.propTypes = {
  dbLastQueryTime: PropTypes.number.isRequired,
};

export function getStocksObject() {
  const stocksObject = getFromLocalStorage(constants.STOCKS_OBJ);
  return JSON.parse(stocksObject);
}

export function setStocksObject(stocksObject) {
  setToLocalStorage(constants.STOCKS_OBJ, JSON.stringify(stocksObject));
}

setStocksObject.propTypes = {
  stocksObject: PropTypes.object.isRequired,
};

export function getBackendResponse() {
  const backendResponse = getFromLocalStorage(constants.BACKEND_RESPONSE);
  return JSON.parse(backendResponse);
}

export function clearBackendResponse() {
  console.log("Clearing backend response from local storage");
  localStorage.removeItem(constants.BACKEND_RESPONSE);
}

export function setBackendResponseObject(backendResponse) {
  setToLocalStorage(
    constants.BACKEND_RESPONSE,
    JSON.stringify(backendResponse)
  );
}

setBackendResponseObject.propTypes = {
  backendResponse: PropTypes.object.isRequired,
};

export function setLanguageLocalStorage(language) {
  setToLocalStorage(constants.LANGUAGE, language);
}

setLanguageLocalStorage.propTypes = {
  language: PropTypes.string.isRequired,
};

export function getLanguage() {
  return getFromLocalStorage(constants.LANGUAGE);
}

export function clearAll() {
  localStorage.clear();
}

export function getStockCodes() {
  return JSON.parse(getFromLocalStorage(constants.STOCK_CODES));
}

export function setStockCodes(stockCodes) {
  const date = new Date();
  const obj = {
    stockCodes,
    queryDate: date.getDate(),
  };
  setToLocalStorage(constants.STOCK_CODES, JSON.stringify(obj));
}

setStockCodes.propTypes = {
  stockCodes: PropTypes.object.isRequired,
};
