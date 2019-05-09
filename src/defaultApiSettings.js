import axios from 'axios';

import serverUrl from './config';

axios.defaults.baseURL = `${serverUrl}/api`;
axios.defaults.mode = 'cors';
axios.defaults.withCredentials = true;
