import * as types from '../constants/actionTypes';
import backendAPIService from '../services/backend';
import * as userSelectors from '../reducers/user';

export function completeStep(stepId) {
  return async (dispatch, getState) => {
    try {
      const user = userSelectors.getUser(getState());
      const currentState = userSelectors.getUserState(getState());
      const nextState = await backendAPIService.setCurrentUserStepCompleted(
        user.id,
        currentState.sectionId,
        currentState.subsectionId,
        stepId,
      );
      dispatch({
        type: types.USER_NEW_STATE_FETCHED,
        nextState,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
