import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useFirebase } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { Title } from "../title";
import { fetchStockName } from "../../firebase/crud";
import InvestmentCard from "./InvestmentCard";
import { usePaperWidth, useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

export default function InvestmentCards({ stocks, currentPortfolio }) {
  const locale = useLanguage();
  const [portfolioList, setPortfolioList] = useState([]);
  const classes = useStyles();
  const displayWidth = usePaperWidth();
  const firebase = useFirebase();
  const language = useLanguage();

  useEffect(() => {
    async function buildObjs() {
      const listToLoop = Object.entries(stocks);
      const data = await Promise.all(
        listToLoop.map(async ([stockCode, money]) => {
          const stockCodeHK = `${stockCode}.HK`;
          const obj = {
            stockCode: stockCodeHK,
            stockOriginalValue: money,
            stockValuePctChange: currentPortfolio[stockCodeHK],
            stockName: await fetchStockName(firebase, stockCode, language),
          };
          return obj;
        })
      );
      setPortfolioList(data);
    }
    buildObjs();
  }, [language]);

  return (
    <Paper className={classes.paper} style={{ width: displayWidth }}>
      <Title>{TEXT.stocks[locale]}</Title>

      {portfolioList.map((dataObj) => (
        <InvestmentCard
          stockCode={dataObj.stockCode}
          stockName={dataObj.stockName}
          stockOriginalValue={dataObj.stockOriginalValue}
          stockValuePctChange={dataObj.stockValuePctChange}
          key={dataObj.stockCode}
        />
      ))}
    </Paper>
  );
}
