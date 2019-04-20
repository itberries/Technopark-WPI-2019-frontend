import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, Panel, PanelHeader } from '@vkontakte/vkui';

import SpinnerCentered from '../../common.blocks/SpinnerCentered/SpinnerCentered';
import User from '../../common.blocks/User/User';

import { getUserProfile } from '../../actions/user';

const mapStateToProps = (state) => {
  const { user } = state.user;
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
    user, // state.user.user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getUserProfile,
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
    };
  }

  async componentDidMount() {
    if (typeof this.props.user !== 'undefined') {
      await this.props.getUserProfile(this.props.user.id);
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
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

  render() {
    const { isLoading } = this.state;
    const { user, id } = this.props;
    return (
      <View key={id} id={id} activePanel={id}>
        <Panel id={id} key={id}>
          <PanelHeader>Ваш профиль</PanelHeader>
          {isLoading ? <SpinnerCentered /> : <User user={user} />}
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
