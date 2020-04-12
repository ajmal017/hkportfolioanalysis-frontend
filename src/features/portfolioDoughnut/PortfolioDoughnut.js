import React from "react";
import clsx from "clsx";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { PieChart, Pie, Tooltip, Cell, Label } from "recharts";

import { Title } from "../title";
import {
  convertNumberToPercent,
  formatNumberToHumanReadable,
} from "../../utils/helpers";
import { usePaperWidth, useLastBusinessDay } from "../../utils/customHooks";
import { TOOLTIP_STYLE } from "../../utils/styles";
import { QUALITATIVE_COLOR_SCHEME } from "../../colorsTheme";
import { useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  doughnut: {
    width: 300,
    height: 300,
  },
  labelTop: {
    fill: theme.palette.white,
    margin: theme.spacing(2),
  },
  stockIncreased: {
    color: theme.palette.stockColor.increased,
  },
  stockDecreased: {
    color: theme.palette.stockColor.decreased,
  },
  stockNoChange: {
    color: theme.palette.stockColor.noChange,
  },
}));

function sumObjectProperty(items, prop) {
  return items.reduce(function (a, b) {
    return a + b[prop];
  }, 0);
}

function formatDate(date) {
  date = date.toString();
  if (date.length === 8) {
    date = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  }
  return date;
}

export default function PortfolioDoughnut({ stocks, portfolioOriginalAmount }) {
  const displayWidth = usePaperWidth();
  const lastBusinessDay = useLastBusinessDay();
  const portfolioCurrentAmount = sumObjectProperty(stocks, "value");
  const pnl = portfolioCurrentAmount - portfolioOriginalAmount;

  const classes = useStyles();

  return (
    <Paper className={classes.paper} style={{ width: displayWidth }}>
      <Header lastBusinessDay={lastBusinessDay} />
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-around"
      >
        <Grid item>
          <PortfolioPieChart
            portfolioCurrentAmount={portfolioCurrentAmount}
            stocks={stocks}
            noOfStocks={stocks.length}
          />
        </Grid>
        <Grid item style={{ marginLeft: -40 }}>
          <PnL
            pnl={pnl}
            pnlPerc={portfolioCurrentAmount / portfolioOriginalAmount - 1}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

function Header({ lastBusinessDay }) {
  const locale = useLanguage();

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={9}>
        <Title>{TEXT.summary[locale]}</Title>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" align="right" color="textSecondary">
          {formatDate(lastBusinessDay)}
        </Typography>
      </Grid>
    </Grid>
  );
}

function PnL({ pnl, pnlPerc }) {
  const classes = useStyles();
  const classToUse = clsx({
    [classes.stockIncreased]: pnl > 0,
    [classes.stockDecreased]: pnl < 0,
    [classes.stockNoChange]: pnl === 0,
  });

  return (
    <div>
      <Typography variant="h5" align="right" className={classToUse}>
        {formatNumberToHumanReadable(pnl, 0)}
      </Typography>
      <Typography variant="subtitle1" align="right" className={classToUse}>
        {convertNumberToPercent(pnlPerc, 1)}
      </Typography>
    </div>
  );
}

function PortfolioPieChart({ portfolioCurrentAmount, stocks, noOfStocks }) {
  const classes = useStyles();
  const locale = useLanguage();

  let fontSize = 23;
  if (portfolioCurrentAmount >= 100000000) {
    fontSize = 19
  } else if (portfolioCurrentAmount >= 10000000){
    fontSize = 21
  }
  return (
    <PieChart width={200} height={200} margin={{ left: -15 }}>
      <Pie
        dataKey="value"
        data={stocks}
        cx={100}
        cy={100}
        innerRadius={60}
        outerRadius={70}
        paddingAngle={2}
      >
        <Label
          value={`${formatNumberToHumanReadable(portfolioCurrentAmount, 0)}`}
          position="centerBottom"
          className={classes.labelTop}
          fontSize={`${fontSize}px`}
        />
        <Label
          value={`${noOfStocks} ${TEXT.stocks[locale]}`}
          position="centerTop"
          className={classes.labelBottom}
          style={{
            fill: "rgba(255, 255, 255, 0.8)",
            transform: "translate(0, 5px)",
          }}
        />
        {stocks.map((entry, index) => (
          <Cell
            key={index}
            fill={
              QUALITATIVE_COLOR_SCHEME[index % QUALITATIVE_COLOR_SCHEME.length]
            }
            stroke={null}
          />
        ))}
      </Pie>
      <Tooltip
        content={(props) =>
          tooltipContent(props, portfolioCurrentAmount, locale)
        }
      />
    </PieChart>
  );
}

function tooltipContent(tooltipProps, portfolioCurrentAmount, locale) {
  const popUpObjList = tooltipProps.payload;
  if (popUpObjList.length > 0) {
    const popUpObj = popUpObjList[0];
    let proportion = popUpObj.value / portfolioCurrentAmount;
    proportion = convertNumberToPercent(proportion, 2);

    return (
      <div style={TOOLTIP_STYLE}>
        <Typography>{popUpObj.name}</Typography>
        <Typography variant="body2" color="textSecondary">{`${
          TEXT.value[locale]
        }: ${formatNumberToHumanReadable(popUpObj.value, 0)}`}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${TEXT.portion[locale]}: ${proportion}`}</Typography>
      </div>
    );
  } else {
    return null;
  }
}
