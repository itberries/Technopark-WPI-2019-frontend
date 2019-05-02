import React from 'react';
import { Group } from '@vkontakte/vkui';

import timer from '../../../images/icons/stopwatch.svg';

import './__Timer.scss';

class Timer extends React.Component {
  render() {
    return (
      <Group>
        <div className="timer__continer">
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
