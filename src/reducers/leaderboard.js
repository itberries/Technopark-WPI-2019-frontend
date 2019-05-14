import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  topUsersScoresList: undefined,
  topUsersInfoList: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LEADERBOARD_TOP_USERS_SCORES_FETCHED:
      return Immutable.merge({
        ...state,
        topUsersList: action.topUsersArray,
      });
    case types.LEADERBOARD_TOP_USERS_INFO_FETCHED:
      return Immutable.merge({
        ...state,
        topUsersInfoList: action.payload,
      });
    default:
      return state;
  }
}
