import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { updatePersonalia, clearPersonalia } from '../actions/personalia';
import Valid from './Valid';

import '../styles/form-buttons.css';

const fieldPropTypes = PropTypes.shape({
  value: PropTypes.string.isRequired,
  validReason: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ])
}).isRequired;

export const personaliaFormPropTypes = PropTypes.shape({
  address: fieldPropTypes,
  postcode: fieldPropTypes,
  town: fieldPropTypes,
  telephone: fieldPropTypes,
  email: fieldPropTypes,
  event: fieldPropTypes,
  account: fieldPropTypes
}).isRequired;

const Select = props => {
  const onChange = (field, event) => {
    const data = {};
    data[field] = { value: event.target.value };
    props.onUpdate(data);
  };

  return (
    <FormGroup className="row">
      <Label className="col-sm-2" for={props.field}>
        {props.name}
      </Label>

      <Input
        className="col-sm-9"
        type="select"
        name={props.field}
        id={props.field}
        value={props.value.value}
        onChange={event => onChange(props.field, event)}
      >
        <option value="110 410">Teknologi</option>
        <option value="110 420">Prosjekt- og Testledelse</option>
        <option value="110 460">DBX</option>
      </Input>
      <Valid valid={props.value.valid} />
    </FormGroup>
  );
};

Select.propTypes = {
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: fieldPropTypes,
  onUpdate: PropTypes.func.isRequired
};

const Field = props => {
  const onChange = (field, event) => {
    const data = {};
    data[field] = { value: event.target.value };
    props.onUpdate(data);
  };

  let placeholder = props.name;

  if (props.placeholder) {
    placeholder = props.placeholder;
  }

  return (
    <FormGroup className="row">
      <Label className="col-sm-2" for={props.field}>
        {props.name}
      </Label>
      <Input
        className="col-sm-9"
        type={props.type}
        name={props.field}
        id={props.field}
        value={props.value.value}
        placeholder={placeholder}
        onChange={event => onChange(props.field, event)}
      />
      <Valid valid={props.value.valid} />
    </FormGroup>
  );
};

Field.propTypes = {
  field: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: fieldPropTypes,
  name: PropTypes.string.isRequired
};

const Details = ({ personalia, onUpdate, onClear }) => {
  return (
    <Form>
      <Field
        field="name"
        name="Navn"
        type="text"
        value={personalia.name}
        onUpdate={onUpdate}
      />

      <Field
        field="address"
        name="Adresse"
        type="text"
        value={personalia.address}
        onUpdate={onUpdate}
      />

      <Field
        field="postcode"
        name="Postnr"
        type="text"
        value={personalia.postcode}
        onUpdate={onUpdate}
      />

      <Field
        field="town"
        name="Poststed"
        type="text"
        value={personalia.town}
        onUpdate={onUpdate}
      />

      <Field
        field="telephone"
        name="Tlf/Mob"
        type="tel"
        placeholder="Telefon eller mobil"
        value={personalia.telephone}
        onUpdate={onUpdate}
      />

      <Field
        field="email"
        name="E-post"
        type="email"
        placeholder="E-post adresse"
        value={personalia.email}
        onUpdate={onUpdate}
      />

      <Field
        field="event"
        name="Formål"
        type="text"
        placeholder="Hvilket arrangement"
        value={personalia.event}
        onUpdate={onUpdate}
      />

      <Select
        field="dept"
        name="Avdeling"
        value={personalia.dept}
        onUpdate={onUpdate}
      />

      <Field
        field="account"
        name="Kontonr"
        type="text"
        placeholder="Hvor skal pengene overføres"
        value={personalia.account}
        onUpdate={onUpdate}
      />

      <FormGroup className="row">
        <div className="col-sm-2" />
        <div className="col-sm-2 form-buttons">
          <Link to="/rows">
            <Button color="primary">Fortsett</Button>
          </Link>
        </div>
        <div className="col-sm-2 form-buttons">
          <Button color="danger" onClick={() => onClear()}>
            Tøm feltene
          </Button>
        </div>
      </FormGroup>
    </Form>
  );
};

Details.propTypes = {
  personalia: personaliaFormPropTypes,
  onUpdate: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

const Personalia = props => {
  return (
    <div>
      <Helmet>
        <title>Itera - om deg</title>
      </Helmet>

      <Container>
        <h1>Dine detaljer</h1>

        <p>Alle felter nedenfor er påkrevd</p>
      </Container>

      <Container>
        <Details {...props} />
      </Container>
    </div>
  );
};

Personalia.propTypes = {
  personalia: personaliaFormPropTypes,
  onUpdate: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export const mapStateToProps = state => {
  const props = {};

  if (state.personalia) {
    props.personalia = state.personalia;
  }

  return props;
};

const mapDispatchToProps = {
  onUpdate: updatePersonalia,
  onClear: clearPersonalia
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personalia);
