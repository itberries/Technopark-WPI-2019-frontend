import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { answerReceived } from '../../../../../../../../../actions/ws';
import Frame from '../../../../../../../../../common.blocks/Frame/Frame';

class Match extends React.Component {
  constructor(props) {
    super(props);
    const cardForMach = JSON.parse(props.gameData[0].note).data;
    console.log('cardForMach: ', cardForMach);
    let frames = [];
    this.onFrameClick = this.onFrameClick.bind(this);
    cardForMach.forEach((element) => {
      frames.push(Object.keys(element)[0]);
      frames.push(element[Object.keys(element)[0]]);
    });
    frames = frames.sort(() => Math.random() - 0.5);
    const stateFrames = new Map();
    frames.forEach((element, index) => {
      stateFrames.set(index, element);
    });
    this.state = {
      activeFrames: [],
      selectedFrames: new Map(),
      frames: stateFrames,
      answer: null,
      framesOnCheck: [],
      rightFrames: [],
    };
  }

  shouldComponentUpdate(nextProps) {
    console.log('nextProps.answer: ', nextProps.answer);
    if (nextProps.answer !== null) {
      console.log('nextProps.answer: ', nextProps.answer);
      if (nextProps.answer === true) {
        console.log('right pair');
        this.rightAnswer();
      } else {
        console.log('wrong pair');
        this.wrongAnswer();
      }
    }
    this.props.answerReceived();
    return true;
  }

  onFrameClick(id) {
    console.log(
      'JSON.parse(props.gameData[0].note).data :',
      JSON.parse(this.props.gameData[0].note).data,
    );
    this.setState((prevState) => {
      const activeFrames = prevState.activeFrames;
      activeFrames.push(id);
      const selectedFrames = prevState.selectedFrames;
      selectedFrames.set(id, prevState.frames.get(id));
      console.log('activeFrames: ', activeFrames);
      if (activeFrames.length === 2) {
        console.log('prepeare for sending');
        const framesOnCheck = prevState.framesOnCheck;
        const sendingFrames = [activeFrames.shift(), activeFrames.shift()];
        framesOnCheck.push(sendingFrames);
        this.sendFrames([
          prevState.frames.get(sendingFrames[0]),
          prevState.frames.get(sendingFrames[1]),
        ]);
        return { activeFrames, framesOnCheck, selectedFrames };
      }
      return { activeFrames, selectedFrames };
    });
  }

  rightAnswer() {
    this.setState((prevState) => {
      const framesOnCheck = prevState.framesOnCheck;
      const rightFrames = prevState.rightFrames;
      const newRightFrames = framesOnCheck.shift();
      const frames = prevState.frames;
      const selectedFrames = prevState.selectedFrames;
      if (newRightFrames !== undefined) {
        newRightFrames.forEach((id) => {
          rightFrames.push(prevState.frames.get(id));
          frames.delete(id);
          selectedFrames.delete(id);
        });
      }
      return {
        framesOnCheck,
        rightFrames,
        frames,
        selectedFrames,
      };
    });
  }

  wrongAnswer() {
    this.setState((prevState) => {
      const framesOnCheck = prevState.framesOnCheck;
      const newRightFrames = framesOnCheck.shift();
      const selectedFrames = prevState.selectedFrames;
      if (newRightFrames !== undefined) {
        newRightFrames.forEach((id) => {
          selectedFrames.delete(id);
        });
      }
      return { framesOnCheck, selectedFrames };
    });
  }

  sendFrames(frames) {
    const msg = {
      type: 'turn',
      payload: {
        data: {},
      },
    };
    msg.payload.data[frames[0]] = frames[1];
    this.props.sendMsg(JSON.stringify(msg));
  }

  render() {
    const newFrames = [];
    this.state.rightFrames.forEach((frame) => {
      newFrames.push(<Frame onFrameClick={this.onFrameClick} value={frame} right />);
    });
    this.state.frames.forEach((frame, id) => {
      newFrames.push(
        <Frame
          id={id}
          onFrameClick={this.onFrameClick}
          value={frame}
          active={this.state.selectedFrames.has(id) ? true : ''}
        />,
      );
    });
    // <Frame onFrameClick={this.onFrameClick} value={} />
    return newFrames;
  }
}

Match.propTypes = {
  gameData: PropTypes.string.isRequired,
  sendMsg: PropTypes.func.isRequired,
  answer: PropTypes.bool,
};

Match.defaultProps = {
  answer: null,
};

const mapStateToProps = (state) => {
  const { answer } = state.ws;
  return { answer };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    answerReceived,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Match);
