import { combineReducers } from 'redux';

import subsectionReducer from './subsection/reducer';

const rootReducer = combineReducers({
  subsection: subsectionReducer,
});

export default rootReducer;
