import { combineReducers } from 'redux';

import rows from './rows';
import personalia from './personalia';

const reducers = combineReducers({
  personalia,
  rows
});

export default reducers;
