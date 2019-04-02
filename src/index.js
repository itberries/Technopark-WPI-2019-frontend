import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import connect from '@vkontakte/vkui-connect';
import App from './App';
// import registerServiceWorker from './sw';

import configureStore from './store/store';

const store = configureStore();

// Init VK App
connect.send('VKWebAppInit', {});

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT
// registerServiceWorker();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route
        path="/:viewName?"
        component={props => <App viewName={props.match.params.viewName} />}
      />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
