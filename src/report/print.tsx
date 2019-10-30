import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import moment from "moment";

import { ViewPage } from "../types";
import { formatTlf, formatAccount, formatAmount } from "../formatters";

import logo from "../assets/itera_logo.png";

import "../assets/print.css";

const Report: React.FC<ViewPage> = ({ state }) => {
  useEffect(() => {
    document.title = `${moment().format("YYYY-MM-DD")} - ${
      state.person.name
    } - extern utlegg`;
  });

  const theme = useTheme();

  const useStyles = makeStyles({
    instructions: {
      color: "white",
      backgroundColor: theme.palette.secondary.light,
      marginBottom: 20,
      padding: 10
    },
    button: {
      color: theme.palette.secondary.dark,
      backgroundColor: "white"
    }
  });

  const classes = useStyles();

  const handlePrint = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <Box className={`${classes.instructions} noprint`}>
        <h1>Utskrift</h1>

        <p>Dette må sendes til Itera som en PDF fil. For å lage PDF:</p>

        <ul>
          <li>Mac - print dialog - save as PDF under PDF menyen</li>
          <li>Linux - print to PDF eller print to file</li>
          <li>
            Windows - enten må du ha en PDF printer installert eller bruk Chrome
            som har save as PDF som en del av sin print dialog
          </li>
        </ul>

        <p>
          Husk at du må sende resultat som PDF til din kontakt hos Itera via
          e-post.
        </p>

        <Button className={classes.button} onClick={handlePrint}>
          Skriv ut
        </Button>
      </Box>

      <img className="logo" src={logo} alt="Itera logo" />
      <h1>Utlegg for eksterne</h1>
      <h2>Refusjon av flere utlegg</h2>

      <table>
        <thead>
          <tr>
            <td className="fixed">Navn</td>
            <td colSpan={3}>{state.person.name}</td>
          </tr>
          <tr>
            <td className="fixed">Adresse</td>
            <td colSpan={3}>
              {state.person.address}, {state.person.postcode}{" "}
              {state.person.town}
            </td>
          </tr>
          <tr>
            <td className="fixed">Tlf / Mob</td>
            <td colSpan={3}>{formatTlf(state.person.tel)}</td>
          </tr>
          <tr>
            <td className="fixed">E-post</td>
            <td colSpan={3}>{state.person.email}</td>
          </tr>
          <tr>
            <td className="fixed">Kontonummer</td>
            <td colSpan={3}>{formatAccount(state.person.account)}</td>
          </tr>
          <tr>
            <td className="fixed">Formål for utlegg</td>
            <td colSpan={3}>{state.person.event}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4}>&nbsp;</td>
          </tr>
          <tr>
            <td className="fixed">Dato</td>
            <td className="fixed">Leverandør / Beskrivelse</td>
            <td className="fixed">Beløp inkl. mva</td>
            <td className="fixed">Avdeling</td>
          </tr>

          {state.rows
            .filter(row => row.valid)
            .map(row => (
              <tr key={`report_row_${row.id}`}>
                <td>{moment(row.date).format("DD/MM/YY")}</td>
                <td>
                  {row.company} / {row.description}
                </td>
                <td className="right">
                  {row.amount && formatAmount(row.amount)}
                </td>
                <td className="fixed">{state.person.dept}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>&nbsp;</td>
          </tr>
          <tr>
            <td className="fixed" colSpan={2}>
              Sum utlegg:
            </td>
            <td className="fixed right">
              {state.total && formatAmount(state.total)}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
};

export default Report;
