import fakeDatabase from './fakeDatabase';

const API_MOCK_DELAY = 1500;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class BackendAPIServiceMock {
  async getProfile(id) {
    const res = await delay(API_MOCK_DELAY).then(() => ({
      data: {
        user: Object.assign({}, fakeDatabase.user),
        userState: Object.assign({}, fakeDatabase.userState),
      },
    }));
    console.log(`BackendAPIServiceMOCK: getProfile(${id}) res: `, res);
    const { user, userState } = res.data;
    return [user, userState];
  }

  async addProfile(id) {
    const res = await delay(API_MOCK_DELAY).then(() => ({
      data: {
        user: Object.assign({}, fakeDatabase.user),
        userState: Object.assign({}, fakeDatabase.userState),
      },
    }));
    console.log(`BackendAPIServiceMOCK: addProfile(${id}) res: `, res);
    const { user, userState } = res.data;
    return [user, userState];
  }

  async setCurrentUserStepCompleted(userId, sectionId, subsectionId, stepId) {
    const res = await delay(API_MOCK_DELAY).then(() => ({
      data: Object.assign({}, fakeDatabase.userState),
    }));
    console.log(`BackendAPIServiceMOCK: setCurrentUserStepCompleted(stepId: ${stepId}) res: `, res);
    return res.data;
  }

  async getSubsectionSteps(subsectionId) {
    const res = await delay(API_MOCK_DELAY).then(() => ({
      data: Object.assign({}, fakeDatabase.steps),
    }));
    console.log('BackendAPIServiceMOCK: getSubsectionSteps res: ', res);

    const { currentStep } = res.data;
    const stepsArray = res.data.stepResponses;
    const lastCompletedStepId = currentStep.id;

    return [stepsArray, lastCompletedStepId];
  }

  async getSections() {
    const res = await delay(API_MOCK_DELAY).then(() => {
      const sections = fakeDatabase.sections.map((section) => {
        const subsections = section.subsections.map(subsection => Object.assign({}, subsection));
        section.subsections = subsections;
        return Object.assign({}, section);
      });
      return { data: sections };
    });
    console.log('BackendAPIServiceMOCK: getSections res: ', res);
    return res.data;
  }

  async getCards(stepId) {
    const res = await delay(API_MOCK_DELAY).then(() => {
      const cards = fakeDatabase.cards.map(card => Object.assign({}, card));
      return { data: cards };
    });
    console.log('BackendAPIServiceMOCK: getCards res: ', res);
    return res.data;
  }
}

export default BackendAPIServiceMock;
