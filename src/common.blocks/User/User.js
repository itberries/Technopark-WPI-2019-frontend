import React from 'react';
import PropTypes from 'prop-types';
import { Group, Avatar, Div } from '@vkontakte/vkui';
import './User.scss';

const User = ({ user }) => (
  <Group className="user">
    {typeof user.firstName !== 'undefined' ? (
      <Div before={user.photo ? <Avatar src={user.photo} /> : null} size=" l" className="container">
        <div className="user__item user_avatar" size=" l" align="center">
          {user.photo ? <Avatar src={user.photo} /> : null}
        </div>
        <div className="user__item user_name">{`${user.firstName} ${user.lastName}`}</div>
        <div className="user__item user_score_title">Очки:</div>
        <div className="user__item user_score_value">{user.score}</div>
        <div className="user__item user_level_title">Уровень:</div>
        <div className="user__item user_level_value">Basic</div>
      </Div>
    ) : (
      ''
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
