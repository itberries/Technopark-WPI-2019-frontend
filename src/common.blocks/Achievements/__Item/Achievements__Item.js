import React from 'react';
import PropTypes from 'prop-types';

import { Div } from '@vkontakte/vkui';

import './Achievements__Item.scss';

const AchievementsItem = ({ imageUrl, note, isActive }) => {
  console.log('achievement isActive', isActive);
  const achievementImageClass = isActive
    ? 'achievement__image achievement__image-active'
    : 'achievement__image';
  return (
    <div className="achievements__item achievement">
      <span className="achievement__note">{note}</span>
      <img className={achievementImageClass} src={imageUrl} alt={note} />
    </div>
  );
};

AchievementsItem.propTypes = {};

AchievementsItem.defaultProps = {};

export default AchievementsItem;
