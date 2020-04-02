import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -25,
    marginTop: -25
  }
}));

export default function LoadingSpinner() {
  const classes = useStyles();
  return <CircularProgress className={classes.loading} />;
}
