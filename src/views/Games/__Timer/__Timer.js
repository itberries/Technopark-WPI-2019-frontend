import React from 'react';
import { Group } from '@vkontakte/vkui';

import timer from '../../../images/icons/stopwatch.svg';

import './__Timer.scss';

class Timer extends React.Component {
  componentDidMount() {
    document.getElementsByClassName('timer__fullness')[0].style.animationDuration = '6s';
    const times = 6;
    let i = 0;
    const timerId = setInterval(() => {
      i += 1;
      document.getElementsByClassName('timer__title')[0].innerHTML = `${times - i} seconds`;
      if (i === times) {
        clearInterval(timerId);
      }
    }, 1000);
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

export default Timer;
