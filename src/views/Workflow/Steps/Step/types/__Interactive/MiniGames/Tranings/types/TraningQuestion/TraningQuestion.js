import React from 'react';
import { Group, Div } from '@vkontakte/vkui';
import Question from '../../../Base/types/Question/Question';
import Frame from '../../../../../../../../../../common.blocks/Frame/Frame';

class TraningQuestion extends Question {
  constructor(props) {
    super(props);
    const questionFrames = props.gameData;
    this.state.frames = questionFrames;
    this.state.showTip = true;

    this.tipSwitch = this.tipSwitch.bind(this);
  }

  onFrameClick(id) {
    if (id === 1) {
      super.onFrameClick(id);
      this.rightAnswer();
      this.props.onComplete();
    }
    this.tipSwitch();
  }

  tipSwitch() {
    this.setState((prevState) => {
      let { showTip } = prevState;
      showTip = !showTip;
      return { showTip };
    });
  }

  render() {
    const frames = [];
    this.state.frames.forEach((frame, id) => {
      if (id === this.state.selectedFrameId) {
        frames.push(
          <Frame
            // TODO: fix this dirty hack
            key={`selectedFrame_${id}}`}
            id={id}
            onFrameClick={this.onFrameClick}
            value={frame}
            isSecond
            isRight={this.state.completed}
            isActive={!this.state.wrong}
            isWrong={this.state.wrong}
            onWrongAnimationEnds={this.removeFromWrongFrames}
          />,
        );
      } else {
        frames.push(
          <Frame
            // TODO: fix this dirty hack
            key={`frame_${id}}`}
            id={id}
            onFrameClick={this.onFrameClick}
            value={frame}
            isSecond
            tip={id === 1 && this.state.showTip}
            tipText="Нажми меня!"
            onTipClick={this.tipSwitch}
          />,
        );
      }
    });
    return (
      <React.Fragment>
        <Group>
          <Div>{frames}</Div>
        </Group>
      </React.Fragment>
    );
  }
}

export default TraningQuestion;
