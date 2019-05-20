import VKConnect from '../../vkconnect';

import * as types from '../../constants/actionTypes';

import { getUserProfile, addUserProfile } from '../user';

export function fetchCurrentUserInfo(store) {
  store.dispatch({
    type: types.VK_GET_USER_INFO_REQUEST,
  });
  VKConnect.send('VKWebAppGetUserInfo', {});
  VKConnect.send('VKWebAppGetAuthToken', {
    app_id: 6881169,
    scope: 'friends',
  });
}

export function init(store) {
  console.log('init before dispatch.');
  store.dispatch({
    type: types.VK_INIT,
  });
  VKConnect.subscribe(async (event) => {
    console.log('event: ', event);
    const vkEvent = event.detail;
    if (!vkEvent) {
      return;
    }
    const { type, data } = vkEvent;

    switch (type) {
      case 'VKWebAppGetUserInfoResult':
        store.dispatch({
          type: types.VK_GET_USER_INFO_FETCHED,
          payload: data,
        });
        console.log('VK VKWebAppGetUserInfoResult before getUserProfile');
        try {
          await getUserProfile(store, data.id);
        } catch (error) {
          if (typeof error.response !== 'undefined' && error.response.status === 404) {
            console.log('REGISTRATION');
            await addUserProfile(store, data.id);
          } else {
            console.error('getProfile error!!!', error.response);
          }
        }
        console.log('VK VKWebAppGetUserInfoResult after getUserProfile, ');
        break;
      case 'VKWebAppGetUserInfoFailed':
        store.dispatch({
          type: types.VK_GET_USER_INFO_FAILED,
          payload: data,
        });
        break;
      case 'VKWebAppCallAPIMethodResult':
        console.log('VK VKWebAppCallAPIMethodResult data:', data);
        if (data.request_id === 'getOpponentInfo') {
          store.dispatch({
            type: types.MULTIPLAYER_GET_OPPONENT_INFO,
            payload: data.response[0],
          });
        } else if (data.request_id === 'getTopUsersInfo') {
          store.dispatch({
            type: types.LEADERBOARD_TOP_USERS_INFO_FETCHED,
            payload: data.response,
          });
        } else if (data.request_id === 'getTopFriendsUsersInfo') {
          store.dispatch({
            type: types.LEADERBOARD_TOP_FRIENDS_USERS_INFO_FETCHED,
            payload: data.response,
          });
        }
        break;
      case 'VKWebAppCallAPIMethodFailed':
        store.dispatch({
          type: types.VK_GET_API_METHOD_FAILED,
          payload: data,
        });
        break;
      case 'VKWebAppAccessTokenReceived':
        store.dispatch({
          type: types.VK_GET_USER_ACCESS_TOKEN_FETCHED,
          payload: data.access_token,
        });
        break;
      case 'VKWebAppAccessTokenFailed':
        store.dispatch({
          type: types.VK_GET_USER_ACCESS_TOKEN_FAILED,
          payload: data,
        });
        break;
      default:
        break;
    }
  });
}
