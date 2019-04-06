import fakeDatabase from './fakeDatabase';

const API_MOCK_DELAY = 500;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class BackendAPIServiceMock {
  async getProfile(id) {
    const res = await delay(API_MOCK_DELAY).then(() => ({
      data: { user: fakeDatabase.user, userState: fakeDatabase.userState },
    }));
    console.log(`BackendAPIServiceMOCK: getProfile(${id}) res: `, res);
    const { user, userState } = res.data;
    return [user, userState];
  }

  async addProfile(id) {
    const res = await delay(API_MOCK_DELAY).then(() => ({
      data: { user: fakeDatabase.user, userState: fakeDatabase.userState },
    }));
    console.log(`BackendAPIServiceMOCK: addProfile(${id}) res: `, res);
    const { user, userState } = res.data;
    return [user, userState];
  }

  async setCurrentUserStepCompleted(userId, sectionId, subsectionId, stepId) {
    const res = await delay(API_MOCK_DELAY).then(() => ({ data: fakeDatabase.userState }));
    console.log(`BackendAPIServiceMOCK: setCurrentUserStepCompleted(stepId: ${stepId}) res: `, res);
    return res.data;
  }

  async getSubsectionSteps(subsectionId) {
    const res = await delay(API_MOCK_DELAY).then(() => ({ data: fakeDatabase.steps }));
    console.log('BackendAPIServiceMOCK: getSubsectionSteps res: ', res);

    const { currentStep } = res.data;
    const stepsArray = res.data.stepResponses;
    const lastCompletedStepId = currentStep.id;

    return [stepsArray, lastCompletedStepId];
  }

  async getSections() {
    const res = await delay(API_MOCK_DELAY).then(() => ({ data: fakeDatabase.sections }));
    console.log('BackendAPIServiceMOCK: getSections res: ', res);
    return res.data;
  }

  async getCards(stepId) {
    const res = await delay(API_MOCK_DELAY).then(() => ({ data: fakeDatabase.cards }));
    console.log('BackendAPIServiceMOCK: getCards res: ', res);
    return res.data;
  }
}

export default BackendAPIServiceMock;
