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
        textColor="#FFF"
        info="Дорогой друг, приветствуем тебя на борту космического корабля знаний! Ты отправляешься в увлекательное путешествие в новый мир IT."
      />
      <Intro
        image={lampIcon}
        imageName="todo"
        bgColor="#DED1E7"
        textColor="#41046F"
        info="На пути тебе могут встретиться коварные системы счисления, пугающее программирование, кодирование информации и алгоритмы.."
      />
      <Intro
        image={videogameIcon}
        imageName="todo"
        bgColor="#982669"
        textColor="#FFF"
        info="Во время нашего путешествия вы с легкостью преодалеете эти преграды с помощью увлекательных игр и соревнований с другими пользователями."
      />
      <Intro
        image={deadlineIcon}
        imageName="todo"
        bgColor="#56317B"
        textColor="#FFF"
        info="В нашем приложении вы сможете получить информацию о самых интересных событиях в области IT от ведущих компаний."
      />
      <Intro
        image={startupIcon}
        imageName="todo"
        bgColor="#FFFFFF"
        textColor="#41046F"
        info="Путешествие в мир информатики и программирования начинается!"
      />
    </Gallery>
  </View>
);

Introduction.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Introduction;
