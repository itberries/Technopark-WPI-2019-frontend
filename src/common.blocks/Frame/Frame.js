import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@vkontakte/vkui';

import './Frame.scss';

const Frame = ({
  id, value, onFrameClick, right, active,
}) => (
  <Button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onFrameClick(id);
    }}
    className={`MiniGame__frame ${right ? 'MiniGame__frame-right' : ''} ${
      active ? 'MiniGame__frame-active' : ''
    }`}
  >
    {value}
  </Button>
);

Frame.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onFrameClick: PropTypes.func.isRequired,
  right: PropTypes.bool,
  active: PropTypes.bool,
};

Frame.defaultProps = {
  right: false,
  active: false,
};

export default Frame;
