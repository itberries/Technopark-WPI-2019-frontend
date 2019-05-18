import React from 'react';

import MiniGame from './MiniGame';
import TraningMatch from './Tranings/types/TraningMatch/TraningMatch';
import TraningChain from './Tranings/types/TraningChain/TraningChain';
import TraningQuestion from './Tranings/types/TraningQuestion/TraningQuestion';

class TrainingGame extends MiniGame {
  generateMatch() {
    return <TraningMatch onComplete={this.props.onCompleted} />;
  }

  generateChain() {
    return <TraningChain onComplete={this.props.onCompleted} />;
  }

  generateQuestion() {
    return <TraningQuestion onComplete={this.props.onCompleted} />;
  }
}

export default TrainingGame;
