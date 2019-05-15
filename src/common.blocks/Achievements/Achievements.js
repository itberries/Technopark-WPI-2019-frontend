import React from 'react';
import PropTypes from 'prop-types';

import { Group, Div } from '@vkontakte/vkui';
import Popup from 'sweetalert2';

import AchievementsItem from './__Item/Achievements__Item';

import './Achievements.scss';

import tipIcon from '../../images/icons/question.svg';

class Achievements extends React.Component {
  constructor(props) {
    super(props);
    this.showTip = this.showTip.bind(this);
  }

  generateItems(allAchievements, activeAchievements) {
    const items = [];

    if (Array.isArray(allAchievements)) {
      allAchievements.forEach((achievement) => {
        const isActiveAchievement = typeof activeAchievements !== 'undefined' && activeAchievements.includes(achievement.id);
        items.push(
          <AchievementsItem
            key={achievement.id}
            imageUrl={achievement.imageUrl}
            note={achievement.note}
            isActive={isActiveAchievement}
          />,
        );
      });
    }
    return items;
  }

  showTip() {
    Popup.fire({
      confirmButtonColor: '#41046F',
      confirmButtonText: 'Все понятно',
      title: 'Космические достижения!',
      text:
        'Открывай новые достижения, зарабатывая монетки в интерактивных мини-играх и соревнованиях с другими пользователями.',
    });
  }

  render() {
    const items = this.generateItems(this.props.allAchievements, this.props.activeAchievements);

    return (
      <Group className="achievements">
        {typeof items !== 'undefined' ? (
          <React.Fragment>
            <Div className="achievements__title">
              <span className="achievement_title__text">Достижения</span>
              <div className="achievement_title__tip">
                <img
                  className="achievements_tip__image"
                  src={tipIcon}
                  alt="tip icon"
                  onClick={this.showTip}
                />
              </div>
            </Div>
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
