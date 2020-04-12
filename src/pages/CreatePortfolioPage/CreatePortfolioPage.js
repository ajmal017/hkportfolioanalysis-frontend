import React, { useState } from "react";
import PropTypes from "prop-types";

import { useFirebase } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import LoadingSpinner from "../../features/loadingSpinner";
import BoldTitle from "../../features/boldTitle";
import StockField from "../../features/stockField";
import { useUserId } from "../../utils/customHooks";
import { Disclaimer } from "../../features/disclaimer";

import { createPortfolio } from "../../firebase/crud";
import { PAGE_HOME } from "../../layouts/constants";
import { clearAll } from "../../localStorageUtils";
import { useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";

const useStyles = makeStyles((theme) => ({
  fieldWidth: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(theme.customForm.paper.paddingSpacing),
    maxWidth: theme.customForm.paper.maxWidth,
    marginTop: "10vh",
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [noOfFields, setNoOfFields] = useState(1);
  const [submitFormObj, setSubmitFormObj] = useState({});
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
    const submitForm = {};
    let stockBasket = new Set();
    const fields = e.target;

    // autocomplete components also are treated as fields
    for (let i = 3; i < fields.length - 1; i += 4) {
      const stockCode = fields[i - 3].value;
      const money = parseFloat(fields[i].value);
      if (stockCode === "" || isNaN(money)) {
        return;
      }
      if (stockBasket.has(stockCode)) {
        setError("There are repeating stock codes");
        setSubmitting(false);
        return;
      }
      stockBasket.add(stockCode);
      submitForm[stockCode] = money;
    }
    setSubmitFormObj(submitForm);
    setOpenDialog(true);
  }

  async function confirmedSubmit() {
    setSubmitting(true);
    handleClose();
    try {
      clearAll();
      await createPortfolio(firebase, userId, submitFormObj); // also saves to local storage
      history.push(PAGE_HOME);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  function handleClose() {
    setOpenDialog(false);
  }

  return (
    <div>
      <Disclaimer>{TEXT.portfolioAdvice[locale]}</Disclaimer>

      <Paper className={classes.paper}>
        {submitting && <LoadingSpinner />}
        <BoldTitle>{TEXT.createPortfolio[locale]}</BoldTitle>
        <form className={classes.form} onSubmit={handleOnSubmit} noValidate>
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
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>{"Save Portfolio"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Submitting a new portfolio will overwrite your last one. Do you
              want to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmedSubmit} color="secondary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}
