import mockVKConnect from '@vkontakte/vkui-connect-mock';
import realVKConnect from '@vkontakte/vkui-connect';

import * as types from '../../constants/actionTypes';

const VKConnect = types.DEBUG ? mockVKConnect : realVKConnect;

export function fetchCurrentUserInfo() {
  return (dispatch) => {
    dispatch({
      type: types.VK_GET_USER_INFO_REQUEST,
    });
    VKConnect.send('VKWebAppGetUserInfo', {});
  };
}

export function init() {
  console.log('vk init action');
  return (dispatch) => {
    dispatch({
      type: types.VK_INIT,
    });
    VKConnect.subscribe((event) => {
      const vkEvent = event.detail;
      console.log('in subscribe, event handler', vkEvent);
      if (!vkEvent) {
        console.error('invalid event', event);
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
        /*
          if (typeof data.id !== 'undefined') {
            const user = {
              id: event.detail.data.id,
              photo: event.detail.data.photo_200,
              firstName: event.detail.data.first_name,
              lastName: event.detail.data.last_name,
            };
            this.setState({ user });
            this.getProfile();
          }
          */
        default:
          break;
      }

      console.log('vk init before send');
      VKConnect.send('VKWebAppInit', {});
    });
  };
}
