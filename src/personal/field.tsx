import React from "react";

import TextField from "@material-ui/core/TextField";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 600
  }
}));

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: OutlinedInputProps["onChange"];
}

const Field: React.FC<FieldProps> = props => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        id={props.id}
        name={props.id}
        label={props.label}
        value={props.value}
        className={classes.textField}
        onChange={props.onChange}
        margin="dense"
        variant="filled"
      />
    </div>
  );
};

export default Field;
