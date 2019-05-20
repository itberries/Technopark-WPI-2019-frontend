import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Popup from 'sweetalert2';

import { websocketOpen, websocketOnMessage, websocketClose } from '../../../../../../../actions/ws';

import MiniGame from './MiniGame';
import MatchGame from './InteractiveGames/types/InteractiveMatch/InteractiveMatch';
import ChainGame from './InteractiveGames/types/InteractiveChain/InteractiveChain';
import QuestionGame from './InteractiveGames/types/InteractiveQuestion/InteractiveQuestion';

import './MiniGame.scss';

import coinsImage from '../../../../../../../images/icons/coins.svg';
import rocketImage from '../../../../../../../images/icons/rocket_launch.svg';

const mapStateToProps = (state) => {
  const { socket } = state.ws;
  return { socket };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    websocketOpen,
    websocketClose,
    websocketOnMessage,
  },
  dispatch,
);

class InteractiveGame extends MiniGame {
  constructor(props) {
    super(props);

    this.sendMsg = this.sendMsg.bind(this);
    this.completeGame = this.completeGame.bind(this);

    this.state.socketNotSet = true;
    this.state.socketReadyToSend = false;
    this.state.actions = [];
    this.state.gainedCoins = undefined;
    this.state.reward = undefined;
  }

  componentWillMount() {
    console.log('this.props.gameType: ', this.props.gameType);
    this.props.websocketOpen();
    this.setState({ socketNotSet: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('this.state.socketNotSet: ', this.state.socketNotSet);
    if (nextProps.socket !== null && nextProps.gameType !== null) {
      if (this.state.socketNotSet) {
        nextProps.socket.onclose = (event) => {
          this.props.websocketClose();
          this.state.socketNotSet = true; // TODO: VANYA, WE NEED TO FIX THIS! (setState)
          this.state.actions = []; // TODO: VANYA, WE NEED TO FIX THIS! (setState)
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
          gameType: this.props.gameType,
          stepId: this.props.id,
          mode: 'singleplayer',
        }),
      );
    }
  }

  componentWillUnmount() {
    if (this.props.socket !== null) {
      this.props.socket.close();
    }
  }

  processAnswr(data) {
    const answer = JSON.parse(data);
    console.log('answer: ', answer);
    switch (answer.type) {
      case 'DeliveryStatus':
        if (answer.payload.result === 'OK') {
          console.log('Success start sessiong');
        } else {
          console.log('cant start session!');
        }
        return;
      case 'TurnResult':
        if (answer.payload.data) {
          console.log('right turn');
        } else {
          console.log('wrong turn');
        }
        this.props.websocketOnMessage(answer.payload.data);
        return;
      case 'GameCompleted':
        console.log('game completed, payoad:', answer.payload);
        this.props.socket.close();
        if (typeof answer.payload.reward !== 'undefined' && answer.payload.reward !== null) {
          this.setState({
            gainedCoins: answer.payload.result,
            reward: answer.payload.reward,
          });
        } else {
          this.setState({ gainedCoins: answer.payload.result });
        }
        console.log('showing scores popup...');
        setTimeout(this.showResultPopup.bind(this), 1000);
        return;
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

  completeGame() {
    this.props.onCompleted();
  }

  generateMatch() {
    const { data } = JSON.parse(this.props.gameData[0].note);
    return <MatchGame gameData={data} doTurn={this.sendMsg} mode="singleplayer" />;
  }

  generateChain() {
    const { data } = JSON.parse(this.props.gameData[0].note);
    return <ChainGame gameData={data} doTurn={this.sendMsg} mode="singleplayer" />;
  }

  generateQuestion() {
    const { data } = JSON.parse(this.props.gameData[0].note);
    return <QuestionGame gameData={data} doTurn={this.sendMsg} mode="singleplayer" />;
  }

  showResultPopup() {
    if (this.state.gainedCoins !== 0) {
      Popup.fire({
        title: 'Задание выполнено!',
        text: `Вы получили ${this.state.gainedCoins} монет! `,
        confirmButtonColor: '#41046F',
        imageUrl: coinsImage,
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Монетки',
      }).then(() => {
        if (this.state.reward) {
          Popup.fire({
            title: 'Открыто новое достижение!',
            text: `Достижение ${this.state.reward.note}`,
            confirmButtonText: 'Дальше',
            confirmButtonColor: '#41046F',
            imageUrl: this.state.reward.imageUrl,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: `Достижение ${this.state.reward.note}`,
            animation: false,
            customClass: {
              popup: 'animated tada',
            },
          }).then(() => {
            this.completeGame();
          });
        } else {
          this.completeGame();
        }
      });
    } else {
      Popup.fire({
        title: 'Задание выполнено!',
        text: 'Закрепление пройденного материала - важная часть успешного обучения.',
        confirmButtonText: 'Дальше',
        confirmButtonColor: '#41046F',
        imageUrl: rocketImage,
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Ракета',
      }).then(() => {
        this.completeGame();
      });
    }
  }
}

InteractiveGame.propTypes = {
  id: PropTypes.number.isRequired,
  socket: PropTypes.instanceOf(WebSocket),
  websocketOpen: PropTypes.func,
  websocketClose: PropTypes.func,
  gameData: PropTypes.arrayOf(PropTypes.shape({})),
  onCompleted: PropTypes.func.isRequired,
};

InteractiveGame.defaultProps = {
  socket: null,
  websocketOpen: null,
  websocketClose: null,
  gameData: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InteractiveGame);
