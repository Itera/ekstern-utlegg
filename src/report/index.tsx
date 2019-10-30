import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableFooter } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Link } from "@reach/router";

import moment from "moment";

import { Page } from "../types";

import PersonTable from "./person";

import logo from "../assets/itera_logo.png";

const Report: React.FC<Page> = ({ state, dispatch }) => {
  const theme = useTheme();

  const useStyles = makeStyles({
    link: {
      textDecoration: "none"
    },
    logo: {
      maxWidth: 160
    },
    title: {
      textTransform: "uppercase",
      fontSize: "2.5rem"
    },
    subtitle: {
      fontSize: "2rem"
    },
    right: {
      textAlign: "right"
    },
    fixed: {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
      fontWeight: "bold"
    }
  });

  useEffect(() => {
    document.title = `${moment().format("YYYY-MM-DD")} - ${
      state.person.name
    } - extern utlegg`;
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid data-testid="report-grid" item xs={8}>
          <Typography className={classes.title}>Utlegg for eksterne</Typography>
          <Typography className={classes.subtitle}>
            Refusjon av flere utlegg
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.right}>
          <img className={classes.logo} src={logo} alt="Itera logo" />
        </Grid>
        <Grid item xs={12}>
          <Table>
            <PersonTable person={state.person} />

            <TableBody>
              <TableRow>
                <TableCell colSpan={4} />
              </TableRow>
              <TableRow>
                <TableCell className={classes.fixed}>Dato</TableCell>
                <TableCell className={classes.fixed}>
                  Leverandør / Beskrivelse
                </TableCell>
                <TableCell className={classes.fixed}>Beløp inkl. mva</TableCell>
                <TableCell className={classes.fixed}>Avdeling</TableCell>
              </TableRow>
              {state.rows
                .filter(row => row.valid)
                .map(row => (
                  <TableRow key={`report_row_${row.id}`}>
                    <TableCell>{moment(row.date).format("DD/MM/YY")}</TableCell>
                    <TableCell>
                      {row.company} / {row.description}
                    </TableCell>
                    <TableCell>NOK {row.amount.toFixed(2)}</TableCell>
                    <TableCell className={classes.fixed}>
                      {state.person.dept}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className={classes.fixed} colSpan={2}>
                  Sum utlegg:
                </TableCell>
                <TableCell className={classes.fixed} colSpan={2}>
                  NOK {state.total && state.total.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Link className={classes.link} to="/print">
            <Button color="secondary" variant="contained">
              Skriv ut
            </Button>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Report;
