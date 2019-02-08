import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap';

import Valid from './Valid';

import { addRow, clearRows, updateRow } from '../actions/rows';

import '../styles/form-buttons.css';

export const rowFieldPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  supplier: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  validReason: PropTypes.shape({
    date: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    supplier: PropTypes.arrayOf(PropTypes.string),
    cost: PropTypes.arrayOf(PropTypes.string)
  })
}).isRequired;

export const rowsFormPropTypes = PropTypes.shape({
  rows: PropTypes.arrayOf(rowFieldPropTypes).isRequired,
  total: PropTypes.number.isRequired
}).isRequired;

const NumberField = props => {
  const onChange = (field, id, event) => {
    const data = { id: id };
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
      value={props.value}
      step="0.01"
      min="0"
      onChange={event => onChange(props.name, props.id, event)}
    />
  );
};

NumberField.propTypes = {
  id: PropTypes.number.isRequired,
  inputType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

const Field = props => {
  const onChange = (field, id, event) => {
    const data = { id: id };
    data[field] = event.target.value;
    props.onUpdate(data);
  };

  let placeholder = props.name;

  if (props.placeholder) {
    placeholder = props.placeholder;
  }

  const inputProps = {
    type: props.inputType,
    id: `${props.name}_${props.id}`,
    name: `${props.name}_${props.id}`,
    placeholder: placeholder,
    value: props.value
  };

  if (props.max) {
    inputProps.max = props.max;
  }

  return (
    <Input
      className={`col-sm-${props.width} mx-2`}
      onChange={event => onChange(props.name, props.id, event)}
      {...inputProps}
    />
  );
};

Field.propTypes = {
  id: PropTypes.number.isRequired,
  inputType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  max: PropTypes.string
};

const Entry = ({ row, onUpdate }) => {
  console.log(row);
  return (
    <FormGroup className="row">
      <Field
        id={row.id}
        name="date"
        placeholder="Dato"
        inputType="date"
        value={row.date}
        onUpdate={onUpdate}
        width={2}
        max={moment().format('YYYY-MM-DD')}
      />
      <Field
        id={row.id}
        name="supplier"
        placeholder="Leverandør"
        inputType="text"
        value={row.supplier}
        onUpdate={onUpdate}
        width={2}
      />
      <Field
        id={row.id}
        name="description"
        placeholder="Beskrivelse"
        inputType="text"
        value={row.description}
        onUpdate={onUpdate}
        width={4}
      />
      <NumberField
        id={row.id}
        name="cost"
        placeholder="Beløp inkl. mva (NOK)"
        inputType="number"
        value={row.cost}
        onUpdate={onUpdate}
        width={2}
      />

      <Valid valid={row.valid} />
    </FormGroup>
  );
};

Entry.propTypes = {
  row: rowFieldPropTypes,
  onUpdate: PropTypes.func.isRequired
};

const Details = props => {
  return (
    <Form>
      {props.rows.rows.map(row => (
        <Entry key={`row_${row.id}`} row={row} onUpdate={props.onUpdate} />
      ))}

      <Row>
        <Col className="col-sm-2 offset-sm-8">
          <p className="float-right">Sum: {props.rows.total.toFixed(2)} NOK</p>
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

Details.propTypes = {
  rows: rowsFormPropTypes,
  onAdd: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

const Rows = props => {
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

Rows.propTypes = Details.propTypes;

const mapStateToProps = state => ({
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
