import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '@vkontakte/vkui/dist/vkui.css';

import Introduction from './views/Introduction/Introduction';
import Workflow from './views/Workflow/Workflow';
import Games from './views/Games/Games';
import Profile from './views/Profile/Profile';
import LeaderBoard from './views/Leaderboard/Leaderboard';
import Events from './views/Events/Events';

import SpinnerCentered from './common.blocks/SpinnerCentered/SpinnerCentered';
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
      showIntro: undefined,
    };
    this.onViewChange = this.onViewChange.bind(this);
    this.showMainNavigation = this.showMainNavigation.bind(this);
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
    this.props.history.push(location);
  }

  /**
   * Change the showIntro to false
   * @memberof App
   */
  showMainNavigation() {
    this.setState({
      showIntro: false,
    });
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

    if (
      typeof this.state.showIntro === 'undefined'
      && typeof this.props.user.isFirstEntry !== 'undefined'
    ) {
      this.setState({ showIntro: this.props.user.isFirstEntry });
    }

    let result;
    if (typeof this.state.showIntro === 'undefined') {
      result = <SpinnerCentered />;
    } else if (this.state.showIntro === true) {
      result = <Introduction onStartClick={this.showMainNavigation} />;
    } else {
      result = (
        <Navigation
          activeView={this.props.viewName}
          viewsData={viewsData}
          onViewChange={this.onViewChange}
        />
      );
    }
    return result;
  }
}

App.propTypes = {
  viewName: PropTypes.string,
};

App.defaultProps = {
  viewName: 'workflow',
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
