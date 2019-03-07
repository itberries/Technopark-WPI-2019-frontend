import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import axios from 'axios';

import connect from '@vkontakte/vkui-connect';
import {
  View, Epic, Tabbar, TabbarItem,
} from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import Workflow from './panels/workflow/Workflow';
import Games from './panels/games/Games';
import Profile from './panels/profile/Profile';
import Leaderboard from './panels/leaderboard/LeaderBoard';
import Events from './panels/events/Events';

import './Tabbar.css';

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
      activePanel: props.paramName,
      fetchedUser: null,
      backendUser: null,
    };
    this.onPanelChange = this.onPanelChange.bind(this);
    console.log('in constructor');
  }

  componentDidMount() {
    connect.subscribe((e) => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          console.log('fetchedUser', e.detail.data);
          this.setState({ fetchedUser: e.detail.data });
          this.checkIfUserExists();
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

  checkIfUserExists() {
    const id = this.state.fetchedUser ? this.state.fetchedUser.id : undefined;
    if (typeof id === 'undefined') {
      console.log('fetchGetUserById no id!!!');
      return;
    }
    axios
      .get(`${BACKEND_API_ADDRESS}/users/${id}`)
      .then((response) => {
        const backendUser = response.data;
        this.setState({ backendUser });
        console.log('fetchGetUserById user: ', backendUser);
      })
      .catch(error => console.log('fetchGetUserById error!!!', error));
  }

  render() {
    console.log('active panel: ', this.state.activePanel);

    return (
      <Epic
        // eslint-disable-next-line react/destructuring-assignment
        activeStory={this.state.activePanel}
        tabbar={(
          <Tabbar>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'workflow'}
              data-story="workflow"
              text="Workflow"
            >
              <img src={workflowIcon} alt="workflow icon" />
            </TabbarItem>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'games'}
              data-story="games"
              text="Games"
            >
              <img src={gamesIcon} alt="games icon" />
            </TabbarItem>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'leaderboard'}
              data-story="leaderboard"
              text="Leaderboard."
            >
              <img src={leaderboardIcon} alt="leaderboard icon" />
            </TabbarItem>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'events'}
              data-story="events"
              text="Events"
            >
              <img src={eventsIcon} alt="events icon" />
            </TabbarItem>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'profile'}
              data-story="profile"
              text="Profile"
            >
              <img src={profileIcon} alt="profile icon" />
            </TabbarItem>
          </Tabbar>
)}
      >
        {/* Panels */}
        <View id="workflow" activePanel="workflow">
          <Workflow id="workflow" fetchedUser={this.state.fetchedUser} />
        </View>
        <View id="games" activePanel="games">
          <Games id="games" fetchedUser={this.state.fetchedUser} />
        </View>
        <View id="leaderboard" activePanel="leaderboard">
          <Leaderboard id="leaderboard" fetchedUser={this.state.fetchedUser} />
        </View>
        <View id="events" activePanel="events">
          <Events id="events" fetchedUser={this.state.fetchedUser} />
        </View>
        <View id="profile" activePanel="profile">
          <Profile id="profile" fetchedUser={this.state.fetchedUser} />
        </View>
      </Epic>
    );
  }
}

App.propTypes = {
  paramName: PropTypes.string,
};

App.defaultProps = {
  paramName: 'workflow',
};

export default App;
