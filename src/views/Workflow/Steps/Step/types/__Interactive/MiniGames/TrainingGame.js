import React from 'react';

import MiniGame from './MiniGame';
import MatchTraning from './Tranings/types/TraningMatch/TraningMatch';

class InteractiveGame extends MiniGame {
  generateMatch() {
    return <MatchTraning gameData={this.props.gameData} onComplete={this.props.onCompleted} />;
  }
}

export default InteractiveGame;
