import * as types from '../constants/actionTypes';
import VKConnect from '../vkconnect';
import * as vkUserSelectors from '../reducers/vkApp/vkAppUser';

export function movePlayer(position) {
  console.log('action movePlayer ', types.PLAYER_MOVE);
  return async (dispatch) => {
    dispatch({
      type: types.PLAYER_MOVE,
      position,
    });
  };
}

export function rightTurn(right) {
  return async (dispatch) => {
    dispatch({
      type: types.PLAYER_RIGHT_TURN,
      right,
    });
  };
}

export function clearGameData() {
  return async (dispatch) => {
    dispatch({
      type: types.CLEAR_DATA,
    });
  };
}

export function moveOpponent(position, right) {
  return async (dispatch) => {
    dispatch({
      type: types.OPPONENT_MOVE,
      position,
      right,
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

export function fetchOpponentInfo(userId) {
  return async (dispatch, getState) => {
    try {
      const authToken = vkUserSelectors.getVkUserAuthToken(getState());
      VKConnect.send('VKWebAppCallAPIMethod', {
        method: 'users.get',
        params: {
          user_ids: `${userId}`,
          fields: 'photo_100',
          v: '5.95',
          access_token: authToken,
        },
        request_id: 'getOpponentInfo',
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function clearOpponentInfo() {
  console.log('action clearOpponentInfo ', types.MULTIPLAYER_CLEAR_OPPONENT_INFO);
  return async (dispatch) => {
    dispatch({
      type: types.MULTIPLAYER_CLEAR_OPPONENT_INFO,
    });
  };
}
