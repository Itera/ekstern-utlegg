import {
  accountregex,
  formatAccount,
  formatTlf,
  tlfregex
} from '../formatters';

import { single } from 'validate.js';
import {
  Action,
  FieldProps,
  PersonaliaFormProps,
  UpdatePersonaliaAction
} from '../types';

const emptyField: FieldProps = {
  value: '',
  valid: false,
  validReason: ''
};

const initialState = () => {
  return {
    name: { ...emptyField },
    address: { ...emptyField },
    postcode: { ...emptyField },
    town: { ...emptyField },
    telephone: { ...emptyField },
    email: { ...emptyField },
    event: { ...emptyField },
    account: { ...emptyField },
    dept: {
      ...{
        value: '110 410',
        valid: true
      }
    }
  };
};

const validateField = (validations: any, field?: FieldProps) => {
  if (field) {
    const fieldState = { ...emptyField };

    validations.presence = true;

    fieldState.value = field.value;
    fieldState.validReason = single(field.value, validations);
    fieldState.valid = fieldState.validReason === undefined;

    return fieldState;
  }
};

const updateState = (
  state: PersonaliaFormProps,
  action: UpdatePersonaliaAction
) => {
  const newState = { ...state, ...action.personalia };

  if (newState.account && newState.account.value) {
    newState.account.value = formatAccount(newState.account.value);
  }

  if (newState.telephone && newState.telephone.value) {
    newState.telephone.value = formatTlf(newState.telephone.value);
  }

  newState.name = validateField({ length: { minimum: 3 } }, newState.name);
  newState.address = validateField(
    {
      length: { minimum: 3 }
    },
    newState.address
  );
  newState.postcode = validateField(
    {
      length: { is: 4 },
      format: /^[0-9]{4}$/
    },
    newState.postcode
  );
  newState.telephone = validateField({ format: tlfregex }, newState.telephone);
  newState.town = validateField({ length: { minimum: 2 } }, newState.town);
  newState.event = validateField({ length: { minimum: 3 } }, newState.event);
  newState.account = validateField({ format: accountregex }, newState.account);
  newState.email = validateField({ email: true }, newState.email);
  newState.dept = validateField(
    {
      length: { is: 7 },
      format: /^[0-9]{3} [0-9]{3}$/
    },
    newState.dept
  );

  return newState;
};

const clearState = () => {
  return initialState();
};

const updatePersonalia = (
  state: PersonaliaFormProps = initialState(),
  action: Action
) => {
  switch (action.type) {
    case 'UPDATE_PERSONALIA':
      return updateState(state, action as UpdatePersonaliaAction);
    case 'CLEAR_PERSONALIA':
      return clearState();
    default:
      return state;
  }
};

export default updatePersonalia;
