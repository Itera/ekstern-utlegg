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
  Row,
  FormFeedback
} from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

import {
  AddRow,
  ClearRows,
  RowFieldProps,
  RowsFormProps,
  UpdateRow,
  RowValidationReason,
  DeleteRow
} from '../types';

import { Valid, Trash } from './Icons';

import { addRow, clearRows, updateRow, deleteRow } from '../actions/rows';

import { formatCost } from '../formatters';

import '../styles/form-buttons.css';

interface DetailsProps {
  rows: RowsFormProps;
  onAdd: AddRow;
  onClear: ClearRows;
  onUpdate: UpdateRow;
  onDelete: DeleteRow;
}

interface RowsProps {
  rows: RowsFormProps;
  onAdd: AddRow;
  onClear: ClearRows;
  onUpdate: UpdateRow;
  onDelete: DeleteRow;
}

interface EntryProps {
  row: RowFieldProps;
  onUpdate: UpdateRow;
  onDelete: DeleteRow;
}

interface EntryFieldProps {
  id: number;
  inputType: InputType;
  name: keyof RowFieldProps;
  fieldValue?: string | number;
  placeholder: string;
  onUpdate: UpdateRow;
  width: number;
  max?: string;
  valid?: boolean;
  dirty?: boolean;
  validReason?: RowValidationReason;
}

const Field = (props: EntryFieldProps) => {
  const onChange = (
    field: keyof RowFieldProps,
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data: RowFieldProps = { id: id, dirty: true };
    data[field] = event.target.value;
    props.onUpdate(data);
  };

  const reason = props.validReason && (props.validReason as any)[props.name];

  const valid: boolean = props.valid || false;
  const dirty: boolean = props.dirty || false;
  const invalid: boolean = dirty && !valid && !!reason;

  return (
    <div className={`col-sm-${props.width} mx-2`}>
      <Input
        onChange={event => onChange(props.name, props.id, event)}
        id={`${props.name}_${props.id}`}
        type={props.inputType}
        name={`${props.name}_${props.id}`}
        placeholder={props.placeholder}
        value={props.fieldValue}
        max={props.max}
        valid={valid}
        invalid={invalid}
        step={props.inputType === 'number' ? '0.01' : undefined}
        min={props.inputType === 'number' ? '0' : undefined}
      />
      {invalid && (
        <FormFeedback valid={valid} invalid={invalid}>
          {reason}
        </FormFeedback>
      )}
    </div>
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
        valid={row.valid}
        dirty={row.dirty}
        validReason={row.validReason}
      />
      <Field
        id={row.id}
        name="supplier"
        placeholder="Leverandør"
        inputType="text"
        fieldValue={row.supplier}
        onUpdate={onUpdate}
        width={2}
        valid={row.valid}
        dirty={row.dirty}
        validReason={row.validReason}
      />
      <Field
        id={row.id}
        name="description"
        placeholder="Beskrivelse"
        inputType="text"
        fieldValue={row.description}
        onUpdate={onUpdate}
        width={4}
        valid={row.valid}
        dirty={row.dirty}
        validReason={row.validReason}
      />
      <Field
        id={row.id}
        name="cost"
        placeholder="Beløp inkl. mva (NOK)"
        inputType="number"
        fieldValue={row.cost}
        onUpdate={onUpdate}
        width={2}
        valid={row.valid}
        dirty={row.dirty}
        validReason={row.validReason}
      />

      <Valid valid={row.valid} />

      <div onClick={() => props.onDelete(row.id)}>
        <Trash />
      </div>
    </FormGroup>
  );
};

const Details = (props: DetailsProps) => {
  const sum = +props.rows.total;
  return (
    <Form>
      {props.rows.rows.map(row => (
        <Entry
          key={`row_${row.id}`}
          row={row}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
        />
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
  onUpdate: updateRow,
  onDelete: deleteRow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rows);
