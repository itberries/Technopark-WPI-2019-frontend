import mockVKConnect from '@vkontakte/vkui-connect-mock';
import realVKConnect from '@vkontakte/vkui-connect';

import * as types from '../../constants/actionTypes';

const VKConnect = types.DEBUG ? mockVKConnect : realVKConnect;
console.log('after vkConnect, DEBUG, vkConnect:', types.DEBUG, VKConnect);

export function fetchCurrentUserInfo() {
  return (dispatch) => {
    dispatch({
      type: types.VK_GET_USER_INFO_REQUEST,
    });
    VKConnect.send('VKWebAppGetUserInfo', {});
  };
}

export function init() {
  return (dispatch) => {
    console.log('init before dispatch.');
    dispatch({
      type: types.VK_INIT,
    });
    VKConnect.subscribe((event) => {
      console.log('event: ', event);
      const vkEvent = event.detail;
      if (!vkEvent) {
        return;
      }
      const { type, data } = vkEvent;

      switch (type) {
        case 'VKWebAppGetUserInfoResult':
          dispatch({
            type: types.VK_GET_USER_INFO_FETCHED,
            payload: data,
          });
          break;
        case 'VKWebAppGetUserInfoFailed':
          dispatch({
            type: types.VK_GET_USER_INFO_FAILED,
            payload: data,
          });
          break;
        default:
          break;
      }
    });
  };
}
