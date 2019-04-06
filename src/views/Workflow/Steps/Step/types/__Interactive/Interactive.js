import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Theory from '../__Theory/Theory';
import MiniGames from './MiniGames/MiniGame';

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
    return (
      <React.Fragment>
        <Theory id={this.props.id} />
        <MiniGames
          id={this.props.id}
          key={this.props.id}
          gameType={this.state.type}
          gameData={this.state.interactiveCards}
          onCompleted={this.props.onCompleted}
        />
      </React.Fragment>
    );
  }
}

Interactive.propTypes = {
  id: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
};

export default Interactive;
