import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

import User from '../../common.blocks/user/User';

const Profile = ({ id, fetchedUser }) => (
  <Panel id={id}>
    <PanelHeader>Profile</PanelHeader>
    <User fetchedUser={fetchedUser} />
  </Panel>
);

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    id: PropTypes.number,
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

Profile.defaultProps = {
  fetchedUser: PropTypes.shape({
    id: PropTypes.number,
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default Profile;