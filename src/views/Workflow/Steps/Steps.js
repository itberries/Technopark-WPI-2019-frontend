import React from 'react';
import PropTypes from 'prop-types';

import Step from './Step/Step';

class Steps extends React.Component {
  constructor(props) {
    super(props);
    const steps = props.data.get('steps');
    this.state = {
      arrayOfSteps: steps,
      activeStep: 3,
    };
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  findStep(id) {
    return this.state.arrayOfSteps.find(step => step.id === id);
  }

  goBack() {
    console.log('goBack');
    if (this.state.activeStep.parentId !== 0) {
      this.setState((prevState) => {
        const activeStep = prevState.arrayOfSteps.get(prevState.activeStep.parentId);
        console('activeStep: ', activeStep);
        return { activeStep };
      });
    } else {
      console.log('goBack');
      this.askNewSteps();
    }
  }

  goForward() {
    if (this.state.activeStep.childId !== 0) {
      this.setState((prevState) => {
        const activeStep = prevState.arrayOfSteps.get(prevState.activeStep.childId);
        if (activeStep.parentId === window.last_step.id) {
          window.last_step = activeStep;
          console.log('open new step');
          console.log('activeStep: ', activeStep);
        }
        return { activeStep };
      });
    } else {
      this.props.data.set('section_done', true);
      console.log('section_done: ', this.props.data.get('section_done'));
      this.askNewSteps();
    }
  }

  askNewSteps() {
    this.props.goBack();
  }

  render() {
    const step = {
      childId: 0,
      id: 3,
      name: 'step3',
      parentId: 2,
      type: 'interactive',
    };
    return (
      <Step
        id={step.id}
        name={step.name}
        type={step.type}
        goBack={this.goBack}
        goForward={this.goForward}
        next={step.childId}
        previous={step.parentId}
      />
    );
  }
}

Steps.propTypes = {
  id: PropTypes.number.isRequired,
  activeStep: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    next: PropTypes.number,
    previous: PropTypes.number,
  }).isRequired,
  data: PropTypes.instanceOf(Map).isRequired,
  goBack: PropTypes.func.isRequired,
};

export default Steps;
