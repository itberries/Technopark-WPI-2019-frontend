import axios from 'axios';

class BackendAPIService {
  async getProfile(id) {
    // const lolkek = await axios.patch(`/user/${id}/reset_current_state`);
    const res = await axios.get(`/user/${id}`);
    console.log(`BackendAPIService: getProfile(${id}) res: `, res);
    const { user, userState } = res.data;
    return [user, userState];
  }

  async addProfile(id) {
    const res = await axios.post('/user', { id });
    console.log(`BackendAPIService: addProfile(${id}) res: `, res);
    const { user, userState } = res.data;
    return [user, userState];
  }

  async setCurrentUserStepCompleted(userId, sectionId, subsectionId, stepId) {
    const res = await axios.patch(
      `/user/${userId}/sections/${sectionId}/subsections/${subsectionId}/steps/${stepId}`,
    );
    console.log(`BackendAPIService: setCurrentUserStepCompleted(stepId: ${stepId}) res: `, res);
    return res.data;
  }

  async getSubsectionSteps(subsectionId) {
    const res = await axios.get(`/subsections/${subsectionId}/steps/`);
    console.log('BackendAPIService: getSubsectionSteps res: ', res);

    const { currentStep } = res.data;
    const stepsArray = res.data.stepResponses;
    const lastCompletedStepId = currentStep.id;

    return [stepsArray, lastCompletedStepId];

    // TODO: add error handling
    /*
    if (typeof error.response !== 'undefined' && error.response.status === 404) {
      console.error('getSteps not found!!!', error.response);
    } else {
      console.error('getSteps error!!!', error.response);
    }
    */
  }

  async getSections() {
    const res = await axios.get('/sections/');
    console.log('BackendAPIService: getSections res: ', res);

    // TODO: add error handling
    /*
    if (typeof error.response !== 'undefined' && error.response.status === 404) {
      console.error('getSections not found!!!', error.response);
    } else {
      console.error('getSections error!!!', error.response);
    }
    */

    return res.data;
  }
}

export default new BackendAPIService();
