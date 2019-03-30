import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  user: undefined,
  state: {
    sectionId: 1,
    stepId: 1,
    subsectionId: 1,
  }, // TODO: check default state or change learningMap render
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
