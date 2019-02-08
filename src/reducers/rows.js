import validate from 'validate.js';
import moment from 'moment';

const initialState = () => {
  return {
    rows: [],
    total: 0
  };
};

const updateState = (state, action) => {
  const newState = { ...state };

  let sum = 0;

  for (const idx in newState.rows) {
    let row = newState.rows[idx];

    if (row.id === action.row.id) {
      row = { ...row, ...action.row };

      validate.extend(validate.validators.datetime, {
        parse: function(value) {
          return +moment.utc(value);
        },
        format: function(value, options) {
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
      sum += row.cost;
    }
  }

  newState.total = Number.parseFloat(sum);

  return newState;
};

const addRow = state => {
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

const updateRows = (state = initialState(), action) => {
  switch (action.type) {
    case 'UPDATE_ROW':
      return updateState(state, action);
    case 'ADD_ROW':
      return addRow(state);
    case 'CLEAR_ROWS':
      return clearState();
    default:
      return state;
  }
};

export default updateRows;
