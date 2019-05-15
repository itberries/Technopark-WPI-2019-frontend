import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  playerPosition: 0,
  opponentPosition: 0,
  timerResetValue: 5,
  timerNeedReset: false,
  playerTurns: [],
  opponentTurns: [],
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
    case types.PLAYER_RIGHT_TURN:
      console.log('action PLAYER_RIGHT_TURN');
      const newPlayerTurns = state.playerTurns.concat([action.right]);
      return Immutable.merge({
        ...state,
        playerTurns: newPlayerTurns,
      });
    case types.OPPONENT_MOVE:
      console.log('action OPPONENT_MOVE');
      const newOpponentTurns = state.opponentTurns.concat([action.right]);
      console.log('opponentTurns:', newOpponentTurns);
      return Immutable.merge({
        ...state,
        opponentPosition: action.position,
        opponentTurns: newOpponentTurns,
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
    case types.CLEAR_DATA:
      console.log('action CLEAR_DATA');
      return Immutable.merge({
        ...state,
        playerPosition: 0,
        opponentPosition: 0,
        playerTurns: [],
        opponentTurns: [],
      });
    default:
      return state;
  }
}
