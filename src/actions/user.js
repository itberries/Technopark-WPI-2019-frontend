import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';

export function getUserProfile(id) {
  return async (dispatch) => {
    console.log('getUserProfile');
    const [user, userState] = await backendAPIService.getProfile(id);
    console.log('getUserProfile after await');
    dispatch({
      type: types.USER_PROFILE_FETCHED,
      user,
      userState,
    });
  };
}

export function addUserProfile(id) {
  return async (dispatch) => {
    console.log('addUserProfile');
    const [user, userState] = await backendAPIService.addProfile(id);
    console.log('addUserProfile after await');
    dispatch({
      type: types.USER_PROFILE_FETCHED,
      user,
      userState,
    });
  };
}
