import React from 'react';
import PropTypes from 'prop-types';

import { View, Gallery } from '@vkontakte/vkui';

import Intro from '../../common.blocks/Intro/Intro';

import planetsIcon from '../../images/icons/planets.svg';
import startupIcon from '../../images/icons/startup.svg';
import videogameIcon from '../../images/icons/videogame.svg';
import lampIcon from '../../images/icons/lamp.svg';
import deadlineIcon from '../../images/icons/deadline.svg';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      currentIntro: 0,
      onStartClick: this.props.onStartClick,
    };
    this.onNextSlide = this.onNextSlide.bind(this);
    this.onChangeSlide = this.onChangeSlide.bind(this);
  }

  onChangeSlide(newIntro) {
    console.log('Introduction onChange new:', newIntro);
    this.setState({
      currentIntro: newIntro,
    });
  }

  onNextSlide() {
    if (this.state.currentIntro === 4) {
      this.state.onStartClick();
      return;
    }
    this.setState({
      currentIntro: this.state.currentIntro + 1,
    });
  }

  render() {
    const { id, currentIntro } = this.state;
    return (
      <View key={id} id={id} activePanel={id}>
        <Gallery
          slideWidth="100%"
          style={{ height: '100%' }}
          bullets="dark"
          slideIndex={currentIntro}
          onChange={this.onChangeSlide}
        >
          <Intro
            onNext={this.onNextSlide}
            image={planetsIcon}
            imageName="todo"
            bgColor="#70227E"
            isInvertedTheme
            info="Дорогой друг, приветствуем тебя на борту космического корабля знаний! Ты отправляешься в увлекательное путешествие в новый мир IT."
          />
          <Intro
            onNext={this.onNextSlide}
            image={lampIcon}
            imageName="todo"
            bgColor="#DED1E7"
            info="На пути тебе могут встретиться коварные системы счисления, пугающее программирование, кодирование информации и алгоритмы.."
          />
          <Intro
            onNext={this.onNextSlide}
            image={videogameIcon}
            imageName="todo"
            bgColor="#982669"
            isInvertedTheme
            info="Во время нашего путешествия ты преодолешь эти преграды с помощью увлекательных игр и соревнований с другими пользователями."
          />
          <Intro
            onNext={this.onNextSlide}
            image={deadlineIcon}
            imageName="todo"
            bgColor="#56317B"
            isInvertedTheme
            info="В числе первых получай информацию о самых интересных событиях в области IT от ведущих компаний."
          />
          <Intro
            onNext={this.onNextSlide}
            image={startupIcon}
            imageName="todo"
            bgColor="#FFFFFF"
            info="Путешествие в мир информатики и программирования начинается!"
            isLast
          />
        </Gallery>
      </View>
    );
  }
}

Introduction.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Introduction;
