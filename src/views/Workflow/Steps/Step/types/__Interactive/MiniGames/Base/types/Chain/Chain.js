import React from 'react';
import PropTypes from 'prop-types';
import { Group, Div } from '@vkontakte/vkui';
import Frame from '../../../../../../../../../../common.blocks/Frame/Frame';

class Chain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: ['this', 'is', 'test', 'my', 'test', 'string'],
      selectedFrames: new Map(),
      completed: false,
      wrong: false,
    };

    this.onFrameClick = this.onFrameClick.bind(this);
    this.removeFromWrongFrames = this.removeFromWrongFrames.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextState: ', nextState);
    if (nextProps.answer !== null && !nextState.completed) {
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

  componentDidUpdate() {
    // check that all chain's frames used and game not done yet
    console.log('this.state.completed: ', this.state.completed);
    console.log('this.state.selectedFrames.size: ', this.state.selectedFrames.size);
    console.log('this.state.frames.length: ', this.state.frames.length);
    if (!this.state.completed && this.state.selectedFrames.size === this.state.frames.length) {
      this.checkChain(this.state.selectedFrames.values());
    }
  }

  onFrameClick(id) {
    console.log('id: ', id);
    if (id !== undefined) {
      this.setState((prevState) => {
        const { selectedFrames } = prevState;
        console.log('selectedFrames: ', selectedFrames);
        if (prevState.selectedFrames.has(id)) {
          selectedFrames.delete(id);
        } else {
          selectedFrames.set(id, prevState.frames[id]);
        }
        console.log('selectedFrames: ', selectedFrames);
        return { selectedFrames };
      });
    }
  }

  rightAnswer() {
    this.setState((prevState) => {
      let { completed } = prevState;
      completed = true;
      return { completed };
    });
    console.log('right answer!');
  }

  wrongAnswer() {
    this.setState(() => ({ wrong: true }));
  }

  removeFromWrongFrames(id) {
    this.setState((prevState) => {
      console.log('removeFromWrongFrames ', prevState.wrong);
      if (prevState.wrong) {
        const { selectedFrames } = prevState;
        selectedFrames.clear();
        return { selectedFrames, wrong: false };
      }
      return {};
    });
  }

  checkChain(chain) {
    if (!this.state.completed) {
      this.rightAnswer();
    }
  }

  render() {
    const frames = [];
    const selectedFrames = [];
    if (this.state.completed) {
      this.state.frames.forEach((frame, id) => {
        // TODO: think about fix this
        selectedFrames.push(
          <Frame
            key={`SelectedFrame_${id}}`}
            id={id}
            onFrameClick={() => {}}
            value={frame}
            isRight
          />,
        );
        // TODO: think about fix this
        frames.push(
          <Frame
            key={`Frame${id}}`}
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
            key={`SelectedFrame_${id}}`}
            id={id}
            onFrameClick={this.onFrameClick}
            value={frame}
            isWrong={this.state.wrong}
            onWrongAnimationEnds={this.removeFromWrongFrames}
          />,
        );
      });
      this.state.frames.forEach((frame, id) => {
        if (this.state.selectedFrames.has(id)) {
          // TODO: think about fix this
          frames.push(
            <Frame
              key={`Frame${id}}`}
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
              key={`Frame${id}}`}
              id={id}
              onFrameClick={this.onFrameClick}
              value={frame}
              isSecond
            />,
          );
          // TODO: think about fix this
          selectedFrames.push(
            <Frame
              key={`SelectedFrame__${id}}`}
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

Chain.propTypes = {
  answer: PropTypes.bool,
};

Chain.defaultProps = {
  answer: null,
};

export default Chain;
