import React from 'react';
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
    this.createFrame = this.createFrame.bind(this);
  }

  createFrame(frame, id) {
    const newFrame = (
      <Frame
        id={id}
        onFrameClick={this.onFrameClick}
        value={frame}
        isActive={!!this.state.selectedFrames.has(id)}
        isSecond={this.state.secondFrames.has(frame)}
        tip={id === this.state.currentFrame}
        tipText="Ткни сюда"
      />
    );
    return newFrame;
  }

  onFrameClick(id) {
    console.log('onFrameClick id: ', id);
    if (id === this.state.currentFrame) {
      this.setState((prevState) => {
        let { currentFrame } = prevState;
        console.log('onFrameClick this.state.currentFrame: ', currentFrame);
        currentFrame += 1;
        console.log('onFrameClick this.state.currentFrame: ', currentFrame);
        return { currentFrame };
      });
      super.onFrameClick(id);
    }
  }

  sendFrames(frames) {
    console.log('sendFrames');
    // if (frames[0])
    this.rightAnswer();
  }
}

export default TraningMatch;
