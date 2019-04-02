import { combineReducers } from 'redux';

import vkReducer from './vkApp';
import userReducer from './user';
import learningMapReducer from './learningmap';
import subsectionReducer from './subsection';

const rootReducer = combineReducers({
  vk: vkReducer,
  user: userReducer,
  learningMap: learningMapReducer,
  subsection: subsectionReducer,
});

export default rootReducer;
