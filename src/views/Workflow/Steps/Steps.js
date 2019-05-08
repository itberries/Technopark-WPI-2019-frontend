import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Popup from 'react-skylight';

import serverUrl from '../../../config';

import Step from './Step/Step';

import { completeStep } from '../../../actions/steps';
import popupStyles from '../../../common.blocks/Popup/Popup';

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
      this.lastStepPopup.show();
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

  generatePopup() {
    const lastStepPopupStyles = Object.assign({}, popupStyles.bigHeightStyles);
    lastStepPopupStyles.textAlign = 'center';

    const lastStepImage = `${serverUrl}/rewards/laststep.png`;
    const stepResultFragment = (
      <React.Fragment>
        Подсекция завершена. Телепортируйтесь в следующий блок!
        <br />
        <img src={lastStepImage} alt="Телепорт" />
      </React.Fragment>
    );

    return (
      <Popup
        dialogStyles={lastStepPopupStyles}
        hideOnOverlayClicked
        ref={ref => (this.lastStepPopup = ref)}
        title="Поздавляем!"
        afterClose={() => this.props.goBack()}
      >
        {stepResultFragment}
      </Popup>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.generateActiveStep()}
        {this.generatePopup()}
      </React.Fragment>
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
