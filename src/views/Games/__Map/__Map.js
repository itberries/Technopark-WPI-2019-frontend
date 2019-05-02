import React from 'react';
import { Group } from '@vkontakte/vkui';

import Progress from './__Progress/__Progress';
import FinishLine from './__FinishLine/__FinishLine';

import rocket1 from '../../../images/icons/Player1Rocket.svg';
import rocket2 from '../../../images/icons/Player2Rocket.svg';

import './__Map.scss';

class Games extends React.Component {
  render() {
    const player1Color = '#24B13B';
    const player2Color = '#CC0303';
    return (
      <Group>
        <div className="gameRoad">
          <div className="progreses">
            <Progress header="Your progress" playerIcon={rocket1} roadColor={player1Color} />
            <hr />
            <Progress header="Opponent’s progress" playerIcon={rocket2} roadColor={player2Color} />
          </div>
          <FinishLine />
        </div>
      </Group>
    );
  }
}

export default Games;
