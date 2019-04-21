import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Theory from '../__Theory/Theory';
import InteractiveGame from './MiniGames/InteractiveGame';
import TrainingGame from './MiniGames/TrainingGame';

class Interactive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      interactiveCards: [],
    };
  }

  componentDidMount() {
    this.getGameData();
  }

  getGameData() {
    axios
      .get(`/${this.props.id}/minigames/`)
      .then((response) => {
        this.setState(() => {
          console.log('getGameDate response.data: ', response.data);
          const type = response.data.type;
          const interactiveCards = response.data.interactiveCards;
          return { type, interactiveCards };
        });
      })
      .catch((error) => {
        if (typeof error.response !== 'undefined' && error.response.status === 404) {
          console.error('getSteps not found!!!', error.response);
        } else {
          console.error('getSteps error!!!', error.response);
        }
      });
    return 'match';
  }

  render() {
    let game;
    if (this.props.type === 'interactive') {
      game = (
        <InteractiveGame
          id={this.props.id}
          key={this.props.id}
          gameType={this.state.type}
          gameData={this.state.interactiveCards}
          onCompleted={this.props.onCompleted}
        />
      );
    } else {
      game = (
        <TrainingGame
          id={this.props.id}
          key={this.props.id}
          gameType={this.state.type}
          gameData={this.state.interactiveCards}
          onCompleted={this.props.onCompleted}
        />
      );
    }
    console.log('this.state.type :', this.state.type);
    return (
      <React.Fragment>
        <Theory id={this.props.id} />
        {this.state.type !== null ? game : ''}
      </React.Fragment>
    );
  }
}

Interactive.propTypes = {
  id: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Interactive;
