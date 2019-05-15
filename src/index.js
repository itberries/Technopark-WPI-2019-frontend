import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import VKConnect from './vkconnect';

import getConfirmation from './history';
import configureStore from './store/store';

import { init, fetchCurrentUserInfo } from './actions/vkApp/vkAppUser';

import App from './App';
// import registerServiceWorker from './sw';

const store = configureStore();

// Init VK App
console.log('Init VK App VKConnect:', VKConnect);
VKConnect.send('VKWebAppInit', {});
init(store);
fetchCurrentUserInfo(store);

ReactDOM.render(
  <Provider store={store}>
    <Router getUserConfirmation={getConfirmation}>
      <Route
        path="/:viewName?"
        component={props => (
          <App location={props.location} viewName={props.match.params.viewName} />
        )}
      />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
