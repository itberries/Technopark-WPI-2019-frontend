import { combineReducers } from 'redux';

import vkReducer from './vkApp';
import userReducer from './user';
import learningMapReducer from './learningmap';
import subsectionReducer from './subsection';
import wsReducer from './ws';

const rootReducer = combineReducers({
  vk: vkReducer,
  user: userReducer,
  learningMap: learningMapReducer,
  subsection: subsectionReducer,
  ws: wsReducer,
});

export default rootReducer;
