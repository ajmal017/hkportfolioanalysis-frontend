import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useFirebase } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import LoadingSpinner from "../../features/loadingSpinner";
import BoldTitle from "../../features/boldTitle";
import {
  PAGE_HOME,
  PAGE_REGISTER,
  PAGE_FORGOT_PW,
} from "../../layouts/constants";
import { clearBackendResponse } from "../../localStorageUtils";
import { useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
  form: {
    marginTop: 30,
    marginBottom: 50,
  },
  fieldWidth: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(theme.customForm.paper.paddingSpacing),
    maxWidth: theme.customForm.paper.maxWidth,
    top: "50%",
    position: "absolute",
    transform: "translate(0%, -60%)",
  },
}));

const errorInitState = "";

export default function LoginForm({ history }) {
  const locale = useLanguage();
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(errorInitState);

  const classes = useStyles();

  function resetErrorState() {
    setError(errorInitState);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    resetErrorState();
    if (!email || !password) {
      return;
    }
    setLoggingIn(true);
    try {
      clearBackendResponse();
      await firebase.login({ email, password });
      history.push(PAGE_HOME);
    } catch (error) {
      const errorCode =
        error.code === "auth/wrong-password"
          ? TEXT.wrongPassword[locale]
          : error.message;
      setError(errorCode);
    }
    setLoggingIn(false);
  }

  return (
    <Paper className={classes.paper}>
      {loggingIn && <LoadingSpinner />}
      <BoldTitle>{TEXT.welcome[locale]}</BoldTitle>
      <form onSubmit={handleOnSubmit} noValidate className={classes.form}>
        <TextField
          className={classes.fieldWidth}
          required
          label={TEXT.email[locale]}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          className={classes.fieldWidth}
          required
          autoComplete="current-password"
          label={TEXT.password[locale]}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <Grid container justify="center">
          <Button type="submit" color="primary" variant="contained">
            {TEXT.submit[locale]}
          </Button>
        </Grid>
      </form>
      <Grid container justify="space-between">
        <Link to={PAGE_FORGOT_PW} className={classes.link}>
          <Typography variant="caption" align="left" color="secondary">
            {TEXT.forgotPassword[locale]}
          </Typography>
        </Link>
        <Link to={PAGE_REGISTER} className={classes.link}>
          <Typography variant="caption" align="right" color="secondary">
            {TEXT.register[locale]}
          </Typography>
        </Link>
      </Grid>
      <Typography color="error" variant="body2" align="center">
        {error}
      </Typography>
    </Paper>
  );
}

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
};
