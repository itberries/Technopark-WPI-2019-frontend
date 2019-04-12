import React from 'react';
import PropTypes from 'prop-types';

import { View, Gallery } from '@vkontakte/vkui';

import Intro from '../../common.blocks/Intro/Intro';

import planetsIcon from '../../images/icons/planets.svg';
import startupIcon from '../../images/icons/startup.svg';
import videogameIcon from '../../images/icons/videogame.svg';
import lampIcon from '../../images/icons/lamp.svg';
import deadlineIcon from '../../images/icons/deadline.svg';

const Introduction = ({ id }) => (
  <View key={id} id={id} activePanel={id}>
    <Gallery slideWidth="100%" style={{ height: '100%' }} bullets="dark">
      <Intro
        image={planetsIcon}
        imageName="todo"
        bgColor="#70227E"
        isInvertedTheme
        info="Дорогой друг, приветствуем тебя на борту космического корабля знаний! Ты отправляешься в увлекательное путешествие в новый мир IT."
      />
      <Intro
        image={lampIcon}
        imageName="todo"
        bgColor="#DED1E7"
        info="На пути тебе могут встретиться коварные системы счисления, пугающее программирование, кодирование информации и алгоритмы.."
      />
      <Intro
        image={videogameIcon}
        imageName="todo"
        bgColor="#982669"
        isInvertedTheme
        info="Во время нашего путешествия ты преодолешь эти преграды во время увлекательных игр и соревнований с другими пользователями."
      />
      <Intro
        image={deadlineIcon}
        imageName="todo"
        bgColor="#56317B"
        isInvertedTheme
        info="В числе первых получи информацию о самых интересных событиях в области IT от ведущих компаний."
      />
      <Intro
        image={startupIcon}
        imageName="todo"
        bgColor="#FFFFFF"
        info="Путешествие в мир информатики и программирования начинается!"
        isLast
      />
    </Gallery>
  </View>
);

Introduction.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Introduction;
