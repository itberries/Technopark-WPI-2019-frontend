import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Group } from '@vkontakte/vkui';
import { bindActionCreators } from 'redux';

import { timerWasReset } from '../../../actions/multiplayer';

import timer from '../../../images/icons/stopwatch.svg';

import './__Timer.scss';

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    timerWasReset,
  },
  dispatch,
);

const mapStateToProps = (state) => {
  const { timerNeedReset, timerResetValue } = state.multiplayer;
  return { timerNeedReset, timerResetValue };
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: null,
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.timerNeedReset) {
      if (this.state.timerId !== null) {
        clearInterval(this.state.timerId);
      }
      console.log('reseting!');
      const className = 'timer__fullness';
      const fullness = document.getElementsByClassName(className)[0];
      fullness.style.animationDuration = `${nextProps.timerResetValue}s`;
      fullness.style.webkitAnimation = 'none';
      fullness.style.webkitAnimation = '';

      this.props.timerWasReset();
      const times = nextProps.timerResetValue;
      document.getElementsByClassName('timer__title')[0].innerHTML = `${times} seconds`;
      let i = 0;
      const timerId = setInterval(() => {
        i += 1;
        document.getElementsByClassName('timer__title')[0].innerHTML = `${times - i} seconds`;
        if (i === times) {
          clearInterval(this.state.timerId);
        }
      }, 1000);
      this.setState({ timerId });
    }
    return true;
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  render() {
    return (
      <Group className={this.props.className}>
        <div className="timer__container">
          <img src={timer} alt="timer__icon" />
          <div className="timer_timeline">
            <div className="timer__fullness" />
            <div className="timer__title">6 seconds</div>
          </div>
        </div>
      </Group>
    );
  }
}

Timer.propTypes = {
  timerNeedReset: PropTypes.bool.isRequired,
  timerWasReset: PropTypes.func.isRequired,
  timerResetValue: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);
