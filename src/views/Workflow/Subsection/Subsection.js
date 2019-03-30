import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Div } from '@vkontakte/vkui';

import SubsectionBlock from './__Block/Subsection__Block';
import './Subsection.scss';

import { fetchSubsectionSteps } from '../../../actions/subsection';

/**
 * Subsection component for learning workflow
 */
class Subsection extends React.Component {
  async componentWillMount() {
    await this.props.fetchSubsectionSteps();
  }

  /**
   * render
   * @return {ReactElement} markup with list of blocks in subsection container
   */
  render() {
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
        subsectionBlocks.push(
          <SubsectionBlock
            key={step.name}
            withSeparator={!isLastStep} // {index !== this.state.steps.length - 1} // TODO: check if it works
            type={step.type}
            isCompleted={!afterLastCompleted} // || (this.props.data.get('section_done') && isLastStep)}
            isActive={!afterLastCompleted || lastCompletedStepId === step.id}
            onSelectStep={() => console.error('TODO: onSelectStep()')}
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
        <Div className="subsection__container">{subsectionBlocks}</Div>
      </Div>
    );
  }
}

// which props do we want to inject, given the global store state?
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Subsection);
