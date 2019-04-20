import React from 'react';
import PropTypes from 'prop-types';
import { Div } from '@vkontakte/vkui';

import './MiniGame.scss';

class MiniGame extends React.Component {
  constructor(props) {
    super(props);
    const gameTypes = new Map();
    this.state = {
      gameTypes,
    };
    this.generateMatch = this.generateMatch.bind(this);
    this.state.gameTypes.set('match', this.generateMatch);
  }

  generateGame() {
    return this.state.gameTypes.get(this.props.gameType)();
  }

  render() {
    return <Div className="MiniGame">{this.generateGame()}</Div>;
  }
}

MiniGame.propTypes = {
  gameType: PropTypes.string.isRequired,
};

export default MiniGame;
