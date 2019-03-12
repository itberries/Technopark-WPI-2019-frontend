import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

import User from '../../common.blocks/User/User';

const Profile = ({ id, user }) => (
  <Panel id={id}>
    <PanelHeader>Profile</PanelHeader>
    <User user={user} />
  </Panel>
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

export default Profile;
