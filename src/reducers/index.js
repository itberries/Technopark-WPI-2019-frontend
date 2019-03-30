import { combineReducers } from 'redux';

import subsectionReducer from './subsection';

const rootReducer = combineReducers({
  subsection: subsectionReducer,
});

export default rootReducer;
