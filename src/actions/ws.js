import * as types from '../constants/actionTypes';

export default function websocketOpen(path) {
  return async (dispatch) => {
    const socket = new WebSocket(`wss://it-berries.ru/${path}`);
    socket.onopen = () => {
      console.log('Connection opened');
      console.log('socket in action', socket);
      dispatch({
        type: types.WEBSOCKET_OPENED,
        socket,
      });
    };
  };
}
