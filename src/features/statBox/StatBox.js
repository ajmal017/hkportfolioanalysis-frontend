import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { convertNumberToPercent } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  smallFont: {
    fontSize: 12,
  },
}));

export function createDataObj(label, value, annualize, percent, useClass = "") {
  return { label, value, annualize, percent, useClass };
}

createDataObj.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  annualize: PropTypes.bool.isRequired,
  percent: PropTypes.bool.isRequired,
  useClass: PropTypes.string,
};

export default function StatBox({
  value,
  label,
  annualize,
  percent,
  useClass = "",
}) {
  const classes = useStyles();
  if (label === "Alpha") {
    value = Math.pow(1 + value, 250) - 1;
  } else {
    value = annualize ? value * Math.sqrt(250) : value;
  }
  value = percent ? convertNumberToPercent(value, 2) : value.toFixed(2);

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="subtitle1" align="center" className={useClass}>
            {value}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.stockName}
            align="center"
          >
            {label}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

StatBox.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  annualize: PropTypes.bool.isRequired,
  percent: PropTypes.bool.isRequired,
  useClass: PropTypes.string,
};
