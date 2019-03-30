import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  id: 64559520,
  state: {
    sectionId: 1,
    stepId: 1,
    subsectionId: 1,
  },
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
