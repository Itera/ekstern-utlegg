import React from "react";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import { Link } from "@reach/router";

interface FieldProps {
  val?: string;
}

const Field: React.FC<FieldProps> = ({ val }) => {
  const useStyles = makeStyles({
    link: {
      textDecoration: "none"
    }
  });

  const classes = useStyles();

  if (val) {
    return <React.Fragment>{val}</React.Fragment>;
  }

  return (
    <React.Fragment>
      <Link className={classes.link} to="/who">
        <Button color="secondary" variant="contained">
          Legg til
        </Button>
      </Link>
    </React.Fragment>
  );
};

export default Field;
