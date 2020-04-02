import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  text: {
    paddingBottom: theme.spacing(1),
  },
}));


export default function Title({children}) {
  const classes = useStyles();

  return <Typography variant="h6" className={classes.text}>{children}</Typography>;
}

Title.propTypes = {
  children: PropTypes.node.isRequired
};
