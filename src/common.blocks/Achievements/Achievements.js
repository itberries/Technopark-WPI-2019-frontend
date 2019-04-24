import React from 'react';
import PropTypes from 'prop-types';

import { Group, Div } from '@vkontakte/vkui';

import Popup from 'react-skylight';
import AchievementsItem from './__Item/Achievements__Item';
import achievementPopupStyles from './__Popup/Achievements__Popup';

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

  showTip() {
    this.tipPopup.show();
  }

  render() {
    let tipPopupStyles;
    if (window.innerWidth < 768) {
      tipPopupStyles = achievementPopupStyles.tipPopupStylesMobile;
    } else {
      tipPopupStyles = achievementPopupStyles.tipPopupStylesDesktop;
    }

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
                <Popup
                  dialogStyles={tipPopupStyles}
                  hideOnOverlayClicked
                  ref={ref => (this.tipPopup = ref)}
                  title="Космические достижения!"
                >
                  Открывай новые достижения, зарабатывая монетки в интерактивных мини-играх и
                  соревнованиях с другими пользователями.
                </Popup>
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
