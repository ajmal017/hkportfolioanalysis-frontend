import React, { useState } from "react";
import PropTypes from "prop-types";

import { useFirebase } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import LoadingSpinner from "../../features/loadingSpinner";
import BoldTitle from "../../features/boldTitle";
import StockField from "../../features/stockField";
import { useUserId } from "../../utils/customHooks";

import { createPortfolio } from "../../firebase/crud";
import { PAGE_HOME } from "../../layouts/constants";
import { clearBackendResponse } from "../../localStorageUtils";
import { useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";

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
    marginTop: "25vh",
  },
  icon: {
    cursor: "pointer",
    color: "#b2b6bf",
  },
  form: {
    textAlign: "center",
  },
}));

const errorInitState = "";

export default function CreatePortfolioPage({ history }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(errorInitState);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [noOfFields, setNoOfFields] = useState(2);
  const locale = useLanguage();

  const classes = useStyles();
  const firebase = useFirebase();
  const userId = useUserId();

  function resetErrorState() {
    setError(errorInitState);
  }

  function decrement() {
    if (noOfFields > 1) {
      setNoOfFields(noOfFields - 1);
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    resetErrorState();
    setSubmitting(true);

    const submitForm = {};
    let stockBasket = new Set();
    const fields = e.target;
    for (let i = 1; i < fields.length - 1; i += 2) {
      const stockCode = fields[i - 1].value;
      const money = parseFloat(fields[i].value);
      if (stockBasket.has(stockCode)) {
        setError("There are repeating stock codes");
        setSubmitting(false);
        return;
      }
      stockBasket.add(stockCode);
      submitForm[stockCode] = money;
    }
    try {
      await createPortfolio(firebase, userId, submitForm); // also saves to local storage
      clearBackendResponse();
      setNotificationOpen(true);
      history.push(PAGE_HOME);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setSubmitting(false);
  }

  return (
    <Paper className={classes.paper}>
      {submitting && <LoadingSpinner />}
      <BoldTitle>{TEXT.createPortfolio[locale]}</BoldTitle>
      <form
        className={classes.form}
        onSubmit={handleOnSubmit}
        noValidate
        className={classes.form}
      >
        {Array.from(Array(noOfFields), (e, i) => (
          <StockField key={i} />
        ))}
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={2}>
            <AddBoxIcon
              className={classes.icon}
              onClick={() => setNoOfFields(noOfFields + 1)}
            />
          </Grid>
          <Grid item xs={2}>
            <RemoveCircleIcon
              className={classes.icon}
              onClick={() => decrement()}
            />
          </Grid>
        </Grid>

        <Button type="submit" color="primary" variant="contained">
          {TEXT.submit[locale]}
        </Button>
      </form>
      <Typography color="error" variant="body2" align="center">
        {error}
      </Typography>
    </Paper>
  );
}
