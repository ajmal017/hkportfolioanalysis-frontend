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
import NotificationPopUp from "../../features/notificationPopUp";
import { registerUser, sendVerification } from "../../firebase/crud";
import { PAGE_HOME } from "../../layouts/constants";
import { useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";
import { validateEmail } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
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
    position: "absolute",
    transform: "translate(0%, -60%)",
    top: "50%",

  },
}));

const errorInitState = "";

export default function RegisterPage({ history }) {
  const locale = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(errorInitState);
  const [notificationOpen, setNotificationOpen] = useState(false);

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
    e.preventDefault();
    if (!(email && password && password2)) {
      return;
    }
    setError("");
    const emailError = validateEmail(email);
    if (emailError) {
      setError("Incorrect email format");
      return;
    }
    setRegistering(true);
    try {
      await registerUser(firebase, email, password);
      setNotificationOpen(true);
      await sendVerification(firebase);
      history.push(PAGE_HOME);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setRegistering(false);
  }

  return (
    <Paper className={classes.paper}>
      {registering && <LoadingSpinner />}
      <BoldTitle>{TEXT.register[locale]}</BoldTitle>
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
          label={TEXT.password[locale]}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          className={classes.fieldWidth}
          required
          label={TEXT.confirmPassword[locale]}
          type="password"
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <br />
        <br />
        <Grid container justify="center">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!!error}
          >
            {TEXT.submit[locale]}
          </Button>
        </Grid>
      </form>
      <Typography color="error" variant="body2" align="center">
        {error}
      </Typography>
      <NotificationPopUp
        active={notificationOpen}
        setState={setNotificationOpen}
        text={TEXT.verifyEmail[locale]}
      />
    </Paper>
  );
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
};


