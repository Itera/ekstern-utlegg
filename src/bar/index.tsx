import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "@reach/router";

import logo from "../assets/itera_logo.png";

const useStyles = makeStyles({
  logo: {
    maxWidth: 160
  },
  button: {
    margin: 2
  },
  input: {
    display: "none"
  },
  link: {
    textDecoration: "none"
  }
});

const Bar: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar className="noprint">
          <img src={logo} alt="Itera logo" className={classes.logo} />
          <Link className={classes.link} to="/">
            <Button className={classes.button}>Info</Button>
          </Link>
          <Link className={classes.link} to="/who">
            <Button className={classes.button}>Dine detaljer</Button>
          </Link>
          <Link className={classes.link} to="/rows">
            <Button className={classes.button}>Utlegg</Button>
          </Link>
          <Link className={classes.link} to="/done">
            <Button className={classes.button}>Ferdig</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar className="noprint" />
    </React.Fragment>
  );
};

export default Bar;
