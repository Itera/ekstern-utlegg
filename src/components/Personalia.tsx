import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback
} from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

import {
  ClearPersonalia,
  FieldProps,
  PersonaliaFormProps,
  UpdatePersonalia
} from '../types';

import { clearPersonalia, updatePersonalia } from '../actions/personalia';

import '../styles/form-buttons.css';

interface PersonaliaProps {
  personalia: PersonaliaFormProps;
  onUpdate: UpdatePersonalia;
  onClear: ClearPersonalia;
}

interface DetailsProps {
  personalia: PersonaliaFormProps;
  onUpdate: UpdatePersonalia;
  onClear: ClearPersonalia;
}

interface InputFieldProps {
  field: keyof PersonaliaFormProps;
  type: InputType;
  placeholder?: string;
  fieldValue?: FieldProps;
  name: string;
  onUpdate: UpdatePersonalia;
}

interface SelectFieldProps {
  field: keyof PersonaliaFormProps;
  name: string;
  fieldValue?: FieldProps;
  onUpdate: UpdatePersonalia;
}

const Select = (props: SelectFieldProps) => {
  const onChange = (
    field: keyof PersonaliaFormProps,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data: PersonaliaFormProps = {};
    data[field] = { value: event.target.value };
    props.onUpdate(data);
  };

  const field = props.fieldValue || ({} as FieldProps);

  const valid: boolean = field.valid || false;

  return (
    <FormGroup className="row">
      <Label className="col-sm-2" for={props.field}>
        {props.name}
      </Label>

      <Input
        className="col-sm-10"
        type="select"
        name={props.field}
        id={props.field}
        value={(props.fieldValue || ({} as FieldProps)).value}
        onChange={event => onChange(props.field, event)}
        valid={valid}
        invalid={!valid}
      >
        <option value="110 410">Teknologi</option>
        <option value="110 420">Prosjekt- og Testledelse</option>
        <option value="110 460">DBX</option>
      </Input>
    </FormGroup>
  );
};

const Field = (props: InputFieldProps) => {
  const onChange = (
    field: keyof PersonaliaFormProps,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data: PersonaliaFormProps = {};
    data[field] = { value: event.target.value, dirty: true };
    props.onUpdate(data);
  };

  let placeholder = props.name;

  if (props.placeholder) {
    placeholder = props.placeholder;
  }

  const field = props.fieldValue || ({} as FieldProps);

  const valid: boolean = field.valid || false;
  const dirty: boolean = field.dirty || false;
  const invalid: boolean = dirty && !valid;

  let reason = '';

  if (field.validReason) {
    if (field.validReason instanceof Array) {
      reason = field.validReason[0];
    } else {
      reason = field.validReason;
    }
  }

  return (
    <FormGroup className="row">
      <Label className="col-sm-2" for={props.field}>
        {props.name}
      </Label>
      <Input
        className="col-sm-10"
        type={props.type}
        name={props.field}
        id={props.field}
        value={(props.fieldValue || ({} as FieldProps)).value}
        placeholder={placeholder}
        onChange={event => onChange(props.field, event)}
        valid={valid}
        invalid={invalid}
        data-testid={`personalia-${props.field}`}
      />
      {invalid && (
        <FormFeedback
          className="offset-sm-2 col-sm-10"
          valid={valid}
          invalid={invalid}
        >
          {reason}
        </FormFeedback>
      )}
    </FormGroup>
  );
};

const Details = ({ personalia, onUpdate, onClear }: DetailsProps) => {
  return (
    <Form noValidate>
      <Field
        field="name"
        name="Navn"
        type="text"
        fieldValue={personalia.name}
        onUpdate={onUpdate}
      />

      <Field
        field="address"
        name="Adresse"
        type="text"
        fieldValue={personalia.address}
        onUpdate={onUpdate}
      />

      <Field
        field="postcode"
        name="Postnr"
        type="text"
        fieldValue={personalia.postcode}
        onUpdate={onUpdate}
      />

      <Field
        field="town"
        name="Poststed"
        type="text"
        fieldValue={personalia.town}
        onUpdate={onUpdate}
      />

      <Field
        field="telephone"
        name="Tlf/Mob"
        type="tel"
        placeholder="Telefon eller mobil"
        fieldValue={personalia.telephone}
        onUpdate={onUpdate}
      />

      <Field
        field="email"
        name="E-post"
        type="email"
        placeholder="E-post adresse"
        fieldValue={personalia.email}
        onUpdate={onUpdate}
      />

      <Field
        field="event"
        name="Formål"
        type="text"
        placeholder="Hvilket arrangement"
        fieldValue={personalia.event}
        onUpdate={onUpdate}
      />

      <Select
        field="dept"
        name="Avdeling"
        fieldValue={personalia.dept}
        onUpdate={onUpdate}
      />

      <Field
        field="account"
        name="Kontonr"
        type="text"
        placeholder="Hvor skal pengene overføres"
        fieldValue={personalia.account}
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

const Personalia = (props: PersonaliaProps) => {
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

export const mapStateToProps = (state: any) => ({
  personalia: state.personalia
});

const mapDispatchToProps = {
  onUpdate: updatePersonalia,
  onClear: clearPersonalia
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personalia);
