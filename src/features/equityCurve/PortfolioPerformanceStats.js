import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { StatBox, createDataObj } from "../statBox";
import { useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";

const useStyles = makeStyles(theme => ({
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

export default function PortfolioPerformanceStats({
  maxDrawdown,
  portfolioReturn,
  marketReturn
}) {
  const locale = useLanguage();
  const classes = useStyles();
  function chooseClassToUse(value) {
    return clsx({
      [classes.stockIncreased]: value > 0,
      [classes.stockDecreased]: value < 0,
      [classes.stockNoChange]: value === 0
    });
  }

  const stats = [
    createDataObj(
      TEXT.maxDD[locale],
      maxDrawdown,
      false,
      true,
      chooseClassToUse(maxDrawdown)
    ),
    createDataObj(
      TEXT.portfolio[locale],
      portfolioReturn,
      false,
      true,
      chooseClassToUse(portfolioReturn)
    ),
    createDataObj(
      TEXT.hsi[locale],
      marketReturn,
      false,
      true,
      chooseClassToUse(marketReturn)
    )
  ];

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={2}
      justify="space-evenly"
    >
      {stats.map(dataObj => (
        <StatBox
          key={dataObj.label}
          value={dataObj.value}
          label={dataObj.label}
          annualize={dataObj.annualize}
          percent={dataObj.percent}
          useClass={dataObj.useClass}
        />
      ))}
    </Grid>
  );
}
PortfolioPerformanceStats.propTypes = {
  maxDrawdown: PropTypes.number.isRequired,
  portfolioReturn: PropTypes.number.isRequired,
  marketReturn: PropTypes.number.isRequired
};
