import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import connect from '@vkontakte/vkui-connect';

import getConfirmation from './history';
import configureStore from './store/store';

import App from './App';
// import registerServiceWorker from './sw';

const store = configureStore();

// Init VK App
connect.send('VKWebAppInit', {});

ReactDOM.render(
  <Provider store={store}>
    <Router getUserConfirmation={getConfirmation}>
      <Route
        path="/:viewName?"
        component={props => (
          <App key={props.match.params.viewName} viewName={props.match.params.viewName} />
        )}
      />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
