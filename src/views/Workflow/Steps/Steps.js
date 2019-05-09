import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Popup from 'sweetalert2';

import serverUrl from '../../../config';

import { completeStep } from '../../../actions/steps';

import Step from './Step/Step';

const mapStateToProps = (state) => {
  const steps = state.subsection.subsectionStepsById;
  return {
    steps,
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
    const wasStepCompleted = this.state.activeStep.isCompleted;
    await this.props.completeStep(this.state.activeStep.id);
    if (this.state.activeStep.childId !== 0) {
      const activeStep = this.props.steps.get(this.state.activeStep.childId);
      this.setState({ activeStep });
    } else if (this.state.activeStep.childId === 0 && !wasStepCompleted) {
      this.showLastStepPopup();
    } else {
      this.props.goBack();
    }
  }

  generateActiveStep() {
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

  showLastStepPopup() {
    Popup.fire({
      title: 'Поздравляем!',
      text: 'Подсекция завершена! Следующий блок обучения открыт.',
      confirmButtonColor: '#41046F',
      confirmButtonText: 'Вернуться',
      imageUrl: `${serverUrl}/rewards/star.png`,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Звезда',
    }).then(() => {
      this.props.goBack();
    });
  }

  render() {
    return <React.Fragment>{this.generateActiveStep()}</React.Fragment>;
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
