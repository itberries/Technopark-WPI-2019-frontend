import { combineReducers } from 'redux';

import vkAppUserReducer from './vkAppUser';

const vkReducer = combineReducers({
  vkAppUser: vkAppUserReducer,
});

export default vkReducer;
