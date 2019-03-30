import React from 'react';
import PropTypes from 'prop-types';

import Step from './Step/Step';

class Steps extends React.Component {
  constructor(props) {
    super(props);
    const steps = props.data.get('steps');
    this.state = {
      arrayOfSteps: steps,
      activeStep: steps.get(this.props.id),
    };
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  findStep(id) {
    return this.state.arrayOfSteps.find(step => step.id === id);
  }

  goBack() {
    if (this.state.activeStep.parentId !== 0) {
      this.setState((prevState) => {
        const activeStep = prevState.arrayOfSteps.get(prevState.activeStep.parentId);
        console('activeStep: ', activeStep);
        return { activeStep };
      });
    } else {
      this.askNewSteps();
    }
  }

  goForward() {
    if (this.state.activeStep.childId !== 0) {
      this.setState((prevState) => {
        const activeStep = prevState.arrayOfSteps.get(prevState.activeStep.childId);
        if (activeStep.parentId === window.last_step.id) {
          window.last_step = activeStep;
        }
        return { activeStep };
      });
    } else {
      this.props.data.set('section_done', true);
      this.askNewSteps();
    }
  }

  askNewSteps() {
    this.props.goBack();
  }

  render() {
    const step = this.state.activeStep;
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
