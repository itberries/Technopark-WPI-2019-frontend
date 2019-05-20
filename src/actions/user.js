import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';

export async function getUserProfile(store, id) {
  const [user, userState, userAchievements] = await backendAPIService.getProfile(id);
  store.dispatch({
    type: types.USER_PROFILE_FETCHED,
    user,
    userState,
    userAchievements,
    isFirstEntry: false,
  });
}

export async function addUserProfile(store, id) {
  const [user, userState, userAchievements] = await backendAPIService.addProfile(id);
  store.dispatch({
    type: types.USER_PROFILE_FETCHED,
    user,
    userState,
    userAchievements,
    isFirstEntry: true,
  });
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

export function updateUserProfile(id) {
  return async (dispatch) => {
    const [user, userState, userAchievements] = await backendAPIService.getProfile(id);
    console.log('updateUserProfile userAchievements: ', userAchievements);
    dispatch({
      type: types.USER_UPDATE_PROFILE,
      user,
      userState,
      userAchievements,
    });
  };
}
