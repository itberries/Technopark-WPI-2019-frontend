import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, Panel, PanelHeader } from '@vkontakte/vkui';

import SpinnerCentered from '../../common.blocks/SpinnerCentered/SpinnerCentered';
import User from '../../common.blocks/User/User';
import Achievements from '../../common.blocks/Achievements/Achievements';

import { getAchievements } from '../../actions/user';

const mapStateToProps = (state) => {
  const { user, activeAchievements, achievements } = state.user;
  if (
    typeof user !== 'undefined'
    && typeof state.vk.vkAppUser.vkUserInfo !== 'undefined'
    && state.vk.vkAppUser.vkUserInfo !== null
  ) {
    user.firstName = state.vk.vkAppUser.vkUserInfo.first_name;
    user.lastName = state.vk.vkAppUser.vkUserInfo.last_name;
    user.photo = state.vk.vkAppUser.vkUserInfo.photo_200;
  }
  return {
    user,
    activeAchievements,
    achievements,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAchievements,
  },
  dispatch,
);

/**
 * Profile with user info and achievments
 */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: props.user,
      achievments: props.achievements,
    };
  }

  async componentDidMount() {
    const scroll = localStorage.getItem('scroll_profile');
    if (scroll !== '' && scroll !== undefined && scroll !== 'undefined' && scroll !== null) {
      window.scrollTo(0, scroll);
    } else {
      window.scrollTo(0, 0);
    }

    if (typeof this.props.user !== 'undefined') {
      await this.props.getAchievements();
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      await this.props.getAchievements();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.isLoading === true
      && typeof nextProps.user !== 'undefined'
      && ((typeof prevState.user !== 'undefined' && prevState.user.score !== nextProps.user.score)
        || prevState.user === undefined)
    ) {
      return {
        ...prevState,
        user: nextProps.user,
        isLoading: false,
      };
    }
    return {
      ...prevState,
    };
  }

  componentWillUnmount() {
    localStorage.setItem('scroll_profile', window.scrollY);
  }

  render() {
    const { isLoading } = this.state;
    const {
      id, user, achievements, activeAchievements,
    } = this.props;
    return (
      <View key={id} id={id} activePanel={id}>
        <Panel id={id} key={id}>
          <PanelHeader>Ваш профиль</PanelHeader>
          {isLoading ? (
            <SpinnerCentered />
          ) : (
            <React.Fragment>
              <User user={user} />
              <Achievements
                allAchievements={achievements}
                activeAchievements={activeAchievements}
              />
            </React.Fragment>
          )}
        </Panel>
      </View>
    );
  }
}

Profile.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
