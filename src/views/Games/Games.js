import React from 'react';
import PropTypes from 'prop-types';

import {
  Div, Group, View, Panel, PanelHeader, Header, Button,
} from '@vkontakte/vkui';

import MultiplayerGame from './MultiplayerGame/MultiplayerGame';

import './Games.scss';

import rocket1Icon from '../../images/icons/Player1Rocket.svg';
import rocket2Icon from '../../images/icons/Player2Rocket.svg';

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameStarted: false,
    };
    this.stopGame = this.stopGame.bind(this);
  }

  stopGame() {
    console.log('GAMES END GAME');
    this.setState({ isGameStarted: false });
  }

  generateGamesPreview() {
    return (
      <>
        <Group className="game">
          <Header>Космические гонки</Header>
          <Div className="game__rockets">
            <img className="game__rocket1" src={rocket1Icon} alt="Ракета" />
            <img className="game__rocket2" src={rocket2Icon} alt="Ракета" />
          </Div>
          <Div className="game__description">
            Сразись в теоретической гонке с другими учениками в IT галактике и докажи, что ты
            лучший!
          </Div>
          <Button
            className="game__start_btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.setState({ isGameStarted: true });
            }}
          >
            Начать игру
          </Button>
        </Group>
        <Group className="game">
          <Header>Викторина IT</Header>
          <Div className="game__description">
            Вам предстоит проверить свою эрудицию и смекалку, отвечая на интересные вопросы
            различной сложности и направленности. Противостоять в онлайн-битве будут другие знатоки
            нашей галактики.
          </Div>
          <Button className="game__start_btn game__start_btn-unactive">В разработке...</Button>
        </Group>
      </>
    );
  }

  render() {
    return (
      <View key={this.props.id} id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader>Онлайн-игры</PanelHeader>
          {!this.state.isGameStarted ? (
            this.generateGamesPreview()
          ) : (
            <MultiplayerGame onEndGame={this.stopGame} />
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
