import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  topUsersList: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LEADERBOARD_TOP_USERS_FETCHED:
      return Immutable.merge({
        ...state,
        topUsersList: action.topUsersArray,
      });
    default:
      return state;
  }
}
