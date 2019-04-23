import React from 'react';
import PropTypes from 'prop-types';

import { Div } from '@vkontakte/vkui';

import './Achievements__Item.scss';

const AchievementsItem = ({ imageUrl, note, isActive }) => {
  const achievementClass = isActive ? 'achievement' : 'achievement achievement-unactive';
  return (
    <div className={`achievements__item ${achievementClass}`}>
      <span className="achievement__note">{note}</span>
      <img className="achievement__image" src={imageUrl} alt={note} />
    </div>
  );
};

AchievementsItem.propTypes = {};

AchievementsItem.defaultProps = {};

export default AchievementsItem;
