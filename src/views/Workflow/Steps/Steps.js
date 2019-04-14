import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Step from './Step/Step';

import { completeStep } from '../../../actions/steps';

const mapStateToProps = (state) => {
  const steps = state.subsection.subsectionStepsById;
  const userState = state.user.state;
  return {
    steps,
    userState,
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
      activeStep: props.steps.get(props.id),
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
    await this.props.completeStep(this.state.activeStep.id);
    if (this.state.activeStep.childId !== 0) {
      const activeStep = this.props.steps.get(this.state.activeStep.childId);
      this.setState({ activeStep });
    } else {
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
        previous={step.parentId}
        next={step.childId}
        isLast={step.id === this.props.userState.stepId}
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
