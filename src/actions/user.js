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
