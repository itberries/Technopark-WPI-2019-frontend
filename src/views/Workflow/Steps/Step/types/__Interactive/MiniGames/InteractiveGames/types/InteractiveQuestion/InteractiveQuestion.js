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
    super.shouldComponentUpdate(nextProps, nextState);
    if (nextProps.answer !== null && !nextState.completed) {
      if (nextProps.answer === true) {
        this.rightAnswer();
      } else {
        this.wrongAnswer();
      }
      this.props.answerReceived();
    }
    return true;
  }

  componentDidUpdate() {
    if (this.state.choosed) {
      this.checkQuestion();
    }
  }

  componentWillUnmount() {
    this.props.answerReceived();
  }

  checkQuestion() {
    if (this.state.selectedFrameId !== null) {
      const msg = {
        type: 'turnQuestion',
        payload: {
          data: this.state.selectedFrameId + 1,
        },
        mode: this.props.mode,
      };
      this.setState({ choosed: false });
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
