import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row
} from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

import {
  AddRow,
  ClearRows,
  RowFieldProps,
  RowsFormProps,
  UpdateRow
} from '../types';

import Valid from './Valid';

import { addRow, clearRows, updateRow } from '../actions/rows';

import { formatCost } from '../formatters';

import '../styles/form-buttons.css';
import { type } from 'os';

interface DetailsProps {
  rows: RowsFormProps;
  onAdd: AddRow;
  onClear: ClearRows;
  onUpdate: UpdateRow;
}

interface RowsProps {
  rows: RowsFormProps;
  onAdd: AddRow;
  onClear: ClearRows;
  onUpdate: UpdateRow;
}

interface EntryProps {
  row: RowFieldProps;
  onUpdate: UpdateRow;
}

interface NumberFieldProps {
  id: number;
  inputType: InputType;
  name: keyof RowFieldProps;
  fieldValue?: number | string;
  placeholder: string;
  onUpdate: UpdateRow;
  width: number;
}

interface EntryFieldProps {
  id: number;
  inputType: InputType;
  name: keyof RowFieldProps;
  fieldValue?: string;
  placeholder: string;
  onUpdate: UpdateRow;
  width: number;
  max?: string;
}

const NumberField = (props: NumberFieldProps) => {
  const onChange = (
    field: keyof RowFieldProps,
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data: RowFieldProps = { id: id };
    data[field] = event.target.value;
    props.onUpdate(data);
  };

  return (
    <Input
      className={`col-sm-${props.width} mx-2`}
      type={props.inputType}
      id={`${props.name}_${props.id}`}
      name={`${props.name}_${props.id}`}
      placeholder={props.placeholder}
      value={props.fieldValue}
      step="0.01"
      min="0"
      onChange={event => onChange(props.name, props.id, event)}
    />
  );
};

const Field = (props: EntryFieldProps) => {
  const onChange = (
    field: keyof RowFieldProps,
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data: RowFieldProps = { id: id };
    data[field] = event.target.value;
    props.onUpdate(data);
  };

  let placeholder = props.name as string;

  if (props.placeholder) {
    placeholder = props.placeholder;
  }

  const inputProps = {
    type: props.inputType,
    id: `${props.name}_${props.id}`,
    name: `${props.name}_${props.id}`,
    placeholder: placeholder,
    value: props.fieldValue,
    max: props.max
  };

  return (
    <Input
      className={`col-sm-${props.width} mx-2`}
      onChange={event => onChange(props.name, props.id, event)}
      {...inputProps}
    />
  );
};

const Entry = (props: EntryProps) => {
  const { row, onUpdate } = props;

  return (
    <FormGroup className="row">
      <Field
        id={row.id}
        name="date"
        placeholder="Dato"
        inputType="date"
        fieldValue={row.date}
        onUpdate={onUpdate}
        width={2}
        max={moment().format('YYYY-MM-DD')}
      />
      <Field
        id={row.id}
        name="supplier"
        placeholder="Leverandør"
        inputType="text"
        fieldValue={row.supplier}
        onUpdate={onUpdate}
        width={2}
      />
      <Field
        id={row.id}
        name="description"
        placeholder="Beskrivelse"
        inputType="text"
        fieldValue={row.description}
        onUpdate={onUpdate}
        width={4}
      />
      <NumberField
        id={row.id}
        name="cost"
        placeholder="Beløp inkl. mva (NOK)"
        inputType="number"
        fieldValue={row.cost}
        onUpdate={onUpdate}
        width={2}
      />

      <Valid valid={row.valid} />
    </FormGroup>
  );
};

const Details = (props: DetailsProps) => {
  const sum = +props.rows.total;
  return (
    <Form>
      {props.rows.rows.map(row => (
        <Entry key={`row_${row.id}`} row={row} onUpdate={props.onUpdate} />
      ))}

      <Row>
        <Col className="col-sm-2 offset-sm-8">
          <p className="float-right">Sum: {formatCost(sum)} NOK</p>
        </Col>
      </Row>

      <FormGroup className="row">
        <div className="col-sm-2" />
        <div className="col-sm-2 form-buttons">
          <Link to="/done">
            <Button color="primary">Fortsett</Button>
          </Link>
        </div>
        <div className="col-sm-2 form-buttons">
          <Button color="secondary" onClick={() => props.onAdd()}>
            Ny rad
          </Button>
        </div>
        <div className="col-sm-2 form-buttons">
          <Button color="danger" onClick={() => props.onClear()}>
            Tøm feltene
          </Button>
        </div>
      </FormGroup>
    </Form>
  );
};

const Rows = (props: RowsProps) => {
  return (
    <div>
      <Helmet>
        <title>Itera - utleggsposter</title>
      </Helmet>

      <Container>
        <h1>Utlegg</h1>

        <p>
          Legg til rader - en per utlegg. Tomme/uferdige/ugyldige rader blir
          ikke med videre
        </p>
      </Container>

      <Container>
        <Details {...props} />
      </Container>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  rows: state.rows
});

const mapDispatchToProps = {
  onAdd: addRow,
  onClear: clearRows,
  onUpdate: updateRow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rows);
