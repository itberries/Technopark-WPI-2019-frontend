import * as types from '../constants/actionTypes';

export function websocketOpen() {
  return async (dispatch) => {
    const socket = new WebSocket('wss://it-berries.ru/game/');
    socket.onopen = () => {
      dispatch({
        type: types.WEBSOCKET_OPENED,
        socket,
      });
    };
  };
}

export function websocketOnMessage(msg) {
  return async (dispatch) => {
    dispatch({
      type: types.WEBSOCKET_MESSAGE,
      msg,
    });
  };
}

export function answerReceived() {
  return async (dispatch) => {
    dispatch({
      type: types.RESPONSE_RECEIVED,
    });
  };
}

export function websocketClose() {
  return async (dispatch) => {
    dispatch({
      type: types.WEBSOCKET_CLOSED,
    });
  };
}
