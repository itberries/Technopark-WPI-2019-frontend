import React from 'react';
import PropTypes from 'prop-types';

import { View, Panel, PanelHeader } from '@vkontakte/vkui';

import GamesPreview from './GamesPreview/GamesPreview';
import MultiplayerGame from './MultiplayerGame/MultiplayerGame';

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameStarted: false,
    };
    this.onStopGame = this.onStopGame.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
  }

  componentDidMount() {
    const scroll = localStorage.getItem('scroll_games');
    if (scroll !== '' && scroll !== undefined && scroll !== 'undefined' && scroll !== null) {
      window.scrollTo(0, scroll);
    } else {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    localStorage.setItem('scroll_games', window.scrollY);
  }

  onStopGame() {
    this.setState({ isGameStarted: false });
  }

  onStartGame() {
    this.setState({ isGameStarted: true });
  }

  render() {
    return (
      <View key={this.props.id} id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader>Онлайн-игры</PanelHeader>
          {!this.state.isGameStarted ? (
            <GamesPreview onStartGame={this.onStartGame} />
          ) : (
            <MultiplayerGame onEndGame={this.onStopGame} />
          )}
        </Panel>
      </View>
    );
  }
}

Games.propTypes = {
  id: PropTypes.string.isRequired,
};

Games.defaultProps = {};

export default Games;
