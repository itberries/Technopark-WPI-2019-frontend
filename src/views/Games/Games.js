import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Div, Group, View, Panel, PanelHeader,
} from '@vkontakte/vkui';

import {
  movePlayer, moveOpponent, resetTimer, timerWasReset,
} from '../../actions/multiplayer';

import { websocketOpen, websocketOnMessage, websocketClose } from '../../actions/ws';

import Map from './__Map/__Map';
import Timer from './__Timer/__Timer';

import './Games.scss';

const mapStateToProps = (state) => {
  const { socket } = state.ws;
  const { playerPosition, opponentPosition, timerNeedReset } = state.multiplayer;
  return {
    socket,
    playerPosition,
    opponentPosition,
    timerNeedReset,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    movePlayer,
    moveOpponent,
    resetTimer,
    timerWasReset,

    websocketOpen,
    websocketClose,
    websocketOnMessage,
  },
  dispatch,
);

class Games extends React.Component {
  componentDidMount() {
    let i = 0;
    let j = 0;
    const timerId = setInterval(() => {
      i += 1;
      this.props.movePlayer(i);
      if (i === 8) {
        clearInterval(timerId);
      }
    }, 1000);
    const timerId2 = setInterval(() => {
      j += 1;
      this.props.moveOpponent(j);
      if (j === 8) {
        clearInterval(timerId2);
      }
    }, 2000);
  }

  render() {
    return (
      <View key={this.props.id} id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader>Игры с друзьями</PanelHeader>
          <div className="multiplayergame">
            <Map
              className="multiplayergame__map"
              playerPosition={this.props.playerPosition}
              opponentPosition={this.props.opponentPosition}
            />
            <Timer className="multiplayergame__timer" />
            <Group className="multiplayergame__game">
              <Div>Game</Div>
            </Group>
          </div>
        </Panel>
      </View>
    );
  }
}

Games.propTypes = {
  id: PropTypes.string.isRequired,
  playerPosition: PropTypes.number,
  opponentPosition: PropTypes.number,
};

Games.defaultProps = {
  playerPosition: 0,
  opponentPosition: 0,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Games);
