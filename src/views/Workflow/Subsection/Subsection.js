import React from 'react';

import axios from 'axios';

import PropTypes from 'prop-types';
import { Div } from '@vkontakte/vkui';

import SubsectionBlock from './__Block/Subsection__Block';
import './Subsection.scss';

/**
 * Subsection component for learning workflow
 */
class Subsection extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      steps: new Map(),
      startStepId: undefined,
      lastCompletedStepId: undefined,
    };
  }

  componentDidMount() {
    this.getSteps();
  }

  /**
   * Get steps by subsection id from API
   * @memberof Subsection
   */
  getSteps() {
    axios
      .get(`/subsections/${this.state.id}/steps/`)
      .then((response) => {
        const { stepResponses, currentStep } = response.data;

        let { startStepId } = this.state;
        const { steps } = this.state;
        stepResponses.forEach((step) => {
          if (step.parentId === 0) {
            startStepId = step.id;
          }
          steps.set(step.id, step);
        });

        this.props.data.set('steps', steps);
        if (window.last_step === undefined) {
          window.last_step = currentStep;
        }
        if (this.props.data.get('section_done') === undefined) {
          this.props.data.set('section_done', false);
        }
        this.setState({ steps, startStepId });
      })
      .catch((error) => {
        if (typeof error.response !== 'undefined' && error.response.status === 404) {
          console.error('getSteps not found!!!', error.response);
        } else {
          console.error('getSteps error!!!', error.response);
        }
      });
  }

  /**
   * render
   * @return {ReactElement} markup with list of blocks in subsection container
   */
  render() {
    const subsectionBlocks = [];
    let step;
    let afterLastCompleted = false;
    const { steps } = this.state;
    if (typeof this.state.startStepId !== 'undefined') {
      step = steps.get(this.state.startStepId);
      let isLastStep = false;
      while (!isLastStep) {
        if (step.childId === 0) {
          isLastStep = true;
        }
        if (step.id === window.last_step.id) {
          console.log('step.id: ', step.id);
          console.log('last.id: ', window.last_step.id);
          afterLastCompleted = true;
        }
        subsectionBlocks.push(
          <SubsectionBlock
            key={step.name}
            withSeparator={!isLastStep} // {index !== this.state.steps.length - 1}
            type={step.type}
            isCompleted={!afterLastCompleted || (this.props.data.get('section_done') && isLastStep)}
            isActive={!afterLastCompleted || window.last_step.id === step.id}
            onSelectStep={this.props.onSelectStep}
            id={step.id}
          >
            {step.name}
          </SubsectionBlock>,
        );
        step = steps.get(step.childId);
      }
    }

    return (
      <Div className="subsection">
        <Div className="subsection__container">{subsectionBlocks}</Div>
      </Div>
    );
  }
}

Subsection.propTypes = {
  id: PropTypes.number.isRequired,
  onSelectStep: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Map).isRequired,
};

export default Subsection;
