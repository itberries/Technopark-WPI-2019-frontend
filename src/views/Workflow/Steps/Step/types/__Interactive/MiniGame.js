import React from 'react';
import PropTypes from 'prop-types';
import { Div } from '@vkontakte/vkui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import websocketOpen from '../../../../../../actions/ws';

class MiniGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      messages: [],
      socketNotSet: true,
      socketReadyToSend: false,
    };
  }

  componentWillMount() {
    this.props.websocketOpen('match');
    this.setState({ socketNotSet: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.socket !== null) {
      if (this.state.socketNotSet) {
        nextProps.socket.onclose = (event) => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
          }
          console.log('Код: ', event.code, ' причина: ', event.reason);
        };
        nextProps.socket.onerror = (error) => {
          console.log('Ошибка ', error.message);
        };
        console.log('start listning msg');
        nextProps.socket.onmessage = (event) => {
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
        this.state.socketNotSet = false;
        this.state.socketReadyToSend = true;
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
          gameType: 'match',
          stepId: 3,
        }),
      );
    }
  }

  getGame() {
    console.log('letst get game for step: ', this.props.id, ' and type: ', this.props.gameType);
  }

  processAnswr(data) {
    const answer = JSON.parse(data);
    console.log('Get data by ws: ', answer);
    switch (answer.type) {
      case 'DeliveryStatus':
        if (answer.payload.result === 'OK') {
          console.log('Success start sessiong');
          this.sendMsg(
            JSON.stringify({
              type: 'turn',
              payload: {
                data: {
                  '1 байт': '8 бит',
                },
              },
            }),
          );
          this.sendMsg(
            JSON.stringify({
              type: 'turn',
              payload: {
                data: {
                  '1 Мбайт': '1024 байта',
                },
              },
            }),
          );
          this.sendMsg(
            JSON.stringify({
              type: 'turn',
              payload: {
                data: {
                  '1 Гбайт': '1024 Мбайта',
                },
              },
            }),
          );
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
        return;
      case 'GameCompleted':
        console.log(`we won and our score grew by ${answer.payload.result} points`);
        return;
      default:
        console.log('unknown message!');
    }
  }

  sendMsg(msg) {
    console.log('send ws msg: ', msg);
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
    return this.state.game;
  }

  render() {
    return <Div>{this.generateGame()}</Div>;
  }
}

MiniGames.propTypes = {
  id: PropTypes.number.isRequired,
  socket: PropTypes.shape({}),
  websocketOpen: PropTypes.func,
  gameType: PropTypes.string.isRequired,
};

MiniGames.defaultProps = {
  socket: null,
  websocketOpen: null,
};

const mapStateToProps = (state) => {
  const { socket } = state.ws;
  return { socket };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    websocketOpen,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MiniGames);
