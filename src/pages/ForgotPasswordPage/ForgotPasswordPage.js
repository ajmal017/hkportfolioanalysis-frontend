import React, { useState } from "react";
import PropTypes from "prop-types";

import { useFirebase } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import LoadingSpinner from "../../features/loadingSpinner";
import BoldTitle from "../../features/boldTitle";
import NotificationPopUp from "../../features/notificationPopUp";
import { useLanguage } from "../../utils/customHooks";
import { validateEmail } from "../../utils/helpers";
import { TEXT } from "../../translation";
import { sendPasswordResetEmail } from "../../firebase/crud";

const errorInitState = "";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 30,
    marginBottom: 50,
  },
  paper: {
    padding: theme.spacing(theme.customForm.paper.paddingSpacing),
    maxWidth: theme.customForm.paper.maxWidth,
    position: "absolute",
    transform: "translate(0%, -80%)",
    top: "50%",
  },
  fieldWidth: {
    width: "100%",
  },
}));

export default function ForgotPasswordPage({ history }) {
  const firebase = useFirebase();
  const locale = useLanguage();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(errorInitState);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const classes = useStyles();

  function resetErrorState() {
    setError(errorInitState);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    resetErrorState();
    if (!email) {
      return;
    }
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    setSubmitting(true);
    try {
      await sendPasswordResetEmail(firebase, email);
      setNotificationOpen(true);
    } catch (error) {
      setError(error.message);
    }
    setSubmitting(false);
  }

  return (
    <Paper className={classes.paper}>
      {submitting && <LoadingSpinner />}
      <BoldTitle>{TEXT.resetPassword[locale]}</BoldTitle>
      <form onSubmit={handleOnSubmit} noValidate>
        <TextField
          error={!!error}
          className={classes.fieldWidth}
          required
          label={TEXT.email[locale]}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <Grid container justify="center">
          <Button type="submit" color="primary" variant="contained">
            {TEXT.submit[locale]}
          </Button>
        </Grid>

        <Typography color="error" variant="body2" align="center">
          {error}
        </Typography>
      </form>
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text={TEXT.sendForgotPassword[locale]}
      />
    </Paper>
  );
}

ForgotPasswordPage.propTypes = {
  history: PropTypes.object.isRequired,
};
