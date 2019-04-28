import React from 'react';

import MiniGame from './MiniGame';
import TraningMatch from './Tranings/types/TraningMatch/TraningMatch';
import TraningChain from './Base/types/Chain/Chain';

class TrainingGame extends MiniGame {
  generateMatch() {
    return <TraningMatch onComplete={this.props.onCompleted} />;
  }

  generateChain() {
    return <TraningChain onComplete={this.props.onCompleted} />;
  }

  generateQuestion() {
    return '';
  }
}

export default TrainingGame;
