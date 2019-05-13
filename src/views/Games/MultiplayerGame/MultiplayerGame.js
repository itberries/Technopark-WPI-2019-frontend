import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Group, Div } from '@vkontakte/vkui';
import Popup from 'sweetalert2';

import { movePlayer, moveOpponent, resetTimer } from '../../../actions/multiplayer';

import { websocketOpen, websocketOnMessage, websocketClose } from '../../../actions/ws';

import SpinnerCentered from '../../../common.blocks/SpinnerCentered/SpinnerCentered';

import Map from './__Map/__Map';
import Timer from './__Timer/__Timer';

import Match from '../../Workflow/Steps/Step/types/__Interactive/MiniGames/InteractiveGames/types/InteractiveMatch/InteractiveMatch';
import Chain from '../../Workflow/Steps/Step/types/__Interactive/MiniGames/InteractiveGames/types/InteractiveChain/InteractiveChain';
import Question from '../../Workflow/Steps/Step/types/__Interactive/MiniGames/InteractiveGames/types/InteractiveQuestion/InteractiveQuestion';

import './MultiplayerGame.scss';

import cupImage from '../../../images/icons/cup.svg';
import sadSmileImage from '../../../images/icons/sad_smile.svg';

const mapStateToProps = (state) => {
  const { socket } = state.ws;
  const { playerPosition, opponentPosition } = state.multiplayer;
  return { socket, playerPosition, opponentPosition };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    movePlayer,
    moveOpponent,
    resetTimer,

    websocketOpen,
    websocketClose,
    websocketOnMessage,
  },
  dispatch,
);

class MultiplayerGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socketNotSet: true,
      socketReadyToSend: false,
      actions: [],
      isLoading: true,
      tasks: [],
      currentTask: 0,
    };

    this.sendMsg = this.sendMsg.bind(this);
  }

  componentDidMount() {
    // setting up the popup message for the page leave action
    this.unblock = this.props.history.block(
      'Вы уверены, что хотите покинуть игру? Победа достанется Вашему противнику!',
    );
    console.log('opening games socket');
    this.props.websocketOpen();
    this.setState({ socketNotSet: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('this.state.socketNotSet: ', this.state.socketNotSet);
    if (nextProps.socket !== null && nextProps.gameType !== null) {
      if (this.state.socketNotSet) {
        nextProps.socket.onclose = (event) => {
          this.props.websocketClose();
          this.state.socketNotSet = true;
          this.state.actions = [];
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
            this.props.websocketOpen('match');
          }
          console.log('we are close this socket!');
          console.log('Код: ', event.code, ' причина: ', event.reason);
        };
        nextProps.socket.onerror = (error) => {
          console.log('Ошибка ', error.message);
        };
        nextProps.socket.onmessage = (event) => {
          console.log('answer: ', event.data);
          this.processAnswr(event.data);
          this.setState((prevState) => {
            const msgs = prevState.actions;
            msgs.shift();
            if (msgs.length !== 0) {
              const msg = msgs[0];
              console.log('отправка сообщения: ', msg);
              this.props.socket.send(msg);
            }
            return { actions: msgs };
          });
        };
        this.setState({ socketNotSet: false, socketReadyToSend: true });
      } else {
        nextState.socketReadyToSend = false;
      }
    }
    return true;
  }

  componentDidUpdate() {
    if (this.state.socketReadyToSend) {
      console.log('start send msgs!');
      this.sendMsg(
        JSON.stringify({
          type: 'joinGame',
          mode: 'multiplayer',
        }),
      );
    }
  }

  componentWillUnmount() {
    if (this.props.socket !== null) {
      this.props.socket.close();
    }
    if (typeof this.props.onEndGame === 'function') {
      console.log('MG Unmount END GAME');
      this.props.onEndGame();
    }
    this.unblock();
  }

  onWonGame(result) {
    Popup.fire({
      title: 'Вы одержали победу!',
      text: `Противник повержен. Вы закрепили материал и заработали ${result} монет! `,
      confirmButtonColor: '#41046F',
      confirmButtonText: 'Завершить игру',
      imageUrl: cupImage,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Кубок',
    });
  }

  onLostGame() {
    Popup.fire({
      title: 'Вы повержены!',
      text:
        'Ваш противник оказался сильнее. Не расстраивайтесь, повторите материал в разделе "Путешествие" и попробуйте еще раз! ',
      confirmButtonColor: '#41046F',
      confirmButtonText: 'Завершить игру',
      imageUrl: sadSmileImage,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Грустный',
    });
  }

  processAnswr(data) {
    const answer = JSON.parse(data);
    console.log('answer: ', answer);
    switch (answer.type) {
      case 'MPStartGameMessage':
        console.log('Success start  multiplayer sessiong');
        const tasks = answer.payload.tasks;
        tasks.forEach((task) => {
          task.data = JSON.parse(task.task).data;
        });
        this.setState({
          isLoading: false,
          tasks,
        });
        const task = tasks[0];
        switch (task.type) {
          case 'question':
            console.log('reset timer 30');
            this.props.resetTimer(30);
            break;
          case 'match':
          case 'chain':
            console.log('reset timer 120');
            this.props.resetTimer(120);
            break;
          default:
            console.log('unknown game');
        }
        return;
      case 'DeliveryStatus':
        // TODO: сделать обработчик
        switch (answer.payload.result) {
          case 'WAIT':
            console.log('waiting for another player');
            return;
          case 'MINI_GAME_COMPLETED':
            console.log('game completed, payoad:', answer.payload);
            this.setState((prevState) => {
              let { currentTask } = prevState;
              currentTask += 1;
              if (currentTask < prevState.tasks.length) {
                this.props.movePlayer(this.props.playerPosition + 1);
                const { type } = prevState.tasks[currentTask];
                switch (type) {
                  case 'question':
                    this.props.resetTimer(30);
                    break;
                  case 'match':
                  case 'chain':
                    this.props.resetTimer(120);
                    break;
                  default:
                    console.log('unknown game');
                }
              }
              return { currentTask };
            });
            break;
          case 'OPPONENT_HAS_STEPPED':
            this.props.moveOpponent(this.props.opponentPosition + 1);
            break;
          case 'OPPONENT_HAS_WIN':
            this.onLostGame();
            break;
          default:
            console.log('unknown message!');
            break;
        }
        break;
      case 'TurnResult':
        if (answer.payload.data) {
          console.log('right turn');
        } else {
          console.log('wrong turn');
        }
        this.props.websocketOnMessage(answer.payload.data);
        break;
      case 'GameCompleted':
        console.log('game completed, payoad:', answer.payload);
        this.onWonGame(answer.payload.result);
        break;
      default:
        console.log('unknown message!');
    }
  }

  sendMsg(msg) {
    this.setState((prevState) => {
      const msgs = prevState.actions;
      msgs.push(msg);
      if (msgs.length === 1) {
        console.log('отправка сообщения: ', msg);
        console.log('by socket: ', this.props.socket);
        this.props.socket.send(msg);
      }
      return { message: msgs };
    });
  }

  generateGame() {
    if (this.state.tasks.length > 0 && this.state.currentTask < this.state.tasks.length) {
      console.log('GenerateGame this.state.currentTask: ', this.state.currentTask);
      const task = this.state.tasks[this.state.currentTask];
      console.log('task: ', task);
      switch (task.type) {
        case 'chain':
          return (
            <React.Fragment>
              <Group>
                <Div>Построй цепочку</Div>
              </Group>
              <Chain gameData={task.data} doTurn={this.sendMsg} mode="multiplayer" />
            </React.Fragment>
          );
        case 'match':
          return (
            <React.Fragment>
              <Group>
                <Div>Найди пары</Div>
              </Group>
              <Match gameData={task.data} doTurn={this.sendMsg} mode="multiplayer" />
            </React.Fragment>
          );
        case 'question':
          return (
            <React.Fragment>
              <Group>
                <Div>Ответь на вопрос</Div>
              </Group>
              <Question gameData={task.data} doTurn={this.sendMsg} mode="multiplayer" />
            </React.Fragment>
          );
        default:
          console.log('unknown game');
      }
    }
  }

  render() {
    return this.state.isLoading ? (
      <SpinnerCentered />
    ) : (
      <div className="multiplayergame">
        <Map
          className="multiplayergame__map"
          playerPosition={this.props.playerPosition}
          opponentPosition={this.props.opponentPosition}
        />
        <Timer className="multiplayergame__timer" />
        <Group className="multiplayergame__game">
          <Div>{this.generateGame()}</Div>
        </Group>
      </div>
    );
  }
}

MultiplayerGame.propTypes = {
  socket: PropTypes.instanceOf(WebSocket),
  movePlayer: PropTypes.func.isRequired,
  moveOpponent: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  playerPosition: PropTypes.number.isRequired,
  opponentPosition: PropTypes.number.isRequired,
  onEndGame: PropTypes.func,
};

MultiplayerGame.defaultProps = {
  socket: null,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MultiplayerGame),
);
