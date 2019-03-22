import React from 'react';
import PropTypes from 'prop-types';

import Step from './Step/Step';

class Steps extends React.Component {
  constructor(props) {
    super(props);
    const steps = [];
    if (props.arrayOfSteps !== undefined && props.arrayOfSteps.length > 0) {
      console.log('array: ', props.arrayOfSteps);
      let step = props.arrayOfSteps.find(elem => elem.parentId === 'undefined');
      console.log('step: ', step);
      steps.push(step);
      while (step.childId !== 'undefined') {
        console.log('child: ', step.childId);
        step = props.arrayOfSteps.find(elem => elem.parentId === step.id);
        steps.push(step);
      }
    }
    console.log('props.arrayOfSteps:', props.arrayOfSteps);
    const activeStepId = 0;
    this.state = {
      arrayOfSteps:
        steps.length > 0
          ? steps
          : [
            {
              id: 1,
              name: 'first',
              type: 'theory',
              childId: 2,
              parentId: 'undefined',
            },
            {
              id: 2,
              name: 'second',
              type: 'theory',
              childId: 3,
              parentId: 1,
            },
            {
              id: 3,
              name: 'thried',
              type: 'theory',
              childId: 'undefined',
              parentId: 2,
            },
          ],
      activeStep: activeStepId,
    };
    console.log('steps: ', this.state.arrayOfSteps);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  findStep(id) {
    return this.state.arrayOfSteps.find(step => step.id === id);
  }

  goBack() {
    console.log('Back!');
    if (this.state.activeStep > 0) {
      this.setState((prevState) => {
        const activeStep = prevState.activeStep - 1;
        return { activeStep };
      });
    } else {
      this.askNewSteps();
    }
  }

  goForward() {
    console.log('Forward!');
    console.log('activeStep: ', this.state.activeStep);
    console.log('arrayOfSteps: ', this.state.arrayOfSteps);
    if (this.state.activeStep < this.state.arrayOfSteps.length - 1) {
      this.setState((prevState) => {
        const activeStep = prevState.activeStep + 1;
        return { activeStep };
      });
    } else {
      this.askNewSteps();
    }
  }

  askNewSteps() {
    /* TODO: make load new steps */
  }

  render() {
    const step = this.state.arrayOfSteps[this.state.activeStep];
    console.log('render! ', step);
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
  arrayOfSteps: PropTypes.arrayOf({}).isRequired,
};

export default Steps;
