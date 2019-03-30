import Immutable from 'seamless-immutable';

import * as types from '../../constants/actionTypes';

const initialState = Immutable({
  vkUserInfo: null,
  errors: null,
  fetching: false,
});

export default function reduce(state = initialState, action = {}) {
  console.log('vkappuser action:', action);
  switch (action.type) {
    case types.VK_GET_USER_INFO_REQUEST:
      return state.merge({
        fetching: true,
      });

    case types.VK_GET_USER_INFO_FAILED:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    case types.VK_GET_USER_INFO_FETCHED:
      return state.merge({
        errors: null,
        vkUserInfo: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
}
