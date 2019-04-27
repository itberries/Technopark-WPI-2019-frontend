import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@vkontakte/vkui';

import './Frame.scss';

class Frame extends React.Component {
  render() {
    let classes = 'frame';
    if (this.props.isRight) {
      classes += ' frame-right frame-unlikable';
    } else if (this.props.dummy) {
      classes += ' frame-dummy frame-unlikable';
    } else if (this.props.fakeHidden) {
      classes += ' frame-fakeHidden frame-unlikable';
    } else {
      if (this.props.isSecond) {
        classes += ' frame-second-type';
      } else {
        classes += ' frame-first-type';
      }
      if (this.props.isActive) {
        classes += ' frame-active';
      }
    }
    const button = (
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          this.props.onFrameClick(this.props.id);
        }}
        className={classes}
      >
        {this.props.value}
      </Button>
    );
    if (this.props.tip) {
      return (
        <Tooltip
          text={this.props.tipText}
          isShown={this.props.tip}
          onClose={() => this.props.onTipClick()}
          offsetY={0}
        >
          {button}
        </Tooltip>
      );
    }
    return button;
  }
}

Frame.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onFrameClick: PropTypes.func.isRequired,
  isRight: PropTypes.bool,
  isActive: PropTypes.bool,
  isSecond: PropTypes.bool,
  tip: PropTypes.bool,
  tipText: PropTypes.string,
  onTipClick: PropTypes.func,
  dummy: PropTypes.bool,
  fakeHidden: PropTypes.bool,
};

Frame.defaultProps = {
  isRight: false,
  isActive: false,
  isSecond: false,
  tip: false,
  tipText: '',
  onTipClick: null,
  dummy: false,
  fakeHidden: false,
};

export default Frame;
