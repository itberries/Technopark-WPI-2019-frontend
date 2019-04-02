import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  user: undefined,
  state: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_PROFILE_FETCHED:
      return Immutable.merge({
        ...state,
        user: action.user,
        state: action.userState,
      });
    case types.USER_NEW_STATE_FETCHED:
      return Immutable.merge({
        ...state,
        state: action.nextState,
      });
    default:
      return state;
  }
}

// Selectors

export function getUserState(state) {
  return state.user.state;
}

export function getUser(state) {
  return state.user.user;
}
