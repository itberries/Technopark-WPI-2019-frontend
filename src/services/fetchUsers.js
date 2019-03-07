import axios from 'axios';

const BACKEND_API_ADDRESS = 'http://it-berries.ru:8080';

function fetchGetUserById(id) {
  let user;
  axios
    .get(`${BACKEND_API_ADDRESS}/users/${id}`)
    .then((response) => {
      this.user = response.data;
      console.log('fetchGetUserById user: ', user);
    })
    .catch((error) => {
      console.log('fetchGetUserById error!!!', error);
    });
}
