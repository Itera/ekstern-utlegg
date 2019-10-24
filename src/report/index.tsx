import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableFooter } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
    topCard: {
      color: "white",
      backgroundColor: theme.palette.secondary.light,
      marginBottom: 20
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
    document.title = `${moment().format("YYYY-MM-DD")} - NAME - extern utlegg`;
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={`${classes.topCard} noprint`}>
        <CardContent>
          <Typography paragraph>
            Når man skriver ut denne siden så husk å krysse av i print dialog
            for bakgrunnsfarger ellers vil ikke fargene på tabellen dukke opp.
          </Typography>
          <Typography paragraph>
            <Box fontWeight="fontWeightBold">
              Husk at du må sende resultat som PDF til din kontakt hos Itera via
              e-post.
            </Box>
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography className={classes.title}>
                Utlegg for eksterne
              </Typography>
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
                      Anskaffet - brukt til hva?
                    </TableCell>
                    <TableCell className={classes.fixed}>
                      Beløp inkl. mva
                    </TableCell>
                    <TableCell className={classes.fixed}>Avdeling</TableCell>
                  </TableRow>
                  {state.rows
                    .filter(row => row.valid)
                    .map(row => (
                      <TableRow key={`report_row_${row.id}`}>
                        <TableCell>
                          {moment(row.date).format("DD/MM/YY")}
                        </TableCell>
                        <TableCell>
                          {row.company} - {row.description}
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
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Report;
