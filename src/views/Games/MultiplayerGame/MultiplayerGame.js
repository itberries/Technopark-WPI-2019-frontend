import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Group, Div } from '@vkontakte/vkui';
import Popup from 'sweetalert2';

import {
  movePlayer,
  moveOpponent,
  resetTimer,
  clearGameData,
  rightTurn,
  fetchOpponentInfo,
  clearOpponentInfo,
} from '../../../actions/multiplayer';

import { websocketOpen, websocketOnMessage, websocketClose } from '../../../actions/ws';

import SpinnerCentered from '../../../common.blocks/SpinnerCentered/SpinnerCentered';

import Map from './__Map/__Map';
import Timer from './__Timer/__Timer';

import Match from '../../Workflow/Steps/Step/types/__Interactive/MiniGames/InteractiveGames/types/InteractiveMatch/InteractiveMatch';
import Chain from '../../Workflow/Steps/Step/types/__Interactive/MiniGames/InteractiveGames/types/InteractiveChain/InteractiveChain';
import Question from '../../Workflow/Steps/Step/types/__Interactive/MiniGames/InteractiveGames/types/InteractiveQuestion/InteractiveQuestion';

import './MultiplayerGame.scss';

import cupImage from '../../../images/icons/cup.svg';
import escapeImage from '../../../images/icons/escape.svg';
import sadSmileImage from '../../../images/icons/sad_smile.svg';
import handshakeImage from '../../../images/icons/handshake.svg';

const mapStateToProps = (state) => {
  const { socket } = state.ws;
  const { playerPosition, opponentPosition, opponentInfo } = state.multiplayer;
  return {
    socket,
    playerPosition,
    opponentPosition,
    opponentInfo,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    movePlayer,
    moveOpponent,
    resetTimer,
    fetchOpponentInfo,
    clearOpponentInfo,

    websocketOpen,
    websocketClose,
    websocketOnMessage,
    clearGameData,
    rightTurn,
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
      isSentMsgReadyToStart: false,
      tasks: [],
      currentTask: 0,
      finished: false,
    };

    this.sendMsg = this.sendMsg.bind(this);
  }

  componentDidMount() {
    // setting up the popup message for the page leave action
    this.unblock = this.props.history.block(
      'Вы уверены, что хотите покинуть игру? Победа достанется Вашему противнику!',
    );
    this.props.websocketOpen();
    this.setState({ socketNotSet: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      typeof nextProps.opponentInfo !== 'undefined'
      && this.state.isSentMsgReadyToStart === false
    ) {
      this.onOpponentInfoReceived();
      this.setState({ isSentMsgReadyToStart: true });
    }

    if (nextProps.socket !== null && nextProps.gameType !== null) {
      if (this.state.socketNotSet) {
        nextProps.socket.onclose = (event) => {
          this.props.websocketClose();
          this.state.socketNotSet = true;
          this.state.actions = [];
          if (event.wasClean) {
            // console.log('Соединение закрыто чисто');
          } else {
            // console.log('Обрыв соединения'); // например, "убит" процесс сервера
            if (!this.state.finished && !nextState.finished) {
              this.props.websocketOpen('match');
            }
            Popup.fire({
              title: 'Обрыв соединения',
              confirmButtonColor: '#41046F',
              confirmButtonText: 'Завершить игру',
              onClose: () => {
                this.onExitMultiplayerGame();
              },
            });
          }
          // console.log('Код: ', event.code, ' причина: ', event.reason);
        };
        nextProps.socket.onerror = (error) => {
          console.log('Ошибка ', error.message);
        };
        nextProps.socket.onmessage = (event) => {
          this.processAnswr(event.data);
          this.setState((prevState) => {
            const msgs = prevState.actions;
            msgs.shift();
            if (msgs.length !== 0) {
              const msg = msgs[0];
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
      this.sendMsg(
        JSON.stringify({
          type: 'joinGame',
          mode: 'multiplayer',
        }),
      );
    }
  }

  componentWillUnmount() {
    this.onExitMultiplayerGame();
  }

  async onOpponentInfoReceived() {
    await this.sendMsg(
      JSON.stringify({
        type: 'deliveryStatus',
        payload: {
          result: 'READY_TO_START_MP_GAME',
        },
      }),
    );
    this.setState((prevState) => {
      const msgs = prevState.actions;
      msgs.shift();
      return { actions: msgs };
    });
  }

  onExitMultiplayerGame() {
    if (this.props.socket !== null) {
      this.props.socket.close();
    }
    if (typeof this.props.onEndGame === 'function') {
      this.props.onEndGame();
    }
    this.setState({ isSentMsgReadyToStart: false });
    this.props.clearOpponentInfo();
    this.props.clearGameData();
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
      onClose: () => {
        this.onExitMultiplayerGame();
      },
    });
  }

  onWonGameBecauseOfLeft(result) {
    Popup.fire({
      title: 'Противник сбежал!',
      text: `Ваш противник стремительно покинул космо-гонку. Вы заработали ${result} монет! `,
      confirmButtonColor: '#41046F',
      confirmButtonText: 'Завершить игру',
      imageUrl: escapeImage,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Побег',
      onClose: () => {
        this.onExitMultiplayerGame();
      },
    });
  }

  onLostGame() {
    Popup.fire({
      title: 'Вы повержены!',
      text:
        'Ваш противник оказался сильнее. Не расстраивайтесь, повторите материал в разделе "Путешествие" и попробуйте еще раз!',
      confirmButtonColor: '#41046F',
      confirmButtonText: 'Завершить игру',
      imageUrl: sadSmileImage,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Грустный',
      onClose: () => {
        this.onExitMultiplayerGame();
      },
    });
  }

  onDrawGame(result) {
    Popup.fire({
      title: 'Ничья!',
      text: `Ваши силы оказались равны! Вы заработали ${result} монет! `,
      confirmButtonColor: '#41046F',
      confirmButtonText: 'Завершить игру',
      imageUrl: handshakeImage,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Ничья',
      onClose: () => {
        this.onExitMultiplayerGame();
      },
    });
  }

  async onStartGame(payload) {
    const { tasks, id } = payload;
    tasks.forEach((task) => {
      task.data = JSON.parse(task.task).data;
    });
    this.setState({
      tasks,
    });
    this.props.fetchOpponentInfo(payload.id);
  }

  onOpponentReady() {
    return Popup.fire({
      title: 'Противник найден!',
      text: `Вы играете против пользователя ${this.props.opponentInfo.first_name}`,
      confirmButtonColor: '#41046F',
      confirmButtonText: 'Начать игру!',
      imageUrl: this.props.opponentInfo.photo_100,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Аватар пользователя',
      timer: 2000,
      onBeforeOpen: () => {
        Popup.showLoading();
      },
    });
  }

  startGame() {
    this.onOpponentReady().then(() => {
      this.setState({
        isLoading: false,
      });
      const { tasks } = this.state;
      const task = tasks[0];
      switch (task.type) {
        case 'question':
          this.props.resetTimer(29);
          break;
        case 'match':
        case 'chain':
          this.props.resetTimer(119);
          break;
        default:
          console.log('unknown game');
      }
    });
  }

  async processAnswr(data) {
    const answer = JSON.parse(data);
    switch (answer.type) {
      case 'MPStartGameMessage':
        await this.onStartGame(answer.payload);
        return;
      case 'DeliveryStatus':
      case 'deliveryStatus':
      case 'deliveryStepStatus':
        // TODO: сделать обработчик
        switch (answer.payload.result) {
          case 'WAIT':
            // console.log('waiting for another player');
            return;
          case 'OPPONENT_HAS_STEPPED':
            this.props.moveOpponent(this.props.opponentPosition + 1, answer.payload.data);
            break;
          case 'OPPONENT_IS_READY':
            this.startGame(answer.payload);
            break;
          default:
            console.log('unknown message!');
            break;
        }
        break;
      case 'turnResultMP':
        if (answer.payload.data) {
          // console.log('right turn');
        } else {
          // console.log('wrong turn');
        }
        this.props.websocketOnMessage(answer.payload.data);
        setTimeout(() => {
          const { type } = this.state.tasks[this.state.currentTask];
          if (type === 'question' || type === 'chain') {
            this.props.rightTurn(answer.payload.data);
          }
          if (answer.payload.completed === 'true') {
            this.setState((prevState) => {
              let { currentTask } = prevState;
              currentTask += 1;
              if (currentTask < prevState.tasks.length) {
                this.props.movePlayer(this.props.playerPosition + 1);
                const newType = prevState.tasks[currentTask].type;
                switch (newType) {
                  case 'question':
                    this.props.resetTimer(29);
                    break;
                  case 'match':
                  case 'chain':
                    this.props.resetTimer(119);
                    break;
                  default:
                    console.log('unknown game');
                }
              }
              return { currentTask };
            });
          }
        }, 1000);
        break;
      case 'GameCompletedMP':
        setTimeout(() => {
          if (!this.state.finished) {
            this.setState({ finished: true });
            switch (answer.payload.gameStatus) {
              case 'win':
                if (answer.payload.note === 'opponnet_has_left') {
                  this.onWonGameBecauseOfLeft(answer.payload.coins);
                } else {
                  this.onWonGame(answer.payload.coins);
                }
                break;
              case 'lose':
                this.onLostGame();
                break;
              case 'draw':
                this.onDrawGame(answer.payload.coins);
                break;
              default:
                break;
            }
          }
        }, 1000);
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
        // console.log('отправка сообщения: ', msg);
        // console.log('by socket: ', this.props.socket);
        this.props.socket.send(msg);
      }
      return { message: msgs };
    });
  }

  generateGame() {
    if (this.state.tasks.length > 0 && this.state.currentTask < this.state.tasks.length) {
      const task = this.state.tasks[this.state.currentTask];
      switch (task.type) {
        case 'chain':
          return (
            <React.Fragment>
              <Group>
                <Div>{task.note}</Div>
              </Group>
              <Chain gameData={task.data} doTurn={this.sendMsg} mode="multiplayer" />
            </React.Fragment>
          );
        case 'match':
          return (
            <React.Fragment>
              <Group>
                <Div>{task.note}</Div>
              </Group>
              <Match gameData={task.data} doTurn={this.sendMsg} mode="multiplayer" />
            </React.Fragment>
          );
        case 'question':
          return (
            <React.Fragment>
              <Group>
                <Div>{task.note}</Div>
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
      <>
        <div className="multiplayerwait">Поиск оппонента...</div>
        <SpinnerCentered />
      </>
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
