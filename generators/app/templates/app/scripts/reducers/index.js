import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import caches from './caches';
import example from './example';
import person from './person';
import film from './film';

import {RESET_ERROR_MESSAGE} from '../constants/IndexActionTypes';

/*eslint-disable indent*/
function errorMessage(state = null, action) {
  const {type, error} = action;
  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }
  return state;
}

export default combineReducers({
  errorMessage,
  routing,
  caches,
  example,
  person,
  film
});
