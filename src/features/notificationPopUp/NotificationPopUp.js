import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  notification: {
    zIndex: 10000,
  },
}));

export default function NotificationPopUp({ active, setState, text }) {
  const classes = useStyles();

  function handleClose() {
    setState(false);
  }

  return (
    <Snackbar
      className={classes.notification}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={active}
      onClose={handleClose}
      autoHideDuration={2000}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{text}</span>}
    />
  );
}
