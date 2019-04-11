import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '@vkontakte/vkui/dist/vkui.css';

import Intro from './views/Intro/Intro';
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

import { init, fetchCurrentUserInfo } from './actions/vkApp/vkAppUser';
import { getUserProfile, addUserProfile } from './actions/user';

import './defaultApiSettings';
import './vkMockSettings';

import './App.scss';

const history = createBrowserHistory();

const mapStateToProps = (state) => {
  const { vkUserInfo } = state.vk.vkAppUser;
  const { user } = state;
  return {
    vkUserInfo,
    user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    init,
    fetchCurrentUserInfo,
    getUserProfile,
    addUserProfile,
  },
  dispatch,
);

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
      activeView: 'intro', // props.viewName,
    };
    this.onViewChange = this.onViewChange.bind(this);
  }

  /**
   * Actions after the application is loaded
   * @memberof App
   */
  componentDidMount() {
    this.props.init();
    this.props.fetchCurrentUserInfo();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.vkUserInfo !== prevProps.vkUserInfo) {
      const { id } = this.props.vkUserInfo;
      try {
        await this.props.getUserProfile(id);
      } catch (error) {
        if (typeof error.response !== 'undefined' && error.response.status === 404) {
          await this.props.addUserProfile(id);
        } else {
          console.error('getProfile error!!!', error.response);
        }
      }
    }
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

  render() {
    const viewsData = [
      {
        view: Workflow,
        name: 'workflow',
        text: 'Путешествие',
        icon: workflowIcon,
      },
      {
        view: Games,
        name: 'games',
        text: 'Игры',
        icon: gamesIcon,
      },
      {
        view: LeaderBoard,
        name: 'leaderboard',
        text: 'Лидеры',
        icon: leaderboardIcon,
      },
      {
        view: Events,
        name: 'events',
        text: 'События',
        icon: eventsIcon,
      },
      {
        view: Profile,
        name: 'profile',
        text: 'Профиль',
        icon: profileIcon,
      },
    ];
    const showIntro = this.state.activeView === 'intro';
    const result = showIntro ? (
      <Intro />
    ) : (
      <Navigation
        activeView={this.state.activeView}
        viewsData={viewsData}
        onViewChange={this.onViewChange}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
