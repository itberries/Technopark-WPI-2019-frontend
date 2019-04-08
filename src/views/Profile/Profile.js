import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { View, Panel, PanelHeader } from '@vkontakte/vkui';

import User from '../../common.blocks/User/User';

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
    user: state.user.user,
  };
};

const Profile = ({ user, id }) => (
  <View key={id} id={id} activePanel={id}>
    <Panel id={id}>
      <PanelHeader>Ваш профиль</PanelHeader>
      <User user={user} />
    </Panel>
  </View>
);

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    score: PropTypes.number,
  }),
};

Profile.defaultProps = {
  user: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    score: PropTypes.number,
  }),
};

export default connect(mapStateToProps)(Profile);
