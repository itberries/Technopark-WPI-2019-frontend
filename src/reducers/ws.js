import Immutable from 'seamless-immutable';
import {
  WEBSOCKET_OPENED,
  WEBSOCKET_MESSAGE,
  RESPONSE_RECEIVED,
  WEBSOCKET_CLOSED,
} from '../constants/actionTypes';

const initialState = Immutable({
  socket: null,
  messages: [],
  worker: null,
  answer: null,
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case WEBSOCKET_OPENED:
      return Immutable.merge({
        ...state,
        socket: action.socket,
      });
    case WEBSOCKET_MESSAGE:
      return Immutable.merge({
        ...state,
        answer: action.msg === 'true',
      });
    case RESPONSE_RECEIVED:
      return Immutable.merge({
        ...state,
        answer: null,
      });
    case WEBSOCKET_CLOSED:
      return Immutable.merge({
        ...state,
        socket: null,
      });
    default:
      return state;
  }
}

// Selectors
