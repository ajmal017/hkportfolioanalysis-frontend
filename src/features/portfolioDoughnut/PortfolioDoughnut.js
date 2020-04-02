import React from "react";
import clsx from "clsx";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { PieChart, Pie, Sector, Legend, Tooltip, Cell, Label } from "recharts";

import { Title } from "../title";
import {
  convertNumberToPercent,
  formatNumberToHumanReadable
} from "../../utils/helpers";
import { usePaperWidth } from "../../utils/customHooks";
import { TOOLTIP_STYLE } from "../../utils/styles";
import { QUALITATIVE_COLOR_SCHEME } from "../../colorsTheme";

const data01 = [
  { name: "0700.HK", value: 100 },
  { name: "2800.HK", value: 200 },
  { name: "0005.HK", value: 300 },
  { name: "0003.HK", value: 400 }
];

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto"
  },
  doughnut: {
    width: 300,
    height: 300
  },
  labelTop: {
    fill: theme.palette.white,
    margin: theme.spacing(2)
  },
  stockIncreased: {
    color: theme.palette.stockColor.increased
  },
  stockDecreased: {
    color: theme.palette.stockColor.decreased
  },
  stockNoChange: {
    color: theme.palette.stockColor.noChange
  }
}));

export default function PortfolioDoughnut({
  portfolioOriginalAmount,
  pnlPercent,
  lastBusinessDay
}) {
  const displayWidth = usePaperWidth();

  const portfolioCurrentAmount = portfolioOriginalAmount * (1 + pnlPercent);
  const pnl = portfolioCurrentAmount - portfolioOriginalAmount;

  const classes = useStyles();

  const classToUse = clsx({
    [classes.stockIncreased]: pnl > 0,
    [classes.stockDecreased]: pnl < 0,
    [classes.stockNoChange]: pnl === 0
  });

  let pnlToShow = formatNumberToHumanReadable(pnl, 0);

  return (
    <Paper className={classes.paper} style={{ width: displayWidth }}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={9}>
          <Title>Summary</Title>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" align="right" color="textSecondary">
            {lastBusinessDay}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-around"
      >
        <Grid item>
          <PieChart width={200} height={200} margin={{ left: -15 }}>
            <Pie
              dataKey="value"
              data={data01}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={70}
              paddingAngle={2}
            >
              <Label
                value={`${formatNumberToHumanReadable(
                  portfolioCurrentAmount,
                  0
                )}`}
                position="centerBottom"
                className={classes.labelTop}
                fontSize="23px"
              />
              <Label
                value={`${data01.length} stocks`}
                position="centerTop"
                className={classes.labelBottom}
                style={{
                  fill: "rgba(255, 255, 255, 0.8)",
                  transform: "translate(0, 5px)"
                }}
              />
              {data01.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    QUALITATIVE_COLOR_SCHEME[
                      index % QUALITATIVE_COLOR_SCHEME.length
                    ]
                  }
                  stroke={null}
                />
              ))}
            </Pie>
            <Tooltip
              content={props => tooltipContent(props, portfolioCurrentAmount)}
            />
          </PieChart>
        </Grid>
        <Grid item style={{ marginLeft: -40 }}>
          <Typography variant="h5" align="right" className={classToUse}>
            {`${pnlToShow}`}
          </Typography>
          <Typography variant="subtitle1" align="right" className={classToUse}>
            {convertNumberToPercent(pnlPercent, 1)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

function tooltipContent(tooltipProps, portfolioCurrentAmount) {
  const popUpObjList = tooltipProps.payload;
  if (popUpObjList.length > 0) {
    const popUpObj = popUpObjList[0];
    let proportion = popUpObj.value / portfolioCurrentAmount;
    proportion = convertNumberToPercent(proportion, 2);

    return (
      <div style={TOOLTIP_STYLE}>
        <Typography>{popUpObj.name}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`Value: $${popUpObj.value}`}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`Portion: ${proportion}`}</Typography>
      </div>
    );
  } else {
    return null;
  }
}
