import axios from 'axios';

// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

class BackendAPIService {
  async getSubsectionSteps(subsectionId) {
    console.log('getSubsectionSteps');
    const res = await axios.get(`/subsections/${subsectionId}/steps/`);
    console.log('getSubsectionSteps res: ', res);

    const { currentStep } = res.data;
    const stepsArray = res.data.stepResponses;
    const lastCompletedStepId = currentStep.id;

    return [stepsArray, lastCompletedStepId];

    /*
    this.props.data.set('steps', steps);
    this.props.data.set('last_step', currentStep);
    if (this.props.data.get('section_done') === undefined) {
      this.props.data.set('section_done', false);
    }
    this.setState({ steps, startStepId });
    */

    /*
    if (typeof error.response !== 'undefined' && error.response.status === 404) {
      console.error('getSteps not found!!!', error.response);
    } else {
      console.error('getSteps error!!!', error.response);
    }
    */
  }
}

export default new BackendAPIService();
