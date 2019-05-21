import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { answerReceived } from '../../../../../../../../../../actions/ws';
import Match from '../../../Base/types/Match/Match';

class InteractiveMatch extends Match {
  constructor(props) {
    super(props);

    const cardForMatch = props.gameData;
    let frames = new Map();
    const secondFrames = new Map();
    cardForMatch.forEach((element, id) => {
      frames.set(id * 2, Object.keys(element)[0]);
      frames.set(id * 2 + 1, element[Object.keys(element)[0]]);
      secondFrames.set(id * 2 + 1, element[Object.keys(element)[0]]);
    });

    frames = new Map([...frames.entries()].sort(() => Math.random() - 0.5));
    this.state.frames = frames;
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

  componentWillUnmount() {
    this.props.answerReceived();
  }

  sendFrames(frames) {
    const msg = {
      type: 'turnMatch',
      payload: {
        data: {},
      },
      mode: this.props.mode,
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
