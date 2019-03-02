import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {
  View, Epic, Tabbar, TabbarItem, Panel, PanelHeader,
} from '@vkontakte/vkui';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28More from '@vkontakte/icons/dist/28/more';
import '@vkontakte/vkui/dist/vkui.css';

import Workflow from './panels/Workflow';
import Games from './panels/Games';
import Profile from './panels/Profile';
import Leaderboard from './panels/LeaderBoard';
import Events from './panels/Events';

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

  /* go = e => {
    this.setState({ activePanel: e.currentTarget.dataset.to });
  }; */

  onPanelChange(e) {
    this.setState({ activePanel: e.currentTarget.dataset.story });
  }

  render() {
    return (
    /* <View activePanel={this.state.activePanel}>
        <Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
        <Persik id="persik" go={this.go} />
        <Profile id="profile" fetchedUser={this.state.fetchedUser} go={this.go}/>
        <Workflow id="workflow" go={this.go} />
      </View> */

      // Our bottom bar
      <Epic
        activeStory={this.state.activePanel}
        tabbar={(
          <Tabbar>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'workflow'}
              data-story="workflow"
              text="Workflow"
            >
              <Icon28Newsfeed />
            </TabbarItem>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'games'}
              data-story="games"
              text="Games"
            >
              <Icon28Search />
            </TabbarItem>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'profile'}
              data-story="profile"
              label="12"
              text="Profile"
            >
              <Icon28Messages />
            </TabbarItem>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'leaderboard'}
              data-story="leaderboard"
              text="Leaderboard."
            >
              <Icon28Notifications />
            </TabbarItem>
            <TabbarItem
              onClick={this.onPanelChange}
              selected={this.state.activePanel === 'events'}
              data-story="events"
              text="Events"
            >
              <Icon28More />
            </TabbarItem>
          </Tabbar>
)}
      >
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

export default App;
