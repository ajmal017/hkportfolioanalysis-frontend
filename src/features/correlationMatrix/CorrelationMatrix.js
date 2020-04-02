import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { Title } from "../title";
import { usePaperWidth } from "../../utils/customHooks";
import { QuestionMarkAnnotation } from "../questionMarkAnnotation";

import { defaultColDef } from "./tableSchema";
import "./styles.css";

function createColumnDef(headerName) {
  let obj = { headerName, field: headerName, width: 70 };
  obj = headerName === " " ? { ...obj, pinned: "left" } : obj;
  return obj;
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto"
  },
  icon: {
    fontSize: 12
  }
}));

export default function CorrelationMatrix({ data }) {
  const classes = useStyles();
  const headers = Object.keys(data[0]);
  let columnDefs = headers.map(header => createColumnDef(header));
  let rowData = data;
  const displayWidth = usePaperWidth();

  return (
    <Paper
      className={classes.paper}
      style={{ width: displayWidth, height: 300 }}
    >
      <Title>
        Correlation
        <QuestionMarkAnnotation text="Calculations based on 750 days of daily returns" />
      </Title>
      <div
        style={{ width: "100%", height: "80%" }}
        className="ag-theme-balham-dark"
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowHeight={() => 40}
          // onGridReady={this.onGridReady}
          rowData={rowData}
        />
      </div>
    </Paper>
  );
}
