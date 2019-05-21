import mockVKConnect from '@vkontakte/vkui-connect-mock';
import realVKConnect from '@vkontakte/vkui-connect';

import * as types from './constants/actionTypes';

const VKConnect = types.DEBUG ? mockVKConnect : realVKConnect;
if (types.DEBUG) {
  // console.log('DEBUG VK MODE >> USING VK CONNECT MOCK!');
}

export default VKConnect;
