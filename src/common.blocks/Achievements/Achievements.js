import React from 'react';
import PropTypes from 'prop-types';

import { Group, Div } from '@vkontakte/vkui';

import AchievementsItem from './__Item/Achievements__Item';

import './Achievements.scss';

class Achievements extends React.Component {
  generateItems(allAchievements, activeAchievements) {
    const items = [];

    if (Array.isArray(allAchievements)) {
      allAchievements.forEach((achievement) => {
        items.push(
          <AchievementsItem
            key={achievement.id}
            imageUrl={achievement.imageUrl}
            note={achievement.note}
            isActive={activeAchievements.includes(achievement.id)}
          />,
        );
      });
    }
    return items;
  }

  render() {
    const items = this.generateItems(this.props.allAchievements, this.props.activeAchievements);
    return (
      <Group className="achievements">
        {typeof items !== 'undefined' ? (
          <React.Fragment>
            <Div className="achievements__title">Достижения</Div>
            <Div className="achievements__items">{items}</Div>
          </React.Fragment>
        ) : (
          ''
        )}
      </Group>
    );
  }
}

Achievements.propTypes = {};

Achievements.defaultProps = {};

export default Achievements;
