import React from 'react';
import PropTypes from 'prop-types';
import Frame from '../../../../../../../../../../common.blocks/Frame/Frame';

class Match extends React.Component {
  constructor(props) {
    super(props);
    console.log('Match state: ', this.state);
    this.state = {
      secondFrames: new Map(),
      frames: new Map(),
      activeFrames: [],
      selectedFrames: new Map(),
      answer: null,
      framesOnCheck: [],
      rightFrames: [],
    };
    console.log('Match state: ', this.state);
    this.onFrameClick = this.onFrameClick.bind(this);
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
    return true;
  }

  onFrameClick(id) {
    this.setState((prevState) => {
      const { activeFrames, selectedFrames } = prevState;
      activeFrames.push(id);
      selectedFrames.set(id, prevState.frames.get(id));
      console.log('activeFrames: ', activeFrames);
      if (activeFrames.length === 2) {
        console.log('prepeare for sending');
        const { framesOnCheck } = prevState;
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
      const {
        framesOnCheck, rightFrames, selectedFrames, frames,
      } = prevState;
      const newRightFrames = framesOnCheck.shift();
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
      const { framesOnCheck, selectedFrames } = prevState;
      const newRightFrames = framesOnCheck.shift();
      if (newRightFrames !== undefined) {
        newRightFrames.forEach((id) => {
          selectedFrames.delete(id);
        });
      }
      return { framesOnCheck, selectedFrames };
    });
  }

  // TODO: think up what this function will do
  sendFrames(frames) {}

  // TODO: remove this hack!
  createFrame(frame, id) {
    const newFrame = (
      <Frame
        id={id}
        onFrameClick={this.onFrameClick}
        value={frame}
        isActive={!!this.state.selectedFrames.has(id)}
        isSecond={this.state.secondFrames.has(frame)}
      />
    );
    return newFrame;
  }

  render() {
    const newFrames = [];
    this.state.rightFrames.forEach((frame) => {
      newFrames.push(<Frame onFrameClick={this.onFrameClick} value={frame} isRight />);
    });
    this.state.frames.forEach((frame, id) => {
      newFrames.push(this.createFrame(frame, id));
    });
    // <Frame onFrameClick={this.onFrameClick} value={} />
    return newFrames;
  }
}

Match.propTypes = {
  answer: PropTypes.bool,
};

Match.defaultProps = {
  answer: null,
};

export default Match;
