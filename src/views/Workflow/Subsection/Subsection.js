import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Div } from '@vkontakte/vkui';

import SpinnerCentered from '../../../common.blocks/SpinnerCentered/SpinnerCentered';
import SubsectionBlock from './__Block/Subsection__Block';
import './Subsection.scss';

import { fetchSubsectionSteps } from '../../../actions/subsection';

const mapStateToProps = (state) => {
  const {
    selectedSubsectionId,
    subsectionStepsById,
    firstStepInStepListId,
    lastCompletedStepId,
  } = state.subsection;
  return {
    selectedSubsectionId,
    subsectionStepsById,
    firstStepInStepListId,
    lastCompletedStepId,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchSubsectionSteps,
  },
  dispatch,
);

/**
 * Subsection component for learning workflow
 */
class Subsection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  async componentWillMount() {
    this.setState({
      isLoading: true,
    });
    await this.props.fetchSubsectionSteps();
    this.setState({
      isLoading: false,
    });
  }

  /**
   * render
   * @return {ReactElement} markup with list of blocks in subsection container
   */
  render() {
    const { isLoading } = this.state;

    const { subsectionStepsById, firstStepInStepListId, lastCompletedStepId } = this.props;

    let step;
    let afterLastCompleted = false;
    const subsectionBlocks = [];

    if (typeof firstStepInStepListId !== 'undefined') {
      step = subsectionStepsById.get(firstStepInStepListId);
      let isLastStep = false;
      while (!isLastStep) {
        if (step.childId === 0) {
          isLastStep = true;
        }
        if (step.id === lastCompletedStepId) {
          afterLastCompleted = true;
        }
        step.isCompleted = !afterLastCompleted;
        subsectionBlocks.push(
          <SubsectionBlock
            key={step.name}
            withSeparator={!isLastStep} // {index !== this.state.steps.length - 1} // TODO: check if it works
            type={step.type}
            isCompleted={step.isCompleted} // || (this.props.data.get('section_done') && isLastStep)}
            isLocked={afterLastCompleted && lastCompletedStepId !== step.id}
            isActive={step.isCompleted || lastCompletedStepId === step.id}
            onSelectStep={this.props.onSelectStep}
            id={step.id}
          >
            {step.name}
          </SubsectionBlock>,
        );
        step = subsectionStepsById.get(step.childId);
      }
    }

    return (
      <Div className="subsection">
        <Div className="subsection__container">
          {isLoading ? <SpinnerCentered /> : subsectionBlocks}
        </Div>
      </Div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Subsection);
