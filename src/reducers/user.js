import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  user: undefined,
  state: undefined,
  achievements: undefined,
  isFirstEntry: undefined,
  activeAchievements: undefined,
});

export default function reduce(state = initialState, action = {}) {
  let { isFirstEntry } = state;
  switch (action.type) {
    case types.USER_PROFILE_FETCHED:
      if (typeof state.isFirstEntry === 'undefined') {
        isFirstEntry = action.isFirstEntry;
      } else if (state.isFirstEntry === false && action.isFirstEntry === true) {
        isFirstEntry = action.isFirstEntry;
      }
      return Immutable.merge({
        ...state,
        user: action.user,
        state: action.userState,
        activeAchievements: action.userAchievements,
        isFirstEntry,
      });
    case types.USER_NEW_STATE_FETCHED:
      return Immutable.merge({
        ...state,
        state: action.nextState,
        // TODO: fix this hack
        // activeAchievements: action.userAchievements,
      });
    case types.USER_ACHIEVEMENTS_FETCHED:
      return Immutable.merge({
        ...state,
        achievements: action.achievements,
      });
    case types.USER_UPDATE_PROFILE:
      return Immutable.merge({
        ...state,
        user: action.user,
        state: action.userState,
        activeAchievements: action.userAchievements,
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
