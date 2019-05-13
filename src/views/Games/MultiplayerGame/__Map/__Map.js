import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Group } from '@vkontakte/vkui';

import Progress from './__Progress/__Progress';
import FinishLine from './__FinishLine/__FinishLine';

import rocket1 from '../../../../images/icons/Player1Rocket.svg';
import rocket2 from '../../../../images/icons/Player2Rocket.svg';

import './__Map.scss';

const mapStateToProps = (state) => {
  const { playerPosition, opponentPosition } = state.multiplayer;
  return { playerPosition, opponentPosition };
};

class Map extends React.Component {
  render() {
    const player1Color = '#24B13B';
    const player2Color = '#CC0303';
    return (
      <Group className={this.props.className}>
        <div className="gameRoad">
          <div className="progresses">
            <Progress
              header="Your progress"
              playerIcon={rocket1}
              roadColor={player1Color}
              position={this.props.playerPosition}
            />
            <hr className="progresses__separator" />
            <Progress
              header="Opponent’s progress"
              playerIcon={rocket2}
              roadColor={player2Color}
              position={this.props.opponentPosition}
            />
          </div>
          <FinishLine />
        </div>
      </Group>
    );
  }
}

Map.propTypes = {
  playerPosition: PropTypes.number,
  opponentPosition: PropTypes.number,
};

Map.defaultProps = {
  playerPosition: 0,
  opponentPosition: 0,
};

export default connect(mapStateToProps)(Map);
