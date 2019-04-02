import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Step from './Step/Step';

import { completeStep } from '../../../actions/steps';

const mapStateToProps = (state) => {
  const steps = state.subsection.subsectionStepsById;
  const activeStepId = state.user.state.stepId;
  return {
    steps,
    activeStepId,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    completeStep,
  },
  dispatch,
);

class Steps extends React.Component {
  constructor(props) {
    super(props);
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
        return { activeStep };
      });
    } else {
      this.props.goBack();
    }
  }

  async goForward() {
    if (this.state.activeStep.childId !== 0) {
      const activeStep = this.props.steps.get(this.state.activeStep.childId);
      await this.props.completeStep(this.props.activeStepId);
      this.setState({ activeStep });
    } else {
      await this.props.completeStep(this.props.activeStepId);
      this.props.goBack();
    }
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
  goBack: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Steps);
