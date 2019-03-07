import React from 'react';
import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

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
// import PanelData from './panels/PanelData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: 'workflow',
      fetchedUser: null,
    };
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  componentDidMount() {
    connect.subscribe((e) => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          this.setState({ fetchedUser: e.detail.data });
          break;
        default:
          console.log(e.detail.type);
      }
    });
    connect.send('VKWebAppGetUserInfo', {});
  }

  onPanelChange(e) {
    this.setState({ activePanel: e.currentTarget.dataset.story });
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
      /* PanelData(Workflow, 'workflow', 'Workflow', workflowIcon),
      PanelData(Games, 'games', 'Games', gamesIcon),
      PanelData(LeaderBoard, 'leaderboard', 'Leaderboard', leaderboardIcon),
      PanelData(Events, 'events', 'Events', eventsIcon),
      PanelData(Profile, 'profile', 'Profile', profileIcon) */
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

export default App;
