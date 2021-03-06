import { combineReducers } from 'redux';

import vkReducer from './vkApp';
import userReducer from './user';
import learningMapReducer from './learningmap';
import subsectionReducer from './subsection';
import wsReducer from './ws';
import multiplayerReducer from './multiplayer';
import leaderboardReducer from './leaderboard';
import eventsReducer from './events';

const rootReducer = combineReducers({
  vk: vkReducer,
  user: userReducer,
  learningMap: learningMapReducer,
  subsection: subsectionReducer,
  ws: wsReducer,
  multiplayer: multiplayerReducer,
  leaderboard: leaderboardReducer,
  events: eventsReducer,
});

export default rootReducer;
