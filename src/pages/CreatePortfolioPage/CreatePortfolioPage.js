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

const TITLE = {
  en: "Create a Portfolio",
  zh: "加投資組合"
};

export default function CreatePortfolioPage({ history }) {
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(errorInitState);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [noOfFields, setNoOfFields] = useState(2);

  const locale = "en";
  const classes = useStyles();
  const firebase = useFirebase();

  function resetErrorState() {
    setError(errorInitState);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    // setError("");
    // setRegistering(true)
    // const authUser = await registerUser(firebase, email, password);
    // console.log(authUser)
    // try {
    //   await sendVerification(firebase);
    // } catch (error) {
    //   console.log(error);
    //   setError(error.message);
    // } finally {
    //   setNotificationOpen(true);
    //   history.push(PAGE_HOME);
    // }
    // setRegistering(false)
  }

  return (
    <Paper className={classes.paper}>
      {registering && <LoadingSpinner />}
      <BoldTitle>{TITLE[locale]}</BoldTitle>
      <form onSubmit={handleOnSubmit} noValidate className={classes.form}>
        {Array.from(Array(noOfFields), (e, i)=>(
          <StockField/>
        ))}
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

const STOCK_TEXT = {
  en: "Stock",
  zh: "股票代號"
};

const MONEY_TEXT = {
  en: "Money",
  zh: "錢"
};

function StockField() {
  const [stock, setStock] = useState("");
  const [money, setMoney] = useState("");
  const locale = "en";
  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.fieldWidth}
        required
        label={STOCK_TEXT[locale]}
        onChange={e => {
          setStock(e.target.value);
        }}
      />
      <TextField
        className={classes.fieldWidth}
        required
        label={MONEY_TEXT[locale]}
        onChange={e => {
          setMoney(e.target.value);
        }}
      />
    </div>
  );
}
