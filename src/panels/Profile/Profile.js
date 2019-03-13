import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

import User from '../../common.blocks/User/User';

const Profile = ({ user, id }) => (
  <View key={id} id={id} activePanel="profile">
    <Panel id="profile">
      <PanelHeader>Profile</PanelHeader>
      <User user={user} />
    </Panel>
  </View>
);

Profile.propTypes = {
  viewData: PropTypes.shape({}).isRequired,
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

export default Profile;
