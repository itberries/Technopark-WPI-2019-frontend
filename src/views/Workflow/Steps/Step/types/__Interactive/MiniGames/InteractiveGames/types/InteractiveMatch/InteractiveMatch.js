import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { answerReceived } from '../../../../../../../../../../actions/ws';
import Match from '../../../Base/types/Match/Match';

class InteractiveMatch extends Match {
  constructor(props) {
    super(props);

    const cardForMatch = JSON.parse(props.gameData[0].note).data;
    let frames = [];
    const secondFrames = new Map();
    cardForMatch.forEach((element) => {
      frames.push(Object.keys(element)[0]);
      frames.push(element[Object.keys(element)[0]]);
      secondFrames.set(element[Object.keys(element)[0]]);
    });

    frames = frames.sort(() => Math.random() - 0.5);

    const stateFrames = new Map();
    frames.forEach((element, index) => {
      stateFrames.set(index, element);
    });

    console.log('InteractiveMatch state: ', this.state);
    this.state.frames = stateFrames;
    this.state.secondFrames = secondFrames;
  }

  // TODO: This is a bad decision. If we have time, we need to think better
  shouldComponentUpdate(nextProps) {
    super.shouldComponentUpdate(nextProps);
    if (nextProps.answer !== null) {
      this.props.answerReceived();
    }
    return true;
  }

  sendFrames(frames) {
    const msg = {
      type: 'turnMatch',
      payload: {
        data: {},
      },
    };
    msg.payload.data[frames[0]] = frames[1];
    this.props.doTurn(JSON.stringify(msg));
  }
}

// TODO: Write from parent
// InteractiveMatch.propTypes.sendMsg = PropTypes.func.isRequired;

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
)(InteractiveMatch);
