import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import { NavigationBar } from "../features/navigationBar";
export default function Navigation({ children }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <NavigationBar />
      {children}
    </Grid>
  );
}

Navigation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
