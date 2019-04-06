import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@vkontakte/vkui';

import './Frame.scss';

const Frame = ({
  id, value, onFrameClick, isRight, isActive, isSecond,
}) => (
  <Button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onFrameClick(id);
    }}
    className={`frame ${isRight ? 'frame-right' : ''} ${isActive ? 'frame-active' : ''} ${
      isSecond ? 'frame-second-type' : ''
    }`}
  >
    {value}
  </Button>
);

Frame.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onFrameClick: PropTypes.func.isRequired,
  isRight: PropTypes.bool,
  isActive: PropTypes.bool,
  isSecond: PropTypes.bool,
};

Frame.defaultProps = {
  isRight: false,
  isActive: false,
  isSecond: false,
};

export default Frame;
