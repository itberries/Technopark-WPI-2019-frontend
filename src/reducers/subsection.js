// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors,
// which is business logic that digests parts of the store's state
// for easier consumption by views

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
      console.log('reduce SUBSECTION_SELECTED, state: ', state);
      console.log('reduce SUBSECTION_SELECTED, action: ', action);
      return Immutable.merge({
        ...state,
        selectedSubsectionId: action.selectedSubsectionId,
      });
    case types.SUBSECTION_STEPS_FETCHED:
      console.log('reduce SUBSECTION_STEPS_FETCHED, state: ', state);
      console.log('reduce SUBSECTION_STEPS_FETCHED, action: ', action);
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
  console.log('getSelectedSubsectionId selector, state: ', state);
  return state.subsection.selectedSubsectionId;
}
