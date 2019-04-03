import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@vkontakte/vkui';

import './Frame.scss';

const Frame = ({
  id, value, onFrameClick, isRight, isActive,
}) => (
  <Button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onFrameClick(id);
    }}
    className={`frame ${isRight ? 'frame-right' : ''} ${isActive ? 'frame-active' : ''}`}
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
};

Frame.defaultProps = {
  isRight: false,
  isActive: false,
};

export default Frame;
