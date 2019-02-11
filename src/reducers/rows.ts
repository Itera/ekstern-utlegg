import validate from 'validate.js';
import moment from 'moment';
import { Action, RowsFormProps, UpdateRowAction } from '../types';

const initialState = () => {
  return {
    rows: [],
    total: 0
  };
};

const updateState = (state: RowsFormProps, action: UpdateRowAction) => {
  const newState = { ...state };

  let sum: number = 0;

  for (const idx in newState.rows) {
    let row = newState.rows[idx];

    if (row.id === action.row.id) {
      row = { ...row, ...action.row };

      validate.extend(validate.validators.datetime, {
        parse: function(value: any) {
          return +moment.utc(value);
        },
        format: function(value: any, options: any) {
          const format = options.dateOnly
            ? 'YYYY-MM-DD'
            : 'YYYY-MM-DD hh:mm:ss';
          return moment.utc(value).format(format);
        }
      });

      row.validReason = validate(row, {
        date: {
          presence: true,
          date: {
            earliest: moment()
              .subtract(1, 'years')
              .format('YYYY-MM-DD'),
            latest: moment().format('YYYY-MM-DD')
          }
        },
        description: {
          presence: true,
          length: { minimum: 2 }
        },
        supplier: {
          presence: true,
          length: { minimum: 2 }
        },
        cost: {
          presence: true,
          numericality: { greaterThan: 0 }
        }
      });

      row.valid = row.validReason === undefined;

      newState.rows[idx] = row;
    }

    if (row.valid) {
      let cost: number = 0;

      if (row.cost) {
        if (typeof row.cost === 'string') {
          cost = +row.cost;
        } else if (typeof row.cost === 'number') {
          cost = row.cost;
        }
      }

      row.cost = cost;

      sum += cost;
    }
  }

  newState.total = sum as number;

  return newState;
};

const addRow = (state: RowsFormProps) => {
  const newState = { ...state };

  newState.rows.push({
    id: state.rows.length + 1,
    date: '',
    description: '',
    cost: 0,
    supplier: '',
    valid: false
  });

  return newState;
};

const clearState = () => {
  return initialState();
};

const updateRows = (state: RowsFormProps = initialState(), action: Action) => {
  switch (action.type) {
    case 'UPDATE_ROW':
      return updateState(state, action as UpdateRowAction);
    case 'ADD_ROW':
      return addRow(state);
    case 'CLEAR_ROWS':
      return clearState();
    default:
      return state;
  }
};

export default updateRows;
