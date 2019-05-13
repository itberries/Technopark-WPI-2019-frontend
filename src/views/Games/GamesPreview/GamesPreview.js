import React from 'react';
import PropTypes from 'prop-types';

import {
  Group, Header, Div, Button,
} from '@vkontakte/vkui';

import './GamesPreview.scss';

import rocket1Icon from '../../../images/icons/Player1Rocket.svg';
import rocket2Icon from '../../../images/icons/Player2Rocket.svg';
import academicCapIcon from '../../../images/icons/academicCap.svg';

const GamesPreview = ({ onStartGame }) => (
  <>
    <Group className="game_preview">
      <Header>Космо-гонки</Header>
      <Div className="game_preview__icons">
        <img className="game_preview__rocket1" src={rocket1Icon} alt="Ракета" />
        <img className="game_preview__rocket2" src={rocket2Icon} alt="Ракета" />
      </Div>
      <Div className="game_preview__description">
        Сразись в теоретической космо-гонке с другими учениками в IT галактике и докажи, что ты
        лучший!
      </Div>
      <Button
        className="game_preview__start_btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (typeof onStartGame === 'function') {
            onStartGame();
          }
        }}
      >
        Начать игру
      </Button>
    </Group>
    <Group className="game_preview">
      <Header>Своя IT-игра</Header>
      <Div className="game_preview__icons">
        <img
          className="game_preview__academic_cap"
          src={academicCapIcon}
          alt="Квадратная академическая шапочка"
        />
      </Div>
      <Div className="game_preview__description">
        Вам предстоит проверить свою эрудицию и смекалку, отвечая на интересные вопросы различной
        сложности и направленности. Противостоять в онлайн-битве будут другие знатоки нашей
        галактики.
      </Div>
      <Button className="game_preview__start_btn game_preview__start_btn-unactive">Скоро...</Button>
    </Group>
  </>
);

GamesPreview.propTypes = {
  onStartGame: PropTypes.func,
};

GamesPreview.defaultProps = {
  onStartGame: undefined,
};

export default GamesPreview;
