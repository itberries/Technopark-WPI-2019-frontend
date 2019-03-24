import React from 'react';

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
    const stepsArray = [
      {
        childId: 5,
        id: 4,
        name: 'fourth',
        parentId: 3,
        type: 'theory',
      },
      {
        childId: 4,
        id: 3,
        name: 'third',
        parentId: 2,
        type: 'training',
      },
      {
        childId: 2,
        id: 1,
        name: 'first',
        parentId: 'undefined',
        type: 'theory',
      },
      {
        childId: 'undefined',
        id: 6,
        name: 'sixth',
        parentId: 5,
        type: 'training',
      },
      {
        childId: 3,
        id: 2,
        name: 'second',
        parentId: 1,
        type: 'interactive',
      },
      {
        childId: 6,
        id: 5,
        name: 'fifth',
        parentId: 4,
        type: 'interactive',
      },
    ];

    let { startStepId } = this.state;
    const { steps } = this.state;
    stepsArray.forEach((step) => {
      if (step.parentId === 'undefined') {
        startStepId = step.id;
      }
      steps.set(step.id, step);
    });

    // This is how out backend send us currentStep
    const currentStep = this.props.data.get('last_step') !== undefined
      ? this.props.data.get('last_step')
      : {
        childId: 2,
        id: 1,
        name: 'first',
        parentId: 'undefined',
        type: 'theory',
      };

    this.props.data.set('steps', steps);
    this.props.data.set('last_step', currentStep);
    if (this.props.data.get('section_done') === undefined) {
      this.props.data.set('section_done', false);
    }

    console.log('did mound almost, state: ', this.state);
    this.setState({ steps, startStepId, lastCompletedStepId: currentStep.id });
    console.log('did mound, state: ', this.state);

    /*
    axios
      .get(`/subsections/${this.state.id}/steps/`)
      .then((response) => {
        const steps = response.data;
        this.setState({ steps });
        this.props.data.set('steps', steps);
      })
      .catch((error) => {
        if (typeof error.response !== 'undefined' && error.response.status === 404) {
          console.error('getSteps not found!!!', error.response);
        } else {
          console.error('getSteps error!!!', error.response);
        }
      });
    */
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
        if (step.childId === 'undefined') {
          isLastStep = true;
        }
        if (step.id === this.props.data.get('last_step').id) {
          afterLastCompleted = true;
        }
        subsectionBlocks.push(
          <SubsectionBlock
            key={step.name}
            withSeparator={!isLastStep} // {index !== this.state.steps.length - 1}
            type={step.type}
            isCompleted={!afterLastCompleted || (this.props.data.get('section_done') && isLastStep)}
            isActive={!afterLastCompleted || this.props.data.get('last_step').id === step.id}
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
