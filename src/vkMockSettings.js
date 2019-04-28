import { response as res } from '@vkontakte/vkui-connect-mock';

res.VKWebAppGetUserInfo.data = {
  type: 'VKWebAppGetUserInfoResult',
  data: {
    photo_100: 'https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg',
    photo_200: 'https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg',
    first_name: 'Василий',
    last_name: 'Иванов',
    id: 2147483645,
  },
};
