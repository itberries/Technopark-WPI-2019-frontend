import Immutable from 'seamless-immutable';
import * as types from '../constants/actionTypes';

const initialState = Immutable({
  eventsList: undefined,
  selectedEventId: undefined,
  selectedEventDetail: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.EVENTS_ALL_FETCHED:
      return Immutable.merge({
        ...state,
        eventsList: action.eventsArray,
      });
    case types.EVENTS_EVENT_SELECTED:
      return Immutable.merge({
        ...state,
        selectedEventId: action.eventId,
      });
    case types.EVENTS_DETAIL_FETCHED:
      return Immutable.merge({
        ...state,
        selectedEventDetail: action.eventDetail,
      });
    default:
      return state;
  }
}

// Selectors

export function getSelectedEventId(state) {
  return state.events.selectedEventId;
}
