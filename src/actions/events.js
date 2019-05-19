import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';
import * as eventsSelectors from '../reducers/events';

export function fetchEvents() {
  return async (dispatch) => {
    try {
      const eventsArray = await backendAPIService.getEvents();
      dispatch({
        type: types.EVENTS_ALL_FETCHED,
        eventsArray,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function selectEvent(eventId) {
  return {
    type: types.EVENTS_EVENT_SELECTED,
    eventId,
  };
}

export function unselectEvent() {
  return {
    type: types.EVENTS_EVENT_SELECTED,
    eventId: undefined,
  };
}

export function fetchEventById() {
  return async (dispatch, getState) => {
    try {
      const eventId = eventsSelectors.getSelectedEventId(getState());
      const eventDetail = await backendAPIService.getEvent(eventId);
      dispatch({
        type: types.EVENTS_DETAIL_FETCHED,
        eventDetail,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
