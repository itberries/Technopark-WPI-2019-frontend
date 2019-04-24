import React from 'react';
import PropTypes from 'prop-types';
import Frame from '../../../../../../../../../../common.blocks/Frame/Frame';
import Match from '../../../Base/types/Match/Match';

class TraningMatch extends Match {
  constructor(props) {
    super(props);

    const stateFrames = new Map();
    stateFrames.set(1, 'Дискретный');
    stateFrames.set(2, 'Нотный стан');
    stateFrames.set(3, 'Луч');
    stateFrames.set(4, 'Непрерывный');

    const secondFrames = new Map();
    secondFrames.set('Дискретный');
    secondFrames.set('Непрерывный');

    this.state.frames = stateFrames;
    this.state.secondFrames = secondFrames;
    this.state.currentFrame = 1;
    this.state.showTip = true;

    this.createFrame = this.createFrame.bind(this);
    this.onTipClick = this.onTipClick.bind(this);
  }

  createFrame(frame, id) {
    const newFrame = (
      <Frame
        id={id}
        onFrameClick={this.onFrameClick}
        value={frame}
        isActive={!!this.state.selectedFrames.has(id)}
        isSecond={this.state.secondFrames.has(frame)}
        tip={id === this.state.currentFrame && this.state.showTip}
        tipText="Нажми меня!"
        onTipClick={this.onTipClick}
      />
    );
    return newFrame;
  }

  onFrameClick(id) {
    if (id === this.state.currentFrame) {
      this.setState((prevState) => {
        let { currentFrame } = prevState;
        currentFrame += 1;
        return { currentFrame };
      });
      super.onFrameClick(id);
    }
    this.setState((prevState) => {
      let { showTip } = prevState;
      showTip = !showTip;
      return { showTip };
    });
  }

  onTipClick() {
    this.setState((prevState) => {
      let { showTip } = prevState;
      showTip = !showTip;
      return { showTip };
    });
  }

  sendFrames(frames) {
    // if (frames[0])
    this.rightAnswer();
    if (this.state.rightFrames.length === this.state.frames.size) {
      this.props.onComplete();
    }
  }
}

// TODO: Write from parent
// TraningMatch.propTypes.onComplete = PropTypes.func.isRequired;

export default TraningMatch;
