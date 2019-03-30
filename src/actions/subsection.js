import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';
// import makeMapFromArray from '../../utils/utils';
import * as subsectionSelectors from '../reducers/subsection';

export function selectSubsection(subsectionId) {
  console.log('selectSubsection');
  return { type: types.SUBSECTION_SELECTED, selectedSubsectionId: subsectionId };
}

export function fetchSubsectionSteps() {
  return async (dispatch, getState) => {
    try {
      console.log('fetchSubsectionSteps');
      const subsectionId = subsectionSelectors.getSelectedSubsectionId(getState());
      console.log('fetchSubsectionSteps subsectionId', subsectionId);
      const [stepsArray, lastCompletedStepId] = await backendAPIService.getSubsectionSteps(
        subsectionId,
      );
      console.log('fetchSubsectionSteps steparray:', stepsArray);
      console.log('fetchSubsectionSteps lastCompletedStepId:', lastCompletedStepId);
      let firstStepId;
      const subsectionStepsById = new Map();
      stepsArray.forEach((step) => {
        if (step.parentId === 0) {
          firstStepId = step.id;
        }
        subsectionStepsById.set(step.id, step);
      });
      // const subsectionStepsById = makeMapFromArray(stepsArray);
      dispatch({
        type: types.SUBSECTION_STEPS_FETCHED,
        subsectionStepsById,
        firstStepId,
        lastCompletedStepId,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
