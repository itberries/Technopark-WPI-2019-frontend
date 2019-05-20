import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { answerReceived } from '../../../../../../../../../../actions/ws';
import Chain from '../../../Base/types/Chain/Chain';

class InteractiveChain extends Chain {
  constructor(props) {
    super(props);
    const chainFrames = props.gameData;
    const frames = [];
    chainFrames.forEach((value) => {
      frames.push(value);
    });
    this.state.frames = frames;
    this.state.notSend = true;
  }

  // TODO: This is a bad decision. If we have time, we need to think better
  async shouldComponentUpdate(nextProps, nextState) {
    super.shouldComponentUpdate(nextProps, nextState);
    if (nextProps.answer !== null) {
      await this.props.answerReceived();
      nextState.notSend = true;
    }
    return true;
  }

  componentDidUpdate() {
    if (this.state.notSend) {
      super.componentDidUpdate();
    }
  }

  componentWillUnmount() {
    this.props.answerReceived();
  }

  checkChain(chain) {
    this.setState({ notSend: false });
    const msg = {
      type: 'turnChain',
      payload: {
        data: Array.from(chain),
      },
      mode: this.props.mode,
    };
    this.props.doTurn(JSON.stringify(msg));
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
)(InteractiveChain);
