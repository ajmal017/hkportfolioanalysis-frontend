import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import LoadingSpinner from "../../features/loadingSpinner";
import BoldTitle from "../../features/boldTitle";

const errorInitState = "";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: 30,
    marginBottom: 50
  },
  paper: {
    padding: theme.spacing(theme.customForm.paper.paddingSpacing),
    maxWidth: theme.customForm.paper.maxWidth,
    marginTop: "25vh"
  },
  fieldWidth: {
    width: "100%"
  },

}));

const RESET_PW = {
  en: "Reset Password",
  zh: "重設密碼"
};

const SUCCESS = {
  en: "Password reset email has been sent",
  zh: "已發出電郵重設密碼"
};

function ForgotPasswordPage() {
  const locale = "en";
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(errorInitState);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const classes = useStyles();

  function resetErrorState() {
    setError(errorInitState);
  }

  async function handleOnSubmit(e) {
    // e.preventDefault();
    // resetErrorState();
    // if (!email) {
    //   return;
    // }
    // const emailError = validateEmail(email);
    // if (emailError) {
    //   setError(emailError);
    //   return;
    // }
    // setSubmitting(true);
    // try {
    //   await sendPasswordResetEmail(firebase, email);
    //   setNotificationOpen(true);
    // } catch (error) {
    //   setError(error.message);
    // }
    // setSubmitting(false);
  }

  return (
    <Paper className={classes.paper}>
      {submitting && <LoadingSpinner />}
      <BoldTitle>{RESET_PW[locale]}</BoldTitle>
      <form onSubmit={handleOnSubmit} noValidate>
        <TextField
          className={classes.fieldWidth}
          required
          //   label={MISC_LANG.email[locale]}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>

        <Typography color="error" variant="body2" align="center">
          {error}
        </Typography>
      </form>
      {/* <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text={SUCCESS[locale]}
      /> */}
    </Paper>
  );
}

export default ForgotPasswordPage;
