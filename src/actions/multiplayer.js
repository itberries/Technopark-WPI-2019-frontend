import * as types from '../constants/multiplayerActionTypes';

export function movePlayer(position) {
  console.log('action movePlayer ', types.PLAYER_MOVE);
  return async (dispatch) => {
    dispatch({
      type: types.PLAYER_MOVE,
      position,
    });
  };
}

export function moveOpponent(position) {
  return async (dispatch) => {
    dispatch({
      type: types.OPPONENT_MOVE,
      position,
    });
  };
}

export function resetTimer() {
  return async (dispatch) => {
    dispatch({
      type: types.TIMER_RESET,
    });
  };
}

export function timerWasReset() {
  return async (dispatch) => {
    dispatch({
      type: types.TIMER_WAS_RESET,
    });
  };
}
