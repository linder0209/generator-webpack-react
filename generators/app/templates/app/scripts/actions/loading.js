import {
  LOADING_REQUEST, LOADING_SUCCESS, LOADING_FAILURE
} from '../constants/LoadingActionTypes';

import LoadingSchemas from '../models/LoadingSchemas';
import {CALL_API} from '../middleware/api';

function fetchLoading() {
  return {
    entity: 'loading',
    [CALL_API]: {
      types: [LOADING_REQUEST, LOADING_SUCCESS, LOADING_FAILURE],
      jsonUrl: 'json/error.json',
      url: 'path/error',
      schema: LoadingSchemas.LOADING
    }
  };
}

export function getLoading() {
  return (dispatch, getState) => {
    return dispatch(fetchLoading());
  };
}
