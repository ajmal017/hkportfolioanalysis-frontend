import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

// import { HelmetWrapper } from "../../components";
import { PortfolioDoughnut } from "../../features/portfolioDoughnut";
import { CorrelationMatrix } from "../../features/correlationMatrix";
import { InvestmentCards } from "../../features/investmentCards";
import { PortfolioStats } from "../../features/portfolioStats";
import { EquityCurve } from "../../features/equityCurve";

import { BACKEND_SERVER_URL } from "../../backend";

import { correlation_middleware } from "./middleware";
import {
  getBackendResponse,
  setBackendResponseObject
} from "../../localStorageUtils";

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto"
  }
}));

const TITLE = {
  "en/": "Petangle - Your Pet's Nutrition Table",
  "zh/": "Petangle - 你的寵物糧食營養網"
};

const CONTENT = {
  "en/":
    "Find the best products for your pet with our nutrition database. 500+ cat & dog dry food/wet food/snack. Find high protein and low carb food.",
  "zh/":
    "為你的貓狗尋找最好的糧食。500+ 貓狗糧、乾糧、濕糧、小食營養。找高蛋白質低碳水化合物"
};

const firebaseResp = {
  // https://firebase.google.com/docs/database/web/lists-of-data#sort_data
  "2020-03-01": {
    "0700": {
      amount: 500000
    },
    "0003": {
      amount: 100000
    }
  }
};
const spacing = 4;
const lastBusinessDay = "2020-03-27";

function HomePage({ history }) {
  const classes = useStyles();
  //   const reduxLocale = useLanguage();
  let currentLanguage = history.location.pathname.replace("/", "");

  //   if (!currentLanguage && currentLanguage !== reduxLocale) {
  //     history.push(`${reduxLocale}/`);
  //   }

  const [backendData, setbackendData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        BACKEND_SERVER_URL + "api/hkportfolioanalysis_bundle",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            stockList: [
              "0700.HK",
              "0003.HK",
              "0823.HK",
              "0001.HK",
              "0005.HK",
              "2800.HK"
            ],
            moneyList: [1000000, 1000000, 100000, 100000, 100000, 100000],
            buyDate: "2020-03-10"
          })
        }
      );
      const data = await resp.json();
      setbackendData(data);
      setBackendResponseObject(data);
    }
    const cached = getBackendResponse();
    if (cached) {
      console.log("Getting backend response from local storage");
      setbackendData(cached);
      console.log("Got backend response from local storage");

    } else {
      console.log("Not cached. Getting backend response from backend");
      fetchData();
    }
  }, []);

  return (
    <div>
      {Object.keys(backendData).length > 0 && (
        <Grid container direction="row" spacing={spacing} justify="center">
          <Grid item>
            <Grid
              container
              direction="column"
              spacing={spacing}
              justify="center"
            >
              <Grid item>
                <PortfolioDoughnut
                  portfolioOriginalAmount={100000} // from firebase
                  pnlPercent={
                    backendData.equityCurves[
                      backendData.equityCurves.length - 1
                    ].portfolio
                  }
                  lastBusinessDay={lastBusinessDay}
                />
              </Grid>
              <Grid item>
                <EquityCurve equityCurveObjArray={backendData.equityCurves} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              spacing={spacing}
              justify="center"
            >
              <Grid item>
                <PortfolioStats
                  hedgeLot={backendData.hedge.lot}
                  hedgeProduct={backendData.hedge.hedge_product}
                  alpha={backendData.linearRegression.alpha}
                  beta={backendData.linearRegression.beta}
                  sharpe={backendData.sharpe}
                  sortino={backendData.sortino}
                />
              </Grid>

              <Grid item>
                <CorrelationMatrix
                  data={correlation_middleware(backendData.correlation_matrix)}
                />
              </Grid>
              <Grid item>
                <InvestmentCards
                  stocksObj={
                    backendData.equityCurves[
                      backendData.equityCurves.length - 1
                    ]
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* <HelmetWrapper
        title={TITLE[currentLanguage]}
        content={CONTENT[currentLanguage]}
      />

      <ProductsTableContainer history={history} /> */}
    </div>
  );
}

export default HomePage;
