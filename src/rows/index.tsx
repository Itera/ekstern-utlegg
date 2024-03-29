import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Page, Row } from "../types";
import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "@reach/router";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
}));

const Rows: React.FC<Page> = ({ state, dispatch }) => {
  const classes = useStyles();
  useEffect(() => {
    document.title = "Itera - utleggsposter";
  });

  const addRow = () => {
    dispatch({
      type: "add_row",
    });
  };

  const clearRows = () => {
    dispatch({
      type: "clear_rows",
    });
  };

  const getRowById = (id: number) => {
    return state.rows.filter((row) => row.id === id)[0];
  };

  const updateRow = (row: Row) => {
    dispatch({
      type: "update_row",
      row: row,
    });
  };

  const updateDate = (id: number, date: MaterialUiPickersDate) => {
    if (date) {
      updateRow({
        ...getRowById(id),
        date: date,
      });
    }
  };

  const updateAmount = (id: number, amount: string) => {
    updateRow({
      ...getRowById(id),
      amount: Number(amount),
    });
  };

  const updateCompany = (id: number, company: string) => {
    updateRow({
      ...getRowById(id),
      company: company,
    });
  };

  const updateDescription = (id: number, description: string) => {
    updateRow({
      ...getRowById(id),
      description: description,
    });
  };

  return (
    <React.Fragment>
      <Typography paragraph variant="h3">
        Utlegg
      </Typography>

      <Typography paragraph>
        Legg til rader - en per utlegg. Tomme/uferdige/ugyldige rader blir ikke
        med videre
      </Typography>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid data-testid="rows-grid" container>
          {state.rows.map((row) => (
            <Grid item container key={`row_${row.id} spacing={2}`}>
              <Grid item xs={2} style={{ paddingRight: 8 }}>
                <DatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  disableFuture
                  autoOk
                  id={`date-picker-${row.id}`}
                  onChange={(date: MaterialUiPickersDate) =>
                    updateDate(row.id, date)
                  }
                  value={row.date}
                />
              </Grid>
              <Grid item xs={2} style={{ paddingRight: 8 }}>
                <TextField
                  id={`company_${row.id}`}
                  name={`company_${row.id}`}
                  label="Leverandør"
                  value={row.company}
                  fullWidth
                  onChange={(event) =>
                    updateCompany(row.id, event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4} style={{ paddingRight: 8 }}>
                <TextField
                  id={`description_${row.id}`}
                  name={`description_${row.id}`}
                  label="Beskrivelse"
                  value={row.description}
                  fullWidth
                  onChange={(event) =>
                    updateDescription(row.id, event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id={`amount_${row.id}`}
                  name={`amount_${row.id}`}
                  value={row.amount}
                  type="number"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">NOK</InputAdornment>
                    ),
                  }}
                  fullWidth
                  onChange={(event) => updateAmount(row.id, event.target.value)}
                />
              </Grid>
            </Grid>
          ))}
          <Grid item container spacing={2}>
            <Grid item xs={2}>
              <Link className={classes.link} to="/done">
                <Button color="secondary" variant="contained">
                  Fortsett
                </Button>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={addRow}>
                Ny rad
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={clearRows}>
                Fjern alle
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default Rows;
