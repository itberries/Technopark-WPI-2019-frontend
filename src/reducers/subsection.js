import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  selectedSubsectionId: undefined,
  subsectionStepsById: undefined,
  firstStepInStepListId: undefined,
  lastCompletedStepId: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SUBSECTION_SELECTED:
      return Immutable.merge({
        ...state,
        selectedSubsectionId: action.selectedSubsectionId,
      });
    case types.SUBSECTION_STEPS_FETCHED:
      return Immutable.merge({
        ...state,
        subsectionStepsById: action.subsectionStepsById,
        firstStepInStepListId: action.firstStepId,
        lastCompletedStepId: action.lastCompletedStepId,
      });
    default:
      return state;
  }
}

// Selectors

export function getSelectedSubsectionId(state) {
  return state.subsection.selectedSubsectionId;
}
