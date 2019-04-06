import Immutable from 'seamless-immutable';

import * as types from '../../constants/actionTypes';

const initialState = Immutable({
  vkUserInfo: null,
  errors: null,
  fetching: false,
});

export default function reduce(state = initialState, action = {}) {
  console.log('vk app reduce state, action:', state, action);
  switch (action.type) {
    case types.VK_GET_USER_INFO_REQUEST:
      return Immutable.merge({
        ...state,
        fetching: true,
      });

    case types.VK_GET_USER_INFO_FAILED:
      return Immutable.merge({
        ...state,
        errors: action.payload,
        fetching: false,
      });

    case types.VK_GET_USER_INFO_FETCHED:
      return Immutable.merge({
        ...state,
        errors: null,
        vkUserInfo: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
}
