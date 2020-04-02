import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function BoldTitle({ children }) {
  return (
    <Typography color="secondary" variant="h5" gutterBottom>
      <Box fontWeight="fontWeightBold">{children}</Box>
    </Typography>
  );
}

BoldTitle.propTypes = {
  children: PropTypes.node.isRequired
};
