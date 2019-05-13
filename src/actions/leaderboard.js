import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';
import * as userSelectors from '../reducers/user';

export function fetchTopUsers() {
  return async (dispatch, getState) => {
    try {
      const user = userSelectors.getUser(getState());
      const topUsersArray = await backendAPIService.getTopUsers(user.id);
      dispatch({
        type: types.LEADERBOARD_TOP_USERS_FETCHED,
        topUsersArray,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
