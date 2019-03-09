import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

import User from '../../common.blocks/user/User';

const Profile = ({ id, user }) => (
  <Panel id={id}>
    <PanelHeader>Profile</PanelHeader>
    <User fetchedUser={user} />
  </Panel>
);

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

Profile.defaultProps = {
  user: PropTypes.shape({
    id: PropTypes.number,
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default Profile;
