import Immutable from 'seamless-immutable';
import { WEBSOCKET_OPENED } from '../constants/actionTypes';

const initialState = Immutable({
  socket: null,
  messages: [],
  worker: null,
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case WEBSOCKET_OPENED:
      console.log(action);
      return {
        ...state,
        socket: action.socket,
      };
    default:
      return state;
  }
}

// Selectors
