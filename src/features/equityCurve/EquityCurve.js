import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import { AreaChart, Tooltip, Area, XAxis, YAxis } from "recharts";

import { Title } from "../title";
import { usePaperWidth, useLanguage } from "../../utils/customHooks";
import PortfolioPerformanceStats from "./PortfolioPerformanceStats";
import { TOOLTIP_STYLE } from "../../utils/styles";
import { TEXT } from "../../translation";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

function toPercentage(number) {
  return (number * 100).toFixed(2);
}

function formatData(obj) {
  return {
    HSI: toPercentage(obj["^HSI"]),
    Portfolio: toPercentage(obj["portfolio"]),
    date: obj["date"],
  };
}

function minOfArrayObj(arrayObject) {
  let min_ = Infinity;
  arrayObject.forEach((obj) => {
    min_ = Math.min(min_, obj.Portfolio, obj.HSI);
  });
  return min_;
}

function maxOfArrayObj(arrayObject) {
  let max_ = -Infinity;
  arrayObject.forEach((obj) => {
    max_ = Math.max(max_, obj.Portfolio, obj.HSI);
  });
  return max_;
}

function calculateMaxDrawdown(array) {
  if (array.length <= 1) {
    return 0;
  }
  let maxDD = 0;
  let maxNum = -Infinity;
  array.forEach((num) => {
    maxNum = Math.max(maxNum, num);
    maxDD = Math.min(maxDD, num / maxNum - 1);
  });
  return maxDD;
}

const STROKE_COLOR = "#678DDA";

export default function EquityCurve({ equityCurveObjArray }) {
  const locale = useLanguage();

  const classes = useStyles();
  const displayWidth = usePaperWidth();

  const graphWidth = Math.min(displayWidth * 0.9, 350);
  const data = equityCurveObjArray.map((elem) => formatData(elem));
  const lastObj = equityCurveObjArray[equityCurveObjArray.length - 1];

  const yAxisMin = Math.floor(minOfArrayObj(data) / 5) * 5;
  const yAxisMax = Math.ceil(maxOfArrayObj(data) / 5) * 5;
  let yTicks = [0, yAxisMax, yAxisMin].sort();

  const portfolioEquityCurve = equityCurveObjArray.map(
    (obj) => obj.portfolio + 1
  );

  return (
    <Paper className={classes.paper} style={{ width: displayWidth }}>
      <Title>{TEXT.portfolio[locale]}</Title>
      <AreaChart
        width={graphWidth}
        height={250}
        data={data}
        margin={{ left: -40 }}
      >
        <defs>
          <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={STROKE_COLOR} stopOpacity={0.7} />
            <stop offset="100%" stopColor={STROKE_COLOR} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#7986a3" tick={{ fontSize: 10 }} />
        <YAxis
          type="number"
          domain={[yAxisMin, yAxisMax]}
          ticks={yTicks}
          stroke="#7986a3"
          tick={{ fontSize: 10 }}
        />
        <Tooltip content={(props) => tooltipContent(props, locale)} />
        <Area type="monotone" dataKey="HSI" stroke="#6D7693" fill="url()" />
        <Area
          type="monotone"
          dataKey="Portfolio"
          stroke={STROKE_COLOR}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPortfolio)"
        />
      </AreaChart>
      <PortfolioPerformanceStats
        maxDrawdown={calculateMaxDrawdown(portfolioEquityCurve)}
        portfolioReturn={lastObj.portfolio}
        marketReturn={lastObj["^HSI"]}
      />
    </Paper>
  );
}

function tooltipContent(tooltipProps, locale) {
  const popUpObjList = tooltipProps.payload;
  if (popUpObjList.length > 0) {
    const obj = popUpObjList[0].payload;
    return (
      <div style={TOOLTIP_STYLE}>
        <Typography>{obj.date}</Typography>
        <Typography variant="body2" color="textSecondary">
          {`${TEXT.portfolio[locale]}: ${obj.Portfolio}%`}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {`${TEXT.hsi[locale]}: ${obj.HSI}%`}
        </Typography>
      </div>
    );
  } else {
    return null;
  }
}
