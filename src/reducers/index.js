import { combineReducers } from 'redux';

import subsectionReducer from './subsection';
import wsReducer from './ws';

const rootReducer = combineReducers({
  subsection: subsectionReducer,
  ws: wsReducer,
});

export default rootReducer;
