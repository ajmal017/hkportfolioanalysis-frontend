import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import {
  convertNumberToPercent,
  formatNumberToHumanReadable,
} from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: theme.spacing(2),
    background: theme.palette.elavatedPaper,
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

export default function InvestmentCard({
  stockCode,
  stockName,
  stockOriginalValue,
  stockValuePctChange,
}) {
  const classes = useStyles();
  const stockValueChange = stockOriginalValue * stockValuePctChange;
  const stockNewValue = formatNumberToHumanReadable(
    stockOriginalValue + stockValueChange,
    0
  );
  const stockChangeText = `${formatNumberToHumanReadable(
    stockValueChange,
    0
  )} (${convertNumberToPercent(stockValuePctChange, 2)})`;

  const classToUse = clsx({
    [classes.stockIncreased]: stockValueChange > 0,
    [classes.stockDecreased]: stockValueChange < 0,
    [classes.stockNoChange]: stockValueChange === 0,
  });

  return (
    <Paper className={classes.paper} elevation={2}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={7}>
          <Typography variant="subtitle1">{stockCode}</Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.stockName}
          >
            {stockName}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="subtitle1" align="right">
            {stockNewValue.toLocaleString()}
          </Typography>
          <Typography
            color="textSecondary"
            align="right"
            className={classToUse}
            style={{ fontSize: 12 }}
          >
            {stockChangeText}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

InvestmentCard.propTypes = {
  stockCode: PropTypes.string.isRequired,
  stockName: PropTypes.string.isRequired,
  stockOriginalValue: PropTypes.number.isRequired,
  stockValuePctChange: PropTypes.number.isRequired,
};
