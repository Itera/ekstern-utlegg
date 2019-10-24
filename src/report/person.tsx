import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import RequiredField from "./field";

import { Person } from "../types";
import { formatAccount, formatTlf } from "../formatters";

interface PersonProps {
  person: Person;
}

const PersonTable: React.FC<PersonProps> = ({ person }) => {
  const theme = useTheme();

  const useStyles = makeStyles({
    fixed: {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
      fontWeight: "bold"
    }
  });

  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.fixed}>Navn</TableCell>
        <TableCell colSpan={3}>
          <RequiredField val={person.name} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.fixed}>Adresse</TableCell>
        <TableCell colSpan={3}>
          <RequiredField val={person.address} />,{" "}
          <RequiredField val={person.postcode} />{" "}
          <RequiredField val={person.town} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.fixed}>Tlf / Mob</TableCell>
        <TableCell colSpan={3}>
          <RequiredField val={formatTlf(person.tel)} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.fixed}>E-post</TableCell>
        <TableCell colSpan={3}>
          <RequiredField val={person.email} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.fixed}>Kontonummer</TableCell>
        <TableCell colSpan={3}>
          <RequiredField val={formatAccount(person.account)} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.fixed}>Formål for utlegg</TableCell>
        <TableCell colSpan={3}>
          <RequiredField val={person.event} />
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PersonTable;
