import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { answerReceived } from '../../../../../../../../../../actions/ws';
import Question from '../../../Base/types/Question/Question';

class InteractiveQuestion extends Question {
  constructor(props) {
    super(props);
    const questionFrames = props.gameData;
    this.state.frames = questionFrames;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextState: ', nextState);
    if (nextProps.answer !== null && !nextState.completed) {
      console.log('nextProps.answer: ', nextProps.answer);
      if (nextProps.answer === true) {
        console.log('right answer');
        this.rightAnswer();
      } else {
        console.log('wrong answer');
        this.wrongAnswer();
      }
      this.props.answerReceived();
    }
    return true;
  }

  checkQuestion() {
    console.log('this.state.selectedFrameId: ', this.state.selectedFrameId);
    if (this.state.selectedFrameId !== null) {
      const msg = {
        type: 'turnQuestion',
        payload: {
          data: this.state.selectedFrameId + 1,
        },
        mode: this.props.mode,
      };
      this.props.doTurn(JSON.stringify(msg));
    }
  }
}

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
)(InteractiveQuestion);
