import React from 'react';

import MiniGame from './MiniGame';
import MatchTraning from './Tranings/types/MatchTraning/MatchTraning';

class InteractiveGame extends MiniGame {
  generateMatch() {
    return <MatchTraning gameData={this.props.gameData} />;
  }
}

export default InteractiveGame;
