import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';

export function getUserProfile(id) {
  return async (dispatch) => {
    const [user, userState, userAchievements] = await backendAPIService.getProfile(id);
    dispatch({
      type: types.USER_PROFILE_FETCHED,
      user,
      userState,
      userAchievements,
    });
  };
}

export function addUserProfile(id) {
  return async (dispatch) => {
    const [user, userState, userAchievements] = await backendAPIService.addProfile(id);
    dispatch({
      type: types.USER_PROFILE_FETCHED,
      user,
      userState,
      userAchievements,
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
