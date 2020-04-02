import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { Title } from "../title";
import { usePaperWidth } from "../../utils/customHooks";

import InvestmentCard from "./InvestmentCard";

const data01 = [
  {
    stockCode: "0700.HK",
    stockName: "Tencent",
    stockOriginalValue: 1000000,
    stockValuePctChange: 0.223124215
  },
  {
    stockCode: "0005.HK",
    stockName: "Cheung Kong",
    stockOriginalValue: 100000,
    stockValuePctChange: -0.26162461
  },
  {
    stockCode: "0003.HK",
    stockName: "HK Light",
    stockOriginalValue: 10000,
    stockValuePctChange: -0.51231561
  },
  {
    stockCode: "2800.HK",
    stockName: "ETF",
    stockOriginalValue: 10000,
    stockValuePctChange: 0.5125125
  },
  {
    stockCode: "87000.HK",
    stockName: "Stock with long ass name shitttttt",
    stockOriginalValue: 10000,
    stockValuePctChange: 0
  }
];

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto"
  }
}));

export default function InvestmentCards({ stocksObj }) {
  const classes = useStyles();
  const displayWidth = usePaperWidth();

  return (
    <Paper className={classes.paper} style={{ width: displayWidth }}>
      <Title>Investment</Title>

      {data01.map(dataObj => (
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
