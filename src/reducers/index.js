import { combineReducers } from 'redux';

import userReducer from './user';
import learningMapReducer from './learningmap';
import subsectionReducer from './subsection';

const rootReducer = combineReducers({
  user: userReducer,
  learningMap: learningMapReducer,
  subsection: subsectionReducer,
});

export default rootReducer;
