import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useFirebase } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import LoadingSpinner from "../../features/loadingSpinner";
import BoldTitle from "../../features/boldTitle";

import { registerUser, sendVerification } from "../../firebase/crud";
import { PAGE_HOME } from "../../layouts/constants";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: 30,
    marginBottom: 50
  },
  fieldWidth: {
    width: "100%"
  },
  paper: {
    padding: theme.spacing(theme.customForm.paper.paddingSpacing),
    maxWidth: theme.customForm.paper.maxWidth,
    marginTop: "25vh"
  }
}));

const errorInitState = "";

const REGISTER = {
  en: "Register",
  zh: "登錄"
};

const PASSWORD = {
  en: "Password",
  zh: "密碼"
};

const CONFIRM_PASSWORD = {
  en: "Confirm Password",
  zh: "確認密碼"
};

function RegisterPage({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(errorInitState);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const locale = "en";
  const classes = useStyles();
  const firebase = useFirebase();

  function resetErrorState() {
    setError(errorInitState);
  }

  useEffect(() => {
    if (!!!password || !!!password2) {
      return;
    }
    if (password !== password2) {
      setError("Passwords are different");
    } else {
      resetErrorState();
    }
  }, [password, password2]);

  async function handleOnSubmit(e) {
    e.preventDefault()
    setError("");
    setRegistering(true)
    const authUser = await registerUser(firebase, email, password);
    console.log(authUser)
    try {
      await sendVerification(firebase);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setNotificationOpen(true);
      history.push(PAGE_HOME);
    }
    setRegistering(false)
  }

  return (
    <Paper className={classes.paper}>
      {registering && <LoadingSpinner />}
      <BoldTitle>{REGISTER[locale]}</BoldTitle>
      <form onSubmit={handleOnSubmit} noValidate className={classes.form}>
        <TextField
          className={classes.fieldWidth}
          required
          //   label={MISC_LANG.email[locale]}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          className={classes.fieldWidth}
          required
          label={PASSWORD[locale]}
          type="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          className={classes.fieldWidth}
          required
          label={CONFIRM_PASSWORD[locale]}
          type="password"
          onChange={e => {
            setPassword2(e.target.value);
          }}
        />
        <br />
        <br />
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
      <Typography color="error" variant="body2" align="center">
        {error}
      </Typography>
    </Paper>
  );
}

export default RegisterPage;
