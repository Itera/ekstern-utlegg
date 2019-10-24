import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  MaterialUiPickersDate,
  DatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "@reach/router";

import { Page, Row } from "../types";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  }
}));

const Rows: React.FC<Page> = ({ state, dispatch }) => {
  const classes = useStyles();
  useEffect(() => {
    document.title = "Itera - utleggsposter";
  });

  const addRow = () => {
    dispatch({
      type: "add_row"
    });
  };

  const clearRows = () => {
    dispatch({
      type: "clear_rows"
    });
  };

  const getRowById = (id: number) => {
    return state.rows.filter(row => row.id === id)[0];
  };

  const updateRow = (row: Row) => {
    dispatch({
      type: "update_row",
      row: row
    });
  };

  const updateDate = (id: number, date: MaterialUiPickersDate) => {
    if (date) {
      updateRow({
        ...getRowById(id),
        date: date
      });
    }
  };

  const updateAmount = (id: number, amount: string) => {
    updateRow({
      ...getRowById(id),
      amount: Number(amount)
    });
  };

  const updateCompany = (id: number, company: string) => {
    updateRow({
      ...getRowById(id),
      company: company
    });
  };

  const updateDescription = (id: number, description: string) => {
    updateRow({
      ...getRowById(id),
      description: description
    });
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader title="Utlegg" />
        <CardContent>
          <Typography paragraph>
            Legg til rader - en per utlegg. Tomme/uferdige/ugyldige rader blir
            ikke med videre
          </Typography>
        </CardContent>
      </Card>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Card>
          <CardContent>
            <Grid container>
              {state.rows.map(row => (
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
                      onChange={event =>
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
                      onChange={event =>
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
                        )
                      }}
                      fullWidth
                      onChange={event =>
                        updateAmount(row.id, event.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </MuiPickersUtilsProvider>

      <Card>
        <CardActions>
          <Link className={classes.link} to="/done">
            <Button color="secondary" variant="contained">
              Fortsett
            </Button>
          </Link>
          <Button variant="contained" onClick={addRow}>
            Ny rad
          </Button>
          <Button variant="contained" onClick={clearRows}>
            Fjern alle
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default Rows;
