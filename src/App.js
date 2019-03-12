import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

import axios from 'axios';
import './defaultApiSettings';

import Workflow from './panels/Workflow/Workflow';
import Games from './panels/Games/Games';
import Profile from './panels/Profile/Profile';
import LeaderBoard from './panels/Leaderboard/Leaderboard';
import Events from './panels/Events/Events';
import Navigation from './common.blocks/Navigation/Navigation';

import workflowIcon from './images/icons/workflow.svg';
import gamesIcon from './images/icons/games.svg';
import leaderboardIcon from './images/icons/leaderboard.svg';
import eventsIcon from './images/icons/events.svg';
import profileIcon from './images/icons/profile.svg';

const history = createBrowserHistory();

/**
 * Application entry point
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   *Creates an instance of App.
   * @param {object} props
   * @memberof App
   */
  constructor(props) {
    super(props);
    this.state = {
      activePanel: props.panelName,
      user: null,
    };
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  /**
   * Actions after the application is loaded
   * @memberof App
   */
  componentDidMount() {
    connect.subscribe((e) => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          if (typeof e.detail.data.id !== 'undefined') {
            const user = {
              id: e.detail.data.id,
              photo: e.detail.data.photo_200,
              firstName: e.detail.data.first_name,
              lastName: e.detail.data.last_name,
            };
            this.setState({ user });
            this.getProfile();
          }
          break;
        default:
          console.log(e.detail.type);
      }
    });
    connect.send('VKWebAppGetUserInfo', {});
    console.log('App isload');
  }

  /**
   * Change the active panel after tabbar switched
   * @param {Event} e
   * @memberof App
   */
  onPanelChange(e) {
    const location = {
      pathname: `/${e.currentTarget.dataset.story}`,
    };
    history.push(location);
    this.setState({ activePanel: e.currentTarget.dataset.story });
  }

  getProfile() {
    const { user } = this.state;
    axios
      .get(`/user/${user.id}`)
      .then((response) => {
        if (typeof response.data.score !== 'undefined') {
          user.score = response.data.score;
          this.setState({ user });
        }
      })
      .catch((error) => {
        if (typeof error.response !== 'undefined' && error.response.status === 404) {
          this.addProfile();
        } else {
          console.error('getProfile error!!!', error.response);
        }
      });
  }

  addProfile() {
    const { user } = this.state;
    axios
      .post('/user', { id: user.id })
      .then((response) => {
        user.score = response.data.score;
        this.setState({ user });
      })
      .catch((error) => {
        if (typeof error.response !== 'undefined' && error.response.status === 409) {
          console.error('addProfile conflict!!!', error.response);
        } else {
          console.error('addProfile error!!!', error.response);
        }
      });
  }

  render() {
    const panelsData = [
      {
        tag: Workflow,
        name: 'workflow',
        text: 'Workflow',
        icon: workflowIcon,
      },
      {
        tag: Games,
        name: 'games',
        text: 'Games',
        icon: gamesIcon,
      },
      {
        tag: LeaderBoard,
        name: 'leaderboard',
        text: 'Leaderboard',
        icon: leaderboardIcon,
      },
      {
        tag: Events,
        name: 'events',
        text: 'Events',
        icon: eventsIcon,
      },
      {
        tag: Profile,
        name: 'profile',
        text: 'Profile',
        icon: profileIcon,
      },
    ];
    const result = (
      <Navigation
        activePanel={this.state.activePanel}
        panelsData={panelsData}
        onPanelChange={this.onPanelChange}
        user={this.state.user}
      />
    );
    return result;
  }
}

App.propTypes = {
  panelName: PropTypes.string,
};

App.defaultProps = {
  panelName: 'workflow',
};

export default App;
