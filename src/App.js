import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import axios from 'axios';

import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

import Workflow from './panels/Workflow/Workflow';
import Games from './panels/Games/Games';
import Profile from './panels/Profile/Profile';
import LeaderBoard from './panels/Leaderboards/LeaderBoard';
import Events from './panels/Events/Events';
import Navigation from './common.blocks/navigation/Navigation';

import workflowIcon from './images/icons/workflow.svg';
import gamesIcon from './images/icons/games.svg';
import leaderboardIcon from './images/icons/leaderboard.svg';
import eventsIcon from './images/icons/events.svg';
import profileIcon from './images/icons/profile.svg';

const history = createBrowserHistory();

const BACKEND_API_ADDRESS = 'http://it-berries.ru:8080';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: props.panelName,
      fetchedUser: null,
      backendUser: null,
    };
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  componentDidMount() {
    connect.subscribe((e) => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          console.log('fetchedUser', e.detail.data);
          this.setState({ fetchedUser: e.detail.data });
          this.getProfileData();
          break;
        default:
          console.log(e.detail.type);
      }
    });
    connect.send('VKWebAppGetUserInfo', {});
    window.scrollTo(0, document.getElementsByClassName('learnMap')[0].scrollHeight);
    console.log('App isload');
  }

  onPanelChange(e) {
    const location = {
      pathname: `/${e.currentTarget.dataset.story}`,
    };
    history.push(location);
    this.setState({ activePanel: e.currentTarget.dataset.story });
  }

  getProfileData() {
    const id = this.state.fetchedUser ? this.state.fetchedUser.id : undefined;
    if (typeof id === 'undefined') {
      console.log('getProfileData no id!!!');
      return;
    }
    const user = {
      id,
      score: 0,
    };

    console.log('getProfileData user with id', id);

    axios
      .post(`${BACKEND_API_ADDRESS}/user/`, user)
      .then((resp) => {
        console.log('post then resp: ', resp.data);
        axios
          .get(`${BACKEND_API_ADDRESS}/user/${id}`)
          .then((response) => {
            const backendUser = response.data;
            this.setState({ backendUser });
            console.log('getProfileData user: ', backendUser);
          })
          .catch(error => console.log('fetchGetUserById error in get!!!', error));
      })
      .catch(error => console.log('fetchGetUserById error in post!!!', error));
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
        fetchedUser={this.state.fetchedUser}
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
