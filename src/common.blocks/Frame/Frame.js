import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@vkontakte/vkui';

import './Frame.scss';

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: true,
    };
  }

  render() {
    const button = (
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          this.props.onFrameClick(this.props.id);
        }}
        className={`frame ${this.props.isRight ? 'frame-right' : ''} ${
          this.props.isActive ? 'frame-active' : ''
        } ${this.props.isSecond ? 'frame-second-type' : ''}`}
      >
        {this.props.value}
      </Button>
    );
    if (this.props.tip) {
      return (
        <Tooltip
          text={this.props.tipText}
          isShown={this.state.tooltip}
          onClose={() => this.setState({ tooltip: false })}
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
};

Frame.defaultProps = {
  isRight: false,
  isActive: false,
  isSecond: false,
  tip: false,
  tipText: '',
};

export default Frame;
