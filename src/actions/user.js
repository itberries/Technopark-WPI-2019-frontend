import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';

export function getUserProfile(id) {
  return async (dispatch) => {
    const [user, userState] = await backendAPIService.getProfile(id);
    dispatch({
      type: types.USER_PROFILE_FETCHED,
      user,
      userState,
    });
  };
}

export function addUserProfile(id) {
  return async (dispatch) => {
    const [user, userState] = await backendAPIService.addProfile(id);
    dispatch({
      type: types.USER_PROFILE_FETCHED,
      user,
      userState,
    });
  };
}

export function getAchievements() {
  return async (dispatch) => {
    const achievements = await backendAPIService.getAchievements();
    console.log('getAchievements action achievements:', achievements);
    dispatch({
      type: types.USER_ACHIEVEMENTS_FETCHED,
      achievements,
    });
  };
}
