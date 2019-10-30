import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "@reach/router";

import { Page, depts } from "../types";

import Field from "./field";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 600
  },
  link: {
    textDecoration: "none"
  }
}));

const Personal: React.FC<Page> = ({ state, dispatch }) => {
  useEffect(() => {
    document.title = "Itera - om deg";
  });

  const classes = useStyles();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update_person",
      person: {
        ...state.person,
        [event.target.name]: event.target.value
      }
    });
  };

  const clearInput = () => {
    dispatch({
      type: "clear_person"
    });
  };

  return (
    <React.Fragment>
      <Typography paragraph variant="h3">
        Dine detaljer
      </Typography>

      <Typography paragraph>Alle felter nedenfor er påkrevd</Typography>

      <form data-testid="person-form" noValidate autoComplete="off">
        <div>
          <Field
            id="name"
            label="Navn"
            value={state.person.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Field
            id="address"
            label="Adresse"
            value={state.person.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Field
            id="postcode"
            label="Postnr"
            value={state.person.postcode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Field
            id="town"
            label="Poststed"
            value={state.person.town}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Field
            id="tel"
            label="Telefon eller mobilnummer"
            value={state.person.tel}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Field
            id="email"
            label="E-post adresse"
            value={state.person.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Field
            id="event"
            label="Formål/Arrangement"
            value={state.person.event}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            id="dept"
            name="dept"
            label="Avdeling"
            value={state.person.dept}
            select
            className={classes.textField}
            onChange={handleInputChange}
            margin="dense"
            variant="filled"
          >
            {depts.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <Field
            id="account"
            label="Bank kontonr"
            value={state.person.account}
            onChange={handleInputChange}
          />
        </div>
      </form>

      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Link className={classes.link} to="/rows">
            <Button color="secondary" variant="contained">
              Fortsett
            </Button>
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={clearInput}>
            Tøm felter
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Personal;
