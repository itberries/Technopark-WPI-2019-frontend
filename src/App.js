import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

import axios from 'axios';
import './defaultApiSettings';

import Workflow from './panels/workflow/Workflow';
import Games from './panels/games/Games';
import Profile from './panels/profile/Profile';
import LeaderBoard from './panels/leaderboard/LeaderBoard';
import Events from './panels/events/Events';
import Navigation from './common.blocks/navigation/Navigation';

import workflowIcon from './images/icons/workflow.svg';
import gamesIcon from './images/icons/games.svg';
import leaderboardIcon from './images/icons/leaderboard.svg';
import eventsIcon from './images/icons/events.svg';
import profileIcon from './images/icons/profile.svg';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: props.panelName,
      user: null,
    };
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  componentDidMount() {
    connect.subscribe((e) => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          console.log('fetchedUser', e.detail.data);
          if (typeof e.detail.data.id !== 'undefined') {
            const user = {
              id: e.detail.data.id,
              firstname: e.detail.data.first_name,
              lastname: e.detail.data.last_name,
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
  }

  onPanelChange(e) {
    const location = {
      pathname: `/${e.currentTarget.dataset.story}`,
    };
    history.push(location);
    this.setState({ activePanel: e.currentTarget.dataset.story });
  }

  getProfile() {
    const { user } = this.state;
    console.log('get profile with id: ', user.id);
    axios
      .get(`/user/${user.id}`)
      .then((response) => {
        console.log('get user then resp: ', response.data);
        if (typeof response.data.score !== 'undefined') {
          user.score = response.data.score;
          this.setState({ user });
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          this.addProfile();
        } else {
          console.log('addProfile error!!!', error);
        }
      });
  }

  addProfile() {
    const { user } = this.state;
    console.log('add profile with id: ', user.id);
    axios
      .post('/user')
      .then((response) => {
        console.log('post user then resp: ', response.data);
        user.score = response.data.score;
        this.setState({ user });
      })
      .catch(error => console.log('addProfile error!!!', error));
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
