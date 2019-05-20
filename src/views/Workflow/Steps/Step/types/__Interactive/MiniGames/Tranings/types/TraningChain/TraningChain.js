import React from 'react';
import { Group, Div } from '@vkontakte/vkui';
import Frame from '../../../../../../../../../../common.blocks/Frame/Frame';

import Chain from '../../../Base/types/Chain/Chain';

class TraningChain extends Chain {
  constructor(props) {
    super(props);
    const questionFrames = props.gameData;
    this.state.frames = questionFrames;
    this.state.showTip = true;
    this.state.currentFrame = 0;

    this.tipSwitch = this.tipSwitch.bind(this);
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

  rightAnswer() {
    super.rightAnswer();
    this.props.onComplete();
  }

  tipSwitch() {
    this.setState((prevState) => {
      console.log('tipSwitch');
      let { showTip } = prevState;
      showTip = !showTip;
      return { showTip };
    });
  }

  render() {
    const frames = [];
    const selectedFrames = [];
    if (this.state.completed) {
      this.state.frames.forEach((frame, id) => {
        // TODO: think about fix this
        selectedFrames.push(
          <Frame
            key={`SelectedFrame_${id}_${new Date().getTime()}`}
            id={id}
            onFrameClick={() => {}}
            value={frame}
            isRight
          />,
        );
        // TODO: think about fix this
        frames.push(
          <Frame
            key={`Frame${id}_${new Date().getTime()}`}
            id={id}
            onFrameClick={this.onFrameClick}
            value={frame}
            dummy
          />,
        );
      });
    } else {
      this.state.selectedFrames.forEach((frame, id) => {
        // TODO: think about fix this
        selectedFrames.push(
          <Frame
            key={`SelectedFrame_${id}_${new Date().getTime()}`}
            id={id}
            onFrameClick={this.onFrameClick}
            value={frame}
          />,
        );
      });
      this.state.frames.forEach((frame, id) => {
        if (this.state.selectedFrames.has(id)) {
          // TODO: think about fix this
          frames.push(
            <Frame
              key={`Frame${id}_${new Date().getTime()}`}
              id={id}
              onFrameClick={this.onFrameClick}
              value={frame}
              dummy
            />,
          );
        } else {
          // TODO: think about fix this
          frames.push(
            <Frame
              key={`Frame${id}_${new Date().getTime()}`}
              id={id}
              onFrameClick={this.onFrameClick}
              value={frame}
              isSecond
              tip={id === this.state.currentFrame && this.state.showTip}
              tipText="Нажми меня!"
              onTipClick={this.tipSwitch}
            />,
          );
          // TODO: think about fix this
          selectedFrames.push(
            <Frame
              key={`SelectedFrame__${id}_${new Date().getTime()}`}
              id={id}
              onFrameClick={this.onFrameClick}
              value={frame}
              fakeHidden
            />,
          );
        }
      });
    }
    return (
      <React.Fragment>
        <Group>
          <Div>{selectedFrames}</Div>
        </Group>
        <Group>
          <Div>{frames}</Div>
        </Group>
      </React.Fragment>
    );
  }
}

export default TraningChain;
