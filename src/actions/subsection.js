import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';
import * as Utils from '../utils/utils';
import * as subsectionSelectors from '../reducers/subsection';

export function selectSubsection(subsectionId) {
  return {
    type: types.SUBSECTION_SELECTED,
    selectedSubsectionId: subsectionId,
  };
}

export function fetchSubsectionSteps() {
  return async (dispatch, getState) => {
    try {
      const subsectionId = subsectionSelectors.getSelectedSubsectionId(getState());
      const [stepsArray, lastCompletedStepId] = await backendAPIService.getSubsectionSteps(
        subsectionId,
      );
      const [subsectionStepsById, firstStepId] = Utils.makeMapFromArray(stepsArray);
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
