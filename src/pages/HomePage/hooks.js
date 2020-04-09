import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { BACKEND_SERVER_URL } from "../../backend";
import * as localStorage from "../../localStorageUtils";
import { selectLastBusinessDay } from "../../features/lastBusinessDay/lastBusinessDaySlice";

function createDefaultPortfolio() {
  console.log("Using default Portfolio");
  let buyDate = new Date(new Date().setFullYear(new Date().getFullYear() - 2));
  buyDate = buyDate.toISOString().split("T")[0].replace(/-/g, "");
  const stocks = {
    "0001": 100000,
    "0002": 100000,
    "0003": 100000,
    "0004": 100000,
    "0005": 100000,
  };
  return { buyDate: buyDate, stocks: { ...stocks } };
}

export function useUserPortfolio() {
  let userProfile = useSelector((state) => state.firebase.profile);
  if (!userProfile.isLoaded) {
    return {};
  }
  let userPortfolio = userProfile.portfolio || {};
  if (Object.keys(userPortfolio).length === 0) {
    userPortfolio = localStorage.getStocksObject() || createDefaultPortfolio();
  }
  return userPortfolio;
}

export function useBackendData() {
  const userPortfolio = useUserPortfolio();
  const portfolioIsLoaded = !!Object.keys(userPortfolio).length;
  const lastBusinessDate = useLastBusinessDay();
  const lastBusinessDateIsLoaded = lastBusinessDate !== 0;

  const [backendData, setbackendData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        BACKEND_SERVER_URL + "api/hkportfolioanalysis_bundle",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stockObj: userPortfolio.stocks,
            buyDate: parseInt(userPortfolio.buyDate),
          }),
        }
      );
      const data = await resp.json();
      if (data === "Bad Request") {
        alert("Bad request to server");
      } else {
        setbackendData(data);
        localStorage.setBackendResponseObject(data);
        console.log(`SETTING FETCH DATE ${lastBusinessDate}`);
        localStorage.setLastFetchDate(lastBusinessDate);
      }
    }

    const cachedData = localStorage.getBackendResponse();
    const lastFetchDate = localStorage.getLastFetchDate();
    const hasUpdates = lastFetchDate && lastBusinessDate <= lastFetchDate;
    if (cachedData && hasUpdates) {
      console.log(
        `Getting backend response from local storage. Last fetch time: ${lastFetchDate}`
      );
      setbackendData(cachedData);
    } else {
      if (portfolioIsLoaded && lastBusinessDateIsLoaded) {
        console.log(
          `Not cached. Getting backend response from backend. Last fetch time: ${lastFetchDate}`
        );
        fetchData();
      }
    }
  }, [portfolioIsLoaded, lastBusinessDateIsLoaded, lastBusinessDate]);
  return backendData;
}

export function useLastBusinessDay() {
  const lastBusinessDate = useSelector(selectLastBusinessDay);
  return lastBusinessDate;
}
