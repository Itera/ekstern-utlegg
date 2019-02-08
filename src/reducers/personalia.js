import {
  formatAccount,
  formatTlf,
  tlfregex,
  accountregex
} from '../formatters';

import { single } from 'validate.js';

const emptyField = {
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

const validateField = (field, validations) => {
  const fieldState = { ...emptyField };

  validations.presence = true;

  fieldState.value = field.value;
  fieldState.validReason = single(field.value, validations);
  fieldState.valid = fieldState.validReason === undefined;

  return fieldState;
};

const updateState = (state, action) => {
  const newState = { ...state, ...action.personalia };

  if (newState.account.value) {
    newState.account.value = formatAccount(newState.account.value);
  }

  if (newState.telephone.value) {
    newState.telephone.value = formatTlf(newState.telephone.value);
  }

  newState.name = validateField(newState.name, { length: { minimum: 3 } });
  newState.address = validateField(newState.address, {
    length: { minimum: 3 }
  });
  newState.postcode = validateField(newState.postcode, {
    length: { is: 4 },
    format: /^[0-9]{4}$/
  });
  newState.telephone = validateField(newState.telephone, { format: tlfregex });
  newState.town = validateField(newState.town, { length: { minimum: 2 } });
  newState.event = validateField(newState.event, { length: { minimum: 3 } });
  newState.account = validateField(newState.account, { format: accountregex });
  newState.email = validateField(newState.email, { email: true });
  newState.dept = validateField(newState.dept, {
    length: { is: 7 },
    format: /^[0-9]{3} [0-9]{3}$/
  });

  return newState;
};

const clearState = () => {
  return initialState();
};

const updatePersonalia = (state = initialState(), action) => {
  switch (action.type) {
    case 'UPDATE_PERSONALIA':
      return updateState(state, action);
    case 'CLEAR_PERSONALIA':
      return clearState();
    default:
      return state;
  }
};

export default updatePersonalia;
