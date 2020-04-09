import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";

export default function StockField() {
  const locale = useLanguage();
  const [stock, setStock] = useState("");
  const [money, setMoney] = useState("");
  const [moneyError, setMoneyError] = useState(false);

  // stock need to check if exists

  useEffect(() => {
    const status = !!isNaN(money) ? true : false;
    setMoneyError(status);
  }, [money]);

  return (
    <Grid container direction="row" spacing={2} alignItems="center">
      <Grid item xs={6}>
        <TextField
          required
          label={TEXT.stockCode[locale]}
          onChange={e => {
            setStock(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          error={moneyError}
          label={TEXT.amount[locale]}
          onChange={e => {
            setMoney(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
}
