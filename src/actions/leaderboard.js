import VKConnect from '../vkconnect';
import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';
import * as userSelectors from '../reducers/user';
import * as vkUserSelectors from '../reducers/vkApp/vkAppUser';

export function fetchTopUsers() {
  return async (dispatch, getState) => {
    try {
      const user = userSelectors.getUser(getState());
      const authToken = vkUserSelectors.getVkUserAuthToken(getState());
      console.log('LEADERBOARD fetchTopUsers user, authToken: ', user, authToken);
      const topUsersArray = await backendAPIService.getTopUsers(user.id);
      const topUsersIds = topUsersArray.reduce(
        (acc, cur) => (acc ? `${acc},${cur.id}` : `${cur.id}`),
        '',
      );
      console.log('LEADERBOARD topUsersArray, topUsersIds: ', topUsersArray, topUsersIds);
      dispatch({
        type: types.LEADERBOARD_TOP_USERS_SCORES_FETCHED,
        topUsersArray,
      });
      VKConnect.send('VKWebAppCallAPIMethod', {
        method: 'users.get',
        params: {
          user_ids: topUsersIds,
          fields: 'photo_100',
          v: '5.95',
          access_token: authToken,
        },
        request_id: 'getTopUsersInfo',
      });
    } catch (error) {
      console.log('FETCH TOP CATCH');
      console.error(error);
    }
  };
}
