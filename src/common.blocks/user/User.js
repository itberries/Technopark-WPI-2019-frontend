import React from 'react';
import PropTypes from 'prop-types';
import { Group, Avatar } from '@vkontakte/vkui';
import profileIcon from '../../images/icons/profile.svg';
import './User.scss';

const User = ({ user }) => (
  <Group title="User Data" className="profile">
    {user ? (
      <div before={user.photo ? <Avatar src={user.photo} /> : null} size=" l" className="container">
        <div className="user_avatar" size=" l" align="center">
          {user.photo ? <Avatar src={user.photo} /> : null}
        </div>
        <div className="user_name">{`${user.firstName} ${user.lastName}`}</div>
        <div className="user_score_title">Score:</div>
        <div className="user_score_value">{user.score ? `${user.score}` : ''}</div>
        <div className="user_level_title">Level:</div>
        <div className="user_level_value">Basic</div>
      </div>
    ) : (
      <div before={<img src={profileIcon} alt="profile icon" />} size="s" className="container">
        <div className="user_avatar" size=" l">
          <img src={profileIcon} alt="profile icon" />
        </div>
        <div className="user_name">No user data</div>
        <div className="user_score_title">Score:</div>
        <div className="user_score_value">0</div>
        <div className="user_level_title">Level:</div>
        <div className="user_level_value">Basic</div>
      </div>
    )}
  </Group>
);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    score: PropTypes.number,
  }),
};

User.defaultProps = {
  user: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    score: PropTypes.number,
  }),
};

export default User;
