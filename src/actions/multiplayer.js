import * as types from '../constants/actionTypes';

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

export function resetTimer(time) {
  return async (dispatch) => {
    let timer = time;
    console.log('timer: ', timer);
    if (timer === undefined || timer === null) {
      timer = 5;
    }
    console.log('timer: ', timer);
    dispatch({
      type: types.TIMER_RESET,
      timer,
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
