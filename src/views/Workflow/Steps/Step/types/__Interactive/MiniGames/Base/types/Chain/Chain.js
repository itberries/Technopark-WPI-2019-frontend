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
    };

    this.onFrameClick = this.onFrameClick.bind(this);
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
    if (!this.state.completed && this.state.selectedFrames.size === this.state.frames.length) {
      this.checkChain(this.state.selectedFrames.values());
    }
  }

  onFrameClick(id) {
    if (id !== undefined) {
      this.setState((prevState) => {
        const { selectedFrames } = prevState;
        if (prevState.selectedFrames.has(id)) {
          selectedFrames.delete(id);
        } else {
          selectedFrames.set(id, prevState.frames[id]);
        }
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
    this.setState((prevState) => {
      const { selectedFrames } = prevState;
      selectedFrames.clear();
      return { selectedFrames };
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

Chain.propTypes = {
  answer: PropTypes.bool,
};

Chain.defaultProps = {
  answer: null,
};

export default Chain;
