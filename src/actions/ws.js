import * as types from '../constants/actionTypes';

export function websocketOpen(path) {
  return async (dispatch) => {
    const socket = new WebSocket('wss://it-berries.ru/game/');
    socket.onopen = () => {
      console.log('socket in action', socket);
      dispatch({
        type: types.WEBSOCKET_OPENED,
        socket,
      });
    };
  };
}

export function websocketOnMessage(msg) {
  console.log('get answer: ', msg);
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
  console.log('action on close socket!');
  return async (dispatch) => {
    dispatch({
      type: types.WEBSOCKET_CLOSED,
    });
  };
}
