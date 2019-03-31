import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@vkontakte/vkui';

import './Frame.scss';

const Frame = ({ value, onFrameClick, right }) => (
  <Button
    onClick={(e) => {
      onFrameClick(e.target.innerHTML);
    }}
    className={`MiniGame__frame ${right ? 'MiniGame__frame-right' : ''}`}
  >
    {value}
  </Button>
);

Frame.propTypes = {
  value: PropTypes.string.isRequired,
  onFrameClick: PropTypes.func.isRequired,
  right: PropTypes.bool,
};

Frame.defaultProps = {
  right: false,
};

export default Frame;
