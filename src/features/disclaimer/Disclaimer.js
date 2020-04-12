import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function Disclaimer({ children }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography color="secondary" variant="body2" align="center">
        {children}
      </Typography>
    </Paper>
  );
}

Disclaimer.propTypes = {
  children: PropTypes.node.isRequired,
};
