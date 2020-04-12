import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  createFilterOptions,
} from "@material-ui/lab";
import { useLanguage } from "../../utils/customHooks";
import { TEXT } from "../../translation";
import { fetchStockCodes } from "../../firebase/crud";

export default function StockField() {
  const locale = useLanguage();
  const [stockCodes, setStockCodes] = useState([]);
  const [money, setMoney] = useState("");
  const [moneyError, setMoneyError] = useState(false);

  useEffect(() => {
    const status = !!isNaN(money) ? true : false;
    setMoneyError(status);
  }, [money]);

  useEffect(() => {
    async function fetchData() {
      const stockCodes_ = await fetchStockCodes();
      setStockCodes(stockCodes_);
    }
    fetchData();
  }, []);

  const defaultFilterOptions = createFilterOptions();
  const filterOptions = (options, state) =>
    defaultFilterOptions(options, state).slice(0, 5);
  return (
    <Grid container direction="row" spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Autocomplete
          options={stockCodes}
          getOptionLabel={(stock) => stock}
          filterOptions={filterOptions}
          renderInput={(params) => (
            <TextField required {...params} label={TEXT.stockCode[locale]} />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          error={moneyError}
          label={TEXT.amount[locale]}
          onChange={(e) => {
            setMoney(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
}
