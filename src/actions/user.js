import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';

export async function getUserProfile(store, id) {
  const [user, userState, userAchievements] = await backendAPIService.getProfile(id);
  console.log('getUserProfile store', store);
  store.dispatch({
    type: types.USER_PROFILE_FETCHED,
    user,
    userState,
    userAchievements,
  });
}

export async function addUserProfile(store, id) {
  const [user, userState, userAchievements] = await backendAPIService.addProfile(id);
  console.log('addUserProfile store', store);
  store.dispatch({
    type: types.USER_PROFILE_FETCHED,
    user,
    userState,
    userAchievements,
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
