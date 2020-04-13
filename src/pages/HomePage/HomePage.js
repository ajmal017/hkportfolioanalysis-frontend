import React from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import Grid from "@material-ui/core/Grid";

import { PortfolioDoughnut } from "../../features/portfolioDoughnut";
import { CorrelationMatrix } from "../../features/correlationMatrix";
import { InvestmentCards } from "../../features/investmentCards";
import { PortfolioStats } from "../../features/portfolioStats";
import { EquityCurve } from "../../features/equityCurve";
import { Disclaimer } from "../../features/disclaimer";

import * as hooks from "./hooks";
import { checkFilledObject } from "../../utils/helpers";
import {
  correlationMiddleware,
  portfolioDoughnutStocksMiddleware,
} from "./middleware";
import { fetchLastBusinessDateRedux } from "../../features/lastBusinessDay/lastBusinessDaySlice";
import LoadingSpinner from "../../features/loadingSpinner";
import { useIsMobile, useLanguage } from "../../utils/customHooks";
import {TEXT} from "../../translation";

const CONTENT = {
  en:
    "Monitor your Hong Kong portfolio with our dashboard. Key Performance Indicators: Alpha, Beta, Sharpe, Sortino, Max. Drawdown, Correlation provided.",
  zh:
    "監控你的香港股票投資組合. 我們提供: 阿爾法, 貝塔, 夏普, 索提諾, 最大回撤, 相關等指標.",
};

function sum(items) {
  return items.reduce(function (a, b) {
    return a + b;
  }, 0);
}

export default function HomePage({ history }) {
  const dispatch = useDispatch();
  const isFirebaseLoaded = useSelector(
    (state) => state.firebase.profile.isLoaded
  );
  if (isFirebaseLoaded) {
    dispatch(fetchLastBusinessDateRedux());
  }
  const isMobile = useIsMobile();

  const userPortfolio = hooks.useUserPortfolio();
  const backendData = hooks.useBackendData();

  let localeURL = history.location.pathname.replace("/", ""); // must use url for seo
  const locale = useLanguage();
  const horizontalSpacing = 4;
  const verticalSpacing = isMobile ? 0 : 4;

  return (
    <div>
      <Disclaimer>{TEXT.disclaimer[locale]}</Disclaimer>
      {checkFilledObject(backendData) && checkFilledObject(userPortfolio) ? (
        <Grid
          container
          direction="row"
          spacing={verticalSpacing}
          justify="center"
        >
          <Grid item>
            <Grid
              container
              spacing={horizontalSpacing}
              direction="column"
              justify="center"
            >
              <Grid item>
                <PortfolioDoughnut
                  stocks={portfolioDoughnutStocksMiddleware(
                    userPortfolio.stocks,
                    backendData.equityCurves[
                      backendData.equityCurves.length - 1
                    ]
                  )}
                  portfolioOriginalAmount={sum(
                    Object.values(userPortfolio.stocks)
                  )}
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
              spacing={horizontalSpacing}
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
                  data={correlationMiddleware(backendData.correlation_matrix)}
                />
              </Grid>
              <Grid item>
                <InvestmentCards
                  stocks={userPortfolio.stocks}
                  currentPortfolio={
                    backendData.equityCurves[
                      backendData.equityCurves.length - 1
                    ]
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <LoadingSpinner />
      )}

      <Helmet>
        <meta name="description" content={CONTENT[localeURL]} />
      </Helmet>
    </div>
  );
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};
