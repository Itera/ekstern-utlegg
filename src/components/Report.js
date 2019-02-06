import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Container, Table, Jumbotron, Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import { personaliaFormPropTypes } from "./Personalia";
import { rowFieldPropTypes, rowsFormPropTypes } from "./Rows";

import logo from "../media/itera_logo.png";

import "../styles/report.css";

const displayValue = (value, field) => {
  if (value.value) {
    if (!value.valid) {
      return (
        <span className="incomplete">
          Ugyldig {field} - {value.value}
          <Link className="float-right noprint" to={"/start"}>
            <Button size="sm" color="warning" className="ml-1">
              Fix
            </Button>
          </Link>
        </span>
      );
    }

    return value.value;
  } else {
    return (
      <span className="incomplete">
        Manglende {field}
        <Link className="float-right noprint" to={"/start"}>
          <Button size="sm" color="warning" className="ml-1">
            Fix
          </Button>
        </Link>
      </span>
    );
  }
};

const ReportRow = ({ row, dept }) => {
  return (
    <tr>
      <td>{row.date}</td>
      <td>
        {row.supplier}
        &nbsp;-&nbsp;
        {row.description}
      </td>
      <td>{Number.parseFloat(row.cost).toFixed(2)} NOK</td>
      <td className="locked">{dept}</td>
    </tr>
  );
};

ReportRow.propTypes = {
  row: rowFieldPropTypes,
  dept: PropTypes.string.isRequired
};

const Report = ({ personalia, rows }) => {
  const getValidRows = rows => {
    return rows.filter(row => row.valid);
  };

  const displayRows = (dept, rows) => {
    if (!rows.length > 0) {
      return (
        <tr>
          <td colSpan="4">
            <span className="incomplete">
              Manglende utlegg
              <Link className="float-right noprint" to="/rows">
                <Button size="sm" color="warning" className="ml-1">
                  Fix
                </Button>
              </Link>
            </span>
          </td>
        </tr>
      );
    } else {
      return rows.map(row => (
        <ReportRow key={`report_row_${row.id}`} row={row} dept={dept} />
      ));
    }
  };

  let name = "";

  if (personalia.name && personalia.name.valid) {
    name = ` - ${personalia.name.value} `;
  }

  const title = `${moment().format("YYYY-MM-DD")}${name} - extern utlegg`;

  let dept = "";

  if (personalia.dept) {
    dept = personalia.dept.value;
  }

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Container className="noprint">
        <Jumbotron>
          <h2>
            Når man skriver ut denne siden så husk å krysse av i print dialog
            for bakgrunnsfarger ellers vil ikke fargene på tabellen dukke opp.
          </h2>
          <p className="text-primary">
            <strong>
              Husk at du må sende resultat som PDF til din kontakt hos Itera via
              e-post.
            </strong>
          </p>
        </Jumbotron>
      </Container>

      <Container>
        <img src={logo} className="logo" alt="Logo" />

        <h1>UTLEGG FOR EKSTERNE</h1>

        <h2>Refusjon av flere utlegg</h2>

        <Table bordered condensed hover>
          <thead>
            <tr>
              <th>Navn:</th>
              <td colSpan="3">{displayValue(personalia.name, "navn")}</td>
            </tr>
            <tr>
              <th>Adresse:</th>
              <td colSpan="3">
                {displayValue(personalia.address, "adresse")}, &nbsp;
                {displayValue(personalia.postcode, "postnummer")}
                &nbsp;
                {displayValue(personalia.town, "poststed")}
              </td>
            </tr>
            <tr>
              <th>Tlf/Mob:</th>
              <td colSpan="3">
                {displayValue(personalia.telephone, "tlf/mob")}
              </td>
            </tr>
            <tr>
              <th>E-post:</th>
              <td colSpan="3">{displayValue(personalia.email, "e-post")}</td>
            </tr>
            <tr>
              <th>Kontonummer:</th>
              <td colSpan="3">
                {displayValue(personalia.account, "kontonummer")}
              </td>
            </tr>
            <tr>
              <th>Formål for utlegg:</th>
              <td colSpan="3">
                {displayValue(personalia.event, "formål/arrangement")}
              </td>
            </tr>
            <tr>
              <td colSpan="4">&nbsp;</td>
            </tr>
            <tr>
              <th>Dato</th>
              <th>Anskaffet - brukt til hva?</th>
              <th>Beløp inkl. mva</th>
              <th>Avdeling</th>
            </tr>
          </thead>
          <tbody>{displayRows(dept, getValidRows(rows.rows))}</tbody>
          <tfoot>
            <tr>
              <td className="locked" colSpan="2">
                Sum utlegg:
              </td>
              <td className="locked">{rows.total.toFixed(2)} NOK</td>
              <td className="locked" />
            </tr>
          </tfoot>
        </Table>
      </Container>
    </div>
  );
};

Report.propTypes = {
  personalia: personaliaFormPropTypes,
  rows: rowsFormPropTypes
};

const mapStateToProps = state => ({
  personalia: state.personalia,
  rows: state.rows
});

export default connect(mapStateToProps)(Report);
