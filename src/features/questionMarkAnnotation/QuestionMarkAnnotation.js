import React, { useState } from "react";
import PropTypes from "prop-types";

import HelpIcon from "@material-ui/icons/Help";
import { makeStyles } from "@material-ui/core/styles";
import { ClickAwayListener, Typography } from "@material-ui/core";

import {TOOLTIP_STYLE} from "../../utils/styles"

const useStyles = makeStyles(theme => ({
  helpIcon: {
    fontSize: 12,
    "&:hover": {
      opacity: "80%"
    }
  },
  annotation: {
    position: "absolute",
    zIndex: 10,
    ...TOOLTIP_STYLE
  }
}));

export default function QuestionMarkAnnotation({ text }) {
  const classes = useStyles();
  const [showBox, setShowBox] = useState("none");

  function handleOnClick() {
    const value = showBox === "none" ? "block" : "none";
    setShowBox(value);
  }
  function handleOnClickAway() {
    setShowBox("none");
  }

  return (
    <sup>
      <ClickAwayListener onClickAway={handleOnClickAway}>
        <HelpIcon className={classes.helpIcon} onClick={handleOnClick} />
      </ClickAwayListener>
      <Typography variant="caption" style={{ display: showBox }} className={classes.annotation}>
        {text}
      </Typography>
    </sup>
  );
}

QuestionMarkAnnotation.propTypes = {
  text: PropTypes.string.isRequired
};
