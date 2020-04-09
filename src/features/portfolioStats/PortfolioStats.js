import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { Title } from "../title";
import { QuestionMarkAnnotation } from "../questionMarkAnnotation";
import { StatBox, createDataObj } from "../statBox";
import { usePaperWidth, useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  paper2: {
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  hedgeText: {
    marginTop: theme.spacing(2),
  },
  hedgeTextStrong: {
    fontWeight: 600,
  },
  smallFont: {
    fontSize: 12,
  },
  icon: {
    fontSize: 12,
  },
}));

export default function PortfolioStats({
  hedgeLot,
  hedgeProduct,
  alpha,
  beta,
  sharpe,
  sortino,
}) {
  const classes = useStyles();
  const displayWidth = usePaperWidth();
  const locale = useLanguage();

  const data01 = [
    createDataObj(TEXT.alpha[locale], alpha, true, true),
    createDataObj(TEXT.beta[locale], beta, false, false),
    createDataObj(TEXT.sharpe[locale], sharpe, true, false),
    createDataObj(TEXT.sortino[locale], sortino, true, false),
  ];

  return (
    <Paper className={classes.paper} style={{ width: displayWidth }}>
      <Title>
        {TEXT.statistics[locale]}
        <QuestionMarkAnnotation text={TEXT.calculations[locale]} />
      </Title>

      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={2}
        justify="space-evenly"
      >
        {data01.map((dataObj) => (
          <StatBox
            key={dataObj.label}
            value={dataObj.value}
            label={dataObj.label}
            annualize={dataObj.annualize}
            percent={dataObj.percent}
          />
        ))}
      </Grid>
      <HedgeText lot={hedgeLot} hedgeProduct={hedgeProduct} />
    </Paper>
  );
}

function HedgeText({ lot, hedgeProduct }) {
  const classes = useStyles();
  const locale = useLanguage();

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography
            variant="body2"
            className={clsx(classes.hedgeText, classes.smallFont)}
          >
            {TEXT.hedge[locale]}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.smallFont}>
            {<span className={classes.hedgeTextStrong}>{lot.toFixed(2)} </span>}
            {TEXT.contracts[locale]}
            {<span className={classes.hedgeTextStrong}> {hedgeProduct} </span>}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

PortfolioStats.propTypes = {
  hedgeLot: PropTypes.number.isRequired,
  hedgeProduct: PropTypes.string.isRequired,
  alpha: PropTypes.number.isRequired,
  beta: PropTypes.number.isRequired,
  sharpe: PropTypes.number.isRequired,
  sortino: PropTypes.number.isRequired,
};

HedgeText.propTypes = {
  lot: PropTypes.number.isRequired,
  hedgeProduct: PropTypes.string.isRequired,
};
