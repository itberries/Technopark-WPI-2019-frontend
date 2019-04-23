import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Div } from '@vkontakte/vkui';

import { websocketOpen, websocketOnMessage, websocketClose } from '../../../../../../../actions/ws';

import MatchGame from './types/Match/Match';
import SpinnerCentered from '../../../../../../../common.blocks/SpinnerCentered/SpinnerCentered';

import './MiniGame.scss';

class MiniGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socketNotSet: true,
      socketReadyToSend: false,
    };
    this.sendMsg = this.sendMsg.bind(this);
  }

  componentWillMount() {
    this.props.websocketOpen('match');
    this.setState({ socketNotSet: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('this.state.socketNotSet: ', this.state.socketNotSet);
    if (nextProps.socket !== null && nextProps.gameType !== null) {
      if (this.state.socketNotSet) {
        nextProps.socket.onclose = (event) => {
          this.props.websocketClose();
          this.state.socketNotSet = true; // TODO: VANYA, WE NEED TO FIX THIS! (setState)
          this.state.messages = []; // TODO: VANYA, WE NEED TO FIX THIS! (setState)
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
            const msgs = prevState.messages;
            msgs.shift();
            if (msgs.length !== 0) {
              const msg = msgs[0];
              console.log('отправка сообщения: ', msg);
              this.props.socket.send(msg);
            }
            return { messages: msgs };
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
        console.log(`we won and our score grew by ${answer.payload.result} points`);
        this.props.socket.close();
        this.props.onCompleted();
        return;
      default:
        console.log('unknown message!');
    }
  }

  sendMsg(msg) {
    this.setState((prevState) => {
      const msgs = prevState.messages;
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
    console.log('this.props.gameType: ', this.props.gameType);
    console.log('this.props.gameData: ', this.props.gameData);
    switch (this.props.gameType) {
      case 'match':
        return <MatchGame gameData={this.props.gameData} sendMsg={this.sendMsg} />;
      default:
        return <SpinnerCentered />;
    }
  }

  render() {
    return <Div className="MiniGame">{this.generateGame()}</Div>;
  }
}

MiniGames.propTypes = {
  id: PropTypes.number.isRequired,
  socket: PropTypes.instanceOf(WebSocket),
  websocketOpen: PropTypes.func,
  websocketClose: PropTypes.func,
  gameType: PropTypes.string.isRequired,
  gameData: PropTypes.arrayOf(PropTypes.shape({})),
  onCompleted: PropTypes.func.isRequired,
};

MiniGames.defaultProps = {
  socket: null,
  websocketOpen: null,
  websocketClose: null,
  gameData: [],
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MiniGames);
