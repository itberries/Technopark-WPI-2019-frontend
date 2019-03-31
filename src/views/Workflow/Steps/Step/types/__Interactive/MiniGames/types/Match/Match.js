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
    let frames = [];
    this.onFrameClick = this.onFrameClick.bind(this);
    cardForMach.forEach((element) => {
      frames.push(Object.keys(element)[0]);
      frames.push(element[Object.keys(element)[0]]);
    });
    frames = frames.sort(() => Math.random() - 0.5);
    const stateFrames = new Map();
    frames.forEach((frame) => {
      stateFrames.set(frame, frame);
    });
    this.state = {
      activeFrames: [],
      frames: stateFrames,
      answer: null,
      framesOnCheck: [],
      rightFrames: [],
    };
  }

  shouldComponentUpdate(nextProps) {
    console.log('nextProps.answer: ', nextProps.answer);
    if (nextProps.answer !== null) {
      if (nextProps.answer === true) {
        console.log('right pair');
        this.rightAnswer();
      } else {
        console.log('wrong pair');
        this.wrongAnswer();
      }
      this.props.answerReceived();
    }
    return true;
  }

  onFrameClick(innerHTML) {
    this.setState((prevState) => {
      const activeFrames = prevState.activeFrames;
      activeFrames.push(innerHTML);
      const frames = prevState.frames;
      if (activeFrames.length === 2) {
        const framesOnCheck = prevState.framesOnCheck;
        framesOnCheck.push(activeFrames);
        this.sendFrames(activeFrames);
        return { activeFrames: [], framesOnCheck };
      }
      return { activeFrames };
    });
  }

  rightAnswer() {
    this.setState((prevState) => {
      const framesOnCheck = prevState.framesOnCheck;
      const rightFrames = prevState.rightFrames;
      const newRightFrames = framesOnCheck.shift();
      const frames = prevState.frames;
      newRightFrames.forEach((frame) => {
        rightFrames.push(frame);
        frames.delete(frame);
      });
      return { framesOnCheck, rightFrames, frames };
    });
  }

  wrongAnswer() {
    this.setState((prevState) => {
      const framesOnCheck = prevState.framesOnCheck;
      framesOnCheck.shift();
      return { framesOnCheck };
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
    this.state.frames.forEach((frame) => {
      newFrames.push(<Frame onFrameClick={this.onFrameClick} value={frame} />);
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
