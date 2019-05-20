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
  const {
    playerPosition, opponentPosition, playerTurns, opponentTurns,
  } = state.multiplayer;
  return {
    playerPosition,
    opponentPosition,
    playerTurns,
    opponentTurns,
  };
};

class Map extends React.Component {
  render() {
    const rightColor = '#24B13B';
    const wrongColor = '#CC0303';
    return (
      <Group className={this.props.className}>
        <div className="gameRoad">
          <div className="progresses">
            <Progress
              header="Ваш прогресс"
              playerIcon={rocket1}
              rightColor={rightColor}
              wrongColor={wrongColor}
              position={this.props.playerPosition}
              turns={this.props.playerTurns}
            />
            <hr className="progresses__separator" />
            <Progress
              header="Прогресс противника"
              playerIcon={rocket2}
              rightColor={rightColor}
              wrongColor={wrongColor}
              position={this.props.opponentPosition}
              turns={this.props.opponentTurns}
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
