import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '@vkontakte/vkui';

import './Intro.scss';

const Intro = ({
  onNext, image, imageName, info, bgColor, isInvertedTheme, isLast,
}) => {
  const textClass = isInvertedTheme ? 'intro__text intro__text-inverted' : 'intro__text';
  const nextClass = isInvertedTheme ? 'intro__next intro__next-inverted' : 'intro__next';
  const nextText = isLast ? 'Начать' : 'Дальше';
  return (
    <div className="intro" style={{ backgroundColor: bgColor }}>
      <div className="intro__container">
        <div className={textClass} size=" l" align="center">
          <img className="intro__image" src={image} alt={imageName} />
          <p>{info}</p>
        </div>
      </div>
      <Link className={nextClass} onClick={onNext}>
        {nextText}
      </Link>
    </div>
  );
};

Intro.propTypes = {
  onNext: PropTypes.func,
  image: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  isInvertedTheme: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default Intro;
