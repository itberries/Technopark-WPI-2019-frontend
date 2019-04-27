import React from 'react';
import PropTypes from 'prop-types';

import './MiniGame.scss';

class MiniGame extends React.Component {
  constructor(props) {
    super(props);
    const gameTypes = new Map();
    this.state = {
      gameTypes,
    };

    this.generateMatch = this.generateMatch.bind(this);
    this.generateChain = this.generateChain.bind(this);
    this.generateQuestion = this.generateQuestion.bind(this);

    this.state.gameTypes.set('match', this.generateMatch);
    this.state.gameTypes.set('chain', this.generateChain);
    this.state.gameTypes.set('question', this.generateQuestion);
  }

  generateGame() {
    return this.state.gameTypes.get(this.props.gameType)();
  }

  render() {
    return this.generateGame();
  }
}

MiniGame.propTypes = {
  gameType: PropTypes.string.isRequired,
};

export default MiniGame;
