import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { answerReceived } from '../../../../../../../../../../actions/ws';
import Chain from '../../../Base/types/Chain/Chain';

class InteractiveChain extends Chain {
  constructor(props) {
    super(props);
    console.log('props.gameData: ', props.gameData);
    const chainFrames = JSON.parse(props.gameData[0].note).data;
    const frames = [];
    chainFrames.forEach((value) => {
      frames.push(value);
    });
    this.state.frames = frames;
  }

  // TODO: This is a bad decision. If we have time, we need to think better
  shouldComponentUpdate(nextProps, nextState) {
    super.shouldComponentUpdate(nextProps, nextState);
    if (nextProps.answer !== null) {
      this.props.answerReceived();
    }
    return true;
  }

  checkChain(chain) {
    console.log('checkChain: ', chain);
    const msg = {
      type: 'turnChain',
      payload: {
        data: Array.from(chain),
      },
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
