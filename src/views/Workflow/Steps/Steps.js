import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Step from './Step/Step';

const mapStateToProps = (state) => {
  console.log('Steps mapStateToProps state:', state);
  const steps = state.subsection.subsectionStepsById;
  const activeStepId = state.user.state.stepId;
  return {
    steps,
    activeStepId,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

class Steps extends React.Component {
  constructor(props) {
    super(props);
    console.log('Steps constructor props:', props);
    this.state = {
      activeStep: props.steps.get(props.activeStepId),
    };
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  findStep(id) {
    return this.props.steps.find(step => step.id === id);
  }

  goBack() {
    if (this.state.activeStep.parentId !== 0) {
      this.setState((prevState) => {
        const activeStep = this.props.steps.get(prevState.activeStep.parentId);
        console.log('goBack activeStep: ', activeStep);
        return { activeStep };
      });
    } else {
      this.props.goBack();
    }
  }

  goForward() {
    if (this.state.activeStep.childId !== 0) {
      this.setState((prevState) => {
        const activeStep = this.props.steps.get(prevState.activeStep.childId);
        console.log('goForward activeStep: ', activeStep);
        // TODO: update user state
        // if (activeStep.parentId === window.last_step.id) {
        //   window.last_step = activeStep;
        // }
        return { activeStep };
      });
    } else {
      // TODO: update user state
      // this.props.data.set('section_done', true);
      this.props.goBack();
    }
  }

  render() {
    const step = this.state.activeStep;
    console.log('Steps render activeStep: ', step);
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
  goBack: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Steps);
