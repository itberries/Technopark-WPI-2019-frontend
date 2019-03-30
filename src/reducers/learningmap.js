import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  sectionsById: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LEARNINGMAP_SECTIONS_FETCHED:
      return Immutable.merge({
        ...state,
        sectionsById: action.sectionsById,
        rootSectionId: action.rootSectionId,
      });
    default:
      return state;
  }
}
