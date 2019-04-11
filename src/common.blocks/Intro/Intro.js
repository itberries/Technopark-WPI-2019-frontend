import React from 'react';
import PropTypes from 'prop-types';

import './Intro.scss';

const Intro = ({
  info, image, imageName, bgColor, textColor,
}) => (
  <div className="intro" style={{ backgroundColor: bgColor, color: textColor }}>
    <div className="intro__container">
      <div className="intro__text" size=" l" align="center">
        <img className="intro__image" src={image} alt={imageName} />
        <p>{info}</p>
      </div>
    </div>
  </div>
);

Intro.propTypes = {
  info: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
};

export default Intro;
