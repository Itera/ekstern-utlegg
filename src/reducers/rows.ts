import validate from 'validate.js';
import moment from 'moment';
import {
  Action,
  RowsFormProps,
  UpdateRowAction,
  DeleteRowAction,
  RowFieldProps
} from '../types';

const initialState = () => {
  return {
    rows: [],
    total: 0
  };
};

const getCost = (row: RowFieldProps): number => {
  if (row.cost) {
    if (typeof row.cost === 'string') {
      return +row.cost;
    } else if (typeof row.cost === 'number') {
      return row.cost;
    }
  }
  return 0;
};

const calculateSum = (rows: RowFieldProps[]) => {
  let sum: number = 0;

  for (const idx in rows) {
    const row = rows[idx];

    if (row.valid) {
      sum += getCost(row);
    }
  }

  return sum;
};

const updateState = (state: RowsFormProps, action: UpdateRowAction) => {
  const newState = { ...state };

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

      row.validReason = validate(
        row,
        {
          date: {
            presence: {
              message: 'må være en gyldig dato som ikke er i fremtid'
            },
            date: {
              earliest: moment()
                .subtract(1, 'years')
                .format('YYYY-MM-DD'),
              latest: moment().format('YYYY-MM-DD'),
              message: 'må være en gyldig dato som ikke er i fremtid'
            }
          },
          description: {
            presence: { message: 'må være minst 2 tegn' },
            length: { minimum: 2, message: 'må være minst 2 tegn' }
          },
          supplier: {
            presence: { message: 'må være minst 2 tegn' },
            length: { minimum: 2, message: 'må være minst 2 tegn' }
          },
          cost: {
            presence: { message: 'må være + NOK' },
            numericality: { greaterThan: 0, message: 'må være + NOK' }
          }
        },
        { fullMessages: false }
      );

      row.valid = row.validReason === undefined;

      if (row.valid) {
        row.dirty = false;
      }

      newState.rows[idx] = row;
    }

    if (row.valid) {
      const cost = getCost(row);

      // Force to number
      row.cost = cost;
    }
  }

  newState.total = calculateSum(newState.rows);

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
    valid: false,
    dirty: false
  });

  return newState;
};

const clearState = () => {
  return initialState();
};

const deleteRow = (state: RowsFormProps, action: DeleteRowAction) => {
  const keepRows: RowFieldProps[] = [];
  let sum: number = 0;

  for (const idx in state.rows) {
    const row = state.rows[idx];

    if (row.id !== action.id) {
      if (row.valid) {
        const cost = getCost(row);

        // Force cost to number
        row.cost = cost;
      }

      keepRows.push(row);
    }
  }

  return {
    rows: keepRows,
    total: calculateSum(keepRows)
  };
};

const updateRows = (state: RowsFormProps = initialState(), action: Action) => {
  switch (action.type) {
    case 'UPDATE_ROW':
      return updateState(state, action as UpdateRowAction);
    case 'ADD_ROW':
      return addRow(state);
    case 'CLEAR_ROWS':
      return clearState();
    case 'DELETE_ROW':
      return deleteRow(state, action as DeleteRowAction);
    default:
      return state;
  }
};

export default updateRows;
