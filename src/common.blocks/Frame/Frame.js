import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@vkontakte/vkui';

import './Frame.scss';

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.frame = React.createRef();
  }

  componentDidUpdate() {
    if (this.frame.current && this.props.isWrong) {
      this.frame.current.addEventListener('animationend', () => {
        if (typeof this.props.onWrongAnimationEnds === 'function') {
          this.props.onWrongAnimationEnds(this.props.id);
        }
      });
    }
  }

  render() {
    let buttonClasses = 'frame';
    let frameClasses = '';
    if (this.props.isRight) {
      buttonClasses += ' frame-right frame-unclikable';
    } else if (this.props.dummy) {
      buttonClasses += ' frame-dummy frame-unclikable';
    } else if (this.props.fakeHidden) {
      buttonClasses += ' frame-fakeHidden frame-unclikable';
    } else {
      if (this.props.isSecond) {
        buttonClasses += ' frame-second-type';
      } else {
        buttonClasses += ' frame-first-type';
      }
      if (this.props.isActive) {
        buttonClasses += ' frame-active';
      } else if (this.props.isWrong) {
        buttonClasses += ' frame-wrong';
        frameClasses += ' animated shake';
      }
    }
    const button = (
      <div ref={this.frame} style={{ display: 'inline-block' }} className={frameClasses}>
        <Button
          ref={this.frame}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.onFrameClick(this.props.id);
          }}
          className={buttonClasses}
        >
          {this.props.value}
        </Button>
      </div>
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
  onWrongAnimationEnds: PropTypes.func,
  isRight: PropTypes.bool,
  isWrong: PropTypes.bool,
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
  isWrong: false,
  isActive: false,
  isSecond: false,
  tip: false,
  tipText: '',
  onTipClick: null,
  dummy: false,
  fakeHidden: false,
  onWrongAnimationEnds: undefined,
};

export default Frame;
