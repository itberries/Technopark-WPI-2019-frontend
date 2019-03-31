import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

import axios from 'axios';
import './defaultApiSettings';

import Workflow from './views/Workflow/Workflow';
import Games from './views/Games/Games';
import Profile from './views/Profile/Profile';
import LeaderBoard from './views/Leaderboard/Leaderboard';
import Events from './views/Events/Events';
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
      activeView: props.viewName,
      user: {
        id: 37924905,
      },
    };
    this.onViewChange = this.onViewChange.bind(this);
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
    this.getProfile();
  }

  /**
   * Change the active view after tabbar switched
   * @param {Event} e
   * @memberof App
   */
  onViewChange(e) {
    const location = {
      pathname: `/${e.currentTarget.dataset.story}`,
    };
    history.push(location);
    this.setState({ activeView: e.currentTarget.dataset.story });
  }

  getProfile() {
    const { user } = this.state;
    axios
      .get(`/user/${user.id}`)
      .then((response) => {
        if (typeof response.data.score !== 'undefined') {
          // TODO: remove duplicate code from there and addProfile
          user.score = response.data.user.score;
          user.state = {
            sectionId: response.data.userState.sectionId,
            subsectionId: response.data.userState.subsectionId,
            stepId: response.data.userState.stepId,
          };
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
        user.score = response.data.user.score;
        user.state = {
          sectionId: response.data.userState.sectionId,
          subsectionId: response.data.userState.subsectionId,
          stepId: response.data.userState.stepId,
        };
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
    const viewsData = [
      {
        view: Workflow,
        name: 'workflow',
        text: 'Workflow',
        icon: workflowIcon,
      },
      {
        view: Games,
        name: 'games',
        text: 'Games',
        icon: gamesIcon,
      },
      {
        view: LeaderBoard,
        name: 'leaderboard',
        text: 'Leaderboard',
        icon: leaderboardIcon,
      },
      {
        view: Events,
        name: 'events',
        text: 'Events',
        icon: eventsIcon,
      },
      {
        view: Profile,
        name: 'profile',
        text: 'Profile',
        icon: profileIcon,
      },
    ];
    const result = (
      <Navigation
        activeView={this.state.activeView}
        viewsData={viewsData}
        onViewChange={this.onViewChange}
        user={this.state.user}
      />
    );
    return result;
  }
}

App.propTypes = {
  viewName: PropTypes.string,
};

App.defaultProps = {
  viewName: 'workflow',
};

export default App;
