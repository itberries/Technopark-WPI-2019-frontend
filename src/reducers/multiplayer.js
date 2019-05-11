import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  playerPosition: 0,
  opponentPosition: 0,
  timerResetValue: 5,
  timerNeedReset: false,
});

export default function reduce(state = initialState, action) {
  console.log('action reduce');
  switch (action.type) {
    case types.PLAYER_MOVE:
      console.log('action PLAYER_MOVE');
      return Immutable.merge({
        ...state,
        playerPosition: action.position,
      });
    case types.OPPONENT_MOVE:
      console.log('action OPPONENT_MOVE');
      return Immutable.merge({
        ...state,
        opponentPosition: action.position,
      });
    case types.TIMER_RESET:
      console.log('action TIMER_RESET');
      console.log('action.timer:', action.timer);
      return Immutable.merge({
        ...state,
        timerResetValue: action.timer,
        timerNeedReset: true,
      });
    case types.TIMER_WAS_RESET:
      console.log('action TIMER_WAS_RESET');
      return Immutable.merge({
        ...state,
        timerNeedReset: false,
      });
    default:
      return state;
  }
}
