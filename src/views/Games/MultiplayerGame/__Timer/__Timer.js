import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Group } from '@vkontakte/vkui';
import { bindActionCreators } from 'redux';

import { timerWasReset } from '../../../../actions/multiplayer';

import timer from '../../../../images/icons/stopwatch.svg';

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
      this.reseTimer(nextProps.timerResetValue);
    }
    return true;
  }

  reseTimer(value) {
    if (this.state.timerId !== null) {
      clearInterval(this.state.timerId);
    }
    const title = document.getElementsByClassName('timer__title')[0];
    const oldFullness = document.getElementsByClassName('timer__fullness')[0];
    const newFullness = oldFullness.cloneNode(true);
    newFullness.style.animationDuration = `${value}s`;
    oldFullness.parentNode.replaceChild(newFullness, oldFullness);
    title.innerHTML = `${value} seconds`;
    let i = 0;
    const timerId = setInterval(() => {
      i += 1;
      title.innerHTML = `${value - i} seconds`;
      if (i === value) {
        clearInterval(this.state.timerId);
      }
    }, 1000);
    this.setState({ timerId });
    this.props.timerWasReset();
  }

  render() {
    return (
      <Group className={this.props.className}>
        <div className="timer__container">
          <img src={timer} alt="timer__icon" />
          <div className="timer_timeline">
            <div className="timer__fullness" />
            <div className="timer__title" />
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
