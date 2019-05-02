import React from 'react';
import PropTypes from 'prop-types';
import { Group, Div } from '@vkontakte/vkui';
import Frame from '../../../../../../../../../../common.blocks/Frame/Frame';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [
        '1. непрерывынми и дискретными',
        '2. открытыми и закрытми',
        '3. высокими и низкими',
        '4. громикими и тихими',
      ],
      completed: false,
      selectedFrameId: null,
    };

    this.onFrameClick = this.onFrameClick.bind(this);
  }

  componentDidUpdate() {
    // check that have selectedFrame and game not done yet
    if (this.state.selectedFrameId !== null && !this.state.completed) {
      this.checkQuestion();
    }
  }

  onFrameClick(id) {
    console.log('onFrameClick: ', id);
    this.setState((prevState) => {
      let { selectedFrameId } = prevState;
      selectedFrameId = id;
      return { selectedFrameId };
    });
  }

  checkQuestion() {
    if (this.state.selectedFrameId === 0) {
      this.rightAnswer();
    } else {
      this.wrongAnswer();
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
      let { selectedFrameId } = prevState;
      selectedFrameId = null;
      return { selectedFrameId };
    });
  }

  render() {
    const frames = [];
    this.state.frames.forEach((frame, id) => {
      if (id === this.state.selectedFrameId) {
        frames.push(
          <Frame
            // TODO: fix this dirty hack
            key={`selectedFrame_${id}_${new Date().getTime()}`}
            id={id}
            onFrameClick={this.onFrameClick}
            value={frame}
            isSecond
            isActive
            isRight={this.props.completed}
          />,
        );
      } else {
        frames.push(
          <Frame
            // TODO: fix this dirty hack
            key={`frame_${id}_${new Date().getTime()}`}
            id={id}
            onFrameClick={this.onFrameClick}
            value={frame}
            isSecond
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

Question.propTypes = {
  answer: PropTypes.bool,
};

Question.defaultProps = {
  answer: null,
};

export default Question;
